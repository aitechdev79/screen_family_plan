"use client";

import { getUIText } from "@/lib/i18n/ui-text";

export function PrintButton({ locale = "vi" }: { locale?: string }) {
  const text = getUIText(locale).detail;

  return (
    <button
      onClick={() => window.print()}
      className="rounded-xl bg-neutral-900 px-4 py-2 text-white print:hidden"
    >
      {text.printButton}
    </button>
  );
}
