import type { FaqItem } from "@/lib/seo";

interface Props {
  items: FaqItem[];
}

export function FaqSection({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">常見問題</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group overflow-hidden rounded-[12px] border border-slate-200 bg-surface"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <h3 className="font-semibold text-slate-900 pr-4">
                {item.question}
              </h3>
              <svg
                className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="px-4 pb-4 pt-0 text-slate-700 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
