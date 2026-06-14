import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentAcknowledgements,
  type StoredUploadConsent,
} from "@/types/consent";

export function createEmptyAcknowledgements(): ConsentAcknowledgements {
  return {
    noLegalAdvice: false,
    aiErrors: false,
    authorized: false,
    processing: false,
    termsAndPrivacy: false,
  };
}

export function allAcknowledgementsAccepted(
  acknowledgements: ConsentAcknowledgements
): boolean {
  return Object.values(acknowledgements).every(Boolean);
}

export function loadStoredConsent(): StoredUploadConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredUploadConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (!allAcknowledgementsAccepted(parsed.acknowledgements)) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredConsent(
  acknowledgements: ConsentAcknowledgements
): StoredUploadConsent {
  const consent: StoredUploadConsent = {
    version: CONSENT_VERSION,
    acceptedAt: new Date().toISOString(),
    acknowledgements,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  return consent;
}

export function clearStoredConsent(): void {
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}
