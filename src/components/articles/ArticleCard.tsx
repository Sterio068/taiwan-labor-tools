import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/articles";
import type { ArticleMeta } from "@/types";

interface ArticleCardProps {
  article: ArticleMeta;
  trackingName: string;
}

export function ArticleCard({ article, trackingName }: ArticleCardProps) {
  const href = `/articles/${article.slug}`;

  return (
    <Link
      href={href}
      data-track={trackingName}
      data-track-label={article.title}
      data-track-target={href}
      className="group flex h-full flex-col rounded-[18px] border border-slate-200 bg-surface p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-[background-color,border-color,box-shadow] hover:border-brand-300 hover:shadow-[0_10px_25px_rgba(15,23,42,0.09)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-[8px] bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
          {CATEGORY_LABELS[article.category]}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {article.readingMinutes} 分鐘閱讀
        </span>
      </div>
      <h2 className="text-lg font-extrabold leading-snug text-slate-950 transition-colors group-hover:text-brand-700">
        {article.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
        {article.description}
      </p>
      <span className="mt-5 text-sm font-bold text-brand-700">閱讀文章</span>
    </Link>
  );
}
