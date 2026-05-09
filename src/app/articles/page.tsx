import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARTICLES, getAllCategories } from "@/lib/articles";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";

interface ArticlesPageProps {
  searchParams?: Promise<{ q?: string }>;
}

const categories = getAllCategories();

function normalizeQuery(value: string | undefined) {
  return (value ?? "").trim().slice(0, 60);
}

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {};
  const query = normalizeQuery(params.q);
  const baseMetadata = buildPageMetadata({
    title: query
      ? `「${query}」搜尋結果：勞工權益文章`
      : "勞工權益文章：白話解讀勞基法",
    description:
      "白話解讀勞基法與勞工權益，搭配免費計算工具，搞懂薪資、加班、資遣、假別等常見問題。",
    keywords: ["勞基法", "勞工權益", "勞動法規", "薪資", "加班費", "資遣費"],
    path: "/articles",
  });

  if (!query) return baseMetadata;

  return {
    ...baseMetadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = normalizeQuery(params.q);
  const normalizedQuery = query.toLowerCase();
  const filtered = ARTICLES.filter((article) => {
    if (!normalizedQuery) return true;

    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.description.toLowerCase().includes(normalizedQuery) ||
      article.keywords.some((keyword) =>
        keyword.toLowerCase().includes(normalizedQuery)
      )
    );
  });
  const collectionSchema = collectionPageSchema({
    type: query ? "SearchResultsPage" : "CollectionPage",
    name: query ? `「${query}」文章搜尋結果` : "勞工權益文章",
    description: query
      ? `站內與「${query}」相關的勞工權益文章搜尋結果。`
      : "白話解讀勞基法與勞工權益，搭配免費計算工具，幫你搞懂薪資、加班、資遣、假別等常見問題。",
    path: "/articles",
    items: filtered.map((article) => ({
      name: article.title,
      description: article.description,
      url: `${SITE_URL}/articles/${article.slug}`,
    })),
  });

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "權益文章" }]} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
              {query ? "搜尋結果" : `${ARTICLES.length} 篇白話勞權文章`}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              勞工權益文章
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              用白話整理薪資、加班、資遣、假別與保險問題，每篇文章都接回工具、FAQ 與官方來源。
            </p>
          </div>
          <form
            action="/articles"
            className="rounded-[22px] border border-slate-200 bg-surface p-4 shadow-[0_12px_32px_rgba(15,23,42,0.07)]"
            data-track="article_search_submitted"
            data-track-query-field="q"
          >
            <label htmlFor="article-search" className="text-sm font-bold text-slate-900">
              搜尋文章
            </label>
            <div className="relative mt-3">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 4 4a7.5 7.5 0 0 0 12.65 12.65z"
                />
              </svg>
              <input
                id="article-search"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="例：加班費、資遣、特休"
                className="min-h-11 w-full rounded-[12px] border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 transition-colors focus:border-brand-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-200"
                aria-label="搜尋文章"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              搜尋只用於站內篩選，不會送出薪資或個人資料。
            </p>
          </form>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-surface">
        <div className="container-page py-5">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/articles"
              data-track="article_category_filter_clicked"
              data-track-label="全部"
              data-track-target="/articles"
              className="inline-flex min-h-9 items-center rounded-[8px] bg-brand-500 px-3.5 text-sm font-bold text-surface shadow-sm"
            >
              全部
              <span className="ml-1 text-xs opacity-80">{ARTICLES.length}</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.category}
                href={`/articles/category/${category.category}`}
                data-track="article_category_filter_clicked"
                data-track-label={category.label}
                data-track-target={`/articles/category/${category.category}`}
                className="inline-flex min-h-9 items-center rounded-[8px] border border-slate-200 bg-surface px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {category.label}
                <span className="ml-1 text-xs opacity-70">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-10 md:py-12">
        <SectionHeader
          eyebrow={query ? "Search" : "Knowledge Base"}
          title={query ? `「${query}」相關文章` : "最新勞權知識庫"}
          description={
            query
              ? `找到 ${filtered.length} 篇相關內容，建議搭配工具結果一起核對。`
              : "文章先回答問題，再補充情境、公式、常見錯誤與官方依據。"
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              trackingName="article_index_card_clicked"
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-[20px] border border-slate-200 bg-surface p-10 text-center">
            <p className="mb-3 text-slate-500">找不到「{query}」相關文章</p>
            <Link href="/articles" className="text-sm font-bold text-brand-700">
              清除搜尋
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
