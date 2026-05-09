import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GUIDE_HUBS } from "@/data/guide-hubs";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益指南：薪資、加班、資遣、特休、勞健保、勞資爭議",
  description:
    "依六大搜尋主題整理的深度勞工權益指南，涵蓋薪資、加班費、資遣離職、特休請假、勞健保勞退與勞資爭議。",
  keywords: ["勞工指南", "薪資指南", "加班費指南", "資遣指南", "特休指南", "勞資爭議"],
  path: "/guides",
});

export default function GuidesIndexPage() {
  const collectionSchema = collectionPageSchema({
    name: "勞工權益指南",
    description:
      "依六大搜尋主題整理的深度勞工權益指南，涵蓋薪資、加班費、資遣離職、特休請假、勞健保勞退與勞資爭議。",
    path: "/guides",
    items: GUIDE_HUBS.map((hub) => ({
      name: hub.title,
      description: hub.description,
      url: `${SITE_URL}/guides/${hub.slug}`,
    })),
  });

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "勞工權益指南" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
              六大內容樞紐
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              按情境讀指南
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              每個指南把定義、步驟、工具、文章與 FAQ 接成一條路徑，適合從搜尋問題一路追到官方依據。
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-surface p-5 shadow-[0_12px_32px_rgba(15,23,42,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              Start Here
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              不確定從哪裡開始？
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              先用工具算出結果，再回到指南確認公式、例外情境與保存證據方式。
            </p>
            <Link
              href="/tools"
              className="mt-4 inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-5 text-sm font-bold text-surface transition-colors hover:bg-brand-600"
            >
              先看工具
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page pb-16">
        <SectionHeader
          eyebrow="Topic Clusters"
          title="六個最常見的勞權情境"
          description="每張指南卡都列出相關工具與主要關鍵字，方便使用者快速判斷是否符合自己的問題。"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {GUIDE_HUBS.map((hub, index) => (
            <article
              key={hub.slug}
              className="rounded-[20px] border border-slate-200 bg-surface p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]"
            >
              <Link
                href={`/guides/${hub.slug}`}
                data-track="guides_index_card_clicked"
                data-track-label={hub.title}
                data-track-target={`/guides/${hub.slug}`}
                className="group grid gap-4 sm:grid-cols-[64px_1fr]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-brand-50 text-sm font-extrabold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-extrabold leading-snug text-slate-950 group-hover:text-brand-700">
                    {hub.shortTitle}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {hub.description}
                  </span>
                </span>
              </Link>
              <div className="mt-5 flex flex-wrap gap-2">
                {hub.keywords.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  相關工具
                </p>
                <div className="flex flex-wrap gap-2">
                  {hub.tools.slice(0, 3).map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      data-track="guides_index_tool_clicked"
                      data-track-label={tool.title}
                      data-track-target={tool.href}
                      className="inline-flex min-h-9 items-center rounded-full border border-brand-200 bg-brand-50 px-3 text-xs font-bold text-brand-700 transition-colors hover:bg-surface"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-[22px] border border-brand-100 bg-brand-50 p-6 text-center">
          <h2 className="text-xl font-extrabold text-slate-950">
            想直接得到數字？
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">
            先到工具頁計算薪資、加班費、資遣費或特休，再回到指南核對公式與官方依據。
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              data-track="guides_bottom_cta_clicked"
              data-track-label="查看全部工具"
              data-track-target="/tools"
              className="inline-flex min-h-11 items-center justify-center rounded-[12px] bg-brand-600 px-6 text-sm font-bold text-surface transition-colors hover:bg-brand-700"
            >
              查看全部工具
            </Link>
            <Link
              href="/articles"
              data-track="guides_bottom_cta_clicked"
              data-track-label="瀏覽全部文章"
              data-track-target="/articles"
              className="inline-flex min-h-11 items-center justify-center rounded-[12px] border border-brand-200 bg-surface px-6 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
            >
              瀏覽全部文章
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
