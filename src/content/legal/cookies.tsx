import type { LegalSection } from "@/components/legal/LegalPage";

export const cookiesSections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    content: (
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help websites remember your preferences and improve your
        experience. EvidenceBrief uses minimal storage technologies in this MVP
        version.
      </p>
    ),
  },
  {
    id: "local-storage",
    title: "Local Storage",
    content: (
      <p>
        EvidenceBrief uses your browser&apos;s localStorage to save your upload
        consent preferences. This allows the application to remember that you have
        accepted the required acknowledgements without asking again on each
        visit. This data remains on your device and is not transmitted to our
        servers in the MVP version.
      </p>
    ),
  },
  {
    id: "types",
    title: "Types of Storage We Use",
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Essential storage:</strong> Upload consent records required for
          the application to function as intended.
        </li>
        <li>
          <strong>Session data:</strong> Uploaded file metadata held in browser
          memory during your active session.
        </li>
      </ul>
    ),
  },
  {
    id: "managing",
    title: "Managing Your Preferences",
    content: (
      <p>
        You can clear localStorage at any time through your browser settings.
        Clearing storage will reset your upload consent and you will need to
        accept the consent terms again before uploading files. Instructions vary
        by browser — consult your browser&apos;s help documentation for details.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    content: (
      <p>
        This MVP version does not use third-party advertising or analytics
        cookies. If third-party services are added in future versions, this policy
        will be updated to describe their use and your options.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Policy Updates",
    content: (
      <p>
        We may update this Cookie Policy as the application evolves. Check the
        &ldquo;Last updated&rdquo; date at the top of this page for the most
        recent version.
      </p>
    ),
  },
];
