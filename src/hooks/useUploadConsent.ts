"use client";

import { useCallback, useEffect, useState } from "react";
import {
  allAcknowledgementsAccepted,
  loadStoredConsent,
  saveStoredConsent,
} from "@/lib/consent";
import type { ConsentAcknowledgements } from "@/types/consent";

export function useUploadConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setHasConsent(loadStoredConsent() !== null);
    setIsHydrated(true);
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const acceptConsent = useCallback(
    (acknowledgements: ConsentAcknowledgements) => {
      if (!allAcknowledgementsAccepted(acknowledgements)) return;
      saveStoredConsent(acknowledgements);
      setHasConsent(true);
      setIsModalOpen(false);
    },
    []
  );

  const revokeConsent = useCallback(() => {
    setHasConsent(false);
  }, []);

  return {
    hasConsent,
    isModalOpen,
    isHydrated,
    openModal,
    closeModal,
    acceptConsent,
    revokeConsent,
  };
}
