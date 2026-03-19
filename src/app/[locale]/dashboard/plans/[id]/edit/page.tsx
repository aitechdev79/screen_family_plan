import { auth } from "@/auth";
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
    return <main className="p-6">{text.common.unauthorized}</main>;
  }

  const plan = await getUserPlanById(session.user.id, id);
  if (!plan) {
    return <main className="p-6">{text.common.planNotFound}</main>;
  }

  if (resolvedSearchParams?.preview === "1") {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 space-y-2 print:hidden">
          <h1 className="text-4xl font-bold">{text.planPage.previewUpdatedTitle}</h1>
          <p className="text-neutral-600">{text.planPage.previewUpdatedDescription}</p>
        </div>
        <ResultClient locale={locale as "vi" | "en"} existingPlanId={id} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-4xl font-bold">{text.planPage.editTitle}</h1>
        <p className="text-neutral-600">{text.planPage.editDescription}</p>
      </div>
      <QuestionnaireWizard locale={locale as "vi" | "en"} existingPlanId={id} initialInput={plan.answersJson as any} />
    </main>
  );
}
