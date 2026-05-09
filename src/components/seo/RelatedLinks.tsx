import Link from "next/link";
import type { RelatedLink } from "@/data/tool-related";

interface Props {
  articles?: RelatedLink[];
  tools?: RelatedLink[];
}

export function RelatedLinks({ articles = [], tools = [] }: Props) {
  if (articles.length === 0 && tools.length === 0) return null;

  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      {articles.length > 0 && (
        <div className="rounded-[16px] border border-slate-200 bg-surface p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6"/>
              <path d="M16 13H8M16 17H8M10 9H8"/>
            </svg>
            延伸閱讀
          </h3>
          <ul className="space-y-2">
            {articles.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="block text-slate-700 hover:text-brand-600 hover:underline decoration-brand-300 underline-offset-2 transition-colors"
                >
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tools.length > 0 && (
        <div className="rounded-[16px] border border-slate-200 bg-surface p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
            相關工具
          </h3>
          <ul className="space-y-2">
            {tools.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="block text-slate-700 hover:text-brand-600 hover:underline decoration-brand-300 underline-offset-2 transition-colors"
                >
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
