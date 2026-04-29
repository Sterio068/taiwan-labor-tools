import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { AnnualLeaveCalculator } from "@/components/tools/AnnualLeaveCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "特休天數計算 — 輸入到職日自動算",
  description:
    "輸入到職日期，立即計算今年度特休天數。完整年資對照表。依據勞基法第 38 條。",
  keywords: ["特休幾天", "年假計算", "特休天數", "年資特休對照表"],
  path: "/tools/annual-leave",
});

export default function AnnualLeavePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "特休天數計算",
          description: "輸入到職日期，計算今年度特休天數",
          path: "/tools/annual-leave",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["annual-leave"])} />
      <JsonLd data={howToSchema({
        name: "如何計算特休天數",
        description: "依勞基法第 38 條，依年資計算法定特休假天數",
        totalTime: "PT1M",
        steps: [
          { name: "輸入到職日期", text: "在計算機填入實際到職日期（年/月/日）" },
          { name: "查看年資與特休天數", text: "系統自動計算目前年資，並對照法定特休天數（6 個月→3 天；1 年→7 天；2 年→10 天……）" },
          { name: "了解未休假折算規定", text: "年度終結未休的特休假，雇主應折算工資發給，不可強制作廢" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "特休天數計算", url: `${SITE_URL}/tools/annual-leave` },
      ])} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "特休天數計算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        特休天數計算
      </h1>
      <p className="text-slate-500 mb-8">
        輸入到職日期，依勞基法第 38 條自動計算今年度特休天數，附完整年資對照表。
      </p>

      <AnnualLeaveCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">特休假完全攻略</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          勞基法第 38 條規定，勞工在同一雇主工作滿 6 個月後，即享有特休假。
          年資越長，特休天數越多，最多 30 天。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">特休未休完怎麼辦？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          年度終結或契約終止時，特休假如有未休完的天數，雇主應按未休天數折算工資發給勞工。
          不能以「規定一次請完」或「逾期作廢」為由拒絕折算。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">週年制 vs 曆年制</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          特休可採「週年制」（以到職日起算）或「曆年制」（以每年 1/1 起算）。
          無論採何種制度，勞工的特休總天數不得少於法定標準。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="特休天數計算" path="/tools/annual-leave" /></div>
      <FaqSection items={TOOL_FAQS["annual-leave"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["annual-leave"]}
        tools={TOOL_RELATED_TOOLS["annual-leave"]}
      />
    </div>
  );
}
