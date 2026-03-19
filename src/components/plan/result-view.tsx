import { GeneratedPlan } from "@/lib/plan-engine/types";
import { PlanCard } from "./plan-card";

interface ResultViewProps {
  plan: GeneratedPlan;
}

export function ResultView({ plan }: ResultViewProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{plan.familyName} Family Media Plan</h1>
        <ul className="list-disc pl-5 text-sm text-neutral-600">
          {plan.overallSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      {plan.children.map((child) => (
        <div key={child.childId} className="space-y-6 rounded-3xl bg-neutral-50 p-6">
          <div>
            <h2 className="text-2xl font-semibold">{child.nickname}</h2>
            <p className="text-sm text-neutral-500">Age band: {child.ageBand}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PlanCard title="Priority areas">
              <ul className="list-disc pl-5">
                {child.priorityAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard title="Family rules">
              <ul className="list-disc pl-5">
                {child.familyRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard title="Recommended actions">
              <ul className="space-y-3">
                {child.recommendedActions.map((action) => (
                  <li key={action.key} className="rounded-xl border border-neutral-200 p-3">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-neutral-600">{action.description}</p>
                    <p className="mt-2 text-xs text-neutral-500">Score: {action.score}</p>
                  </li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard title="Optional actions">
              <ul className="space-y-3">
                {child.optionalActions.map((action) => (
                  <li key={action.key} className="rounded-xl border border-neutral-200 p-3">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-neutral-600">{action.description}</p>
                  </li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard title="Daily rhythm" className="lg:col-span-2">
              <div className="grid gap-3 md:grid-cols-3">
                {child.dailyRhythm.map((item) => (
                  <div key={item.label} className="rounded-xl border border-neutral-200 p-4">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-neutral-600">{item.recommendation}</p>
                  </div>
                ))}
              </div>
            </PlanCard>

            <PlanCard title="Parent tips" className="lg:col-span-2">
              <ul className="list-disc pl-5">
                {child.parentTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </PlanCard>
          </div>
        </div>
      ))}
    </div>
  );
}
