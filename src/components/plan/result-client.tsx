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
  const currentPreviewHref = existingPlanId
    ? `/${locale}/dashboard/plans/${existingPlanId}/edit?preview=1`
    : `/${locale}/plan/result`;

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
        if (result.error === "Unauthorized") {
          router.push(`/${locale}/auth/login?callbackUrl=${encodeURIComponent(currentPreviewHref)}`);
          return;
        }

        setError(`${text.resultClient.saveError} ${result.error}`);
        return;
      }

      router.push(`/${locale}/dashboard/plans/${result.id}`);
      router.refresh();
    });
  }

  if (error) {
    return (
      <div className="space-y-5 rounded-[1.8rem] border border-[rgba(184,79,72,0.16)] bg-[rgba(255,255,255,0.86)] p-6 shadow-[0_18px_36px_rgba(17,24,39,0.05)]">
        <p className="text-sm font-medium text-[#9c4039]">{error}</p>
        <Link
          href={questionnaireHref}
          className="inline-flex rounded-full bg-[var(--teal-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,110,106,0.18)]"
        >
          {text.resultClient.backToQuestionnaire}
        </Link>
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="rounded-[1.8rem] bg-white/86 p-6 text-sm text-[var(--ink-soft)] shadow-[0_18px_36px_rgba(17,24,39,0.05)]">
        {text.resultClient.loadingPreview}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,_rgba(31,110,106,1),_rgba(48,136,128,0.96))] p-6 text-white shadow-[0_22px_50px_rgba(31,110,106,0.18)] print:hidden">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">Generated preview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Review the plan, then save it to your account.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
              This preview is based on the assessment answers currently stored in your session. You can go back and
              edit the questionnaire before saving if anything looks off.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={saveOrUpdate}
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isPending ? text.resultClient.saving : existingPlanId ? text.resultClient.saveUpdate : text.resultClient.saveAccount}
            </button>
            <Link
              href={questionnaireHref}
              className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/6"
            >
              {text.resultClient.editQuestionnaire}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          onClick={saveOrUpdate}
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isPending ? text.resultClient.saving : existingPlanId ? text.resultClient.saveUpdate : text.resultClient.saveAccount}
        </button>
        <Link
          href={questionnaireHref}
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-strong)]"
        >
          {text.resultClient.editQuestionnaire}
        </Link>
      </div>
      <ResultView plan={payload.generated} locale={locale} />
    </div>
  );
}
