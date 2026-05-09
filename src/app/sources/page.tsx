import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { DATA_UPDATE_LOG, OFFICIAL_SOURCES } from "@/data/official-sources";
import { breadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "資料來源與更新紀錄｜官方法規、費率與工具資料查核",
  description:
    "列出本站薪資、加班費、資遣費、特休、勞保、健保與勞退工具使用的官方來源與更新紀錄，包含勞動部、勞保局、健保署與法規資料。",
  keywords: ["資料來源", "更新紀錄", "勞基法來源", "勞保費率", "健保費率", "勞退"],
  path: "/sources",
});

const topicLabels: Record<string, string> = {
  salary: "薪資",
  overtime: "加班費",
  leave: "特休請假",
  severance: "資遣離職",
  insurance: "勞健保",
  pension: "勞退",
  retirement: "退休",
  dispute: "勞資爭議",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "資料來源與更新紀錄", url: `${SITE_URL}/sources` },
        ])}
      />
      <Breadcrumb jsonLd={false} items={[{ label: "首頁", href: "/" }, { label: "資料來源" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          資料來源與更新紀錄
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          本站計算工具與文章以主管機關公告、法規資料庫與公開資料為主要依據。法規與費率可能調整，實際適用仍以官方最新公告與個案事實為準。
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">官方來源</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {OFFICIAL_SOURCES.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[16px] border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <p className="text-sm font-semibold text-brand-700 mb-1">{source.agency}</p>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{source.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{source.description}</p>
              <div className="flex flex-wrap gap-2">
                {source.topics.slice(0, 4).map((topic) => (
                  <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    {topicLabels[topic] ?? topic}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">最近查核：{source.lastChecked}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">更新紀錄</h2>
        <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">
          {DATA_UPDATE_LOG.map((record) => (
            <div key={`${record.date}-${record.title}`} className="border-b border-slate-100 p-5 last:border-b-0">
              <p className="text-sm font-semibold text-brand-700">{record.date}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{record.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{record.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {record.affectedPages.map((page) => (
                  <span key={page} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    {page}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[16px] border border-amber-200 bg-amber-50 p-5 md:p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">勘誤與回報</h2>
        <p className="text-amber-800 leading-relaxed mb-4">
          若你發現工具計算、文章說明或來源連結有誤，請提供頁面網址、錯誤描述與你看到的官方資料來源，我們會優先查核核心工具頁。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-[10px] bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
        >
          回報資料問題
        </Link>
      </section>
    </div>
  );
}
