"use client";

import { useCallback, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { FileUpload } from "@/components/evidence/FileUpload";
import { EvidenceTable } from "@/components/evidence/EvidenceTable";
import { GenerateButton } from "@/components/evidence/GenerateButton";
import { OutputSections } from "@/components/evidence/OutputSections";
import { UploadConsentModal } from "@/components/legal/UploadConsentModal";
import { SubscribeButton } from "@/components/billing/SubscribeButton";
import { useUploadConsent } from "@/hooks/useUploadConsent";
import { useSubscription } from "@/hooks/useSubscription";
import { assignExhibitNumbers, fileToEvidence, generateHearingPackage } from "@/lib/evidence";
import type { EvidenceFile, HearingPackage } from "@/types/evidence";
import { AlertTriangle, FolderOpen, Sparkles } from "lucide-react";

export function Dashboard() {
  const [files, setFiles] = useState<EvidenceFile[]>([]);
  const [hearingPackage, setHearingPackage] = useState<HearingPackage | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    hasConsent,
    isModalOpen,
    isHydrated,
    openModal,
    closeModal,
    acceptConsent,
  } = useUploadConsent();

  const { isSubscribed, isHydrated: isSubscriptionHydrated } =
    useSubscription();

  const uploadsEnabled = isHydrated && hasConsent;
  const canGenerate =
    isSubscriptionHydrated && isSubscribed && files.length > 0;

  const handleFilesSelected = useCallback((selected: File[]) => {
    const baseTime = Date.now();
    const newEvidence = selected
      .map((file, index) => {
        const evidence = fileToEvidence(file);
        if (!evidence) return null;
        return {
          ...evidence,
          uploadedAt: new Date(baseTime + index),
        };
      })
      .filter((f): f is EvidenceFile => f !== null);

    setFiles((prev) => assignExhibitNumbers([...prev, ...newEvidence]));
    setHearingPackage(null);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => assignExhibitNumbers(prev.filter((f) => f.id !== id)));
    setHearingPackage(null);
  }, []);

  const handleUpdate = useCallback(
    (id: string, updates: Partial<EvidenceFile>) => {
      setFiles((prev) =>
        prev.map((file) => (file.id === id ? { ...file, ...updates } : file))
      );
      setHearingPackage(null);
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    if (!isSubscribed) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setHearingPackage(generateHearingPackage(files));
    setIsGenerating(false);
  }, [files, isSubscribed]);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-gradient-to-r from-legal-900 to-legal-800 px-6 py-5 text-white shadow-elevated">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
            </div>
            <h2 className="font-serif text-lg font-semibold">
  EvidenceBrief – AI-Powered Evidence Organization for Self-Represented Litigants
</h2>

<p className="mt-1 text-sm text-legal-200">
  Upload court documents, notices, evidence, letters, emails, text messages,
  and legal correspondence. EvidenceBrief organizes your evidence,

  identifies key events, and helps you prepare hearing-ready materials
for tribunals and courts.
</p>
 
<p className="mt-3 text-xs text-legal-300">
  Designed for self-represented litigants appearing before the
  Landlord and Tenant Board, Small Claims Court, Human Rights Tribunal,
  and other administrative tribunals.
</p>

<div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
  <p>
    <strong>EvidenceBrief is developed by Edge Paralegal Services.</strong>
  </p>

  <p>Support: support@edgeparalegal.com</p>
  <p>General Inquiries: info@edgeparalegal.com</p>
  <p>Phone: 905-519-0241</p>

  <p className="mt-2">
    EvidenceBrief provides document analysis and information only.
  </p>

  <p>
    It is not a law firm and does not provide legal advice.
  </p>

  <p>
    Use of this service does not create a paralegal-client relationship.
  </p>
</div>
</div>
</section>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <section>
              <div className="mb-4 flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-legal-600" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-legal-900">
                  Evidence Upload
                </h2>
              </div>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                disabled={!uploadsEnabled}
                onDisabledClick={openModal}
                consentRequired={isHydrated && !hasConsent}
              />
            </section>

            <section>
              <h2 className="mb-4 font-serif text-lg font-semibold text-legal-900">
                Evidence Files
              </h2>
              <EvidenceTable
                files={files}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
              />
            </section>

            <section className="space-y-3">
              <div className="flex justify-center sm:justify-start">
                {!isSubscriptionHydrated ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-legal-900 px-6 py-3 text-sm font-semibold text-white opacity-60 sm:w-auto"
                  >
                    Loading…
                  </button>
                ) : isSubscribed ? (
                  <GenerateButton
                    onClick={handleGenerate}
                    isGenerating={isGenerating}
                    fileCount={files.length}
                    disabled={!canGenerate}
                  />
                ) : (
                  <SubscribeButton />
                )}
              </div>
              {isSubscriptionHydrated && !isSubscribed && (
                <p className="text-xs text-legal-500">
                  One-time payment. No subscription. No recurring charges.
                </p>
              )}
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-amber-800">
                  Generated documents are AI-assisted drafts only and must be
                  independently reviewed before filing or relying upon them in
                  any tribunal, court, or legal proceeding.
                </p>
              </div>
            </section>
          </div>

          <section>
            <OutputSections hearingPackage={hearingPackage} />
          </section>
          <section className="mt-12 border-t pt-6 text-center text-sm text-legal-300">
  <p>
    Questions or support? Contact us at{" "}
    <a
      href="mailto:support@evidencebrief.ca"
      className="underline"
    >
      support@evidencebrief.ca
    </a>
  </p>

  <p className="mt-2">
    Built by Edge Paralegal Services
  </p>

  <p className="mt-2 text-xs">
    EvidenceBrief helps self-represented litigants organize evidence,
    prepare chronologies, and generate hearing-ready materials.
  </p>
</section>
        </div>
      </main>

      <UploadConsentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAccept={acceptConsent}
      />
    </PageShell>
  );
}
