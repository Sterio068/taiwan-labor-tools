export type ContentStatus = "indexable" | "improve";

/**
 * 待改善文章清單。2026-11 整併後已清空：原本的單一數字模板頁與重疊主題文章，
 * 都已合併進主題文章並以 301 轉址（見 article-redirects.ts）。
 */
export const IMPROVE_ARTICLE_SLUGS = new Set<string>([]);

export interface ConsolidatedArticle {
  pillarHref: string;
  pillarTitle: string;
}

/** 已整併、但仍保留網址的文章。目前沒有：整併過的網址一律 301 轉址。 */
export const CONSOLIDATED_ARTICLES: Record<string, ConsolidatedArticle> = {};

export function getConsolidatedArticle(slug: string): ConsolidatedArticle | undefined {
  return CONSOLIDATED_ARTICLES[slug];
}

export function contentStatus(slug: string): ContentStatus {
  return IMPROVE_ARTICLE_SLUGS.has(slug) ? "improve" : "indexable";
}

export function isIndexableArticle(article: { slug: string; contentStatus?: ContentStatus; noindex?: boolean }) {
  // Content quality review and search eligibility are separate decisions.
  // Do not blanket-noindex the improve queue: each URL needs page-level evidence
  // before it is removed from search. `noindex` remains an explicit override.
  return article.noindex !== true;
}

export function isAdEligibleArticle(article: {
  slug: string;
  contentStatus?: ContentStatus;
  noindex?: boolean;
}) {
  return isIndexableArticle(article) &&
    (article.contentStatus ?? contentStatus(article.slug)) === "indexable";
}

export function isMonetizablePath(pathname: string): boolean {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if (!path.startsWith("/articles/")) return true;
  const rest = path.slice("/articles/".length);
  if (rest.startsWith("category/") || rest.startsWith("tag/")) return false;
  return isAdEligibleArticle({ slug: rest });
}
