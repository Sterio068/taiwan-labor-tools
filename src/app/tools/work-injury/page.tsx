import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { WorkInjuryCalculator } from "@/components/tools/WorkInjuryCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "職災給付計算機 — 2026 工傷補償一鍵試算",
  description:
    "計算職災不能工作補償、失能給付、死亡給付。依據勞基法第59條與職災保險法。",
  keywords: ["職災賠償", "工傷補助", "職業災害", "職災給付", "失能給付"],
  path: "/tools/work-injury",
});

export default function WorkInjuryPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "職災給付計算機",
          description: "計算職災工資補償、失能給付與死亡給付",
          path: "/tools/work-injury",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "職災給付計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        職災給付計算機
      </h1>
      <p className="text-slate-500 mb-8">
        選擇職災類型，試算雇主應補償金額與勞保職災給付。依據勞基法第 59 條與職災保險法。
      </p>

      <WorkInjuryCalculator />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">職業災害補償怎麼算？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工因職業災害受傷、罹病、失能或死亡時，雇主依勞基法第 59 條負有無過失補償責任。
          同時，勞工也可依《勞工職業災害保險及保護法》向勞保局請領職災保險給付。
          雇主的補償金額與勞保給付可以互相抵充。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">不能工作期間的工資補償</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工因職災治療期間不能工作，雇主應按原領工資數額補償。
          所謂「原領工資」是指勞工遭遇職災前一日正常工作時間所得的工資。
          同時，勞保會發給「職災傷病給付」：第 1-2 個月為投保薪資日額的 70%，
          第 3 個月起為 50%，最長給付 2 年。雇主已支付的工資可以抵充勞保給付。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">失能給付</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工因職災導致身體失能，依失能等級（共 15 級）給付。
          第 1 等級最嚴重，給付日數最多（1800 日）；第 15 等級最輕，給付 45 日。
          失能給付金額 = 投保薪資日額（月投保薪資 &divide; 30）&times; 該等級給付日數。
          符合條件者也可以選擇按月領取失能年金。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">死亡給付</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工因職災死亡時，雇主應給予 5 個月平均工資作為喪葬費，
          以及 40 個月平均工資作為死亡補償。
          勞保方面，遺屬可以請領「遺屬年金」，金額為投保薪資的 50%，按月發給。
          如果遺屬不符合年金請領資格，也可以選擇一次請領遺屬津貼。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">醫療費用</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工因職災就醫，雇主應負擔必要的醫療費用。
          持「職災醫療書單」到健保特約醫院就醫，可免繳健保部分負擔。
          雇主另需負擔健保不給付的自費項目，包括合理的復健、看護等費用。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">發生職災後的處理步驟</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          發生職災時，應立即就醫並保留所有醫療單據。
          通知雇主並填寫職災通報表（雇主有義務在 8 小時內通報）。
          向勞保局申請職災給付，並留意申請時效（2 年內）。
          如果雇主未依法補償，可向勞工局申訴或提起勞資爭議調解。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
