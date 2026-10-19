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
  "/minimum-wage",
  "/articles/insurance-deduction-examples",
  "/articles/overtime-calculation-examples",
  "/articles/severance-calculation-complete",
  "/articles/holiday-overtime-complete",
  "/articles/labor-insurance-bracket-2026",
  "/articles/labor-nhi-bracket-guide",
  "/articles/labor-pension-6-percent",
  "/articles/involuntary-separation-certificate",
];

// Template pages consolidated into pillar articles (src/lib/content-policy.ts):
// still reachable for visitors, but noindex and out of the sitemap.
const consolidatedPages = [
  "/articles/salary-38000-take-home",
  "/articles/overtime-2hours-calculation",
  "/articles/severance-2years",
  "/articles/holiday-overtime-8hours",
  "/articles/overtime-evidence-checklist",
];
const noindexUtilityPages = ["/growth-dashboard", "/newsletter"];

for (const path of corePages) {
  await fetchText(baseUrl, path);
}
for (const path of [...consolidatedPages, ...noindexUtilityPages]) {
  const html = await fetchText(baseUrl, path);
  assert.match(html, /<meta name="robots" content="noindex, follow"/, `${path} should be noindex`);
}
for (const path of consolidatedPages) {
  const html = await fetchText(baseUrl, path);
  assertIncludes(html, "這篇是單一情境的試算", `${path} pillar notice`);
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
for (const path of [...consolidatedPages, ...noindexUtilityPages]) {
  assert.ok(!sitemapXml.includes(`${expectedSiteUrl}${path}<`), `sitemap should not list noindex page ${path}`);
}
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/articles/insurance-deduction-examples`).startsWith("2026-10-19"),
  "sitemap should expose the rewritten pillar article lastmod"
);
assert.ok(
  getSitemapLastMod(sitemapXml, `${expectedSiteUrl}/questions`).startsWith("2026-10-19"),
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

const highIntentArticle = await fetchText(baseUrl, "/articles/insurance-deduction-examples");
assertIncludes(highIntentArticle, "實領速查表", "pillar article title");
assertIncludes(highIntentArticle, "application/ld+json", "article schema JSON-LD");

const overtimeTool = await fetchText(baseUrl, "/tools/overtime");
assertIncludes(overtimeTool, "法源依據", "tool explainer legal basis");
assertIncludes(overtimeTool, "law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001", "tool explainer law citation");

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
