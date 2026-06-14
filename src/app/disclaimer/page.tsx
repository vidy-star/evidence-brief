import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { disclaimerSections } from "@/content/legal/disclaimer";

export const metadata: Metadata = {
  title: "Legal Disclaimer — EvidenceBrief",
  description: "Important legal disclaimers regarding EvidenceBrief and generated documents.",
};

export default function DisclaimerPage() {
  return (
    <PageShell>
      <LegalPage
        title="Legal Disclaimer"
        lastUpdated="June 13, 2025"
        description="Important limitations and disclaimers regarding the use of EvidenceBrief and its generated content."
        sections={disclaimerSections}
      />
    </PageShell>
  );
}
