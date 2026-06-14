import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service — EvidenceBrief",
  description: "Terms governing your use of the EvidenceBrief application.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <LegalPage
        title="Terms of Service"
        lastUpdated="June 13, 2025"
        description="Please read these terms carefully before using EvidenceBrief."
        sections={termsSections}
      />
    </PageShell>
  );
}
