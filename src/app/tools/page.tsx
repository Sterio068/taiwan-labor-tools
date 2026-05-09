import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolCard } from "@/components/tools/ToolCard";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";

type Tool = (typeof TOOLS)[number];

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益計算工具",
  description:
    "免費勞工計算工具：薪資明細、加班費、資遣費、特休天數、勞健保保費、退休金試算。依據 2026 最新勞基法。",
  keywords: [
    "勞工權益計算工具",
    "薪資計算",
    "加班費計算",
    "資遣費計算",
    "特休計算",
    "勞健保保費",
  ],
  path: "/tools",
});

const TOOL_GROUPS = [
  {
    title: "薪資與工時",
    description: "先確認實領、加班、時薪月薪與年終，避免薪資單只看最後一行。",
    hrefs: ["/tools/salary", "/tools/overtime", "/tools/hourly-monthly", "/tools/bonus"],
  },
  {
    title: "離職、資遣與職場狀況",
    description: "處理被資遣、離職預告、職災、颱風出勤與權益健檢。",
    hrefs: [
      "/tools/severance",
      "/tools/notice-period",
      "/tools/work-injury",
      "/tools/typhoon",
      "/tools/rights-check",
      "/tools/dispute-checker",
    ],
  },
  {
    title: "保險、勞退與退休",
    description: "核對勞保、健保、勞退級距，估算未來退休金與雇主負擔。",
    hrefs: [
      "/tools/insurance-premium",
      "/tools/insurance-bracket",
      "/tools/pension",
      "/tools/retirement-planner",
    ],
  },
  {
    title: "請假、生育與工作選擇",
    description: "計算特休、產假育嬰假，並比較不同 offer 的實際待遇。",
    hrefs: ["/tools/annual-leave", "/tools/maternity", "/tools/salary-compare"],
  },
];

function findTool(href: string) {
  return TOOLS.find((tool) => tool.href === href);
}

function isTool(tool: Tool | undefined): tool is Tool {
  return Boolean(tool);
}

export default function ToolsPage() {
  const collectionSchema = collectionPageSchema({
    name: "勞工權益計算工具",
    description:
      "免費勞工計算工具：薪資明細、加班費、資遣費、特休天數、勞健保保費、退休金試算。",
    path: "/tools",
    items: TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
      url: `${SITE_URL}${tool.href}`,
    })),
  });

  const featuredTool = TOOLS[0];

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "計算工具" }]} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
              16 個免費工具
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              <span className="block">先選情境，</span>
              <span className="block">再開始計算</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              每個工具都保留在本機計算，不上傳薪資、年資或日期等敏感輸入。結果頁會接到公式、常見錯誤與官方來源。
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-surface p-5 shadow-[0_12px_32px_rgba(15,23,42,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              Recommended
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              第一次來，從薪資明細開始
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              先算出實領薪水、勞健保扣款與勞退提繳，再往加班費或級距檢查延伸。
            </p>
            <Link
              href={featuredTool.href}
              data-track="tools_featured_cta_clicked"
              data-track-target={featuredTool.href}
              className="mt-4 inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-5 text-sm font-bold text-surface hover:bg-brand-600"
            >
              開始算薪資明細
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page pb-16">
        <div className="space-y-12">
          {TOOL_GROUPS.map((group) => {
            const tools = group.hrefs.map(findTool).filter(isTool);

            return (
              <section key={group.title}>
                <SectionHeader
                  eyebrow="Tool Group"
                  title={group.title}
                  description={group.description}
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool, index) => (
                    <ToolCard
                      key={tool.href}
                      tool={tool}
                      priority={index === 0}
                      trackingSource="tools_index_card_clicked"
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
