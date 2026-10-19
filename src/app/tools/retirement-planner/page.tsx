import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { RetirementPlanner } from "@/components/tools/RetirementPlanner";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "退休年齡規劃 — 勞保年金 + 勞退月退試算",
  description:
    "輸入年齡、月薪與年資，試算勞保老年年金與勞退新制月退金額，分析退休所得替代率，規劃理想退休時間。",
  keywords: [
    "退休規劃",
    "勞保老年給付",
    "勞退月退",
    "退休金試算",
    "所得替代率",
    "退休年齡",
    "勞退自提",
  ],
  path: "/tools/retirement-planner",
});

export default function RetirementPlannerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "退休年齡規劃",
          description: "試算勞保年金與勞退月退，規劃退休時間",
          path: "/tools/retirement-planner",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["retirement-planner"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何規劃退休金與退休年齡",
        totalTime: "PT2M",
        steps: [
          { name: "輸入目前月薪與年齡", text: "填入現在的薪資與年齡，作為試算基礎" },
          { name: "設定預計退休年齡與自提比例", text: "選擇希望幾歲退休，並設定勞退自提比例（0-6%）" },
          { name: "查看退休金帳戶預估與月領金額", text: "系統計算累積帳戶餘額、每月可領金額，以及是否足夠退休" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "退休規劃計算機", url: `${SITE_URL}/tools/retirement-planner` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "退休年齡規劃" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        退休年齡規劃
      </h1>
      <p className="text-slate-500 mb-8">
        輸入基本資料，一次試算勞保老年給付與勞退新制月退，掌握退休後的收入全貌。
      </p>

      <RetirementPlanner />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="retirement-planner" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="退休年齡規劃" path="/tools/retirement-planner" /></div>
      <FaqSection items={TOOL_FAQS["retirement-planner"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["retirement-planner"]}
        tools={TOOL_RELATED_TOOLS["retirement-planner"]}
      />
    </div>
  );
}
