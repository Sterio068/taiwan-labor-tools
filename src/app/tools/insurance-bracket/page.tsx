import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { InsuranceBracketLookup } from "@/components/tools/InsuranceBracketLookup";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "投保級距查詢 — 2026 勞保/健保/勞退級距表",
  description:
    "輸入月薪，一次查出勞保投保級距、健保投保級距與勞退提繳級距。附完整級距對照表，2026 最新資料。",
  keywords: ["勞保級距表", "投保級距", "健保級距", "勞退級距", "投保薪資分級表"],
  path: "/tools/insurance-bracket",
});

export default function InsuranceBracketPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "投保級距查詢",
          description: "輸入月薪，查出勞保、健保與勞退投保級距",
          path: "/tools/insurance-bracket",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["insurance-bracket"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何查詢勞健保投保薪資級距",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪", text: "填入你的月薪（底薪加各項固定津貼）" },
          { name: "查看投保薪資級距", text: "系統自動找到對應的勞保、健保、勞退投保薪資級距" },
          { name: "對照實際扣款金額", text: "顯示三種保險的級距金額與對應的勞工自付保費" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "投保薪資級距查詢", url: `${SITE_URL}/tools/insurance-bracket` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "投保級距查詢" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        投保級距查詢
      </h1>
      <p className="text-slate-500 mb-8">
        輸入每月薪資，一次查出勞保、健保、勞退三種投保級距，並提供完整級距對照表。2026 年最新資料。
      </p>

      <InsuranceBracketLookup />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="insurance-bracket" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="投保級距查詢" path="/tools/insurance-bracket" /></div>
      <FaqSection items={TOOL_FAQS["insurance-bracket"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["insurance-bracket"]}
        tools={TOOL_RELATED_TOOLS["insurance-bracket"]}
      />
    </div>
  );
}
