import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { RetirementPlanner } from "@/components/tools/RetirementPlanner";

export const metadata: Metadata = buildPageMetadata({
  title: "退休年齡規劃 — 勞保年金 + 勞退月退試算",
  description:
    "輸入年齡、月薪與年資，試算勞保老年年金與勞退新制月退金額，分析退休所得替代率，規劃理想退休時間。",
  keywords: [
    "退休規劃",
    "勞保老年給付",
    "勞退月退",
    "退休金試算",
    "所得替代率",
    "退休年齡",
    "勞退自提",
  ],
  path: "/tools/retirement-planner",
});

export default function RetirementPlannerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "退休年齡規劃",
          description: "試算勞保年金與勞退月退，規劃退休時間",
          path: "/tools/retirement-planner",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "退休年齡規劃" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        退休年齡規劃
      </h1>
      <p className="text-slate-500 mb-8">
        輸入基本資料，一次試算勞保老年給付與勞退新制月退，掌握退休後的收入全貌。
      </p>

      <RetirementPlanner />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          台灣勞工退休金制度全解析
        </h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞工的退休收入主要來自兩個制度：勞保老年給付與勞退新制。這兩個制度的計算方式、請領條件與金額都不同，合計後才是退休後的完整收入。理解這兩個制度如何運作，是做好退休規劃的第一步。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          勞保老年給付：年金制 vs 一次請領
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞保老年給付有兩種方式。年金制是按月領取，計算公式為「投保薪資 x 投保年資 x 1.55%」，適合長期投保的勞工。一次請領則是「投保薪資 x 投保年資」，適合急需一筆資金的情況。以投保薪資 45,800 元、年資 30 年為例，年金制每月可領約 21,297 元，一次請領則為 1,374,000 元。多數情況下，選擇年金制在經濟上更有利。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          勞退新制：雇主提繳 + 自願提繳
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞退新制是雇主每月提繳至少 6% 到勞工個人退休金帳戶，勞工也可以選擇自願提繳 1-6%。自提的金額可以從當年度個人綜合所得總額中扣除，具有節稅效果。帳戶中的金額由勞動基金運用局統一投資，歷年平均年化報酬率約 3-4%。年滿 60 歲且年資滿 15 年以上可選擇月退休金，否則一次領取。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          所得替代率的重要性
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          所得替代率是退休後收入佔退休前收入的比例。國際上一般建議所得替代率至少達到 70% 才能維持退休前的生活水準。然而，台灣勞工單靠勞保加勞退，所得替代率通常只有 40-60%，高薪族群的替代率更低。因此，越早開始規劃額外的退休儲蓄，退休後的生活品質越有保障。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          自提 6% 的威力
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          以月薪 40,000 元、35 歲開始自提 6% 到 65 歲退休為例，雇主每月提繳 2,400 元加上自己提繳 2,400 元，假設年化報酬率 3%，30 年後帳戶累積約 280 萬元，月退休金約 9,700 元。若完全不自提，月退休金只有約 4,850 元，差距將近一倍。此外，自提部分每年可節省數千至數萬元的所得稅。建議勞工在經濟許可的範圍內盡量提高自提比例。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
