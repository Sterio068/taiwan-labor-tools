import { describe, expect, it } from "vitest";
import { isAdEligibleArticle, isIndexableArticle, isMonetizablePath } from "./content-policy";

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
});
