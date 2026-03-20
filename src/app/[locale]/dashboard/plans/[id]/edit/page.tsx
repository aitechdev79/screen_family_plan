import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/app-header";
import { StatePanel } from "@/components/layout/state-panel";
import { ResultClient } from "@/components/plan/result-client";
import { QuestionnaireWizard } from "@/components/questionnaire/questionnaire-wizard";
import { getUserPlanById } from "@/lib/server/plan-repository";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function EditPlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams?: Promise<{ preview?: string }>;
}) {
  const { locale, id } = await params;
  const text = getUIText(locale);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
        <StatePanel
          eyebrow="Access required"
          title={text.planPage.editTitle}
          description={text.common.unauthorized}
          actionHref={`/${locale}/auth/login?callbackUrl=/${locale}/dashboard/plans/${id}/edit`}
          actionLabel={text.auth.loginButton}
        />
      </main>
    );
  }

  const plan = await getUserPlanById(session.user.id, id);
  if (!plan) {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
        <StatePanel
          eyebrow="Missing plan"
          title={text.common.planNotFound}
          description="The plan you were trying to edit could not be found."
          actionHref={`/${locale}/dashboard/plans`}
          actionLabel={text.dashboard.title}
        />
      </main>
    );
  }

  if (resolvedSearchParams?.preview === "1") {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.78)_100%)]" />
        <div className="mx-auto max-w-7xl">
          <AppHeader locale={locale} primaryHref={`/${locale}/dashboard/plans/${id}`} primaryLabel="View current plan" />
          <div className="max-w-3xl print:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Updated preview</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] sm:text-5xl">
              {text.planPage.previewUpdatedTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">
              {text.planPage.previewUpdatedDescription}
            </p>
          </div>
          <div className="mt-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(250,247,239,0.82))] p-3 shadow-[0_26px_70px_rgba(31,110,106,0.12)] lg:p-4 print:mt-0 print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none">
            <ResultClient locale={locale as "vi" | "en"} existingPlanId={id} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.26),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.78)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <AppHeader locale={locale} primaryHref={`/${locale}/dashboard/plans/${id}`} primaryLabel="Back to saved plan" />
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Edit plan</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] sm:text-5xl">
            {text.planPage.editTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{text.planPage.editDescription}</p>
        </div>
        <div className="mt-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(250,247,239,0.82))] p-3 shadow-[0_26px_70px_rgba(31,110,106,0.12)] lg:p-4">
          <QuestionnaireWizard locale={locale as "vi" | "en"} existingPlanId={id} initialInput={plan.answersJson as any} />
        </div>
      </div>
    </main>
  );
}
