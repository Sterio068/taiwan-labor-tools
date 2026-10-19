import { describe, expect, it } from "vitest";
import { ARTICLES, getIndexableArticles } from "./articles";
import {
  CONSOLIDATED_ARTICLES,
  IMPROVE_ARTICLE_SLUGS,
  isAdEligibleArticle,
  isIndexableArticle,
  isMonetizablePath,
} from "./content-policy";

describe("content policy", () => {
  it("keeps improve articles indexable until a page-level noindex decision", () => {
    const article = { slug: "holiday-overtime-8hours", contentStatus: "improve" as const };

    expect(isIndexableArticle(article)).toBe(true);
    expect(isAdEligibleArticle(article)).toBe(false);
    expect(isMonetizablePath("/articles/holiday-overtime-8hours")).toBe(false);
  });

  it("honors an explicit noindex override", () => {
    const article = { slug: "salary-slip-explained", noindex: true };

    expect(isIndexableArticle(article)).toBe(false);
    expect(isAdEligibleArticle(article)).toBe(false);
  });

  it("keeps regular article paths monetizable", () => {
    expect(isMonetizablePath("/articles/salary-slip-explained")).toBe(true);
    expect(isMonetizablePath("/tools/salary")).toBe(true);
  });

  it("noindexes consolidated template articles and points them at indexable pillars", () => {
    const indexable = new Set(getIndexableArticles().map((article) => `/articles/${article.slug}`));
    for (const [slug, consolidated] of Object.entries(CONSOLIDATED_ARTICLES)) {
      const article = ARTICLES.find((item) => item.slug === slug);
      expect(article?.noindex, slug).toBe(true);
      expect(indexable.has(`/articles/${slug}`)).toBe(false);
      if (consolidated.pillarHref.startsWith("/articles/")) {
        expect(indexable.has(consolidated.pillarHref), consolidated.pillarHref).toBe(true);
      }
    }
  });

  it("leaves no indexable article in the improve queue", () => {
    const indexableImprove = [...IMPROVE_ARTICLE_SLUGS].filter((slug) =>
      getIndexableArticles().some((article) => article.slug === slug),
    );
    expect(indexableImprove).toEqual([]);
  });
});
