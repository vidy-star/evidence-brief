import Link from "next/link";
import { Scale } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-legal-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-legal-900 text-accent">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-serif text-xl font-semibold tracking-tight text-legal-950">
              EvidenceBrief
            </span>
            <p className="text-xs text-legal-500">
              Organize evidence. Prepare for your hearing.
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="text-sm font-medium text-legal-600 transition-colors hover:text-legal-900"
          >
            Pricing
          </Link>
          <span className="hidden rounded-full bg-legal-100 px-3 py-1 text-xs font-medium text-legal-700 sm:inline">
            Tenant Evidence Organizer
          </span>
        </div>
      </div>
    </header>
  );
}
