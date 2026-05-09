import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "首頁", iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/tools", label: "工具", iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { href: "/guides", label: "指南", iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { href: "/questions", label: "問題", iconPath: "M9.09 9a3 3 0 1 1 5.83 1c-.7 1.18-2.02 1.47-2.6 2.34-.24.37-.32.77-.32 1.16M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" },
  { href: "/checklists", label: "清單", iconPath: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-surface shadow-[0_-2px_12px_rgba(15,23,42,0.06)] md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              className="mx-1 flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[12px] py-2 text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-brand-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={item.iconPath}/>
              </svg>
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
