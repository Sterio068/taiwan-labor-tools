import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { HourlyMonthlyConverter } from "@/components/tools/HourlyMonthlyConverter";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "時薪月薪換算器 — 2026 最低工資即時檢核",
  description:
    "月薪換算時薪、時薪估算月薪。依勞基法月薪÷30÷8公式計算，自動檢查是否低於2026基本工資。",
  keywords: ["時薪換算月薪", "月薪換時薪", "打工薪水", "時薪計算", "基本工資"],
  path: "/tools/hourly-monthly",
});

export default function HourlyMonthlyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "時薪月薪換算器",
          description: "月薪與時薪互相換算，自動檢查基本工資",
          path: "/tools/hourly-monthly",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["hourly-monthly"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何換算時薪與月薪",
        totalTime: "PT1M",
        steps: [
          { name: "輸入時薪", text: "填入每小時薪資，最低不得低於最低時薪 196 元" },
          { name: "設定每日工時與月工作天數", text: "預設每日 8 小時、每月 21.75 天（法定工時標準）" },
          { name: "查看月薪換算結果", text: "系統自動顯示換算後的月薪，並標示是否符合基本工資標準" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "時薪月薪換算器", url: `${SITE_URL}/tools/hourly-monthly` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "時薪月薪換算器" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        時薪月薪換算器
      </h1>
      <p className="text-slate-500 mb-8">
        月薪換時薪、時薪估算月薪。依勞基法公式計算，自動檢查是否符合 2026 年基本工資標準。
      </p>

      <HourlyMonthlyConverter />

      <AdBanner slot="tool-result" />

      <article className="mt-12 longform max-w-none">
        <ToolExplainer slug="hourly-monthly" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="時薪月薪換算器" path="/tools/hourly-monthly" /></div>
      <FaqSection items={TOOL_FAQS["hourly-monthly"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["hourly-monthly"]}
        tools={TOOL_RELATED_TOOLS["hourly-monthly"]}
      />
    </div>
  );
}
