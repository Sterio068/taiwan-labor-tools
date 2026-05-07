"use client";

import { trackEvent } from "@/lib/analytics";

interface Props {
  label?: string;
}

export function PrintButton({ label = "列印 / 另存 PDF" }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("checklist_print_clicked");
        window.print();
      }}
      className="inline-flex items-center justify-center rounded-[10px] bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors print:hidden"
    >
      {label}
    </button>
  );
}
