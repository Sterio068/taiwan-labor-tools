import { describe, expect, it } from "vitest";
import { ARTICLES, getIndexableArticles } from "./articles";
import { ARTICLE_REDIRECTS } from "./article-redirects";
import {
  CONSOLIDATED_ARTICLES,
  IMPROVE_ARTICLE_SLUGS,
  isAdEligibleArticle,
  isIndexableArticle,
  isMonetizablePath,
} from "./content-policy";

describe("content policy", () => {
  it("keeps improve articles indexable until a page-level noindex decision", () => {
    const article = { slug: "salary-slip-explained", contentStatus: "improve" as const };

    expect(isIndexableArticle(article)).toBe(true);
    expect(isAdEligibleArticle(article)).toBe(false);
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

  it("redirects merged articles to pages that still exist", () => {
    const articleSlugs = new Set(ARTICLES.map((article) => article.slug));
    const indexable = new Set(getIndexableArticles().map((article) => `/articles/${article.slug}`));
    for (const [slug, destination] of Object.entries(ARTICLE_REDIRECTS)) {
      expect(articleSlugs.has(slug), `${slug} should be removed from ARTICLES`).toBe(false);
      if (destination.startsWith("/articles/")) {
        expect(indexable.has(destination), destination).toBe(true);
        expect(destination.slice("/articles/".length) in ARTICLE_REDIRECTS, destination).toBe(false);
      }
    }
  });
});
