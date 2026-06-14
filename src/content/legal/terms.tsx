import type { LegalSection } from "@/components/legal/LegalPage";

export const termsSections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: (
      <p>
        By accessing or using EvidenceBrief, you agree to be bound by these
        Terms of Service. If you do not agree, do not use the application.
      </p>
    ),
  },
  {
    id: "service-description",
    title: "Service Description",
    content: (
      <p>
        EvidenceBrief is a document organization tool that helps tenants prepare
        evidence packages for hearings. The service generates AI-assisted draft
        documents including chronologies, evidence indexes, summaries, and
        template allegations. EvidenceBrief is not a law firm and does not
        provide legal advice.
      </p>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          You confirm you are authorized to upload all documents you submit.
        </li>
        <li>
          You are solely responsible for reviewing all generated content before
          use.
        </li>
        <li>
          You will not upload unlawful, confidential third-party data without
          authorization.
        </li>
        <li>
          You will comply with all applicable laws and tribunal rules when
          using generated materials.
        </li>
      </ul>
    ),
  },
  {
    id: "no-legal-advice",
    title: "No Legal Advice",
    content: (
      <p>
        Nothing in EvidenceBrief constitutes legal advice, a solicitor-client
        relationship, or a guarantee of any outcome in a legal proceeding. Consult
        a qualified legal professional for advice specific to your situation.
      </p>
    ),
  },
  {
    id: "ai-content",
    title: "AI-Generated Content",
    content: (
      <p>
        Generated documents are produced using automated processes and may contain
        errors, omissions, or inaccuracies. You must independently verify all
        facts, dates, exhibit references, and legal allegations before filing or
        relying upon them.
      </p>
    ),
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, EvidenceBrief and its operators
        shall not be liable for any damages arising from your use of the
        application, including reliance on generated documents, loss of data, or
        adverse outcomes in legal proceedings.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <p>
        We may update these Terms from time to time. Continued use of the
        application after changes constitutes acceptance of the revised Terms.
        Material changes may require renewed consent.
      </p>
    ),
  },
];
