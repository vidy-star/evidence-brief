"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, X } from "lucide-react";
import { createEmptyAcknowledgements, allAcknowledgementsAccepted } from "@/lib/consent";
import {
  CONSENT_CHECKBOX_LABELS,
  type ConsentAcknowledgements,
  type ConsentCheckboxId,
} from "@/types/consent";
import { cn } from "@/lib/utils";

const CHECKBOX_ORDER: ConsentCheckboxId[] = [
  "noLegalAdvice",
  "aiErrors",
  "authorized",
  "processing",
  "termsAndPrivacy",
];

interface UploadConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (acknowledgements: ConsentAcknowledgements) => void;
}

export function UploadConsentModal({
  isOpen,
  onClose,
  onAccept,
}: UploadConsentModalProps) {
  const [acknowledgements, setAcknowledgements] =
    useState<ConsentAcknowledgements>(createEmptyAcknowledgements);

  useEffect(() => {
    if (isOpen) {
      setAcknowledgements(createEmptyAcknowledgements());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allAccepted = allAcknowledgementsAccepted(acknowledgements);

  const toggleCheckbox = (id: ConsentCheckboxId) => {
    setAcknowledgements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAccept = () => {
    if (allAccepted) onAccept(acknowledgements);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-legal-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close consent dialog"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-legal-200 bg-white shadow-elevated">
        <div className="flex items-start justify-between border-b border-legal-100 bg-legal-50/50 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-legal-900 text-accent">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="consent-modal-title"
                className="font-serif text-lg font-semibold text-legal-950"
              >
                Upload Consent Required
              </h2>
              <p className="mt-1 text-sm text-legal-600">
                Please review and accept all statements before uploading
                evidence.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-legal-400 transition-colors hover:bg-legal-100 hover:text-legal-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <fieldset className="space-y-3">
            <legend className="sr-only">Upload consent acknowledgements</legend>
            {CHECKBOX_ORDER.map((id) => (
              <label
                key={id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors",
                  acknowledgements[id]
                    ? "border-legal-300 bg-legal-50"
                    : "border-legal-200 bg-white hover:border-legal-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={acknowledgements[id]}
                  onChange={() => toggleCheckbox(id)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-legal-300 text-legal-900 focus:ring-legal-500"
                />
                <span className="text-sm leading-relaxed text-legal-700">
                  {id === "termsAndPrivacy" ? (
                    <>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-legal-900 underline underline-offset-2 hover:text-legal-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-legal-900 underline underline-offset-2 hover:text-legal-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </>
                  ) : (
                    CONSENT_CHECKBOX_LABELS[id]
                  )}
                </span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-legal-100 bg-legal-50/30 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-legal-200 bg-white px-4 py-2.5 text-sm font-medium text-legal-700 transition-colors hover:bg-legal-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAccept}
            disabled={!allAccepted}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors",
              "bg-legal-900 hover:bg-legal-800",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            Accept &amp; Enable Uploads
          </button>
        </div>
      </div>
    </div>
  );
}
