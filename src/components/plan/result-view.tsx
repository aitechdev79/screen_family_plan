import type { GeneratedPlan } from "@/lib/plan-engine/types";
import { getUIText } from "@/lib/i18n/ui-text";

export function ResultView({ plan, locale }: { plan: GeneratedPlan; locale?: string }) {
  const text = getUIText(locale ?? plan.locale).resultView;

  return (
    <div className="space-y-8 print:space-y-6">
      <section className="overflow-hidden rounded-[1.9rem] bg-[linear-gradient(135deg,_rgba(31,110,106,1),_rgba(48,136,128,0.96))] text-white shadow-[0_24px_60px_rgba(31,110,106,0.18)] print:rounded-none print:border print:border-black print:bg-white print:text-black print:shadow-none">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/68 print:text-black">
              {text.familyMediaPlan}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] print:text-2xl">{plan.familyName}</h1>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/84 print:list-disc print:pl-5 print:text-black">
              {plan.overallSummary.map((item) => (
                <li key={item} className="rounded-2xl bg-white/10 px-4 py-3 print:rounded-none print:bg-transparent print:p-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            <StatCard label="Children" value={`${plan.children.length}`} />
            <StatCard
              label="Priority items"
              value={`${plan.children.reduce((count, child) => count + child.priorityAreas.length, 0)}`}
            />
            <StatCard
              label="Recommended actions"
              value={`${plan.children.reduce((count, child) => count + (child.recommendedActions?.length ?? 0), 0)}`}
            />
          </div>
        </div>
      </section>

      {plan.children.map((child, index) => {
        const crowdingOutAreas = child.crowdingOutAreas ?? [];
        const recommendedActions = child.recommendedActions ?? [];
        const optionalActions = child.optionalActions ?? [];

        return (
          <section
            key={child.childId}
            className="rounded-[1.9rem] bg-white/86 p-5 shadow-[0_20px_42px_rgba(17,24,39,0.06)] ring-1 ring-black/5 print:break-inside-avoid print:rounded-none print:border print:border-black print:bg-white print:p-0 print:shadow-none print:ring-0"
          >
            <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,_rgba(243,238,229,0.84),_rgba(255,255,255,0.92))] px-5 py-5 print:rounded-none print:border-b print:border-black print:bg-transparent">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)] print:text-black">
                    Child profile {index + 1}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] print:text-2xl print:text-black">
                    {child.nickname} | {child.ageBand}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {child.priorityAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[var(--ink-strong)] shadow-[0_8px_18px_rgba(17,24,39,0.05)] print:border print:border-black print:bg-transparent print:shadow-none"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {crowdingOutAreas.length > 0 ? (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-[var(--ink-strong)] print:text-black">{text.crowdingOutAreas}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {crowdingOutAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-black/8 bg-[rgba(255,255,255,0.7)] px-3 py-1 text-sm text-[var(--ink-soft)] print:border-black print:bg-transparent print:text-black"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2 print:mt-0">
              <PanelCard title={text.dailyRhythm}>
                <ul className="space-y-3 text-sm text-[var(--ink-soft)] print:text-black">
                  {child.dailyRhythm.map((item) => (
                    <li key={item.label} className="rounded-2xl bg-[var(--card-muted)] px-4 py-3 leading-7 print:rounded-none print:bg-transparent print:p-0">
                      <strong className="text-[var(--ink-strong)] print:text-black">{item.label}:</strong> {item.recommendation}
                    </li>
                  ))}
                </ul>
              </PanelCard>

              <PanelCard title={text.familyRules}>
                <ul className="space-y-3 text-sm leading-7 text-[var(--ink-soft)] print:list-disc print:pl-5 print:text-black">
                  {child.familyRules.map((rule) => (
                    <li key={rule} className="rounded-2xl bg-[var(--card-muted)] px-4 py-3 print:rounded-none print:bg-transparent print:p-0">
                      {rule}
                    </li>
                  ))}
                </ul>
              </PanelCard>

              <PanelCard title={text.recommendedActions}>
                <ul className="space-y-3">
                  {recommendedActions.map((action) => (
                    <li
                      key={action.key}
                      className="rounded-[1.35rem] bg-[var(--card-muted)] p-4 text-sm text-[var(--ink-soft)] print:rounded-none print:border print:border-black print:bg-transparent"
                    >
                      <p className="font-semibold text-[var(--ink-strong)] print:text-black">{action.title}</p>
                      <p className="mt-2 leading-7">{action.description}</p>
                      {(action.reasons ?? []).length > 0 ? (
                        <div className="mt-3 rounded-2xl bg-white/72 px-3 py-3 print:rounded-none print:bg-transparent print:px-0 print:py-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--teal-strong)] print:text-black">
                            {text.whyThisMatters}
                          </p>
                          <ul className="mt-2 list-disc pl-5 text-xs leading-6 text-[var(--ink-soft)] print:text-black">
                            {(action.reasons ?? []).map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {optionalActions.length > 0 ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-[var(--ink-strong)] print:text-black">{text.optionalActions}</p>
                    <ul className="mt-3 space-y-3">
                      {optionalActions.map((action) => (
                        <li
                          key={action.key}
                          className="rounded-[1.35rem] border border-dashed border-black/10 px-4 py-4 text-sm text-[var(--ink-soft)] print:rounded-none print:border-black"
                        >
                          <p className="font-semibold text-[var(--ink-strong)] print:text-black">{action.title}</p>
                          <p className="mt-2 leading-7">{action.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </PanelCard>

              <PanelCard title={text.parentTips}>
                <ul className="space-y-3 text-sm leading-7 text-[var(--ink-soft)] print:list-disc print:pl-5 print:text-black">
                  {child.parentTips.map((tip) => (
                    <li key={tip} className="rounded-2xl bg-[var(--card-muted)] px-4 py-3 print:rounded-none print:bg-transparent print:p-0">
                      {tip}
                    </li>
                  ))}
                </ul>
              </PanelCard>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] bg-white/10 px-4 py-4 print:rounded-none print:border print:border-black print:bg-transparent">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/66 print:text-black">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] print:text-black">{value}</p>
    </div>
  );
}

function PanelCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.6rem] border border-black/6 bg-white p-5 shadow-[0_16px_34px_rgba(17,24,39,0.04)] print:rounded-none print:border-black print:bg-transparent print:shadow-none">
      <h3 className="text-lg font-semibold text-[var(--ink-strong)] print:text-black">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
