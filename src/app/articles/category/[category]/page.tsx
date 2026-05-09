import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  CATEGORY_LABELS,
  getAllCategories,
} from "@/lib/articles";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";
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
    title: `${label}相關文章：勞工權益`,
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
  const collectionSchema = collectionPageSchema({
    name: `${label}相關文章`,
    description: `台灣勞工「${label}」相關的法規解讀與權益文章。`,
    path: `/articles/category/${category}`,
    items: articles.map((article) => ({
      name: article.title,
      description: article.description,
      url: `${SITE_URL}/articles/${article.slug}`,
    })),
  });

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "權益文章", href: "/articles" },
            { label },
          ]}
        />
        <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
          {articles.length} 篇文章
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
          {label}相關文章
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
          整理「{label}」相關的法規解讀、常見情境與工具入口，方便你從問題快速走到下一步。
        </p>
      </div>

      <div className="border-y border-slate-200 bg-surface">
        <div className="container-page flex flex-wrap gap-2 py-5">
          <Link
            href="/articles"
            data-track="article_category_filter_clicked"
            data-track-label="全部"
            data-track-target="/articles"
            className="inline-flex min-h-9 items-center rounded-[8px] border border-slate-200 bg-surface px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            全部
          </Link>
          {categories.map((c) => (
            <Link
              key={c.category}
              href={`/articles/category/${c.category}`}
              data-track="article_category_filter_clicked"
              data-track-label={c.label}
              data-track-target={`/articles/category/${c.category}`}
              className={`inline-flex min-h-9 items-center rounded-[8px] px-3.5 text-sm font-semibold transition-colors ${
                c.category === category
                  ? "bg-brand-500 text-surface shadow-sm"
                  : "border border-slate-200 bg-surface text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {c.label}
              <span className="ml-1 text-xs opacity-70">{c.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container-page py-10 md:py-12">
        <SectionHeader
          eyebrow="Category"
          title={`${label}知識庫`}
          description="每篇文章都保留法規脈絡、工具 CTA 與延伸閱讀，方便使用者一路追到可執行的動作。"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              trackingName="article_category_card_clicked"
            />
          ))}
        </div>

        {articles.length === 0 && (
          <p className="rounded-[18px] border border-slate-200 bg-surface py-12 text-center text-slate-500">
            此分類尚無文章
          </p>
        )}
      </div>
    </div>
  );
}
