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
    <header className="hidden md:block sticky top-0 z-40 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <svg className="w-7 h-7 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-slate-900">勞工權益站</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-3 py-2 rounded-[10px] text-sm text-slate-700 font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 pl-2 border-l border-slate-200">
              <SearchDialog />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
