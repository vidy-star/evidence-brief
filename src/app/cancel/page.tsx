import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SubscribeButton } from "@/components/billing/SubscribeButton";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <PageShell>
      <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full rounded-xl border border-legal-200 bg-white p-8 text-center shadow-card">
          <XCircle
            className="mx-auto h-12 w-12 text-legal-400"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-legal-950">
            Checkout cancelled
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-legal-600">
            Your purchase was not completed. No charges were made. You can pay
            anytime to unlock hearing package generation.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <SubscribeButton label="Purchase & Generate Hearing Package – $29.95" />
            <Link
              href="/"
              className="text-sm font-medium text-legal-600 transition-colors hover:text-legal-900"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
