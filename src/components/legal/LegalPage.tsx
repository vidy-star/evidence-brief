import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  description: string;
  sections: LegalSection[];
}

export function LegalPage({
  title,
  lastUpdated,
  description,
  sections,
}: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-legal-600 transition-colors hover:text-legal-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to EvidenceBrief
      </Link>

      <article className="overflow-hidden rounded-xl border border-legal-200 bg-white shadow-card">
        <header className="border-b border-legal-100 bg-legal-50/50 px-6 py-8 sm:px-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-legal-900 text-accent">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-legal-950">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-legal-600">
                {description}
              </p>
              <p className="mt-3 text-xs text-legal-400">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </header>

        <div className="divide-y divide-legal-100 px-6 sm:px-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="py-6">
              <h2 className="font-serif text-lg font-semibold text-legal-900">
                {section.title}
              </h2>
              <div className="prose-legal mt-3 space-y-3 text-sm leading-relaxed text-legal-700">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
