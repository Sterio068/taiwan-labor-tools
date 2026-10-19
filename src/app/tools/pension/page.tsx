import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { PensionCalculator } from "@/components/tools/PensionCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞退退休金試算 — 算出你的退休帳戶",
  description:
    "輸入月薪、年齡與自提比例，試算勞退新制退休帳戶累積金額與每月退休金。含自提節稅效果。",
  keywords: ["勞退試算", "退休金多少", "勞退自提", "退休金計算", "勞退新制"],
  path: "/tools/pension",
});

export default function PensionPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞退退休金試算",
          description: "試算勞退新制退休帳戶累積金額與每月退休金",
          path: "/tools/pension",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["pension"])} />
      <JsonLd data={howToSchema({
        name: "如何試算勞退退休金",
        description: "估算勞退新制帳戶累積金額與月退休金",
        totalTime: "PT2M",
        steps: [
          { name: "輸入目前月薪", text: "填入現在的月薪，系統自動計算雇主強制提繳的 6%（每月貢獻到帳戶的金額）" },
          { name: "設定自提比例", text: "填入個人自願提繳比例（0-6%），自提金額可從所得稅中全額扣除" },
          { name: "填入年齡與退休目標", text: "填入目前年齡與預計退休年齡，計算機估算到退休時帳戶累積的總金額" },
          { name: "查看月退休金試算", text: "系統依累積金額除以平均餘命月數（288 個月），估算每月可領退休金" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "勞退退休金試算", url: `${SITE_URL}/tools/pension` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞退退休金試算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞退退休金試算
      </h1>
      <p className="text-slate-500 mb-8">
        輸入月薪、年齡與自提比例，試算你的勞退帳戶在退休時能累積多少錢。
      </p>

      <PensionCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 longform max-w-none">
        <ToolExplainer slug="pension" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="勞退退休金試算" path="/tools/pension" /></div>
      <FaqSection items={TOOL_FAQS["pension"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["pension"]}
        tools={TOOL_RELATED_TOOLS["pension"]}
      />
    </div>
  );
}
