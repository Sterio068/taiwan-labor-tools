import Link from "next/link";
import { TOOLS } from "@/data/constants";

const TOOL_ICONS: Record<string, string> = {
  calculator: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "piggy-bank": "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-600 to-brand-700 text-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            算清楚你的每一筆錢
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto mb-8">
            免費勞工權益計算工具，依據 2026 最新勞基法。
            <br className="hidden md:block" />
            薪資明細、加班費、資遣費、特休、勞健保、退休金 — 一次算清楚。
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-8 py-3.5 bg-white text-brand-600 font-bold rounded-[12px] hover:bg-brand-50 transition-colors shadow-lg text-lg"
          >
            開始計算
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            免費計算工具
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.1)] transition-all"
              >
                <div className="w-12 h-12 rounded-[12px] bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={TOOL_ICONS[tool.icon] || TOOL_ICONS.calculator}/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Law Reference */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">2026</div>
              <p className="text-slate-700 font-medium">最新法規數據</p>
              <p className="text-sm text-slate-500 mt-1">基本工資 $29,500 適用</p>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">6+</div>
              <p className="text-slate-700 font-medium">免費計算工具</p>
              <p className="text-sm text-slate-500 mt-1">薪資、加班、資遣、特休...</p>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">100%</div>
              <p className="text-slate-700 font-medium">依據勞基法</p>
              <p className="text-sm text-slate-500 mt-1">法條對照，計算透明</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            不確定自己的權益？
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            輸入你的月薪，馬上看到勞健保扣了多少、實領多少、雇主幫你提繳了多少退休金。
          </p>
          <Link
            href="/tools/salary"
            className="inline-flex items-center px-8 py-3.5 bg-brand-500 text-white font-bold rounded-[12px] hover:bg-brand-600 transition-colors shadow-md text-lg"
          >
            試算薪資明細
          </Link>
        </div>
      </section>
    </>
  );
}
