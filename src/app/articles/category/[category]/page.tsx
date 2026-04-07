import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  CATEGORY_LABELS,
  getAllCategories,
} from "@/lib/articles";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";
import type { ArticleCategory } from "@/types";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as ArticleCategory];
  if (!label) return {};
  return buildPageMetadata({
    title: `${label}相關文章 — 勞工權益`,
    description: `台灣勞工「${label}」相關的法規解讀與權益文章，白話說明讓你一次搞懂。`,
    keywords: [label, "勞工權益", "勞基法"],
    path: `/articles/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as ArticleCategory];
  if (!label) notFound();

  const articles = getArticlesByCategory(category as ArticleCategory);
  const categories = getAllCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "權益文章", href: "/articles" },
          { label },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        {label}相關文章
      </h1>
      <p className="text-slate-500 mb-8">
        共 {articles.length} 篇「{label}」相關的勞工權益文章
      </p>

      {/* Category navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/articles"
          className="inline-flex items-center px-3.5 py-1.5 rounded-[8px] text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-all"
        >
          全部
        </Link>
        {categories.map((c) => (
          <Link
            key={c.category}
            href={`/articles/category/${c.category}`}
            className={`inline-flex items-center px-3.5 py-1.5 rounded-[8px] text-sm font-medium transition-all ${
              c.category === category
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {c.label}
            <span className="ml-1 text-xs opacity-70">{c.count}</span>
          </Link>
        ))}
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.1)] transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium bg-brand-50 text-brand-700">
                {CATEGORY_LABELS[article.category]}
              </span>
              <span className="text-xs text-slate-400">
                {article.readingMinutes} 分鐘閱讀
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
              {article.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {article.description}
            </p>
          </Link>
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-slate-400 py-12">
          此分類尚無文章
        </p>
      )}
    </div>
  );
}
