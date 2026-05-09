import Link from "next/link";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type GuideHub } from "@/data/guide-hubs";
import { breadcrumbSchema, faqSchema, SITE_NAME, SITE_URL } from "@/lib/seo";

interface GuideHubPageProps {
  hub: GuideHub;
}

export function GuideHubPage({ hub }: GuideHubPageProps) {
  const path = `/guides/${hub.slug}`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url: `${SITE_URL}${path}`,
    inLanguage: "zh-TW",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...hub.tools, ...hub.articles].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}${item.href}`,
      })),
    },
  };

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema(hub.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "勞工權益指南", url: `${SITE_URL}/guides` },
          { name: hub.shortTitle, url: `${SITE_URL}${path}` },
        ])}
      />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb
          jsonLd={false}
          items={[
            { label: "首頁", href: "/" },
            { label: "勞工權益指南", href: "/guides" },
            { label: hub.shortTitle },
          ]}
        />

        <header className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              Labor guide
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              {hub.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              {hub.description}
            </p>
          </div>

          <section className="rounded-[16px] border border-brand-100 bg-brand-50 p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm font-bold text-brand-700">直接答案</p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">
              {hub.shortTitle}的判斷重點
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{hub.definition}</p>
          </section>
        </header>
      </div>

      <main className="container-page pb-16">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Tools"
              title="先用工具確認數字"
              description="把問題轉成可檢查的金額、天數或流程，再回來閱讀細節。"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {hub.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  data-track="guide_tool_cta_clicked"
                  data-track-label={tool.title}
                  data-track-target={tool.href}
                  className="group block rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-700">
                    {tool.title}
                  </h3>
                  {tool.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {tool.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <section className="rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-extrabold text-slate-900">處理步驟</h2>
            <div className="mt-4 grid gap-3">
              {hub.steps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <AdBanner slot={`guide-${hub.slug}-mid`} />

        <section className="mt-12">
          <SectionHeader
            eyebrow="Reading path"
            title="高搜尋意圖文章"
            description="依常見查詢順序排列，從立即答案延伸到案例、限制與官方依據。"
          />
          <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
            <div className="divide-y divide-slate-100">
              {hub.articles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  data-track="guide_article_clicked"
                  data-track-label={article.title}
                  data-track-target={article.href}
                  className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-200"
                >
                  <span className="font-medium leading-6 text-slate-700">{article.title}</span>
                  <span className="shrink-0 text-sm font-bold text-brand-600">閱讀</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="Decision table"
            title="比較與延伸"
            description="不確定要先點哪裡時，用需求、第一步、下一步來縮短路徑。"
          />
          <div className="overflow-x-auto rounded-[16px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">需求</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">先做什麼</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">下一步</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hub.tools.slice(0, 3).map((tool, index) => (
                  <tr key={tool.href}>
                    <td className="px-4 py-3 text-slate-700">{tool.title}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {hub.steps[index] ?? "先整理資料與紀錄"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={tool.href}
                        className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
                      >
                        使用工具
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FaqSection items={hub.faqs} />

        <section className="mt-12 rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] md:p-6">
          <h2 className="text-xl font-bold text-slate-900">資料來源與更新</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            本指南依勞動部、勞保局、健保署與法規資料庫整理。法規與費率可能調整，實際適用仍以主管機關最新公告為準。
          </p>
          <Link
            href="/sources"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[12px] bg-brand-500 px-5 text-sm font-semibold text-surface transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          >
            查看官方來源與更新紀錄
          </Link>
        </section>

        <AdBanner slot={`guide-${hub.slug}-bottom`} />
      </main>
    </div>
  );
}
