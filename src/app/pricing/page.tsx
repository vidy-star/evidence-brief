import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SubscribeButton } from "@/components/billing/SubscribeButton";
import { Check, CreditCard } from "lucide-react";

const FEATURES = [
  "Hearing package generation unlocked after payment",
  "Chronology, evidence index, and hearing summary",
  "Draft T2 and T6 allegations",
  "Secure one-time payment via Stripe",
] as const;

export default function PricingPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-legal-900 text-accent">
            <CreditCard className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-legal-950">
            Simple, transparent pricing
          </h1>
          <p className="mt-2 text-sm text-legal-600">
            Pay once to unlock hearing package generation for your tenancy
            evidence.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-legal-200 bg-white shadow-elevated">
          <div className="border-b border-legal-100 bg-gradient-to-r from-legal-900 to-legal-800 px-6 py-8 text-white sm:px-8">
            <p className="text-sm font-medium text-legal-200">
              Hearing Package
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-serif text-4xl font-bold">$29.95</span>
              <span className="text-lg text-legal-200">CAD</span>
              <span className="text-sm text-legal-300">one-time</span>
            </div>
            <p className="mt-2 text-sm text-legal-300">
              One-time payment via Stripe. No subscription. No recurring charges.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <ul className="space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-legal-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <SubscribeButton label="Purchase & Generate Hearing Package – $29.95" />
              <Link
                href="/"
                className="text-sm font-medium text-legal-600 transition-colors hover:text-legal-900"
              >
                Back to dashboard
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-legal-400">
              Payments are processed securely by Stripe. You will be redirected
              to Stripe Checkout to complete your one-time purchase.
            </p>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
