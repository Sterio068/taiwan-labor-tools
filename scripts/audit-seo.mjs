import { existsSync, readFileSync } from "node:fs";

const checks = [];

function record(level, label, message = "") {
  checks.push({ level, label, message });
}

function pass(label) {
  record("PASS", label);
}

function fail(label, message) {
  record("FAIL", label, message);
}

function read(path) {
  if (!existsSync(path)) {
    fail("Missing file", path);
    return "";
  }
  return readFileSync(path, "utf8");
}

const seo = read("src/lib/seo.ts");
const articlePage = read("src/app/articles/[slug]/page.tsx");
const articleSources = read("src/data/article-sources.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const sourcesPage = read("src/app/sources/page.tsx");

if (
  seo.includes("citation") &&
  seo.includes("isBasedOn") &&
  seo.includes("mainEntityOfPage") &&
  seo.includes("isAccessibleForFree")
) {
  pass("Article schema includes source, authority, and freshness fields");
} else {
  fail("Article schema authority fields", "Expected citation, isBasedOn, mainEntityOfPage, and isAccessibleForFree");
}

if (articlePage.includes("getArticleSources") && articlePage.includes("sources,") && articlePage.includes("本文參考資料")) {
  pass("Article pages pass official sources into schema and visible trust section");
} else {
  fail("Article source wiring", "Article pages should show sources and pass them into structured data");
}

if ((articleSources.match(/url:\s*"https:\/\//g) ?? []).length >= 6) {
  pass("Official article source URLs are present");
} else {
  fail("Official source coverage", "Expected multiple HTTPS official source URLs in src/data/article-sources.ts");
}

if (seo.includes("WebApplication") && seo.includes("mainEntityOfPage") && seo.includes("dateModified")) {
  pass("Tool WebApplication schema supports page and freshness fields");
} else {
  fail("Tool schema richness", "Expected WebApplication schema to support mainEntityOfPage and dateModified");
}

if (sitemap.includes("STATIC_LASTMOD") && !sitemap.includes("new Date().toISOString()")) {
  pass("Sitemap uses explicit content lastmod values");
} else {
  fail("Sitemap freshness", "Sitemap should use explicit content update dates, not build time");
}

if (robots.includes("Googlebot") && robots.includes("sitemap")) {
  pass("Robots exposes sitemap and crawler rules");
} else {
  fail("Robots configuration", "Expected robots.ts to include crawler rules and sitemap");
}

for (const route of ["about", "contact", "privacy", "terms", "editorial-policy", "sources"]) {
  if (existsSync(`src/app/${route}/page.tsx`)) {
    pass(`Trust page exists: /${route}`);
  } else {
    fail("Missing trust page", `/${route}`);
  }
}

if (sourcesPage.includes("OFFICIAL_SOURCES") && sourcesPage.includes("DATA_UPDATE_LOG")) {
  pass("Sources page exposes official sources and update log");
} else {
  fail("Sources page completeness", "Expected official sources and update log on /sources");
}

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}
