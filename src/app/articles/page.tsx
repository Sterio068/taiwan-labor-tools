"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, CATEGORY_LABELS, getAllCategories } from "@/lib/articles";
import type { ArticleCategory } from "@/types";

const categories = getAllCategories();

export default function ArticlesPage() {
  const [active, setActive] = useState<ArticleCategory | "all">("all");

  const filtered =
    active === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === active);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="hover:text-brand-600 transition-colors"
            >
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
      <p className="text-slate-500 mb-8 max-w-2xl">
        白話解讀勞基法與勞工權益，搭配免費計算工具，幫你搞懂薪資、加班、資遣、假別等常見問題。
      </p>

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
        <p className="text-center text-slate-400 py-12">
          此分類尚無文章
        </p>
      )}
    </div>
  );
}
