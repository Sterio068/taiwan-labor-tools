import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { InsurancePremiumCalculator } from "@/components/tools/InsurancePremiumCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞健保保費計算機 — 2026 最新費率",
  description:
    "輸入月薪查詢投保級距，計算勞保、健保自付額與雇主負擔。2026 最新費率，含眷屬計算。",
  keywords: ["勞保自付額", "健保費計算", "勞保費率", "健保費率", "投保級距"],
  path: "/tools/insurance-premium",
});

export default function InsurancePremiumPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞健保保費計算機",
          description: "查詢投保級距，計算勞保與健保自付額",
          path: "/tools/insurance-premium",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["insurance-premium"])} />
      <JsonLd data={howToSchema({
        name: "如何計算勞健保保費自付額",
        description: "依 2026 年費率計算勞保與健保每月自付額",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪", text: "填入每月薪資，系統自動對應勞保、健保、勞退各自的投保級距" },
          { name: "選擇健保眷屬人數", text: "設定健保眷屬加保口數（最多 3 口），每增加 1 口眷屬，健保自付額等比增加" },
          { name: "查看三大費用明細", text: "系統顯示勞保自付額、健保自付額（含眷屬）、勞退雇主提繳，以及雇主負擔金額" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "勞健保保費計算", url: `${SITE_URL}/tools/insurance-premium` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞健保保費計算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞健保保費計算機
      </h1>
      <p className="text-slate-500 mb-8">
        輸入月薪，自動查詢投保級距、計算勞保與健保自付額。2026 年最新費率。
      </p>

      <InsurancePremiumCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">勞保與健保費率說明</h2>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">勞保費率 12.5%</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          含普通事故保險費率 11.5%（含就業保險 1%）。
          一般勞工負擔 20%、雇主 70%、政府 10%。
          勞保投保薪資上限 $45,800。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">健保費率 5.17%</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          一般受僱者負擔 30%、雇主 60%、政府 10%。
          眷屬（配偶、子女、父母）最多計 3 口，自付額隨人數等比增加。
          健保投保金額上限 $219,500。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">什麼是投保級距？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          保費不是用你的實際薪水直接計算，而是先對照「投保薪資級距表」，
          找到大於等於你月薪的最近一級，再用這個級距金額去算保費。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="勞健保保費計算機" path="/tools/insurance-premium" /></div>
      <FaqSection items={TOOL_FAQS["insurance-premium"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["insurance-premium"]}
        tools={TOOL_RELATED_TOOLS["insurance-premium"]}
      />
    </div>
  );
}
