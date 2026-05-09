import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug, CATEGORY_LABELS } from "@/lib/articles";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleSchema as buildArticleSchema,
  buildPageMetadata,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  SITE_URL,
} from "@/lib/seo";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { ARTICLE_TOOLS, getRelatedSlugs } from "@/data/article-tools";
import { getArticleSources } from "@/data/article-sources";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    path: `/articles/${slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    section: CATEGORY_LABELS[article.category],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = buildArticleSchema({
    ...article,
    category: CATEGORY_LABELS[article.category],
  });

  const bcSchema = breadcrumbSchema([
    { name: "首頁", url: SITE_URL },
    { name: "權益文章", url: `${SITE_URL}/articles` },
    { name: article.title },
  ]);

  // Tool CTA for this article
  const tools = ARTICLE_TOOLS[slug] ?? [];
  const sources = getArticleSources(article.category);
  const articleFaqs = [
    {
      question: `這篇「${article.title}」先看什麼重點？`,
      answer: article.description,
    },
    ...(tools.length > 0
      ? [
          {
            question: "看完後可以用哪些工具核對？",
            answer: `可搭配 ${tools.map((tool) => tool.label).join("、")}，先估算金額或確認下一步文件。`,
          },
        ]
      : []),
    {
      question: "本文資料來源以哪裡為準？",
      answer:
        "本文依主管機關公開資料與現行法規整理；法規、費率與級距可能調整，實際適用仍以官方最新公告與個案事實為準。",
    },
  ];
  const articleHowTo = howToSchema({
    name: `如何使用「${article.title}」檢查自己的權益`,
    description: "用文章重點、相關工具、官方來源與個人紀錄完成初步自我檢查。",
    steps: [
      { name: "先讀直接答案", text: "先看本文重點與適用情境，確認自己的問題是否屬於本文範圍。" },
      { name: "使用相關工具", text: "用頁面提供的計算工具估算金額、天數或保費，但不要把結果當成個案最終結論。" },
      { name: "核對官方來源", text: "依本文參考資料查核勞動部、勞保局、健保署或法規資料庫的最新公告。" },
      { name: "保存紀錄再行動", text: "保留薪資單、出勤紀錄、投保資料、對話紀錄或書面通知，必要時向主管機關或專業人士確認。" },
    ],
  });

  // Related articles (same category first, max 3)
  const relatedSlugs = getRelatedSlugs(
    slug,
    article.category,
    ARTICLES.map((a) => ({ slug: a.slug, category: a.category }))
  );
  const relatedArticles = relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  // Try loading MDX content; show placeholder if not yet written
  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/articles/${slug}.mdx`);
    Content = mod.default;
  } catch {
    Content = null;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={articleSchema} />
      <JsonLd data={bcSchema} />
      <JsonLd data={faqSchema(articleFaqs)} />
      <JsonLd data={articleHowTo} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "權益文章", href: "/articles" },
          { label: article.title },
        ]}
      />

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium bg-brand-50 text-brand-700">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-sm text-slate-400">
            {article.readingMinutes} 分鐘閱讀
          </span>
          <span className="text-sm text-slate-400">
            最後更新 {article.updatedAt || article.publishedAt}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          {article.description}
        </p>
      </header>

      <section className="mb-8 rounded-[16px] border border-brand-100 bg-brand-50 p-5">
        <p className="text-sm font-semibold text-brand-700 mb-2">本文重點</p>
        <p className="text-slate-700 leading-relaxed">
          {article.description} 本文整理適用情境、常見錯誤、官方依據與下一步工具，協助你先快速判斷，再進一步核對金額或準備文件。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tools.slice(0, 2).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              data-track="article_answer_tool_clicked"
              data-track-label={tool.label}
              data-track-target={tool.href}
              className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 border border-brand-100 hover:border-brand-300 transition-colors"
            >
              {tool.label}
            </Link>
          ))}
          <Link
            href="/sources"
            className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 border border-slate-200 hover:border-brand-300 transition-colors"
          >
            查官方來源
          </Link>
        </div>
      </section>

      <AdBanner slot="article-top" format="horizontal" />

      {Content ? (
        <article className="prose-custom">
          <Content />
        </article>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-8 text-center">
          <p className="text-amber-800 font-medium text-lg mb-2">
            文章即將上架
          </p>
          <p className="text-amber-600 text-sm">
            本篇文章正在撰寫中，請稍後再訪。
          </p>
        </div>
      )}

      {sources.length > 0 && (
        <section className="mt-10 rounded-[16px] border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            本文參考資料
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            本文依據主管機關公開資料與現行法規整理。法規及費率可能調整，實際適用仍以主管機關最新公告與個案事實為準。
          </p>
          <ul className="grid gap-3">
            {sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[12px] border border-slate-100 bg-slate-50 px-4 py-3 hover:border-brand-200 hover:bg-brand-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {source.label}
                  </span>
                  <span className="block text-sm text-slate-500 mt-1 leading-relaxed">
                    {source.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-[16px] border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-900 mb-4">下一步檢查流程</h2>
        <ol className="grid gap-3">
          {articleHowTo.step.map((step) => (
            <li key={step.name} className="flex gap-3 rounded-[12px] bg-slate-50 px-4 py-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {step.position}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{step.name}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-[16px] border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-900 mb-4">常見問題</h2>
        <div className="space-y-3">
          {articleFaqs.map((item) => (
            <details key={item.question} className="rounded-[12px] border border-slate-100 bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Tool CTA */}
      {tools.length > 0 && (
        <div className="mt-10 p-5 bg-brand-50 rounded-[16px] border border-brand-100">
          <p className="text-sm font-bold text-brand-700 mb-3">🧮 立即使用計算工具</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                data-track="article_tool_cta_clicked"
                data-track-label={tool.label}
                data-track-target={tool.href}
                className="flex-1 block bg-white rounded-[12px] p-4 border border-brand-200 hover:border-brand-400 hover:shadow-sm transition-all group"
              >
                <p className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                  {tool.label} →
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdBanner slot="article-bottom" format="horizontal" className="mt-8" />

      <div className="mt-10 pt-6 border-t border-slate-200">
        <ShareButtons title={article.title} path={`/articles/${slug}`} />
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-10 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">相關文章</h2>
          <div className="grid gap-4">
            {relatedArticles.map((rel) => rel && (
              <Link
                key={rel.slug}
                href={`/articles/${rel.slug}`}
                className="group flex items-start gap-3 p-4 bg-slate-50 rounded-[12px] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm group-hover:text-brand-600 transition-colors leading-snug">
                    {rel.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{rel.description}</p>
                </div>
                <span className="text-brand-400 text-xs font-medium flex-shrink-0 mt-0.5">
                  {rel.readingMinutes}min →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
