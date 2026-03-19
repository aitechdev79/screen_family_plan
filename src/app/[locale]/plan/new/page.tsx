import { NewPlanForm } from "@/components/plan/new-plan-form";

export default function NewPlanPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 bg-neutral-50 p-6 md:p-10">
      <header className="max-w-3xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Family media plan
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
          Create a household screen-use plan from a structured questionnaire
        </h1>
        <p className="text-base text-neutral-600">
          This form collects goals, child profiles, media habits, and risk factors, then sends
          the payload to <code>/api/plan/generate</code> and opens the generated result view.
        </p>
      </header>

      <NewPlanForm />
    </main>
  );
}
