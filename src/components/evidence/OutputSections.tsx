"use client";

import { useState } from "react";
import {
  Calendar,
  List,
  FileText,
  Gavel,
  Shield,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import type { HearingPackage, OutputSectionId } from "@/types/evidence";
import { formatDate } from "@/lib/evidence";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<OutputSectionId, typeof Calendar> = {
  chronology: Calendar,
  "evidence-index": List,
  "hearing-summary": FileText,
  "draft-t2": Gavel,
  "draft-t6": Shield,
};

interface OutputSectionsProps {
  hearingPackage: HearingPackage | null;
}

export function OutputSections({ hearingPackage }: OutputSectionsProps) {
  const [expandedId, setExpandedId] = useState<OutputSectionId | null>(
    "chronology"
  );
  const [copiedId, setCopiedId] = useState<OutputSectionId | null>(null);

  if (!hearingPackage) {
    return (
      <div className="rounded-xl border border-dashed border-legal-200 bg-legal-50/30 px-6 py-16 text-center">
        <FileText className="mx-auto h-10 w-10 text-legal-300" aria-hidden="true" />
        <p className="mt-4 text-sm font-medium text-legal-600">
          Hearing package not yet generated
        </p>
        <p className="mt-1 text-xs text-legal-400">
          Upload evidence and click &ldquo;Generate Hearing Package&rdquo; to
          create your documents.
        </p>
      </div>
    );
  }

  const handleCopy = async (sectionId: OutputSectionId, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(sectionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-legal-900">
          Hearing Package Output
        </h2>
        <span className="text-xs text-legal-500">
          Generated {formatDate(hearingPackage.generatedAt)}
        </span>
      </div>

      <div className="space-y-2">
        {hearingPackage.sections.map((section) => {
          const Icon = SECTION_ICONS[section.id];
          const isExpanded = expandedId === section.id;
          const isCopied = copiedId === section.id;

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl border border-legal-200 bg-white shadow-card"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : section.id)
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-legal-50"
                aria-expanded={isExpanded}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-legal-100 text-legal-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-legal-900">
                    {section.title}
                  </p>
                  <p className="truncate text-xs text-legal-500">
                    {section.description}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-legal-400 transition-transform",
                    isExpanded && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {isExpanded && (
                <div className="border-t border-legal-100">
                  <div className="flex justify-end border-b border-legal-50 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(section.id, section.content)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-legal-600 transition-colors hover:bg-legal-100"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="max-h-80 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-legal-700">
                    {section.content}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
