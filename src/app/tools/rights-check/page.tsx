import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { RightsChecker } from "@/components/tools/RightsChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益健檢 — 8 題快速檢查勞動條件是否合法",
  description:
    "回答 8 個是非題，立即檢查薪資、加班費、特休、勞健保等勞動條件是否合法。發現違法情形提供法條依據與建議行動。",
  keywords: [
    "勞工權益",
    "勞動條件檢查",
    "勞基法違法",
    "基本工資",
    "加班費",
    "特休假",
    "勞保",
    "勞工權益檢查",
  ],
  path: "/tools/rights-check",
});

export default function RightsCheckPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞工權益健檢",
          description: "8 題快速檢查勞動條件是否合法",
          path: "/tools/rights-check",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["rights-check"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何使用勞工權益健檢",
        totalTime: "PT3M",
        steps: [
          { name: "選擇問題類型", text: "從薪資、加班、假別、離職、霸凌等分類中選擇你遭遇的狀況" },
          { name: "回答相關問題", text: "依序回答問題，說明你的工作條件與具體情況" },
          { name: "查看法規說明與建議", text: "系統依勞基法條文判斷合法性，並提供申訴管道與下一步建議" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "勞工權益健檢", url: `${SITE_URL}/tools/rights-check` },
      ])} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞工權益健檢" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞工權益健檢
      </h1>
      <p className="text-slate-500 mb-8">
        回答 8 個問題，快速檢查你的勞動條件是否符合法律規定。
      </p>

      <RightsChecker />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          為什麼需要勞工權益健檢？
        </h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣有超過 1,100 萬名受僱勞工，但根據勞動部統計，每年勞動檢查仍查獲數萬件違法案例。許多勞工因為不了解自身權益，長期處於不合法的勞動條件下卻不自知。本工具透過 8 個核心問題，幫助你快速篩檢最常見的違法態樣。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          基本工資與工資全額給付
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          依勞基法第 21 條，勞工的工資不得低於基本工資。2026 年起，月薪制基本工資調整為 $29,500，時薪制為 $190。雇主不得以任何名目任意扣薪，勞基法第 22 條明確規定工資應全額直接給付勞工。若雇主違法扣薪，勞工可保留薪資單據向勞工局檢舉。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          加班費與特休假
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          加班費依勞基法第 24 條計算，平日前 2 小時以 1 又 1/3 倍計算，後 2 小時以 1 又 2/3 倍計算。許多雇主以「責任制」為由不給加班費，但實際上責任制須經勞動部核定，並非雇主片面宣告即可成立。特休假方面，依勞基法第 38 條，到職滿 6 個月即有 3 天特休，未休完的天數應折算工資。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          勞健保與投保薪資
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          雇主依法必須為勞工投保勞保與健保。勞保投保薪資應按實際月薪申報，低報投保薪資不僅違法，更會直接影響勞工的傷病給付、生育給付、失業給付及未來的老年給付金額。發現低報情形，可向勞保局提出申訴要求更正。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          資遣與非自願離職
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          雇主資遣勞工時，應依勞基法第 16 條給予預告期間、第 17 條給付資遣費，並開立非自願離職證明。部分雇主會要求勞工簽署「自願離職同意書」以規避資遣費與失業給付，這是嚴重違法行為。若遇此狀況，切勿簽名，應保留所有對話紀錄並向勞工局申請勞資調解。遇到任何勞資爭議，都可撥打免費的 1955 勞工諮詢專線尋求協助。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="勞工權益健檢" path="/tools/rights-check" /></div>
      <FaqSection items={TOOL_FAQS["rights-check"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["rights-check"]}
        tools={TOOL_RELATED_TOOLS["rights-check"]}
      />
    </div>
  );
}
