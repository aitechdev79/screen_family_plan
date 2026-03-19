import type { GeneratedPlan } from "@/lib/plan-engine/types";
import { getUIText } from "@/lib/i18n/ui-text";

export function ResultView({ plan, locale }: { plan: GeneratedPlan; locale?: string }) {
  const text = getUIText(locale ?? plan.locale).resultView;

  return (
    <div className="space-y-8 print:space-y-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm print:rounded-none print:border-black print:shadow-none">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 print:text-black">
          {text.familyMediaPlan}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-950 print:text-2xl">{plan.familyName}</h1>
        <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 print:text-black">
          {plan.overallSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {plan.children.map((child) => (
        <section key={child.childId} className="grid gap-4 lg:grid-cols-2 print:break-inside-avoid">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm print:rounded-none print:border-black print:shadow-none">
            <h2 className="text-2xl font-semibold text-neutral-950">
              {child.nickname} - {child.ageBand}
            </h2>
            <p className="mt-3 text-sm font-medium text-neutral-700">{text.priorityAreas}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {child.priorityAreas.map((area) => (
                <span key={area} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800 print:border print:border-black print:bg-transparent">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm print:rounded-none print:border-black print:shadow-none">
            <h3 className="text-lg font-semibold text-neutral-950">{text.dailyRhythm}</h3>
            <ul className="mt-3 space-y-3 text-sm text-neutral-700 print:text-black">
              {child.dailyRhythm.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.recommendation}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm print:rounded-none print:border-black print:shadow-none">
            <h3 className="text-lg font-semibold text-neutral-950">{text.recommendedActions}</h3>
            <ul className="mt-3 space-y-3">
              {child.recommendedActions.map((action) => (
                <li key={action.key} className="rounded-xl bg-neutral-50 p-3 text-sm text-neutral-700 print:rounded-none print:border print:border-black print:bg-transparent">
                  <p className="font-medium text-neutral-900">{action.title}</p>
                  <p>{action.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm print:rounded-none print:border-black print:shadow-none">
            <h3 className="text-lg font-semibold text-neutral-950">{text.familyRules}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700 print:text-black">
              {child.familyRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-lg font-semibold text-neutral-950">{text.parentTips}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700 print:text-black">
              {child.parentTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
