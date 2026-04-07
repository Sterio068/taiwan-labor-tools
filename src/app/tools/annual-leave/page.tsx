import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { AnnualLeaveCalculator } from "@/components/tools/AnnualLeaveCalculator";

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
    </div>
  );
}
