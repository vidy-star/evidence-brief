"use client";

import { FileOutput, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  fileCount: number;
  /** Disabled when user has not completed a one-time purchase */
  disabled?: boolean;
}

export function GenerateButton({
  onClick,
  isGenerating,
  fileCount,
  disabled = false,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isGenerating || disabled}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-elevated transition-all sm:w-auto",
        "bg-legal-900 text-white hover:bg-legal-800",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-legal-900",
        "disabled:cursor-not-allowed disabled:opacity-60"
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Analyzing Documents...
        </>
      ) : (
        <>
          <FileOutput className="h-4 w-4" aria-hidden="true" />
          Analyze My Documents
        </>
      )}
      {!isGenerating && fileCount > 0 && (
        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent-light">
          {fileCount} file{fileCount !== 1 ? "s" : ""}
        </span>
      )}
    </button>
  );
}
