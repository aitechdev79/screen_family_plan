import Link from "next/link";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/app-header";
import { StatePanel } from "@/components/layout/state-panel";
import { listUserPlans } from "@/lib/server/plan-repository";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PlansDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
        <StatePanel
          eyebrow="Kế hoạch đã lưu"
          title={text.dashboard.title}
          description={text.dashboard.loginRequired}
          actionHref={`/${locale}/auth/login?callbackUrl=/${locale}/dashboard/plans`}
          actionLabel={text.auth.loginButton}
        />
      </main>
    );
  }

  const plans = await listUserPlans(session.user.id);

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <AppHeader locale={locale} primaryHref={`/${locale}/plan/new`} primaryLabel={text.dashboard.createNew} />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Bảng điều khiển</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] sm:text-5xl">
              {text.dashboard.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--ink-soft)]">{text.dashboard.description}</p>
          </div>
          <Link
            href={`/${locale}/plan/new`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)]"
          >
            {text.dashboard.createNew}
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="rounded-[1.8rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(250,247,239,0.84))] p-6 shadow-[0_22px_48px_rgba(17,24,39,0.06)]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">
                    {text.common.versionLabel} {plan.version}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-strong)]">
                    {plan.familyName}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">
                    {text.common.updatedLabel} {new Date(plan.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/dashboard/plans/${plan.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                  >
                    {text.common.open}
                  </Link>
                  <Link
                    href={`/${locale}/dashboard/plans/${plan.id}/edit`}
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                  >
                    {text.common.edit}
                  </Link>
                  <Link
                    href={`/${locale}/dashboard/plans/${plan.id}/print`}
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                  >
                    {text.common.pdf}
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {plans.length === 0 ? (
            <div className="rounded-[1.8rem] bg-white/84 p-8 text-base text-[var(--ink-soft)] shadow-[0_18px_36px_rgba(17,24,39,0.05)]">
              {text.dashboard.noPlans}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
