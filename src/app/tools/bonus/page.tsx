import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { BonusCalculator } from "@/components/tools/BonusCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "年終獎金計算機 — 按比例年終怎麼算？",
  description:
    "輸入月薪與在職月數，自動計算年終獎金。支援未滿一年按比例計算，一秒算出你的年終。",
  keywords: ["年終怎麼算", "年終獎金", "年終計算", "年終按比例", "年終獎金計算機"],
  path: "/tools/bonus",
});

export default function BonusPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "年終獎金計算機",
          description: "計算年終獎金，支援未滿一年按比例計算",
          path: "/tools/bonus",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["bonus"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何計算年終獎金（含按比例計算）",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪", text: "填入你的月薪作為年終計算基礎" },
          { name: "設定年終月數與在職月數", text: "填入公司承諾的年終月數，以及你實際在職的月數（未滿一年者）" },
          { name: "查看年終獎金金額", text: "系統依比例自動計算應得年終獎金，並說明補充保費扣繳規則" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "年終獎金計算機", url: `${SITE_URL}/tools/bonus` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "年終獎金計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        年終獎金計算機
      </h1>
      <p className="text-slate-500 mb-8">
        輸入月薪、年終月數與在職月數，自動計算年終獎金。未滿一年依比例折算。
      </p>

      <BonusCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 longform max-w-none">
        <ToolExplainer slug="bonus" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="年終獎金計算機" path="/tools/bonus" /></div>
      <FaqSection items={TOOL_FAQS["bonus"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["bonus"]}
        tools={TOOL_RELATED_TOOLS["bonus"]}
      />
    </div>
  );
}
