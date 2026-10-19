import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { TyphoonCalculator } from "@/components/tools/TyphoonCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "颱風假薪資計算機：停班出勤、未出勤工資怎麼算",
  description:
    "颱風停班時出勤要不要加倍？沒去上班會不會被扣薪？依勞動部天然災害出勤要點，試算當日工資並整理停班範圍、全勤與職災權益。",
  keywords: ["颱風假薪資", "颱風出勤加倍", "颱風假不能扣薪", "颱風假計算機", "天然災害薪資"],
  path: "/tools/typhoon",
});

export default function TyphoonPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "颱風假薪資計算機",
          description: "依勞動部天然災害出勤要點試算颱風停班日的當日工資與權益",
          path: "/tools/typhoon",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["typhoon"])} />
      <JsonLd data={howToSchema({
        name: "如何計算颱風假薪資與出勤補償",
        description: "依據「天然災害發生事業單位勞工出勤管理及工資給付要點」，計算颱風停班日當日工資與權益",
        totalTime: "PT1M",
        steps: [
          { name: "選擇薪資類型", text: "選擇月薪制或時薪制，填入你的薪資" },
          { name: "確認颱風假宣告狀態", text: "確認工作地、居住地或通勤途中是否有任一地宣布停止上班" },
          { name: "查看出勤補償金額", text: "系統顯示出勤時的當日工資、公司比照加倍時的參考金額，以及未出勤時的權益" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "颱風假薪資計算機", url: `${SITE_URL}/tools/typhoon` },
      ])} />

      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "颱風假薪資計算機" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        颱風假薪資計算機
      </h1>
      <p className="text-slate-500 mb-8">
        停班日出勤應照給當日工資，勞動部建議雇主另外加給；因停班未出勤不得記曠職或扣全勤。輸入薪資即時試算。
      </p>

      <TyphoonCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
        <ToolExplainer slug="typhoon" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="颱風假薪資計算機" path="/tools/typhoon" /></div>
      <FaqSection items={TOOL_FAQS["typhoon"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["typhoon"]}
        tools={TOOL_RELATED_TOOLS["typhoon"]}
      />
    </div>
  );
}
