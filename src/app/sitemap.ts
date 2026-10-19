import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { TOOLS } from "@/data/constants";
import { GUIDE_HUBS } from "@/data/guide-hubs";
import { SITE_URL } from "@/lib/seo";

const UPDATED_2026_05_07 = "2026-05-07";
const UPDATED_2026_05_09 = "2026-05-09";
const UPDATED_2026_05_10 = "2026-05-10";
const UPDATED_2026_05_25 = "2026-05-25";
const UPDATED_2026_04_30 = "2026-04-30";
const UPDATED_2026_04_07 = "2026-04-07";
const UPDATED_2026_10_19 = "2026-10-19";

const STATIC_LASTMOD: Record<string, string> = {
  "/": UPDATED_2026_05_10,
  "/tools": UPDATED_2026_10_19,
  "/questions": UPDATED_2026_10_19,
  "/scenarios": UPDATED_2026_10_19,
  "/guides": UPDATED_2026_10_19,
  "/compare": UPDATED_2026_10_19,
  "/articles": UPDATED_2026_05_10,
  "/faq": UPDATED_2026_10_19,
  "/glossary": UPDATED_2026_10_19,
  "/minimum-wage": UPDATED_2026_10_19,
  "/about": UPDATED_2026_10_19,
  "/privacy": UPDATED_2026_10_19,
  "/terms": UPDATED_2026_10_19,
  "/sources": UPDATED_2026_10_19,
  "/contact": UPDATED_2026_10_19,
  "/editorial-policy": UPDATED_2026_10_19,
  "/checklists": UPDATED_2026_10_19,
};

const COMPARE_LASTMOD: Record<string, string> = {
  "/compare/monthly-vs-hourly": UPDATED_2026_10_19,
  "/compare/new-vs-old-pension": UPDATED_2026_10_19,
  "/compare/fired-vs-quit": UPDATED_2026_10_19,
  "/compare/labor-vs-national-insurance": UPDATED_2026_10_19,
};

function page(urlPath: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) {
  return {
    url: `${SITE_URL}${urlPath === "/" ? "" : urlPath}`,
    lastModified: STATIC_LASTMOD[urlPath] ?? UPDATED_2026_04_30,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    page("/", "weekly", 1),
    page("/tools", "weekly", 0.9),
    page("/questions", "weekly", 0.88),
    page("/scenarios", "weekly", 0.88),
    page("/guides", "weekly", 0.9),
    page("/compare", "weekly", 0.85),
    page("/articles", "weekly", 0.8),
    page("/faq", "monthly", 0.78),
    page("/glossary", "monthly", 0.8),
    page("/minimum-wage", "monthly", 0.85),
    page("/sources", "monthly", 0.72),
    page("/editorial-policy", "monthly", 0.7),
    page("/checklists", "monthly", 0.74),
    page("/contact", "yearly", 0.3),
    page("/about", "monthly", 0.35),
    page("/privacy", "yearly", 0.12),
    page("/terms", "yearly", 0.12),
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDE_HUBS.map((hub) => ({
    url: `${SITE_URL}/guides/${hub.slug}`,
    lastModified: UPDATED_2026_10_19,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const legacyGuidePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guides/retirement`,
      lastModified: UPDATED_2026_10_19,
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];

  const comparePages: MetadataRoute.Sitemap = Object.entries(COMPARE_LASTMOD).map(([path, lastModified]) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}${tool.href}`,
    lastModified: UPDATED_2026_10_19,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.filter((article) => !article.noindex).map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages, ...legacyGuidePages, ...comparePages, ...toolPages, ...articlePages];
}
