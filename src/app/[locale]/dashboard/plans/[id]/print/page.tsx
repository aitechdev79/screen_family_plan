import { auth } from "@/auth";
import { StatePanel } from "@/components/layout/state-panel";
import { getUserPlanById } from "@/lib/server/plan-repository";
import { ResultView } from "@/components/plan/result-view";
import { PrintButton } from "@/components/plan/print-button";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PrintPlanPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)]" />
        <StatePanel
          eyebrow="Cần đăng nhập"
          title={text.detail.printButton}
          description={text.common.unauthorized}
          actionHref={`/${locale}/auth/login?callbackUrl=/${locale}/dashboard/plans/${id}/print`}
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
          eyebrow="Không tìm thấy kế hoạch"
          title={text.common.planNotFound}
          description="Không tìm thấy kế hoạch bạn đang muốn in."
          actionHref={`/${locale}/dashboard/plans`}
          actionLabel={text.dashboard.title}
        />
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14 print:max-w-none print:bg-white print:p-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.8)_100%)] print:hidden" />
      <div className="mx-auto max-w-7xl print:max-w-none">
        <div className="mb-6 flex flex-col gap-5 rounded-[1.8rem] bg-white/88 p-6 shadow-[0_18px_36px_rgba(17,24,39,0.05)] sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Bản in</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">{plan.familyName}</h1>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {text.common.versionLabel} {plan.version}
            </p>
          </div>
          <PrintButton locale={locale} />
        </div>
        <ResultView plan={plan.generatedPlanJson as any} locale={locale} />
      </div>
    </main>
  );
}
