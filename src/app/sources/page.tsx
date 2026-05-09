import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <div className="bg-slate-50">
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "資料來源與更新紀錄", url: `${SITE_URL}/sources` },
        ])}
      />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb jsonLd={false} items={[{ label: "首頁", href: "/" }, { label: "資料來源" }]} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <header>
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
              Trust Center
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              資料來源與更新紀錄
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              本站計算工具與文章以主管機關公告、法規資料庫與公開資料為主要依據。法規與費率可能調整，實際適用仍以官方最新公告與個案事實為準。
            </p>
          </header>
          <aside className="rounded-[22px] border border-slate-200 bg-surface p-5 shadow-[0_12px_32px_rgba(15,23,42,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              Review Cadence
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              核心資料優先查核
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              最低工資、勞保、健保、勞退、加班倍率與資遣規則會優先同步到工具頁、指南與 sitemap。
            </p>
          </aside>
        </div>
      </div>

      <div className="container-page pb-16">
      <section className="mb-12">
        <SectionHeader
          eyebrow="Official Sources"
          title="官方來源"
          description="每一個核心費率、公式與法規結論都要能回到官方資料或法規頁。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {OFFICIAL_SOURCES.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[18px] border border-slate-200 bg-surface p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-[background-color,border-color,box-shadow] hover:border-brand-300 hover:shadow-[0_10px_25px_rgba(15,23,42,0.09)]"
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
        <SectionHeader
          eyebrow="Update Log"
          title="更新紀錄"
          description="用時間線記錄資料變更，讓使用者知道工具結果背後的依據何時查核。"
        />
        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-surface shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
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

      <section className="rounded-[20px] border border-warning-100 bg-warning-50 p-5 md:p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">勘誤與回報</h2>
        <p className="text-amber-800 leading-relaxed mb-4">
          若你發現工具計算、文章說明或來源連結有誤，請提供頁面網址、錯誤描述與你看到的官方資料來源，我們會優先查核核心工具頁。
        </p>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-amber-900 px-5 text-sm font-semibold text-surface transition-colors hover:bg-amber-800"
        >
          回報資料問題
        </Link>
      </section>
      </div>
    </div>
  );
}
