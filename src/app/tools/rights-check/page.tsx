import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { RightsChecker } from "@/components/tools/RightsChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益健檢 — 8 題快速檢查勞動條件是否合法",
  description:
    "回答 8 個是非題，立即檢查薪資、加班費、特休、勞健保等勞動條件是否合法。發現違法情形提供法條依據與建議行動。",
  keywords: [
    "勞工權益",
    "勞動條件檢查",
    "勞基法違法",
    "基本工資",
    "加班費",
    "特休假",
    "勞保",
    "勞工權益檢查",
  ],
  path: "/tools/rights-check",
});

export default function RightsCheckPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞工權益健檢",
          description: "8 題快速檢查勞動條件是否合法",
          path: "/tools/rights-check",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["rights-check"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何使用勞工權益健檢",
        totalTime: "PT3M",
        steps: [
          { name: "選擇問題類型", text: "從薪資、加班、假別、離職、霸凌等分類中選擇你遭遇的狀況" },
          { name: "回答相關問題", text: "依序回答問題，說明你的工作條件與具體情況" },
          { name: "查看法規說明與建議", text: "系統依勞基法條文判斷合法性，並提供申訴管道與下一步建議" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "勞工權益健檢", url: `${SITE_URL}/tools/rights-check` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞工權益健檢" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞工權益健檢
      </h1>
      <p className="text-slate-500 mb-8">
        回答 8 個問題，快速檢查你的勞動條件是否符合法律規定。
      </p>

      <RightsChecker />

      <AdBanner slot="tool-result" />

      <article className="mt-12 longform max-w-none">
        <ToolExplainer slug="rights-check" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="勞工權益健檢" path="/tools/rights-check" /></div>
      <FaqSection items={TOOL_FAQS["rights-check"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["rights-check"]}
        tools={TOOL_RELATED_TOOLS["rights-check"]}
      />
    </div>
  );
}
