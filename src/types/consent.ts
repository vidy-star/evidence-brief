export const CONSENT_VERSION = "1.0";

export const CONSENT_STORAGE_KEY = "evidencebrief-upload-consent";

export interface ConsentAcknowledgements {
  noLegalAdvice: boolean;
  aiErrors: boolean;
  authorized: boolean;
  processing: boolean;
  termsAndPrivacy: boolean;
}

export interface StoredUploadConsent {
  version: string;
  acceptedAt: string;
  acknowledgements: ConsentAcknowledgements;
}

export type ConsentCheckboxId = keyof ConsentAcknowledgements;

export const CONSENT_CHECKBOX_LABELS: Record<ConsentCheckboxId, string> = {
  noLegalAdvice:
    "I understand this application does not provide legal advice.",
  aiErrors: "I understand AI-generated content may contain errors.",
  authorized: "I am authorized to upload these documents.",
  processing: "I consent to the processing of uploaded files.",
  termsAndPrivacy:
    "I agree to the Terms of Service and Privacy Policy.",
};
