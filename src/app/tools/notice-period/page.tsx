import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { NoticePeriodCalculator } from "@/components/tools/NoticePeriodCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "離職預告期計算 — 提前幾天告知才合法？",
  description:
    "輸入到職日，依勞基法第 15、16 條算出離職或資遣的預告天數（10、20、30 日）與最晚提出日，並說明未預告的預告期間工資與謀職假。",
  keywords: ["離職預告", "離職提前幾天", "預告期", "離職預告期間", "勞基法預告期"],
  path: "/tools/notice-period",
});

export default function NoticePeriodPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "離職預告期計算",
          description: "輸入到職日，計算離職預告期間天數",
          path: "/tools/notice-period",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["notice-period"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何計算離職預告期天數",
        totalTime: "PT1M",
        steps: [
          { name: "選擇預告方", text: "選擇是雇主預告資遣，或是勞工提出辭職" },
          { name: "輸入年資", text: "填入在現職的年資（年/月），系統自動對應法定預告天數" },
          { name: "查看預告天數與應注意事項", text: "顯示法定預告天數、是否可以用代通知金代替，以及例外狀況說明" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "離職預告期計算機", url: `${SITE_URL}/tools/notice-period` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "離職預告期計算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        離職預告期計算
      </h1>
      <p className="text-slate-500 mb-8">
        輸入到職日期，自動計算年資與離職預告期間天數，附預告期間對照表。依據勞基法第 16 條。
      </p>

      <NoticePeriodCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="notice-period" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="離職預告期計算" path="/tools/notice-period" /></div>
      <FaqSection items={TOOL_FAQS["notice-period"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["notice-period"]}
        tools={TOOL_RELATED_TOOLS["notice-period"]}
      />
    </div>
  );
}
