"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscribeButtonProps {
  className?: string;
  label?: string;
}

export function SubscribeButton({
  className,
  label = "Purchase & Generate Hearing Package – $29.95",
}: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          `Checkout API returned an unexpected response (${response.status}). Restart the dev server and try again.`
        );
      }

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout. Please try again.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={isLoading}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-elevated transition-all sm:w-auto",
          "bg-accent text-legal-950 hover:bg-accent-light",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Redirecting to Stripe…
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            {label}
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
