import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { cookiesSections } from "@/content/legal/cookies";

export const metadata: Metadata = {
  title: "Cookie Policy — EvidenceBrief",
  description: "How EvidenceBrief uses cookies and local storage.",
};

export default function CookiesPage() {
  return (
    <PageShell>
      <LegalPage
        title="Cookie Policy"
        lastUpdated="June 13, 2025"
        description="This policy explains how EvidenceBrief uses cookies and browser storage technologies."
        sections={cookiesSections}
      />
    </PageShell>
  );
}
