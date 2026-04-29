import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益指南 — 薪資、保險、退休、資遣完整攻略",
  description:
    "依主題整理的深度勞工權益指南，涵蓋薪資計算、勞健保、退休規劃、離職資遣。每個主題都有工具連結與完整文章，一次看懂你的勞動權益。",
  keywords: ["勞工指南", "薪資指南", "勞健保攻略", "退休規劃", "資遣指南", "勞基法"],
  path: "/guides",
});

const GUIDES = [
  {
    title: "薪資完全指南",
    desc: "實領、報稅、加班費、基本工資全解析",
    href: "/guides/salary",
    emoji: "💰",
    topics: ["薪資明細計算", "勞健保扣款", "加班費計算", "報稅規劃"],
    tools: [
      { name: "薪資明細計算機", href: "/tools/salary" },
      { name: "加班費計算機", href: "/tools/overtime" },
      { name: "薪資比較器", href: "/tools/salary-compare" },
    ],
  },
  {
    title: "離職資遣指南",
    desc: "資遣費、失業給付、預告期完整流程",
    href: "/guides/severance",
    emoji: "📋",
    topics: ["新舊制資遣費", "非自願離職", "失業給付申請", "預告期計算"],
    tools: [
      { name: "資遣費計算機", href: "/tools/severance" },
      { name: "離職預告期計算", href: "/tools/notice-period" },
      { name: "勞資爭議檢查器", href: "/tools/dispute-checker" },
    ],
  },
  {
    title: "勞健保攻略",
    desc: "費率、級距、給付、眷屬加保全說明",
    href: "/guides/insurance",
    emoji: "🛡️",
    topics: ["勞保費率計算", "健保投保級距", "生育給付", "職災保險"],
    tools: [
      { name: "勞健保保費計算", href: "/tools/insurance-premium" },
      { name: "投保級距查詢", href: "/tools/insurance-bracket" },
      { name: "產假育嬰假計算機", href: "/tools/maternity" },
    ],
  },
  {
    title: "退休金規劃",
    desc: "新舊制勞退、自提策略、領取方式",
    href: "/guides/retirement",
    emoji: "🌅",
    topics: ["勞退新制自提", "勞保老年給付", "所得替代率", "提前退休規劃"],
    tools: [
      { name: "勞退退休金試算", href: "/tools/pension" },
      { name: "退休年齡規劃", href: "/tools/retirement-planner" },
    ],
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "勞工權益指南" },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          勞工權益指南
        </h1>
        <p className="text-slate-500 text-lg">
          依主題整理的深度內容中樞，每個指南都整合工具、文章與法條，讓你一次搞清楚。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <div key={guide.href} className="bg-white rounded-[16px] border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <Link href={guide.href} className="block p-6 hover:bg-slate-50 transition-colors">
              <div className="text-4xl mb-3">{guide.emoji}</div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{guide.title}</h2>
              <p className="text-slate-500 text-sm mb-4">{guide.desc}</p>
              <ul className="grid grid-cols-2 gap-1 mb-4">
                {guide.topics.map((topic) => (
                  <li key={topic} className="text-xs text-slate-600 flex items-center gap-1">
                    <span className="text-brand-500">✓</span> {topic}
                  </li>
                ))}
              </ul>
            </Link>
            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">相關工具</p>
              <div className="flex flex-wrap gap-2">
                {guide.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="inline-flex items-center px-3 py-1 bg-white text-brand-600 text-xs font-medium rounded-full border border-brand-200 hover:bg-brand-50 transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-brand-50 rounded-[16px] text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">找不到你要的主題？</h2>
        <p className="text-slate-500 text-sm mb-4">瀏覽全部 16+ 個免費計算工具，或閱讀最新文章。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white font-bold rounded-[10px] hover:bg-brand-700 transition-colors text-sm"
          >
            查看全部工具
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-600 font-bold rounded-[10px] hover:bg-brand-50 transition-colors border border-brand-200 text-sm"
          >
            瀏覽全部文章
          </Link>
        </div>
      </div>
    </div>
  );
}
