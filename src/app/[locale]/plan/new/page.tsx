import { QuestionnaireWizard } from "@/components/questionnaire/questionnaire-wizard";
import { AppHeader } from "@/components/layout/app-header";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function NewPlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).planPage;

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.26),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.78)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <AppHeader locale={locale} primaryHref={`/${locale}/dashboard/plans`} primaryLabel="Kế hoạch đã lưu" />
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Assessment</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)] sm:text-5xl">
            {text.newTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{text.newDescription}</p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(250,247,239,0.82))] p-3 shadow-[0_26px_70px_rgba(31,110,106,0.12)] lg:p-4">
          <QuestionnaireWizard locale={locale as "vi" | "en"} />
        </div>
      </div>
    </main>
  );
}
