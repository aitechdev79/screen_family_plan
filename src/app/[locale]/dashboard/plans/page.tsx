import Link from "next/link";
import { auth } from "@/auth";
import { listUserPlans } from "@/lib/server/plan-repository";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PlansDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">{text.dashboard.title}</h1>
        <p className="mt-2 text-neutral-600">{text.dashboard.loginRequired}</p>
        <Link href={`/${locale}/auth/login?callbackUrl=/${locale}/dashboard/plans`} className="mt-4 inline-flex rounded-xl bg-neutral-900 px-4 py-2 text-white">
          {text.auth.loginButton}
        </Link>
      </main>
    );
  }

  const plans = await listUserPlans(session.user.id);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{text.dashboard.title}</h1>
          <p className="text-neutral-600">{text.dashboard.description}</p>
        </div>
        <Link href={`/${locale}/plan/new`} className="rounded-xl bg-neutral-900 px-4 py-2 text-white">
          {text.dashboard.createNew}
        </Link>
      </div>
      <div className="space-y-4">
        {plans.map((plan) => (
          <article key={plan.id} className="rounded-2xl border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{plan.familyName}</h2>
                <p className="text-sm text-neutral-600">
                  {text.common.versionLabel} {plan.version} · {text.common.updatedLabel} {new Date(plan.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/${locale}/dashboard/plans/${plan.id}`} className="rounded-xl border px-3 py-2">{text.common.open}</Link>
                <Link href={`/${locale}/dashboard/plans/${plan.id}/edit`} className="rounded-xl border px-3 py-2">{text.common.edit}</Link>
                <Link href={`/${locale}/dashboard/plans/${plan.id}/print`} className="rounded-xl border px-3 py-2">{text.common.pdf}</Link>
              </div>
            </div>
          </article>
        ))}
        {plans.length === 0 ? <p className="text-neutral-600">{text.dashboard.noPlans}</p> : null}
      </div>
    </main>
  );
}
