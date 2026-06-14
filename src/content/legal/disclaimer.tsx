import type { LegalSection } from "@/components/legal/LegalPage";

export const disclaimerSections: LegalSection[] = [
  {
    id: "general",
    title: "General Disclaimer",
    content: (
      <p>
        EvidenceBrief is provided for informational and organizational purposes
        only. The application, its operators, and affiliates make no
        representations or warranties of any kind, express or implied, regarding
        the accuracy, completeness, or suitability of any content generated or
        displayed.
      </p>
    ),
  },
  {
    id: "not-legal-advice",
    title: "Not Legal Advice",
    content: (
      <p>
        EvidenceBrief does not provide legal advice. No content within the
        application — including draft T2 or T6 allegations, hearing summaries, or
        evidence indexes — should be construed as legal advice or a substitute
        for consultation with a licensed legal professional.
      </p>
    ),
  },
  {
    id: "ai-drafts",
    title: "AI-Assisted Drafts",
    content: (
      <p>
        All generated documents are AI-assisted drafts. They may contain factual
        errors, incorrect dates, mismatched exhibit references, or legally
        insufficient allegations. You must independently review, verify, and
        revise all content before filing or relying upon it in any tribunal,
        court, or legal proceeding.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "No Outcome Guarantee",
    content: (
      <p>
        Use of EvidenceBrief does not guarantee any particular outcome in a
        tenancy hearing, tribunal proceeding, or other legal matter. Success
        depends on many factors beyond document preparation.
      </p>
    ),
  },
  {
    id: "professional-review",
    title: "Professional Review Recommended",
    content: (
      <p>
        We strongly recommend that all generated materials be reviewed by a
        qualified legal advocate, paralegal, or tenant representative familiar
        with your jurisdiction&apos;s residential tenancy laws and tribunal
        procedures before submission.
      </p>
    ),
  },
  {
    id: "jurisdiction",
    title: "Jurisdictional Limitations",
    content: (
      <p>
        Template content may reference Ontario Residential Tenancies Act
        concepts (e.g., T2 and T6 applications) as examples. Laws and procedures
        vary by jurisdiction. You are responsible for ensuring all documents
        comply with the rules applicable to your specific hearing.
      </p>
    ),
  },
];
