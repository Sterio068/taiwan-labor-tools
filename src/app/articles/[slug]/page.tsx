import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug, CATEGORY_LABELS } from "@/lib/articles";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo";
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
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    url: `${SITE_URL}/articles/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "勞工權益站",
      url: SITE_URL,
    },
    inLanguage: "zh-TW",
  };

  const bcSchema = breadcrumbSchema([
    { name: "首頁", url: SITE_URL },
    { name: "權益文章", url: `${SITE_URL}/articles` },
    { name: article.title },
  ]);

  // Tool CTA for this article
  const tools = ARTICLE_TOOLS[slug] ?? [];
  const sources = getArticleSources(article.category);

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
      <Breadcrumb
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
            {article.publishedAt}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          {article.description}
        </p>
      </header>

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

      {/* Tool CTA */}
      {tools.length > 0 && (
        <div className="mt-10 p-5 bg-brand-50 rounded-[16px] border border-brand-100">
          <p className="text-sm font-bold text-brand-700 mb-3">🧮 立即使用計算工具</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
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
