import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GROWTH_QUESTIONS } from "@/data/growth-entrypoints";
import { buildPageMetadata, collectionPageSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益熱門問題｜薪資、加班、資遣、特休快速答案",
  description:
    "整理台灣勞工最常搜尋的薪資實領、加班費、資遣費、特休、勞健保與勞退問題，直接連到文章與免費工具。",
  keywords: ["勞工問題", "薪資實領", "加班費", "資遣費", "特休折現", "勞保級距", "健保級距"],
  path: "/questions",
});

export default function QuestionsPage() {
  const collectionSchema = collectionPageSchema({
    name: "勞工權益熱門問題",
    description: "薪資、加班、資遣、特休、勞健保與勞退的常見搜尋問題集合。",
    path: "/questions",
    type: "SearchResultsPage",
    items: GROWTH_QUESTIONS.map((item) => ({
      name: item.question,
      description: item.answer,
      url: `${SITE_URL}${item.href}`,
    })),
  });

  const faq = faqSchema(
    GROWTH_QUESTIONS.slice(0, 8).map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  );

  const topics = Array.from(new Set(GROWTH_QUESTIONS.map((item) => item.topic)));

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <JsonLd data={faq} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "熱門問題" }]} />
        <header className="mt-6 max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
            搜尋入口
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            勞工權益熱門問題
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
            先從問題進入，再用文章與工具核對。每個答案都避免收集個人薪資資料，試算在瀏覽器本機完成。
          </p>
        </header>
      </div>

      <main className="container-page pb-16">
        <SectionHeader
          eyebrow="Question Hub"
          title="直接找你正在遇到的問題"
          description="這些是高意圖搜尋入口，會連到完整說明、官方來源與可操作工具。"
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <a
              key={topic}
              href={`#${topic}`}
              className="rounded-full border border-slate-200 bg-surface px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {topic}
            </a>
          ))}
        </div>

        <div className="space-y-10">
          {topics.map((topic) => {
            const questions = GROWTH_QUESTIONS.filter((item) => item.topic === topic);

            return (
              <section key={topic} id={topic} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-extrabold text-slate-950">{topic}</h2>
                <div className="grid gap-4 lg:grid-cols-2">
                  {questions.map((item) => (
                    <article
                      key={item.href}
                      className="rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)]"
                    >
                      <p className="text-xs font-bold text-brand-600">{item.topic}</p>
                      <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-950">
                        {item.question}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={item.href}
                          data-track="question_article_clicked"
                          data-track-label={item.question}
                          data-track-target={item.href}
                          className="rounded-[10px] bg-brand-500 px-4 py-2 text-sm font-bold text-surface transition-colors hover:bg-brand-600"
                        >
                          看完整答案
                        </Link>
                        {item.toolHref && (
                          <Link
                            href={item.toolHref}
                            data-track="question_tool_clicked"
                            data-track-label={item.question}
                            data-track-target={item.toolHref}
                            className="rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                          >
                            搭配工具
                          </Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
