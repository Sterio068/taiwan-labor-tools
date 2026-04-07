import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { MaternityCalculator } from "@/components/tools/MaternityCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "產假/育嬰假計算機 — 2026 天數與給付一鍵查",
  description:
    "計算產假、陪產假、育嬰留停天數與勞保生育給付。依據性別平等工作法與勞保條例。",
  keywords: ["產假幾天", "育嬰留停", "陪產假", "生育給付", "流產假", "育嬰假"],
  path: "/tools/maternity",
});

export default function MaternityPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "產假/育嬰假計算機",
          description: "計算產假、陪產假、育嬰留停天數與勞保給付",
          path: "/tools/maternity",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "產假/育嬰假計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        產假 / 育嬰假計算機
      </h1>
      <p className="text-slate-500 mb-8">
        選擇假別類型，自動計算請假天數、薪資給付方式與勞保生育給付金額。
      </p>

      <MaternityCalculator />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">產假與育嬰假完整指南</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣的產假與育嬰假制度主要依據《性別平等工作法》與《勞工保險條例》。
          不同假別的天數、薪資計算方式各有不同，以下逐一說明。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">產假（56 天）</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          女性勞工分娩前後，雇主應給予產假 8 週（56 天）。
          任職滿 6 個月者，產假期間工資照給（全薪）；未滿 6 個月者減半發給。
          此外，參加勞保的女性勞工可申請「生育給付」，金額為投保薪資 2 個月，一次領取。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">陪產檢及陪產假（7 天）</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          配偶分娩時，受僱者可請陪產檢及陪產假共 7 天。
          此假為有薪假（工資照給），可以在配偶分娩的前後合計 15 天內分次請假。
          不需要一次請完，方便爸爸配合產檢或陪伴住院。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">育嬰留職停薪（最長 2 年）</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          任職滿 6 個月的受僱者，在子女滿 3 歲前，可以申請育嬰留職停薪，每次最長 2 年。
          育嬰留停期間沒有薪水，但可以向勞保局申請「育嬰留職停薪津貼」。
          津貼金額為投保薪資的 80%，最長發給 6 個月。夫妻可同時請領，合計最多 12 個月。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">流產假</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          懷孕 3 個月以上流產者，雇主應給予 4 週（28 天）產假，工資照給。
          懷孕未滿 3 個月流產者，給予 5 天假。未滿 2 個月流產者，給予 5 天假（性別平等工作法第 15 條）。
          流產假期間的薪資依勞工請假規則辦理。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">請假小提醒</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          產假、陪產假屬於法定假別，雇主不得拒絕。如果雇主違法不給假或扣薪，
          勞工可以向地方勞工主管機關申訴，雇主最高可處新台幣 30 萬元罰鍰。
          建議保留請假紀錄與薪資單，作為日後爭議的佐證。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
