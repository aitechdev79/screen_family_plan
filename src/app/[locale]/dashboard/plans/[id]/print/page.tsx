import { auth } from "@/auth";
import { getUserPlanById } from "@/lib/server/plan-repository";
import { ResultView } from "@/components/plan/result-view";
import { PrintButton } from "@/components/plan/print-button";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PrintPlanPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const text = getUIText(locale);
  const session = await auth();

  if (!session?.user?.id) return <main className="p-6">{text.common.unauthorized}</main>;

  const plan = await getUserPlanById(session.user.id, id);
  if (!plan) return <main className="p-6">{text.common.planNotFound}</main>;

  return (
    <main className="mx-auto max-w-6xl bg-white p-6 print:max-w-none print:p-0">
      <div className="mb-6 flex items-center justify-between border-b pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold">{plan.familyName}</h1>
          <p className="text-sm text-neutral-600">{text.common.versionLabel} {plan.version}</p>
        </div>
        <PrintButton locale={locale} />
      </div>
      <ResultView plan={plan.generatedPlanJson as any} locale={locale} />
    </main>
  );
}
