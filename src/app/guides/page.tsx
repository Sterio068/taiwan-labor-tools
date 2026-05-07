import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GUIDE_HUBS } from "@/data/guide-hubs";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益指南 — 薪資、加班、資遣、特休、勞健保、勞資爭議",
  description:
    "依六大搜尋主題整理的深度勞工權益指南，涵蓋薪資、加班費、資遣離職、特休請假、勞健保勞退與勞資爭議。",
  keywords: ["勞工指南", "薪資指南", "加班費指南", "資遣指南", "特休指南", "勞資爭議"],
  path: "/guides",
});

const GUIDES = GUIDE_HUBS.map((hub) => ({
  title: hub.title,
  desc: hub.description,
  href: `/guides/${hub.slug}`,
  emoji: hub.emoji,
  topics: hub.keywords.slice(0, 4),
  tools: hub.tools.map((tool) => ({ name: tool.title, href: tool.href })).slice(0, 3),
}));

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
          依六大搜尋主題整理的深度內容中樞，每個指南都整合工具、文章、FAQ 與官方來源。
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
