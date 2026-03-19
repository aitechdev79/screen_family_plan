import { QuestionnaireWizard } from "@/components/questionnaire/questionnaire-wizard";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function NewPlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).planPage;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{text.newTitle}</h1>
        <p className="text-neutral-600">{text.newDescription}</p>
      </div>
      <QuestionnaireWizard locale={locale as "vi" | "en"} />
    </main>
  );
}
