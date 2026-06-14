import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — EvidenceBrief",
  description: "How EvidenceBrief collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalPage
        title="Privacy Policy"
        lastUpdated="June 13, 2025"
        description="This policy describes how EvidenceBrief handles your personal information and uploaded documents."
        sections={privacySections}
      />
    </PageShell>
  );
}
