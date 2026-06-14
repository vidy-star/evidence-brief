"use client";

import { Trash2 } from "lucide-react";
import type {
  DocumentType,
  EvidenceFile,
  EvidencePriority,
} from "@/types/evidence";
import {
  DOCUMENT_TYPE_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/types/evidence";
import {
  formatDate,
  formatExhibitLabel,
  formatFileSize,
  sortEvidence,
} from "@/lib/evidence";
import { getFileTypeBadgeColor, getFileTypeIcon } from "@/lib/file-icons";
import { cn } from "@/lib/utils";

interface EvidenceTableProps {
  files: EvidenceFile[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<EvidenceFile>) => void;
}

const cellInputClass =
  "w-full min-w-0 rounded-md border border-legal-200 bg-white px-2 py-1.5 text-xs text-legal-800 focus:border-legal-400 focus:outline-none focus:ring-1 focus:ring-legal-400";

const priorityBadgeClass: Record<EvidencePriority, string> = {
  1: "border-red-200 bg-red-50 text-red-800",
  2: "border-amber-200 bg-amber-50 text-amber-800",
  3: "border-legal-200 bg-legal-50 text-legal-700",
};

export function EvidenceTable({ files, onRemove, onUpdate }: EvidenceTableProps) {
  if (files.length === 0) {
    return (
      <div className="rounded-xl border border-legal-200 bg-white px-6 py-12 text-center shadow-card">
        <p className="text-sm font-medium text-legal-600">No evidence uploaded yet</p>
        <p className="mt-1 text-xs text-legal-400">
          Upload PDF, JPG, PNG, or DOCX files to begin building your package.
        </p>
      </div>
    );
  }

  const sortedFiles = sortEvidence(files);

  const handlePageChange = (
    id: string,
    field: "pageStart" | "pageEnd",
    value: string
  ) => {
    const parsed = value === "" ? null : Number.parseInt(value, 10);
    onUpdate(id, {
      [field]: parsed === null || Number.isNaN(parsed) ? null : parsed,
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-legal-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-[1200px] divide-y divide-legal-200">
          <thead className="bg-legal-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Exhibit
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                File
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Priority
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Document Type
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Event Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Page Start
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Page End
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Format
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Size
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-legal-600">
                Uploaded
              </th>
              <th className="relative px-3 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-legal-100">
            {sortedFiles.map((file) => {
              const Icon = getFileTypeIcon(file.type);
              const badgeColor = getFileTypeBadgeColor(file.type);

              return (
                <tr key={file.id} className="hover:bg-legal-50/50">
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-flex items-center rounded-md bg-legal-900 px-2.5 py-1 text-xs font-semibold text-white">
                      {formatExhibitLabel(file)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex min-w-[160px] items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-legal-100 text-legal-600">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span
                        className="truncate text-sm font-medium text-legal-900"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={file.priority}
                      onChange={(e) =>
                        onUpdate(file.id, {
                          priority: Number(e.target.value) as EvidencePriority,
                        })
                      }
                      className={cn(
                        cellInputClass,
                        "min-w-[160px] font-medium",
                        priorityBadgeClass[file.priority]
                      )}
                      aria-label={`Priority for ${file.name}`}
                    >
                      {PRIORITY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={file.documentType}
                      onChange={(e) =>
                        onUpdate(file.id, {
                          documentType: e.target.value as DocumentType,
                        })
                      }
                      className={cn(cellInputClass, "min-w-[140px]")}
                      aria-label={`Document type for ${file.name}`}
                    >
                      {DOCUMENT_TYPE_OPTIONS.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="date"
                      value={file.eventDate}
                      onChange={(e) =>
                        onUpdate(file.id, { eventDate: e.target.value })
                      }
                      className={cn(cellInputClass, "min-w-[130px]")}
                      aria-label={`Event date for ${file.name}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      min={1}
                      value={file.pageStart ?? ""}
                      onChange={(e) =>
                        handlePageChange(file.id, "pageStart", e.target.value)
                      }
                      placeholder="—"
                      className={cn(cellInputClass, "w-20")}
                      aria-label={`Page start for ${file.name}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      min={1}
                      value={file.pageEnd ?? ""}
                      onChange={(e) =>
                        handlePageChange(file.id, "pageEnd", e.target.value)
                      }
                      placeholder="—"
                      className={cn(cellInputClass, "w-20")}
                      aria-label={`Page end for ${file.name}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor}`}
                    >
                      {file.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-legal-600">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-legal-600">
                    {formatDate(file.uploadedAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onRemove(file.id)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                      aria-label={`Remove ${file.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-legal-100 bg-legal-50/50 px-4 py-2">
        <p className="text-xs text-legal-500">
          {files.length} file{files.length !== 1 ? "s" : ""} in evidence package
          — sorted by priority, event date, and exhibit number
        </p>
      </div>
    </div>
  );
}
