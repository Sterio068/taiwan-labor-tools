import Link from "next/link";
import { SearchDialog } from "@/components/search/SearchDialog";

const NAV_LINKS = [
  { href: "/tools", label: "計算工具" },
  { href: "/guides", label: "完整指南" },
  { href: "/compare", label: "熱門比較" },
  { href: "/articles", label: "權益文章" },
  { href: "/checklists", label: "檢查表" },
  { href: "/sources", label: "資料來源" },
  { href: "/about", label: "關於" },
];

export function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-40 border-b border-slate-200 bg-surface/95">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-[72px] items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-brand-50 text-brand-700">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            <span>
              <span className="block text-lg font-extrabold leading-tight text-slate-950">
                勞工權益站
              </span>
              <span className="block text-xs font-semibold text-slate-500">
                2026 法規工具
              </span>
            </span>
          </Link>
          <div className="flex min-w-0 items-center gap-3">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-[10px] px-2.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-l border-slate-200 pl-3">
              <SearchDialog />
            </div>
            <Link
              href="/tools/salary"
              className="inline-flex min-h-10 items-center rounded-[12px] bg-brand-500 px-4 text-sm font-bold text-surface shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
            >
              薪資試算
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
