import assert from "node:assert/strict";

const DEFAULT_BASE_URL = "https://twlabor.org";

function getBaseUrl() {
  const flagIndex = process.argv.indexOf("--base-url");
  const flagValue = flagIndex >= 0 ? process.argv[flagIndex + 1] : undefined;
  return (flagValue || process.env.SMOKE_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

function getExpectedSiteUrl() {
  return (process.env.SMOKE_SITE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

async function fetchText(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "user-agent": "twlabor-smoke-check/1.0" },
  });
  const body = await response.text();
  assert.equal(response.status, 200, `${path} returned ${response.status}`);
  return body;
}

function assertIncludes(body, expected, label) {
  assert.ok(body.includes(expected), `${label} missing: ${expected}`);
}

function visibleContentUnits(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const hanChars = text.match(/[\u4e00-\u9fff]/gu) || [];
  const words = text.replace(/[\u4e00-\u9fff]/gu, " ").match(/[A-Za-z0-9]+/g) || [];
  return hanChars.length + words.length;
}

function assertMinContentUnits(html, minUnits, label) {
  const count = visibleContentUnits(html);
  assert.ok(count >= minUnits, `${label} too thin: ${count} < ${minUnits}`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSitemapLastMod(sitemapXml, url) {
  const match = sitemapXml.match(
    new RegExp(
      `<url>\\s*<loc>${escapeRegExp(url)}</loc>\\s*<lastmod>([^<]+)</lastmod>`,
      "m"
    )
  );
  assert.ok(match, `sitemap entry missing for ${url}`);
  return match[1];
}

const baseUrl = getBaseUrl();
const expectedSiteUrl = getExpectedSiteUrl();
const shouldCheckMarketingScripts =
  process.env.SMOKE_REQUIRE_MARKETING === "true" || baseUrl === expectedSiteUrl;

const corePages = [
  "/",
  "/tools/salary",
  "/tools/overtime",
  "/tools/severance",
  "/questions",
  "/scenarios",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/sources",
  "/editorial-policy",
  "/guides/salary",
  "/guides/overtime",
  "/guides/severance",
  "/growth-dashboard",
  "/articles/salary-35000-take-home",
  "/articles/labor-insurance-bracket-2026",
  "/articles/health-insurance-bracket-2026",
  "/articles/labor-pension-6-percent",
  "/articles/unused-annual-leave-wage",
  "/articles/involuntary-separation-certificate",
  "/articles/salary-40000-take-home",
  "/articles/salary-50000-take-home",
  "/articles/salary-60000-take-home",
  "/articles/salary-38000-take-home",
  "/articles/salary-42000-take-home",
  "/articles/salary-55000-take-home",
  "/articles/overtime-1hour-calculation",
  "/articles/overtime-1-5hours-calculation",
  "/articles/overtime-2-5hours-calculation",
  "/articles/overtime-3hours-calculation",
  "/articles/overtime-4hours-calculation",
  "/articles/holiday-overtime-8hours",
  "/articles/overtime-evidence-checklist",
  "/articles/severance-6months",
  "/articles/severance-1year",
  "/articles/severance-18months",
  "/articles/severance-2years",
  "/articles/severance-4years",
  "/articles/severance-5years",
  "/articles/severance-10years",
  "/articles/annual-leave-resignation-payout-example",
  "/articles/labor-insurance-underreporting-complaint",
];

for (const path of corePages) {
  await fetchText(baseUrl, path);
}

const adsTxt = await fetchText(baseUrl, "/ads.txt");
assertIncludes(adsTxt, "google.com, pub-2306490072598524", "ads.txt");

const robotsTxt = await fetchText(baseUrl, "/robots.txt");
assertIncludes(robotsTxt, "Sitemap: https://twlabor.org/sitemap.xml", "robots.txt sitemap");
assertIncludes(robotsTxt, "Googlebot", "robots.txt Googlebot policy");
assertIncludes(robotsTxt, "GPTBot", "robots.txt AI crawler policy");

const sitemapXml = await fetchText(baseUrl, "/sitemap.xml");
for (const path of corePages) {
  assertIncludes(sitemapXml, `${expectedSiteUrl}${path}`, `sitemap ${path}`);
}
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/salary-slip-explained`).startsWith("2026-04-07"),
  "sitemap should keep older article lastmod stable"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/salary-50000-take-home`).startsWith("2026-05-09"),
  "sitemap should expose new article lastmod"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/salary-35000-take-home`).startsWith("2026-05-10"),
  "sitemap should expose latest long-tail article lastmod"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/salary-38000-take-home`).startsWith("2026-05-10"),
  "sitemap should expose new salary long-tail article lastmod"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/overtime-evidence-checklist`).startsWith("2026-05-10"),
  "sitemap should expose new evidence article lastmod"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/questions`).startsWith("2026-05-10"),
  "sitemap should expose questions hub lastmod"
);

const salaryTool = await fetchText(baseUrl, "/tools/salary");
if (shouldCheckMarketingScripts) {
  assertIncludes(salaryTool, "G-387GVXD53G", "GA4 script");
  assertIncludes(salaryTool, "ca-pub-2306490072598524", "AdSense script");
}
assertIncludes(salaryTool, "application/ld+json", "schema JSON-LD");
assertIncludes(salaryTool, "算完下一步", "tool next-step panel");
assertIncludes(salaryTool, `${expectedSiteUrl}/tools/salary`, "canonical");

const highIntentArticle = await fetchText(baseUrl, "/articles/salary-60000-take-home");
assertIncludes(highIntentArticle, "月薪 60000 實領多少", "high intent article title");
assertIncludes(highIntentArticle, "application/ld+json", "article schema JSON-LD");

const evidenceArticle = await fetchText(baseUrl, "/articles/overtime-evidence-checklist");
assertIncludes(evidenceArticle, "加班費爭議證據清單", "evidence article title");
assertIncludes(evidenceArticle, "application/ld+json", "evidence article schema JSON-LD");

const questionsHub = await fetchText(baseUrl, "/questions");
assertIncludes(questionsHub, "勞工權益熱門問題", "questions hub title");
assertIncludes(questionsHub, "application/ld+json", "questions schema JSON-LD");

const scenariosHub = await fetchText(baseUrl, "/scenarios");
assertIncludes(scenariosHub, "勞工權益情境入口", "scenarios hub title");
assertIncludes(scenariosHub, "application/ld+json", "scenarios schema JSON-LD");

const trustPages = [
  { path: "/about", title: "關於勞工權益站", minUnits: 900 },
  { path: "/contact", title: "聯絡與回饋", minUnits: 700 },
  { path: "/privacy", title: "隱私權政策", minUnits: 950 },
  { path: "/terms", title: "服務條款", minUnits: 1050 },
  { path: "/sources", title: "資料來源與更新紀錄", minUnits: 850 },
  { path: "/editorial-policy", title: "編輯政策", minUnits: 1200 },
];

for (const page of trustPages) {
  const html = await fetchText(baseUrl, page.path);
  assertIncludes(html, page.title, `trust page ${page.path} title`);
  assertIncludes(html, `${expectedSiteUrl}${page.path}`, `trust page ${page.path} canonical`);
  assertMinContentUnits(html, page.minUnits, `trust page ${page.path}`);
}

console.log(`Smoke check passed for ${baseUrl}`);
