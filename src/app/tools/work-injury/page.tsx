import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { WorkInjuryCalculator } from "@/components/tools/WorkInjuryCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "職災給付計算機 — 2026 工傷補償一鍵試算",
  description:
    "計算職災不能工作補償、失能給付、死亡給付。依據勞基法第59條與職災保險法。",
  keywords: ["職災賠償", "工傷補助", "職業災害", "職災給付", "失能給付"],
  path: "/tools/work-injury",
});

export default function WorkInjuryPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "職災給付計算機",
          description: "計算職災工資補償、失能給付與死亡給付",
          path: "/tools/work-injury",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["work-injury"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何計算職災補償金額",
        totalTime: "PT2M",
        steps: [
          { name: "選擇職災補償類型", text: "選擇醫療補償、工資補償、失能補償或死亡補償" },
          { name: "輸入月薪與相關資訊", text: "填入月薪、受傷天數或失能等級等資訊" },
          { name: "查看各項補償金額", text: "系統依勞基法第 59 條自動計算每項補償金額" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "職災補償計算機", url: `${SITE_URL}/tools/work-injury` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "職災給付計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        職災給付計算機
      </h1>
      <p className="text-slate-500 mb-8">
        選擇職災類型，試算雇主應補償金額與勞保職災給付。依據勞基法第 59 條與職災保險法。
      </p>

      <WorkInjuryCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="work-injury" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="職災給付計算機" path="/tools/work-injury" /></div>
      <FaqSection items={TOOL_FAQS["work-injury"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["work-injury"]}
        tools={TOOL_RELATED_TOOLS["work-injury"]}
      />
    </div>
  );
}
