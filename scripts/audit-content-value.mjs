import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");
const metadata = await read("src/lib/articles.ts");
const policy = await read("src/lib/content-policy.ts");
const articlePage = await read("src/app/articles/[slug]/page.tsx");
const sitemap = await read("src/app/sitemap.ts");
const feed = await read("src/app/feed.xml/route.ts");
const search = await read("src/lib/search-index.ts");
const layout = await read("src/app/layout.tsx");
const sourceMap = await read("src/data/article-sources.ts");
const slugs = [...metadata.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const policyBlock = policy.match(/IMPROVE_ARTICLE_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/u)?.[1] ?? "";
const policySlugs = [...policyBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
const unknownImprove = policySlugs.filter((slug) => !slugs.includes(slug));
const expected = [
  "overtime-pay-vs-compensatory-leave",
  "severance-calculation-complete",
  "insurance-deduction-examples",
  "annual-leave-resignation-payout-example",
  "health-insurance-bracket-2026",
  "holiday-overtime-8hours",
  "labor-insurance-underreporting-complaint",
  "overtime-evidence-checklist",
  "unused-annual-leave-wage",
];
const missing = expected.filter((slug) => !slugs.includes(slug));
const checks = [
  [duplicateSlugs.length === 0, "article metadata slugs are unique", duplicateSlugs],
  [missing.length === 0, "all planned pillar and low-distinctness slugs are registered", missing],
  [unknownImprove.length === 0, "content policy only references registered article slugs", unknownImprove],
  [articlePage.includes("getArticleSources(article.category, article.slug)"), "article sources support page-specific overrides"],
  [articlePage.includes("isAdEligibleArticle(article)"), "improve articles suppress manual ad slots"],
  [metadata.includes("contentStatus: contentStatus(article.slug)") && !metadata.includes("noindex: contentStatus(article.slug)"), "improve queue does not blanket-noindex articles"],
  [expected.every((slug) => sourceMap.includes(`\"${slug}\"`)), "planned priority articles have page-level official source overrides", expected.filter((slug) => !sourceMap.includes(`\"${slug}\"`))],
  [sitemap.includes("filter((article) => !article.noindex)"), "sitemap honors explicit noindex only"],
  [feed.includes("getIndexableArticles") && search.includes("getIndexableArticles"), "RSS and search index only indexable articles"],
  [layout.includes("<AdSenseLoader />"), "AdSense loader is route-aware"],
  [sourceMap.includes("overtime-pay-vs-compensatory-leave") && sourceMap.includes("severance-calculation-complete") && sourceMap.includes("insurance-deduction-examples"), "three content pillars have dedicated sources"],
];
for (const [ok, label, details] of checks) {
  if (!ok) {
    console.error(`FAIL ${label}${details?.length ? `: ${details.join(", ")}` : ""}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS ${label}`);
  }
}
const mdxFiles = await readdir(path.join(root, "src/content/articles"));
const missingContentFiles = policySlugs.filter((slug) => !mdxFiles.includes(`${slug}.mdx`));
if (missingContentFiles.length > 0) {
  console.error(`FAIL improve queue has no MDX content file: ${missingContentFiles.join(", ")}`);
  process.exitCode = 1;
}
const explicitNoindexCount = [...metadata.matchAll(/noindex:\s*true/gu)].length;
const indexableCount = slugs.length - explicitNoindexCount;
console.log(`INFO indexable metadata articles: ${indexableCount}; improve queue entries: ${new Set(policySlugs).size}; explicit noindex: ${explicitNoindexCount}`);

const improveBodies = await Promise.all(
  policySlugs
    .filter((slug) => mdxFiles.includes(`${slug}.mdx`))
    .map(async (slug) => {
      const raw = await read(`src/content/articles/${slug}.mdx`);
      const body = raw.replace(/^---[\s\S]*?---/u, "").replace(/\s+/gu, "");
      return { slug, characters: [...body].length };
    }),
);
const thinImprove = improveBodies
  .filter(({ characters }) => characters < 450)
  .sort((a, b) => a.characters - b.characters);
if (thinImprove.length > 0) {
  console.warn(
    `WARN improve candidates under 450 characters (review only): ${thinImprove
      .map(({ slug, characters }) => `${slug}=${characters}`)
      .join(", ")}`,
  );
}
