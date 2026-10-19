import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { SalaryComparer } from "@/components/tools/SalaryComparer";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "薪資比較器 — 兩份 Offer 該選哪個？",
  description:
    "輸入兩份工作的月薪、年終、津貼，立即比較年度總收入、每月實領與雇主成本。幫你做出最佳薪資決策。",
  keywords: [
    "薪資比較",
    "offer 比較",
    "年薪比較",
    "實領薪資",
    "薪水比較",
    "工作選擇",
    "年終獎金",
  ],
  path: "/tools/salary-compare",
});

export default function SalaryComparePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "薪資比較器",
          description: "比較兩份工作的薪資條件",
          path: "/tools/salary-compare",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["salary-compare"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何比較兩份薪資方案",
        totalTime: "PT2M",
        steps: [
          { name: "輸入第一份薪資條件", text: "填入月薪、年終、加班費等薪資組成項目" },
          { name: "輸入第二份薪資條件", text: "填入另一份工作的薪資條件做對比" },
          { name: "查看實領差異比較", text: "系統扣除勞健保後，比較兩份薪資的實際年收入差異" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "薪資比較器", url: `${SITE_URL}/tools/salary-compare` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "薪資比較器" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        薪資比較器
      </h1>
      <p className="text-slate-500 mb-8">
        並排比較兩份工作的薪資條件，從月薪、年終到實領金額一目了然。
      </p>

      <SalaryComparer />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="salary-compare" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="薪資比較器" path="/tools/salary-compare" /></div>
      <FaqSection items={TOOL_FAQS["salary-compare"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["salary-compare"]}
        tools={TOOL_RELATED_TOOLS["salary-compare"]}
      />
    </div>
  );
}
