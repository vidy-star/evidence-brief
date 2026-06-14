"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileUp, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFileInputAccept, isAcceptedFile } from "@/lib/evidence";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  onDisabledClick?: () => void;
  consentRequired?: boolean;
}

export function FileUpload({
  onFilesSelected,
  disabled = false,
  onDisabledClick,
  consentRequired = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const accepted: File[] = [];
      const rejected: string[] = [];

      Array.from(fileList).forEach((file) => {
        if (isAcceptedFile(file)) {
          accepted.push(file);
        } else {
          rejected.push(file.name);
        }
      });

      if (rejected.length > 0) {
        setError(
          `Unsupported file type: ${rejected.join(", ")}. Accepted: PDF, JPG, PNG, DOCX.`
        );
      } else {
        setError(null);
      }

      if (accepted.length > 0) {
        onFilesSelected(accepted);
      }
    },
    [onFilesSelected]
  );

  const handleInteraction = useCallback(() => {
    if (disabled) {
      onDisabledClick?.();
      return;
    }
    inputRef.current?.click();
  }, [disabled, onDisabledClick]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) {
        onDisabledClick?.();
        return;
      }
      processFiles(e.dataTransfer.files);
    },
    [disabled, onDisabledClick, processFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      processFiles(e.target.files);
      e.target.value = "";
    },
    [disabled, processFiles]
  );

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleInteraction();
          }
        }}
        onClick={handleInteraction}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors",
          isDragging && !disabled
            ? "border-accent bg-accent/5"
            : disabled
              ? "border-legal-200 bg-legal-100/50 hover:border-legal-300"
              : "border-legal-200 bg-legal-50/50 hover:border-legal-300 hover:bg-legal-50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={getFileInputAccept()}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-label="Upload evidence files"
        />
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            disabled ? "bg-legal-200 text-legal-500" : "bg-legal-100 text-legal-600"
          )}
        >
          {disabled ? (
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
          ) : isDragging ? (
            <FileUp className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Upload className="h-6 w-6" aria-hidden="true" />
          )}
        </div>
        {consentRequired ? (
          <>
            <p className="mt-4 text-sm font-medium text-legal-700">
              Consent required to upload
            </p>
            <p className="mt-1 text-xs text-legal-500">
              Click here to review and accept upload terms
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm font-medium text-legal-800">
              Drop files here or click to browse
            </p>
            <p className="mt-1 text-xs text-legal-500">
              PDF, JPG, PNG, DOCX — multiple files supported
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
