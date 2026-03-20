import Link from "next/link";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/app-header";
import { StatePanel } from "@/components/layout/state-panel";
import { getUserPlanById } from "@/lib/server/plan-repository";
import { ResultView } from "@/components/plan/result-view";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PlanDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
        <StatePanel
          eyebrow="Access required"
          title={text.dashboard.title}
          description={text.common.unauthorized}
          actionHref={`/${locale}/auth/login?callbackUrl=/${locale}/dashboard/plans/${id}`}
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
          description="The saved plan could not be loaded or may no longer be available."
          actionHref={`/${locale}/dashboard/plans`}
          actionLabel={text.dashboard.title}
        />
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)] print:hidden" />
      <div className="mx-auto max-w-7xl">
        <AppHeader locale={locale} primaryHref={`/${locale}/dashboard/plans/${id}/edit`} primaryLabel={text.common.edit} />
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Saved plan</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] sm:text-5xl">
              {plan.familyName}
            </h1>
            <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">
              {text.common.versionLabel} {plan.version}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/dashboard/plans/${id}/edit`}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-strong)]"
            >
              {text.common.edit}
            </Link>
            <Link
              href={`/${locale}/dashboard/plans/${id}/print`}
              className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)]"
            >
              {text.common.pdf}
            </Link>
          </div>
        </div>
        <ResultView plan={plan.generatedPlanJson as any} locale={locale} />
      </div>
    </main>
  );
}
