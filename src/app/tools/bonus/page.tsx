import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { BonusCalculator } from "@/components/tools/BonusCalculator";

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
      <Breadcrumb
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

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">年終獎金怎麼算？法律有規定嗎？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          很多人以為年終獎金是法定權益，但事實上，勞基法並未強制規定雇主必須發年終獎金。
          年終獎金屬於「恩惠性給與」，除非勞動契約、工作規則或團體協約中有明確約定，
          否則雇主並無法律義務發放。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">什麼時候年終是法定的？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          如果你的勞動契約或公司規章明確寫到「保障年薪 14 個月」或「年終至少 1 個月」，
          那麼年終獎金就變成「工資」的一部分，雇主不得任意不發。
          此外，如果公司連續多年固定發放相同金額的年終，也可能被認定為經常性給與，
          雇主不能片面取消。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">未滿一年怎麼算年終？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          當公司有年終獎金制度，但員工在該年度中途到職，通常會採「按比例計算」的方式發放。
          計算公式為：月薪 x 年終月數 x (在職月數 / 12)。
          例如月薪 40,000、年終 1 個月、在職 8 個月，則年終 = 40,000 x 1 x (8/12) = 26,667 元。
          不過這仍取決於公司規定，有些公司會規定到職滿一定期間才有年終資格。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">年終獎金要扣稅嗎？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          年終獎金屬於薪資所得，需要併入全年綜合所得報稅。
          如果單次獎金超過當月投保金額（健保級距），雇主還需要額外扣繳 2.11% 的補充保費。
          這筆補充保費會直接從獎金中扣除。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">被資遣可以領年終嗎？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          如果公司規章明確約定年終為按比例發放的工資，即使員工被資遣，
          仍可要求公司按在職比例給付年終。但若年終性質為恩惠性給與，
          則須視公司規定而定。建議到職時就確認合約中關於年終的條款。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
