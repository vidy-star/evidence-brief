import type { LegalSection } from "@/components/legal/LegalPage";

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <p>
        EvidenceBrief (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        respects your privacy. This Privacy Policy explains how we collect, use,
        and protect information when you use our tenant evidence organization
        application.
      </p>
    ),
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Uploaded files:</strong> Documents you upload (PDF, JPG, PNG,
            DOCX) for evidence organization purposes.
          </li>
          <li>
            <strong>Consent records:</strong> Your upload consent preferences
            stored locally in your browser.
          </li>
          <li>
            <strong>Usage data:</strong> Basic technical information such as
            browser type and interaction patterns to improve the service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>To organize and display your uploaded evidence files.</li>
        <li>To generate hearing package documents based on your uploads.</li>
        <li>To maintain your consent preferences.</li>
        <li>To improve application functionality and security.</li>
      </ul>
    ),
  },
  {
    id: "storage",
    title: "Data Storage & Retention",
    content: (
      <p>
        In this MVP version, uploaded files are processed in your browser session
        and are not permanently stored on our servers unless otherwise stated.
        Consent preferences are stored in your browser&apos;s localStorage. You
        may clear this data at any time through your browser settings.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Information Sharing",
    content: (
      <p>
        We do not sell your personal information. We do not share uploaded
        documents with third parties except as required by law or with your
        explicit consent. If server-side processing is introduced in future
        versions, this policy will be updated accordingly.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your Rights",
    content: (
      <p>
        Depending on your jurisdiction, you may have rights to access, correct, or
        delete your personal information. To exercise these rights, contact us
        using the information provided in this application.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For privacy-related inquiries, please contact the EvidenceBrief
        administrator through the channels provided in the application.
      </p>
    ),
  },
];
