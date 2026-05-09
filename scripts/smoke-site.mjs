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

const baseUrl = getBaseUrl();
const expectedSiteUrl = getExpectedSiteUrl();
const shouldCheckMarketingScripts =
  process.env.SMOKE_REQUIRE_MARKETING === "true" || baseUrl === expectedSiteUrl;

const corePages = [
  "/",
  "/tools/salary",
  "/tools/overtime",
  "/tools/severance",
  "/guides/salary",
  "/guides/overtime",
  "/guides/severance",
  "/growth-dashboard",
  "/articles/salary-60000-take-home",
  "/articles/overtime-4hours-calculation",
  "/articles/severance-1year",
  "/articles/severance-5years",
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

console.log(`Smoke check passed for ${baseUrl}`);
