import Link from "next/link";
import { Scale } from "lucide-react";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Legal Disclaimer" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-legal-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-legal-900 text-accent">
                <Scale className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-serif text-sm font-semibold text-legal-900">
                EvidenceBrief
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-legal-500">
              A tenant evidence organizer for preparing hearing-ready documents.
              Not a law firm. Not legal advice.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-legal-700">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-legal-600 transition-colors hover:text-legal-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-legal-700">
              Important Notice
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-legal-500">
              Generated documents are AI-assisted drafts only. Independently
              review all content before filing or relying upon it in any
              tribunal, court, or legal proceeding.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-legal-100 pt-6 sm:flex-row">
          <p className="text-xs text-legal-400">
            &copy; {new Date().getFullYear()} EvidenceBrief. All rights reserved.
          </p>
          <p className="text-xs text-legal-400">
            MVP — For informational and organizational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
