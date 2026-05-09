import Link from "next/link";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
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
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema(hub.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "勞工權益指南", url: `${SITE_URL}/guides` },
          { name: hub.shortTitle, url: `${SITE_URL}${path}` },
        ])}
      />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "勞工權益指南", href: "/guides" },
          { label: hub.shortTitle },
        ]}
      />

      <header className="mb-10">
        <div className="text-4xl mb-3" aria-hidden="true">
          {hub.emoji}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          {hub.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">{hub.description}</p>
      </header>

      <section className="mb-10 rounded-[16px] border border-brand-100 bg-brand-50 p-5 md:p-6">
        <p className="text-sm font-semibold text-brand-700 mb-2">直接答案</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          {hub.shortTitle}的判斷重點
        </h2>
        <p className="text-slate-700 leading-relaxed">{hub.definition}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">相關工具</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hub.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              data-track="guide_tool_cta_clicked"
              data-track-label={tool.title}
              data-track-target={tool.href}
              className="block rounded-[14px] border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-slate-900 mb-2">{tool.title}</h3>
              {tool.description && (
                <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slot={`guide-${hub.slug}-mid`} />

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">高搜尋意圖文章</h2>
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white divide-y divide-slate-100">
          {hub.articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              data-track="guide_article_clicked"
              data-track-label={article.title}
              data-track-target={article.href}
              className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-700">{article.title}</span>
              <span className="text-sm text-brand-500">閱讀</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">處理步驟</h2>
        <div className="grid gap-3">
          {hub.steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-[12px] bg-white border border-slate-200 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {index + 1}
              </span>
              <p className="text-slate-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">比較與延伸</h2>
        <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">需求</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">先做什麼</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">下一步</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hub.tools.slice(0, 3).map((tool, index) => (
                <tr key={tool.href}>
                  <td className="py-3 px-4 text-slate-700">{tool.title}</td>
                  <td className="py-3 px-4 text-slate-700">{hub.steps[index] ?? "先整理資料與紀錄"}</td>
                  <td className="py-3 px-4">
                    <Link href={tool.href} className="font-semibold text-brand-600 hover:text-brand-700">
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

      <section className="mt-12 rounded-[16px] border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">資料來源與更新</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          本指南依勞動部、勞保局、健保署與法規資料庫整理。法規與費率可能調整，實際適用仍以主管機關最新公告為準。
        </p>
        <Link
          href="/sources"
          className="inline-flex items-center justify-center rounded-[10px] bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          查看官方來源與更新紀錄
        </Link>
      </section>

      <AdBanner slot={`guide-${hub.slug}-bottom`} />
    </div>
  );
}
