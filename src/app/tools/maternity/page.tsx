import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { MaternityCalculator } from "@/components/tools/MaternityCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "產假/育嬰假計算機 — 2026 天數與給付一鍵查",
  description:
    "計算產假、陪產假、育嬰留停天數與勞保生育給付。依據性別平等工作法與勞保條例。",
  keywords: ["產假幾天", "育嬰留停", "陪產假", "生育給付", "流產假", "育嬰假"],
  path: "/tools/maternity",
});

export default function MaternityPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "產假/育嬰假計算機",
          description: "計算產假、陪產假、育嬰留停天數與勞保給付",
          path: "/tools/maternity",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["maternity"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何計算產假育嬰假天數與薪資",
        totalTime: "PT2M",
        steps: [
          { name: "選擇假別類型", text: "選擇產假（8 週）、陪產假（7 天）或育嬰留職停薪（2 年）" },
          { name: "輸入到職日與月薪", text: "填入到職日與月薪，用於計算勞保生育給付資格" },
          { name: "查看假期天數與給付金額", text: "系統顯示應有假期天數、薪資給付方式及勞保生育給付試算" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "產假育嬰假計算機", url: `${SITE_URL}/tools/maternity` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "產假/育嬰假計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        產假 / 育嬰假計算機
      </h1>
      <p className="text-slate-500 mb-8">
        選擇假別類型，自動計算請假天數、薪資給付方式與勞保生育給付金額。
      </p>

      <MaternityCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="maternity" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="產假/育嬰假計算機" path="/tools/maternity" /></div>
      <FaqSection items={TOOL_FAQS["maternity"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["maternity"]}
        tools={TOOL_RELATED_TOOLS["maternity"]}
      />
    </div>
  );
}
