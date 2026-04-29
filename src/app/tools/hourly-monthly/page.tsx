import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { HourlyMonthlyConverter } from "@/components/tools/HourlyMonthlyConverter";
import { LABOR_CONSTANTS } from "@/data/constants";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";
import { formatMoney } from "@/lib/format";

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
          { name: "輸入時薪", text: "填入每小時薪資，最低不得低於基本時薪 190 元" },
          { name: "設定每日工時與月工作天數", text: "預設每日 8 小時、每月 21.75 天（法定工時標準）" },
          { name: "查看月薪換算結果", text: "系統自動顯示換算後的月薪，並標示是否符合基本工資標準" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "時薪月薪換算器", url: `${SITE_URL}/tools/hourly-monthly` },
      ])} />
      <Breadcrumb
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

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">月薪跟時薪怎麼換算？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          依據勞基法施行細則第 7 條，月薪制勞工的「每小時工資」計算公式為：月薪 &divide; 30 &divide; 8。
          這個公式的 30 是指每月曆日天數（包含休假日），8 是每日正常工時。
          無論實際每月工作幾天，法定換算基準一律用 30 天計算。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">為什麼是除以 30 再除以 8？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          月薪已經包含了「休假日的工資」，所以每日工資應以 30 天為基準（包含例假、休息日）。
          接著除以 8（法定日正常工時），就能得出每小時的工資額度。
          這個時薪也是計算加班費的基礎，非常重要。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">時薪制員工怎麼估算月薪？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          時薪制勞工（打工族、部分工時人員）的月收入取決於每天工作幾小時、每月排幾天班。
          常見估算方式為：時薪 &times; 每日工時 &times; 每月工作天數。
          例如時薪 {LABOR_CONSTANTS.minimumHourlyWage} 元、每天 8 小時、每月排 22 天，
          月收入約為 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage * 8 * 22)} 元。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">2026 年基本工資</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          自 2026 年 1 月 1 日起，月薪基本工資為 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元，
          時薪基本工資為 {LABOR_CONSTANTS.minimumHourlyWage} 元。
          雇主支付的工資若低於基本工資，違反勞基法第 21 條，可處新台幣 2 萬至 100 萬元罰鍰。
          勞工如果發現薪資低於基本工資，可以向各縣市勞工局申訴。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">打工族的權益提醒</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          時薪制勞工同樣享有勞基法保障，包含加班費、國定假日出勤加倍工資、特休假等。
          即使是部分工時，雇主仍須為勞工投保勞保和健保。
          如果每週工時超過 12 小時，雇主就必須依法為你提繳勞退 6%。
        </p>
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
