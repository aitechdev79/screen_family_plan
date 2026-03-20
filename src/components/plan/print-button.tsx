"use client";

import { getUIText } from "@/lib/i18n/ui-text";

export function PrintButton({ locale = "vi" }: { locale?: string }) {
  const text = getUIText(locale).detail;

  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)] transition hover:-translate-y-0.5 print:hidden"
    >
      {text.printButton}
    </button>
  );
}
