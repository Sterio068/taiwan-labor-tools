import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug, CATEGORY_LABELS } from "@/lib/articles";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

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

      <AdBanner slot="article-bottom" format="horizontal" className="mt-8" />
    </div>
  );
}
