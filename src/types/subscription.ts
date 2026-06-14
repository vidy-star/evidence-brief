export const SUBSCRIPTION_STORAGE_KEY = "evidencebrief_subscription";

export interface StoredSubscription {
  subscriptionId: string;
  customerId: string;
  activatedAt: string;
}
