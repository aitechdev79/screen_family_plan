"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { savePlanAction, updatePlanAction } from "@/app/actions/plan-actions";
import type { FamilyInput, GeneratedPlan } from "@/lib/plan-engine/types";
import { getUIText } from "@/lib/i18n/ui-text";
import { ResultView } from "@/components/plan/result-view";

type DraftPayload = {
  input: FamilyInput;
  generated: GeneratedPlan;
};

const RESULT_KEY = "media-plan-result";

export function ResultClient({ locale = "vi", existingPlanId }: { locale?: string; existingPlanId?: string }) {
  const text = getUIText(locale);
  const router = useRouter();
  const [payload, setPayload] = useState<DraftPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const questionnaireHref = existingPlanId
    ? `/${locale}/dashboard/plans/${existingPlanId}/edit`
    : `/${locale}/plan/new`;

  useEffect(() => {
    const raw = window.sessionStorage.getItem(RESULT_KEY);
    if (!raw) {
      setError(text.resultClient.missingPreview);
      return;
    }
    try {
      setPayload(JSON.parse(raw));
    } catch {
      setError(text.resultClient.invalidPreview);
    }
  }, [text.resultClient.invalidPreview, text.resultClient.missingPreview]);

  async function saveOrUpdate() {
    if (!payload) return;
    startTransition(async () => {
      const result = existingPlanId
        ? await updatePlanAction(existingPlanId, {
            familyName: payload.input.familyName,
            locale: locale === "en" ? "en" : "vi",
            answersJson: payload.input,
            generatedPlanJson: payload.generated,
            notes: "",
          })
        : await savePlanAction({
            familyName: payload.input.familyName,
            locale: locale === "en" ? "en" : "vi",
            answersJson: payload.input,
            generatedPlanJson: payload.generated,
            notes: "",
          });

      if (!result.ok) {
        setError(text.resultClient.saveError);
        return;
      }

      router.push(`/${locale}/dashboard/plans/${result.id}`);
      router.refresh();
    });
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <Link href={questionnaireHref} className="inline-flex rounded-xl bg-neutral-900 px-4 py-2 text-white">
          {text.resultClient.backToQuestionnaire}
        </Link>
      </div>
    );
  }

  if (!payload) {
    return <p>{text.resultClient.loadingPreview}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 print:hidden">
        <button onClick={saveOrUpdate} disabled={isPending} className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-50">
          {isPending ? text.resultClient.saving : existingPlanId ? text.resultClient.saveUpdate : text.resultClient.saveAccount}
        </button>
        <Link href={questionnaireHref} className="rounded-xl border px-4 py-2">{text.resultClient.editQuestionnaire}</Link>
      </div>
      <ResultView plan={payload.generated} locale={locale} />
    </div>
  );
}
