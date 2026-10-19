#!/usr/bin/env node
/**
 * Live content-value and AdSense readiness audit for twlabor.org.
 *
 * Walks every sitemap URL (production by default) and checks the signals a
 * reviewer uses to judge whether a page is a useful public resource:
 *   - unique visible text in <main> (site-wide boilerplate removed)
 *   - near-duplicate pages (templated text shared between pages)
 *   - title / meta description / canonical / robots
 *   - H1 / H2 structure and internal links
 *   - citations to official (gov.tw) sources
 *   - JSON-LD presence and validity
 *   - no "click the ads" style copy
 *   - whether monetizable content routes load the AdSense script
 *
 * Modelled on skill-exam-hub/scripts/audit-content-value.mjs, adapted to the
 * page types of this site (tools, guides, comparisons, checklists, articles).
 *
 * Usage:
 *   node scripts/audit-content-live.mjs
 *   node scripts/audit-content-live.mjs --fetch-base-url http://127.0.0.1:3000
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_BASE_URL = "https://twlabor.org";
const DEFAULT_OUT = ".content-audit/content-value-audit.json";
const BOILERPLATE_PAGE_SHARE = 0.2;
const SHINGLE_SIZE = 8;
// 8-character shingle Jaccard on unique text. Distinct articles on this site
// score <= 0.12; templated "same page, different number" articles score 0.15-0.25.
const NEAR_DUPLICATE_SIMILARITY = 0.15;
// Descriptions are mostly Chinese, so length is measured in content units.
const MIN_DESCRIPTION_UNITS = 30;

const ADSENSE_FORBIDDEN_TEXT = [
  /click\s+(?:an?\s+|the\s+)?ads?/iu,
  /support\s+us\s+by\s+clicking/iu,
  /help\s+keep\s+this\s+site\s+running/iu,
  /點擊(?:一下|這些)?廣告(?:支持|贊助|幫助)/u,
  /按(?:一下|下)?廣告(?:支持|贊助|幫助)/u,
  /看(?:一下|看)?廣告(?:支持|贊助)/u,
  /支持本站.{0,12}(?:點擊|按).{0,4}廣告/u,
  /請(?:多)?(?:點擊|點選|點)廣告/u,
];

// Thresholds are in "content units": Han characters + Latin words, counted
// on unique <main> text only (navigation/footer/shared blocks removed).
export const PAGE_RULES = {
  home: { minUnits: 700, minInternalLinks: 24, minJsonLd: 2, minOfficialLinks: 0, requireAdsense: true },
  "tool-hub": { minUnits: 800, minInternalLinks: 18, minJsonLd: 2, minOfficialLinks: 0, requireAdsense: true },
  tool: { minUnits: 1500, minInternalLinks: 8, minJsonLd: 3, minOfficialLinks: 2, requireAdsense: true },
  "guide-hub": { minUnits: 800, minInternalLinks: 12, minJsonLd: 2, minOfficialLinks: 0, requireAdsense: true },
  guide: { minUnits: 1600, minInternalLinks: 8, minJsonLd: 2, minOfficialLinks: 2, requireAdsense: true },
  "compare-hub": { minUnits: 600, minInternalLinks: 6, minJsonLd: 1, minOfficialLinks: 0, requireAdsense: true },
  compare: { minUnits: 1200, minInternalLinks: 6, minJsonLd: 2, minOfficialLinks: 1, requireAdsense: true },
  "article-hub": { minUnits: 800, minInternalLinks: 18, minJsonLd: 2, minOfficialLinks: 0, requireAdsense: true },
  article: { minUnits: 1600, minInternalLinks: 6, minJsonLd: 2, minOfficialLinks: 1, requireAdsense: true },
  reference: { minUnits: 1000, minInternalLinks: 8, minJsonLd: 1, minOfficialLinks: 0, requireAdsense: true },
  policy: { minUnits: 350, minInternalLinks: 2, minJsonLd: 1, minOfficialLinks: 0, requireAdsense: false },
  utility: { minUnits: 300, minInternalLinks: 2, minJsonLd: 0, minOfficialLinks: 0, requireAdsense: false },
  default: { minUnits: 650, minInternalLinks: 4, minJsonLd: 1, minOfficialLinks: 0, requireAdsense: false },
};

const REFERENCE_PATHS = new Set([
  "/faq",
  "/glossary",
  "/minimum-wage",
  "/questions",
  "/scenarios",
  "/checklists",
  "/sources",
]);
const POLICY_PATHS = new Set(["/about", "/contact", "/editorial-policy", "/privacy", "/terms"]);
const UTILITY_PATHS = new Set(["/newsletter", "/growth-dashboard"]);

export function classifyPath(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/tools") return "tool-hub";
  if (/^\/tools\/[^/]+$/u.test(pathname)) return "tool";
  if (pathname === "/guides") return "guide-hub";
  if (/^\/guides\/[^/]+$/u.test(pathname)) return "guide";
  if (pathname === "/compare") return "compare-hub";
  if (/^\/compare\/[^/]+$/u.test(pathname)) return "compare";
  if (pathname === "/articles" || /^\/articles\/category\/[^/]+$/u.test(pathname)) return "article-hub";
  if (/^\/articles\/[^/]+$/u.test(pathname)) return "article";
  if (REFERENCE_PATHS.has(pathname)) return "reference";
  if (POLICY_PATHS.has(pathname)) return "policy";
  if (UTILITY_PATHS.has(pathname)) return "utility";
  return "default";
}

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.AUDIT_BASE_URL ?? DEFAULT_BASE_URL,
    fetchBaseUrl: process.env.AUDIT_FETCH_BASE_URL ?? "",
    output: DEFAULT_OUT,
    concurrency: 6,
    failOnErrors: false,
    failOnWarnings: false,
  };
  const valueOf = (arg, name, i) =>
    arg.startsWith(`${name}=`) ? [arg.slice(name.length + 1), i] : [argv[i + 1], i + 1];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--base-url")) [args.baseUrl, i] = valueOf(arg, "--base-url", i);
    else if (arg.startsWith("--fetch-base-url")) [args.fetchBaseUrl, i] = valueOf(arg, "--fetch-base-url", i);
    else if (arg.startsWith("--output")) [args.output, i] = valueOf(arg, "--output", i);
    else if (arg.startsWith("--concurrency")) {
      let value;
      [value, i] = valueOf(arg, "--concurrency", i);
      args.concurrency = Number(value) || 6;
    } else if (arg === "--fail-on-errors") args.failOnErrors = true;
    else if (arg === "--fail-on-warnings") args.failOnWarnings = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/audit-content-live.mjs [options]
  --base-url <url>        Canonical origin. Default: ${DEFAULT_BASE_URL}
  --fetch-base-url <url>  Origin used for HTTP fetches (e.g. a local \`next start\`).
  --output <path>         JSON report path. Default: ${DEFAULT_OUT}
  --concurrency <n>       Concurrent fetches. Default: 6
  --fail-on-errors        Exit 1 on hard errors.
  --fail-on-warnings      Exit 1 on errors or warnings.`);
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  args.baseUrl = args.baseUrl.replace(/\/+$/u, "");
  args.fetchBaseUrl = (args.fetchBaseUrl || args.baseUrl).replace(/\/+$/u, "");
  return args;
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "twlabor-content-value-audit/1.0" },
  });
  return { response, text: await response.text() };
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/giu, " ")
    .replace(/&amp;/giu, "&")
    .replace(/&lt;/giu, "<")
    .replace(/&gt;/giu, ">")
    .replace(/&quot;/giu, '"')
    .replace(/&#x27;|&#39;/giu, "'");
}

function removeNonVisible(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[\s\S]*?<\/style>/giu, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/giu, " ")
    .replace(/<template\b[\s\S]*?<\/template>/giu, " ")
    .replace(/<!--[\s\S]*?-->/gu, " ");
}

export function extractMainHtml(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/iu);
  return match ? match[1] : html;
}

/** Splits visible markup into text blocks (one per text node run). */
export function textBlocks(html) {
  return removeNonVisible(html)
    .split(/<[^>]+>/u)
    .map((part) => decodeEntities(part).replace(/\s+/gu, " ").trim())
    .filter((part) => part.length > 0);
}

export function contentUnits(text) {
  const han = text.match(/[㐀-鿿]/gu) ?? [];
  const words = text.replace(/[㐀-鿿]/gu, " ").match(/[A-Za-z0-9][A-Za-z0-9.,%]*/gu) ?? [];
  return han.length + words.length;
}

function extractFirst(html, pattern) {
  return decodeEntities(html.match(pattern)?.[1]?.trim() ?? "");
}

function metaContent(html, name) {
  const tag = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, "iu"))?.[0] ?? "";
  return extractFirst(tag, /content=["']([^"']*)["']/iu);
}

function extractJsonLdTypes(html) {
  const types = [];
  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu,
  )) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : parsed["@graph"] ?? [parsed];
      for (const item of items) {
        const type = item?.["@type"];
        if (Array.isArray(type)) types.push(...type.map(String));
        else if (type) types.push(String(type));
      }
    } catch {
      types.push("unparseable");
    }
  }
  return types;
}

function extractLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const internal = new Set();
  const official = new Set();
  for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/giu)) {
    const href = decodeEntities(match[1] ?? "").trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const url = new URL(href, base);
      if (url.hostname === base.hostname) internal.add(url.pathname.replace(/\/$/u, "") || "/");
      else if (/(?:^|\.)gov\.tw$/u.test(url.hostname)) official.add(`${url.hostname}${url.pathname}${url.search}`);
    } catch {
      // Malformed hrefs are not content-value signals.
    }
  }
  return { internal: [...internal], official: [...official] };
}

export function extractPageSignals(html, url, baseUrl) {
  const pathname = new URL(url).pathname.replace(/\/$/u, "") || "/";
  const mainHtml = extractMainHtml(html);
  const blocks = textBlocks(mainHtml);
  const visibleText = blocks.join(" ");
  const links = extractLinks(html, baseUrl);
  return {
    path: pathname,
    pageType: classifyPath(pathname),
    title: extractFirst(html, /<title[^>]*>([^<]+)<\/title>/iu),
    description: metaContent(html, "description"),
    canonical: extractFirst(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/iu),
    robots: metaContent(html, "robots").toLowerCase(),
    h1Count: [...html.matchAll(/<h1\b/giu)].length,
    h2Count: [...mainHtml.matchAll(/<h2\b/giu)].length,
    mainUnits: contentUnits(visibleText),
    blocks,
    internalLinkCount: links.internal.length,
    officialLinkCount: links.official.length,
    jsonLdTypes: extractJsonLdTypes(html),
    hasAdsenseScript: /adsbygoogle\.js\?client=ca-pub-\d+/iu.test(html),
    hasPolicyRiskText: ADSENSE_FORBIDDEN_TEXT.some((pattern) => pattern.test(visibleText)),
  };
}

/** Blocks that appear on many pages (nav-like asides, shared CTAs) are not unique content. */
export function findBoilerplateBlocks(pages) {
  const frequency = new Map();
  for (const page of pages) {
    for (const block of new Set(page.blocks)) frequency.set(block, (frequency.get(block) ?? 0) + 1);
  }
  const limit = Math.max(3, Math.ceil(pages.length * BOILERPLATE_PAGE_SHARE));
  return new Set([...frequency].filter(([, count]) => count >= limit).map(([block]) => block));
}

function shingles(text) {
  const compact = text.replace(/[\s\p{P}\p{S}]+/gu, "");
  const set = new Set();
  for (let i = 0; i + SHINGLE_SIZE <= compact.length; i++) set.add(compact.slice(i, i + SHINGLE_SIZE));
  return set;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  let shared = 0;
  for (const item of small) if (large.has(item)) shared += 1;
  return shared / (a.size + b.size - shared);
}

export function findNearDuplicates(pages) {
  const sets = pages.map((page) => shingles(page.uniqueText));
  const best = pages.map(() => ({ path: "", similarity: 0 }));
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const similarity = jaccard(sets[i], sets[j]);
      if (similarity > best[i].similarity) best[i] = { path: pages[j].path, similarity };
      if (similarity > best[j].similarity) best[j] = { path: pages[i].path, similarity };
    }
  }
  return best;
}

function issue(id, severity, message) {
  return { id, severity, message };
}

export function evaluatePage(page, baseUrl) {
  const issues = [];
  const rule = PAGE_RULES[page.pageType] ?? PAGE_RULES.default;
  const expectedCanonical = `${baseUrl}${page.path === "/" ? "" : page.path}`;
  const canonical = page.canonical.replace(/\/$/u, "");

  if (page.status !== 200) issues.push(issue("http-status", "error", `HTTP ${page.status}`));
  if (page.title.length < 8) issues.push(issue("missing-title", "error", "title missing or too short"));
  if (contentUnits(page.description) < MIN_DESCRIPTION_UNITS) {
    issues.push(issue("short-description", "warning", `meta description < ${MIN_DESCRIPTION_UNITS} units`));
  }
  if (!canonical) issues.push(issue("missing-canonical", "error", "canonical missing"));
  else if (canonical !== expectedCanonical) {
    issues.push(issue("canonical-mismatch", "error", `canonical is ${page.canonical}`));
  }
  if (page.robots.includes("noindex")) issues.push(issue("sitemap-noindex", "error", "sitemap URL is noindex"));
  if (page.h1Count !== 1) issues.push(issue("h1-count", page.h1Count === 0 ? "error" : "warning", `H1 count ${page.h1Count}`));
  if (page.uniqueUnits < rule.minUnits) {
    issues.push(issue("thin-content", "warning", `unique main text ${page.uniqueUnits} units < ${rule.minUnits}`));
  }
  if (page.internalLinkCount < rule.minInternalLinks) {
    issues.push(issue("weak-internal-links", "warning", `internal links ${page.internalLinkCount} < ${rule.minInternalLinks}`));
  }
  if (page.officialLinkCount < rule.minOfficialLinks) {
    issues.push(issue("missing-official-citations", "warning", `official gov.tw links ${page.officialLinkCount} < ${rule.minOfficialLinks}`));
  }
  if (page.jsonLdTypes.length < rule.minJsonLd) {
    issues.push(issue("weak-structured-data", "warning", `JSON-LD ${page.jsonLdTypes.length} < ${rule.minJsonLd}`));
  }
  if (page.jsonLdTypes.includes("unparseable")) issues.push(issue("invalid-jsonld", "error", "JSON-LD cannot be parsed"));
  if (page.nearDuplicate.similarity >= NEAR_DUPLICATE_SIMILARITY) {
    issues.push(
      issue(
        "near-duplicate",
        "warning",
        `unique text ${(page.nearDuplicate.similarity * 100).toFixed(0)}% similar to ${page.nearDuplicate.path}`,
      ),
    );
  }
  if (rule.requireAdsense && !page.hasAdsenseScript) {
    issues.push(issue("missing-adsense", "warning", "monetizable route does not load AdSense"));
  }
  if (page.hasPolicyRiskText) issues.push(issue("adsense-policy-risk", "error", "click-inducement copy detected"));
  return issues;
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function scan(url, args) {
  const reportUrl = new URL(url);
  try {
    const { response, text } = await fetchText(`${args.fetchBaseUrl}${reportUrl.pathname}`);
    return { url, status: response.status, ...extractPageSignals(text, url, args.baseUrl) };
  } catch (error) {
    return {
      url,
      status: 0,
      ...extractPageSignals("", url, args.baseUrl),
      fetchError: error instanceof Error ? error.message : String(error),
    };
  }
}

function summarizeByType(pages) {
  const byType = {};
  for (const page of pages) {
    const entry = (byType[page.pageType] ??= { pages: 0, passed: 0, medianUnits: 0, units: [] });
    entry.pages += 1;
    if (page.issues.length === 0) entry.passed += 1;
    entry.units.push(page.uniqueUnits);
  }
  for (const entry of Object.values(byType)) {
    const sorted = entry.units.sort((a, b) => a - b);
    entry.medianUnits = sorted[Math.floor(sorted.length / 2)] ?? 0;
    entry.minUnits = sorted[0] ?? 0;
    delete entry.units;
  }
  return byType;
}

function countIssues(pages) {
  const counts = {};
  for (const page of pages) for (const item of page.issues) counts[item.id] = (counts[item.id] ?? 0) + 1;
  return counts;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { response, text: sitemapXml } = await fetchText(`${args.fetchBaseUrl}/sitemap.xml`);
  if (response.status !== 200) throw new Error(`sitemap fetch failed: HTTP ${response.status}`);
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/giu)]
    .map((match) => decodeEntities(match[1]).trim())
    .filter((url) => url === args.baseUrl || url.startsWith(`${args.baseUrl}/`));

  console.log(`[content-value] scanning ${urls.length} sitemap URLs via ${args.fetchBaseUrl}`);
  const scanned = await mapConcurrent(urls, args.concurrency, (url) => scan(url, args));

  const boilerplate = findBoilerplateBlocks(scanned);
  for (const page of scanned) {
    page.uniqueText = page.blocks.filter((block) => !boilerplate.has(block)).join(" ");
    page.uniqueUnits = contentUnits(page.uniqueText);
  }
  const duplicates = findNearDuplicates(scanned);
  const pages = scanned.map((page, index) => {
    const withDuplicate = { ...page, nearDuplicate: duplicates[index] };
    const issues = evaluatePage(withDuplicate, args.baseUrl);
    const { blocks, uniqueText, ...rest } = withDuplicate;
    void blocks;
    void uniqueText;
    return { ...rest, issues };
  });

  const errorCount = pages.reduce((sum, page) => sum + page.issues.filter((i) => i.severity === "error").length, 0);
  const warningCount = pages.reduce((sum, page) => sum + page.issues.filter((i) => i.severity === "warning").length, 0);
  const summary = {
    status: errorCount > 0 ? "error" : warningCount > 0 ? "warning" : "pass",
    scannedPages: pages.length,
    passedPages: pages.filter((page) => page.issues.length === 0).length,
    errorCount,
    warningCount,
    issueCounts: countIssues(pages),
    byType: summarizeByType(pages),
  };
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    baseUrl: args.baseUrl,
    fetchBaseUrl: args.fetchBaseUrl,
    thresholds: PAGE_RULES,
    nearDuplicateSimilarity: NEAR_DUPLICATE_SIMILARITY,
    summary,
    pages: pages.sort((a, b) => b.issues.length - a.issues.length || a.path.localeCompare(b.path)),
  };

  const outputPath = join(process.cwd(), args.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`[content-value] ${summary.passedPages}/${summary.scannedPages} pages pass; ${errorCount} errors, ${warningCount} warnings`);
  console.log("[content-value] issues:", JSON.stringify(summary.issueCounts));
  for (const [type, entry] of Object.entries(summary.byType)) {
    console.log(
      `  ${type.padEnd(12)} ${String(entry.passed).padStart(3)}/${String(entry.pages).padEnd(3)} pass  median ${entry.medianUnits} units, min ${entry.minUnits}`,
    );
  }
  console.log(`[content-value] report written to ${args.output}`);

  if ((args.failOnErrors && errorCount > 0) || (args.failOnWarnings && errorCount + warningCount > 0)) {
    process.exit(1);
  }
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  main().catch((error) => {
    console.error("audit-content-live failed:", error);
    process.exit(1);
  });
}
