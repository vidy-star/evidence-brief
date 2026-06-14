"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { saveStoredSubscription } from "@/lib/subscription";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type VerificationState = "loading" | "success" | "error";

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [state, setState] = useState<VerificationState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      setErrorMessage("No checkout session found. Please try your purchase again.");
      return;
    }

    async function verifySession() {
      try {
        const response = await fetch(
          `/api/verify-checkout-session?session_id=${encodeURIComponent(sessionId!)}`
        );
        const data = (await response.json()) as {
          active?: boolean;
          subscriptionId?: string;
          customerId?: string;
          error?: string;
        };

        if (!response.ok || !data.active || !data.subscriptionId) {
          throw new Error(data.error ?? "Unable to verify your payment.");
        }

        saveStoredSubscription({
          subscriptionId: data.subscriptionId,
          customerId: data.customerId ?? "",
        });

        setState("success");
      } catch (err) {
        setState("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Verification failed."
        );
      }
    }

    void verifySession();
  }, [sessionId]);

  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
      {state === "loading" && (
        <div className="text-center">
          <Loader2
            className="mx-auto h-10 w-10 animate-spin text-legal-600"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-serif text-xl font-semibold text-legal-900">
            Confirming your payment…
          </h1>
          <p className="mt-2 text-sm text-legal-600">
            Please wait while we verify your payment with Stripe.
          </p>
        </div>
      )}

      {state === "success" && (
        <div className="w-full rounded-xl border border-green-200 bg-white p-8 text-center shadow-card">
          <CheckCircle2
            className="mx-auto h-12 w-12 text-green-600"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-legal-950">
            Payment complete!
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-legal-600">
            Thank you for your one-time purchase of $29.95 CAD. You can now
            generate hearing packages from your evidence files. No subscription.
            No recurring charges.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-legal-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-legal-800"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {state === "error" && (
        <div className="w-full rounded-xl border border-red-200 bg-white p-8 text-center shadow-card">
          <XCircle
            className="mx-auto h-12 w-12 text-red-500"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-legal-950">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-legal-600">
            {errorMessage}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-legal-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-legal-800"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-legal-200 px-6 py-3 text-sm font-semibold text-legal-700 transition-colors hover:bg-legal-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export function SuccessLoading() {
  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
      <Loader2
        className="h-10 w-10 animate-spin text-legal-600"
        aria-hidden="true"
      />
    </main>
  );
}
