export type ContentStatus = "indexable" | "improve";

export const IMPROVE_ARTICLE_SLUGS = new Set<string>([
  "salary-30000-take-home",
  "salary-35000-take-home",
  "salary-38000-take-home",
  "salary-40000-take-home",
  "salary-42000-take-home",
  "salary-45000-take-home",
  "salary-50000-take-home",
  "salary-55000-take-home",
  "salary-60000-take-home",
  "overtime-1hour-calculation",
  "overtime-1-5hours-calculation",
  "overtime-2hours-calculation",
  "overtime-2-5hours-calculation",
  "overtime-3hours-calculation",
  "overtime-4hours-calculation",
  "severance-6months",
  "severance-18months",
  "severance-1year",
  "severance-2years",
  "severance-3years",
  "severance-4years",
  "severance-5years",
  "severance-10years",
  "annual-leave-resignation-payout-example",
  "health-insurance-bracket-2026",
  "holiday-overtime-8hours",
  "labor-insurance-underreporting-complaint",
  "overtime-evidence-checklist",
  "unused-annual-leave-wage",
]);

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
