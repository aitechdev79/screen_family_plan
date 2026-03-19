import { ResultClient } from "@/components/plan/result-client";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function PlanResultPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).planPage;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 space-y-2 print:hidden">
        <h1 className="text-4xl font-bold">{text.resultTitle}</h1>
        <p className="text-neutral-600">{text.resultDescription}</p>
      </div>
      <ResultClient locale={locale as "vi" | "en"} />
    </main>
  );
}
