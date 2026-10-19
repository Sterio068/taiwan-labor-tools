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

export interface ConsolidatedArticle {
  pillarHref: string;
  pillarTitle: string;
}

const SALARY_PILLAR = { pillarHref: "/articles/insurance-deduction-examples", pillarTitle: "勞健保自付額計算：不同月薪的實際扣款" };
const OVERTIME_PILLAR = { pillarHref: "/articles/overtime-calculation-examples", pillarTitle: "加班費計算實例：平日、休息日、國定假日速查表" };
const SEVERANCE_PILLAR = { pillarHref: "/articles/severance-calculation-complete", pillarTitle: "資遣費完整計算指南（含年資速查表）" };
const LEAVE_PILLAR = { pillarHref: "/articles/annual-leave-2026", pillarTitle: "2026 特休假完整攻略：年資對照與未休折算" };

/**
 * 單一數字情境的模板頁（例如「月薪 38,000 實領多少」「資遣 2 年拿多少」）彼此高度相似，
 * 內容已整合進對應的主題文章與工具頁。這些網址保留給既有訪客使用，但設為 noindex，
 * 並在頁面上引導到完整說明，避免以大量相似頁面稀釋站內內容品質。
 */
export const CONSOLIDATED_ARTICLES: Record<string, ConsolidatedArticle> = {
  "salary-30000-take-home": SALARY_PILLAR,
  "salary-35000-take-home": SALARY_PILLAR,
  "salary-38000-take-home": SALARY_PILLAR,
  "salary-40000-take-home": SALARY_PILLAR,
  "salary-42000-take-home": SALARY_PILLAR,
  "salary-45000-take-home": SALARY_PILLAR,
  "salary-50000-take-home": SALARY_PILLAR,
  "salary-55000-take-home": SALARY_PILLAR,
  "salary-60000-take-home": SALARY_PILLAR,
  "overtime-1hour-calculation": OVERTIME_PILLAR,
  "overtime-1-5hours-calculation": OVERTIME_PILLAR,
  "overtime-2hours-calculation": OVERTIME_PILLAR,
  "overtime-2-5hours-calculation": OVERTIME_PILLAR,
  "overtime-3hours-calculation": OVERTIME_PILLAR,
  "overtime-4hours-calculation": OVERTIME_PILLAR,
  "severance-6months": SEVERANCE_PILLAR,
  "severance-18months": SEVERANCE_PILLAR,
  "severance-1year": SEVERANCE_PILLAR,
  "severance-2years": SEVERANCE_PILLAR,
  "severance-3years": SEVERANCE_PILLAR,
  "severance-4years": SEVERANCE_PILLAR,
  "severance-5years": SEVERANCE_PILLAR,
  "severance-10years": SEVERANCE_PILLAR,
  "holiday-overtime-8hours": { pillarHref: "/articles/holiday-overtime-complete", pillarTitle: "國定假日加班費怎麼算：假日清單與計算表" },
  "annual-leave-resignation-payout-example": LEAVE_PILLAR,
  "unused-annual-leave-wage": LEAVE_PILLAR,
  "health-insurance-bracket-2026": { pillarHref: "/articles/labor-nhi-bracket-guide", pillarTitle: "勞健保投保級距一次看懂" },
  "labor-insurance-underreporting-complaint": { pillarHref: "/articles/labor-insurance-bracket-2026", pillarTitle: "2026 勞保投保級距表與低報處理方式" },
  "overtime-evidence-checklist": { pillarHref: "/guides/overtime", pillarTitle: "加班費完整指南（含證據清單）" },
};

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
