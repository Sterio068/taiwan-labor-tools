"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ARTICLES, CATEGORY_LABELS, getAllCategories } from "@/lib/articles";
import type { ArticleCategory } from "@/types";

const categories = getAllCategories();

function ArticleList() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<ArticleCategory | "all">("all");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const q = query.trim().toLowerCase();

  const filtered = ARTICLES.filter((a) => {
    const matchCategory = active === "all" || a.category === active;
    const matchQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  return (
    <>
      {/* 搜尋框 */}
      <div className="relative mb-6 max-w-md">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
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
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋文章…"
          className="w-full pl-9 pr-4 py-2.5 rounded-[10px] border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          aria-label="搜尋文章"
        />
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`inline-flex items-center px-3.5 py-1.5 rounded-[8px] text-sm font-medium transition-all ${
            active === "all"
              ? "bg-brand-500 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600"
          }`}
        >
          全部
        </button>
        {categories.map((c) => (
          <button
            key={c.category}
            type="button"
            onClick={() => setActive(c.category)}
            className={`inline-flex items-center px-3.5 py-1.5 rounded-[8px] text-sm font-medium transition-all ${
              active === c.category
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {c.label}
            <span className="ml-1 text-xs opacity-70">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
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

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-2">
            {q ? `找不到「${query}」相關文章` : "此分類尚無文章"}
          </p>
          {q && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              清除搜尋
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default function ArticlesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              首頁
            </Link>
            <span className="text-slate-300">/</span>
          </li>
          <li>
            <span className="text-slate-700">權益文章</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞工權益文章
      </h1>
      <p className="text-slate-500 mb-6 max-w-2xl">
        白話解讀勞基法與勞工權益，搭配免費計算工具，幫你搞懂薪資、加班、資遣、假別等常見問題。
      </p>

      <Suspense
        fallback={
          <div className="text-sm text-slate-400 py-4">載入中…</div>
        }
      >
        <ArticleList />
      </Suspense>
    </div>
  );
}
