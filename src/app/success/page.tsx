import { Suspense } from "react";
import { SuccessContent, SuccessLoading } from "./SuccessContent";
import { PageShell } from "@/components/layout/PageShell";

export default function SuccessPage() {
  return (
    <PageShell>
      <Suspense fallback={<SuccessLoading />}>
        <SuccessContent />
      </Suspense>
    </PageShell>
  );
}
