import type {
  DocumentType,
  EvidenceFile,
  HearingPackage,
  OutputSection,
  SupportedFileType,
} from "@/types/evidence";
import { PRIORITY_OPTIONS } from "@/types/evidence";

const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".docx"] as const;

const MIME_TO_TYPE: Record<string, EvidenceFile["type"]> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

export function getAcceptedFileTypes(): string {
  return ACCEPTED_EXTENSIONS.join(",");
}

export function getAcceptedMimeTypes(): string {
  return Object.keys(MIME_TO_TYPE).join(",");
}

export function getFileInputAccept(): string {
  return `${getAcceptedFileTypes()},${getAcceptedMimeTypes()}`;
}

export function parseFileType(file: File): EvidenceFile["type"] | null {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "pdf") return "pdf";
  if (extension === "jpg" || extension === "jpeg") return "jpg";
  if (extension === "png") return "png";
  if (extension === "docx") return "docx";

  return MIME_TO_TYPE[file.type] ?? null;
}

export function isAcceptedFile(file: File): boolean {
  return parseFileType(file) !== null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatEventDate(date: string): string {
  if (!date) return "—";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsed);
}

export function exhibitLetterFromIndex(index: number): string {
  let letter = "";
  let remaining = index;

  do {
    letter = String.fromCharCode(65 + (remaining % 26)) + letter;
    remaining = Math.floor(remaining / 26) - 1;
  } while (remaining >= 0);

  return letter;
}

export function assignExhibitNumbers(files: EvidenceFile[]): EvidenceFile[] {
  const byUploadOrder = [...files].sort((a, b) => {
    const timeCompare = a.uploadedAt.getTime() - b.uploadedAt.getTime();
    if (timeCompare !== 0) return timeCompare;
    return a.id.localeCompare(b.id);
  });

  const exhibitMap = new Map(
    byUploadOrder.map((file, index) => [file.id, exhibitLetterFromIndex(index)])
  );

  return files.map((file) => ({
    ...file,
    exhibitNumber: exhibitMap.get(file.id),
  }));
}

export function formatExhibitLabel(file: EvidenceFile): string {
  return file.exhibitNumber ? `Exhibit ${file.exhibitNumber}` : "Exhibit —";
}

export function formatExhibitTitle(file: EvidenceFile): string {
  return `${formatExhibitLabel(file)} – ${file.name}`;
}

export function getPriorityLabel(priority: EvidenceFile["priority"]): string {
  return (
    PRIORITY_OPTIONS.find((option) => option.value === priority)?.shortLabel ??
    `Priority ${priority}`
  );
}

function compareExhibitNumbers(a?: string, b?: string): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  if (a.length !== b.length) return a.length - b.length;
  return a.localeCompare(b);
}

export function sortEvidence(files: EvidenceFile[]): EvidenceFile[] {
  return [...files].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;

    if (a.eventDate && b.eventDate) {
      const dateCompare = a.eventDate.localeCompare(b.eventDate);
      if (dateCompare !== 0) return dateCompare;
    } else if (a.eventDate) {
      return -1;
    } else if (b.eventDate) {
      return 1;
    }

    return compareExhibitNumbers(a.exhibitNumber, b.exhibitNumber);
  });
}

/** @deprecated Use sortEvidence instead */
export function sortEvidenceByPriority(files: EvidenceFile[]): EvidenceFile[] {
  return sortEvidence(files);
}

function inferDocumentType(fileType: SupportedFileType): DocumentType {
  if (fileType === "jpg" || fileType === "png") return "Photograph";
  return "Other";
}

function formatPageRange(file: EvidenceFile): string {
  if (file.pageStart !== null && file.pageEnd !== null) {
    return `${file.pageStart}-${file.pageEnd}`;
  }
  if (file.pageStart !== null) return `${file.pageStart}`;
  if (file.pageEnd !== null) return `${file.pageEnd}`;
  return "—";
}

function buildChronology(files: EvidenceFile[]): string {
  const sorted = sortEvidence(files);

  if (sorted.length === 0) {
    return "No evidence files uploaded. Add documents to build a chronology.";
  }

  return sorted
    .map((file, index) => {
      const dateLabel = file.eventDate
        ? formatEventDate(file.eventDate)
        : formatDate(file.uploadedAt);
      return `${index + 1}. ${dateLabel} — ${formatExhibitTitle(file)} (${file.documentType}, ${getPriorityLabel(file.priority)})`;
    })
    .join("\n");
}

function buildEvidenceIndex(files: EvidenceFile[]): string {
  const sorted = sortEvidence(files);

  if (sorted.length === 0) {
    return "No exhibits indexed. Upload evidence to populate the index.";
  }

  return sorted
    .map((file) => {
      const lines = [
        formatExhibitTitle(file),
        `Document Type: ${file.documentType}`,
        `Priority: ${getPriorityLabel(file.priority)}`,
        `Pages: ${formatPageRange(file)}`,
      ];
      return lines.join("\n");
    })
    .join("\n\n");
}

function buildHearingSummary(files: EvidenceFile[]): string {
  const sorted = sortEvidence(files);
  const count = sorted.length;
  const documentTypes = [...new Set(sorted.map((f) => f.documentType))].join(
    ", "
  );
  const criticalCount = sorted.filter((f) => f.priority === 1).length;
  const exhibitList =
    count > 0
      ? sorted.map((file) => `• ${formatExhibitTitle(file)}`).join("\n")
      : "";

  return [
    "HEARING SUMMARY",
    "───────────────",
    "",
    `Total exhibits: ${count}`,
    count > 0 ? `Document types: ${documentTypes}` : "No documents uploaded.",
    count > 0 ? `Critical evidence: ${criticalCount}` : "",
    ...(count > 0 ? ["", "Exhibits:", exhibitList] : []),
    "",
    "This summary provides an overview of the evidence package prepared for the hearing.",
    "Review each exhibit in the Evidence Index and cross-reference dates in the Chronology.",
    "",
    count > 0
      ? "Recommended next steps:\n• Verify all exhibits are legible and complete\n• Confirm dates align with your tenancy timeline\n• Prepare oral submissions referencing each exhibit"
      : "Upload your evidence files to generate a complete hearing summary.",
  ].join("\n");
}

function buildDraftT2(files: EvidenceFile[]): string {
  const sorted = sortEvidence(files);
  const exhibits =
    sorted.length > 0
      ? sorted.map((f) => formatExhibitTitle(f)).join("; ")
      : "[no exhibits attached]";

  return [
    "DRAFT T2 ALLEGATIONS — TENANT APPLICATION",
    "════════════════════════════════════════",
    "",
    "1. The Tenant alleges that the Landlord has failed to maintain the rental unit in a good state of repair, contrary to the Residential Tenancies Act, 2006.",
    "",
    "2. The Tenant further alleges that the Landlord has substantially interfered with the reasonable enjoyment of the rental unit by the Tenant.",
    "",
    "3. Supporting evidence includes:",
    `   ${exhibits}`,
    "",
    "4. The Tenant seeks an order that the Landlord:",
    "   a) Complete all outstanding repairs within a reasonable timeframe;",
    "   b) Compensate the Tenant for any rent abatement arising from the disrepair;",
    "   c) Pay the Tenant's filing fee and any other costs as permitted by the Board.",
    "",
    "[DRAFT — Review and customize allegations before filing]",
  ].join("\n");
}

function buildDraftT6(files: EvidenceFile[]): string {
  const sorted = sortEvidence(files);
  const exhibits =
    sorted.length > 0
      ? sorted.map((f) => formatExhibitTitle(f)).join("; ")
      : "[no exhibits attached]";

  return [
    "DRAFT T6 ALLEGATIONS — TENANT APPLICATION",
    "════════════════════════════════════════",
    "",
    "1. The Tenant alleges that the Landlord has failed to comply with a previous order or agreement of the Board.",
    "",
    "2. The Tenant further alleges that the Landlord has continued to breach obligations despite prior notice and/or Board orders.",
    "",
    "3. Supporting evidence includes:",
    `   ${exhibits}`,
    "",
    "4. The Tenant seeks an order that the Landlord:",
    "   a) Comply with the terms of the previous order or agreement;",
    "   b) Pay a fine for non-compliance as permitted under the Act;",
    "   c) Compensate the Tenant for losses resulting from the continued breach.",
    "",
    "[DRAFT — Review and customize allegations before filing]",
  ].join("\n");
}

export function generateHearingPackage(files: EvidenceFile[]): HearingPackage {
  const sorted = sortEvidence(assignExhibitNumbers(files));

  const sections: OutputSection[] = [
    {
      id: "chronology",
      title: "Timeline of Events",
      description:
        "Chronological summary of important events and documents",
      content: buildChronology(sorted),
    },
    {
      id: "evidence-index",
      title: "Uploaded Documents",
      description: "Inventory of uploaded documents and supporting evidence",
      content: buildEvidenceIndex(sorted),
    },
    {
        id: "hearing-summary",
        title: "Case Summary",
        description: "Overview of the uploaded documents and key facts identified",
        content: buildHearingSummary(sorted),
      },
    {
      id: "draft-t2",
      title: "Key Issues Identified",
      description: "Potential issues, concerns, and arguments identified in the documents",
      content: buildDraftT2(sorted),
    },
    {
      id: "draft-t6",
      title: "Supporting Legal Concerns",
      description: "Additional issues and supporting information identified during analysis",
      content: buildDraftT6(sorted),
    },
  ];
  return {
    generatedAt: new Date(),
    sections,
  };
}

export function fileToEvidence(file: File): EvidenceFile | null {
  const type = parseFileType(file);
  if (!type) return null;

  return {
    id: crypto.randomUUID(),
    name: file.name,
    type,
    size: file.size,
    uploadedAt: new Date(),
    priority: 2,
    documentType: inferDocumentType(type),
    eventDate: "",
    pageStart: null,
    pageEnd: null,
  };
}
