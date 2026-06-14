export type SupportedFileType = "pdf" | "jpg" | "png" | "docx";

export type EvidencePriority = 1 | 2 | 3;

export type DocumentType =
  | "Text Message"
  | "Email"
  | "Notice"
  | "Lease"
  | "By-law Order"
  | "Inspection Report"
  | "Invoice"
  | "Photograph"
  | "Video"
  | "Audio Recording"
  | "Board Order"
  | "Affidavit"
  | "Medical Record"
  | "Other";

export interface EvidenceFile {
  id: string;
  name: string;
  type: SupportedFileType;
  size: number;
  uploadedAt: Date;
  description?: string;
  priority: EvidencePriority;
  documentType: DocumentType;
  eventDate: string;
  pageStart: number | null;
  pageEnd: number | null;
  exhibitNumber?: string;
}

export const PRIORITY_OPTIONS: {
  value: EvidencePriority;
  label: string;
  shortLabel: string;
}[] = [
  { value: 1, label: "1 - Critical Evidence", shortLabel: "Critical Evidence" },
  {
    value: 2,
    label: "2 - Supporting Evidence",
    shortLabel: "Supporting Evidence",
  },
  {
    value: 3,
    label: "3 - Background Evidence",
    shortLabel: "Background Evidence",
  },
];

export const DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
  "Text Message",
  "Email",
  "Notice",
  "Lease",
  "By-law Order",
  "Inspection Report",
  "Invoice",
  "Photograph",
  "Video",
  "Audio Recording",
  "Board Order",
  "Affidavit",
  "Medical Record",
  "Other",
];

export type OutputSectionId =
  | "chronology"
  | "evidence-index"
  | "hearing-summary"
  | "draft-t2"
  | "draft-t6";

export interface OutputSection {
  id: OutputSectionId;
  title: string;
  description: string;
  content: string;
}

export interface HearingPackage {
  generatedAt: Date;
  sections: OutputSection[];
}
