"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearStoredSubscription,
  loadStoredSubscription,
  saveStoredSubscription,
} from "@/lib/subscription";

export function useSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyStoredSubscription = useCallback(async () => {
    const stored = loadStoredSubscription();
    if (!stored) {
      setIsSubscribed(false);
      return false;
    }

    setIsVerifying(true);

    try {
      const response = await fetch("/api/subscription-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: stored.subscriptionId }),
      });

      if (!response.ok) {
        clearStoredSubscription();
        setIsSubscribed(false);
        return false;
      }

      const data = (await response.json()) as { active: boolean };
      if (!data.active) {
        clearStoredSubscription();
        setIsSubscribed(false);
        return false;
      }

      setIsSubscribed(true);
      return true;
    } catch {
      setIsSubscribed(false);
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    const stored = loadStoredSubscription();
    setIsSubscribed(stored !== null);
    setIsHydrated(true);

    if (stored) {
      void verifyStoredSubscription();
    }
  }, [verifyStoredSubscription]);

  const activateSubscription = useCallback(
    (subscriptionId: string, customerId: string) => {
      saveStoredSubscription({ subscriptionId, customerId });
      setIsSubscribed(true);
    },
    []
  );

  return {
    isSubscribed,
    isHydrated,
    isVerifying,
    activateSubscription,
    verifyStoredSubscription,
  };
}
