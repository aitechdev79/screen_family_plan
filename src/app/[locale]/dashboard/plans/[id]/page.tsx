import Link from "next/link";
import { auth } from "@/auth";
import { getUserPlanById } from "@/lib/server/plan-repository";
import { ResultView } from "@/components/plan/result-view";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PlanDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) {
    return <main className="p-6">{text.common.unauthorized}</main>;
  }

  const plan = await getUserPlanById(session.user.id, id);
  if (!plan) {
    return <main className="p-6">{text.common.planNotFound}</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex gap-3 print:hidden">
        <Link href={`/${locale}/dashboard/plans/${id}/edit`} className="rounded-xl border px-4 py-2">{text.common.edit}</Link>
        <Link href={`/${locale}/dashboard/plans/${id}/print`} className="rounded-xl border px-4 py-2">{text.common.pdf}</Link>
      </div>
      <ResultView plan={plan.generatedPlanJson as any} locale={locale} />
    </main>
  );
}
