import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { LABOR_CONSTANTS } from "@/data/constants";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = buildPageMetadata({
  title: "薪資明細計算機 — 2026 實領薪水一秒算出",
  description:
    "輸入月薪，自動計算勞保、健保自付額、勞退提繳與實領金額。2026 最新費率，含雇主成本。",
  keywords: ["薪資計算", "實領薪水", "勞健保扣多少", "薪資明細", "薪水計算機"],
  path: "/tools/salary",
});

export default function SalaryPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "薪資明細計算機",
          description: "輸入月薪，自動計算勞保、健保自付額與實領金額",
          path: "/tools/salary",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["salary"])} />
      <JsonLd data={howToSchema({
        name: "如何計算每月實領薪資（勞健保扣款）",
        description: "依 2026 年費率，計算月薪扣除勞保、健保、勞退後的實領金額",
        totalTime: "PT2M",
        steps: [
          { name: "輸入月薪", text: "在計算機填入你的月薪（底薪加上各項固定津貼）" },
          { name: "選擇眷屬人數", text: "設定健保眷屬加保人數（配偶、直系親屬），影響健保自付額" },
          { name: "設定勞退自提比例", text: "若有自願提繳勞退，填入比例（0-6%）；不自提填 0" },
          { name: "查看扣款明細與實領金額", text: "系統自動顯示勞保自付額、健保自付額、勞退提繳及每月實領金額" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "薪資明細計算機", url: `${SITE_URL}/tools/salary` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "薪資明細計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        薪資明細計算機
      </h1>
      <p className="text-slate-500 mb-8">
        輸入每月薪資，自動計算勞保、健保自付額、勞退提繳與每月實領金額。依據 2026 年最新費率。
      </p>

      <SalaryCalculator />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">薪資單上的扣款到底是什麼？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          每月薪資單上通常會看到「勞保」「健保」「勞退」三筆扣款。這些不是公司多收你的錢，而是依法必須繳納的社會保險費用。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">勞保自付額</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞保費率目前為 12.5%（含就業保險 1%），由勞工負擔 20%、雇主 70%、政府 10%。
          以投保薪資級距計算，不是直接用你的月薪乘以費率。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">健保自付額</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          健保費率 5.17%，勞工負擔 30%、雇主 60%、政府 10%。
          如果有眷屬加保（最多計 3 口），你的自付額會隨眷屬人數等比增加。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">勞退提繳</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          雇主每月必須提繳月薪 6% 到你的勞退個人帳戶，這筆錢不會從薪水扣除。
          你可以「自願提繳」最多 6%，自提部分可以從所得稅中扣除，具有節稅效果。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">2026 年基本工資</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          2026 年起，月薪基本工資為 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元，
          時薪基本工資為 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)} 元。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="薪資明細計算機" path="/tools/salary" /></div>
      <FaqSection items={TOOL_FAQS["salary"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["salary"]}
        tools={TOOL_RELATED_TOOLS["salary"]}
      />
    </div>
  );
}
