import {
  SUBSCRIPTION_STORAGE_KEY,
  type StoredSubscription,
} from "@/types/subscription";

export function loadStoredSubscription(): StoredSubscription | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredSubscription;
    if (!parsed.subscriptionId) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredSubscription(
  subscription: Omit<StoredSubscription, "activatedAt"> & {
    activatedAt?: string;
  }
): StoredSubscription {
  const stored: StoredSubscription = {
    subscriptionId: subscription.subscriptionId,
    customerId: subscription.customerId,
    activatedAt: subscription.activatedAt ?? new Date().toISOString(),
  };

  localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(stored));
  return stored;
}

export function clearStoredSubscription(): void {
  localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
}
