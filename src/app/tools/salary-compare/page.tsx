import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { SalaryComparer } from "@/components/tools/SalaryComparer";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "薪資比較器 — 兩份 Offer 該選哪個？",
  description:
    "輸入兩份工作的月薪、年終、津貼，立即比較年度總收入、每月實領與雇主成本。幫你做出最佳薪資決策。",
  keywords: [
    "薪資比較",
    "offer 比較",
    "年薪比較",
    "實領薪資",
    "薪水比較",
    "工作選擇",
    "年終獎金",
  ],
  path: "/tools/salary-compare",
});

export default function SalaryComparePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "薪資比較器",
          description: "比較兩份工作的薪資條件",
          path: "/tools/salary-compare",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["salary-compare"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何比較兩份薪資方案",
        totalTime: "PT2M",
        steps: [
          { name: "輸入第一份薪資條件", text: "填入月薪、年終、加班費等薪資組成項目" },
          { name: "輸入第二份薪資條件", text: "填入另一份工作的薪資條件做對比" },
          { name: "查看實領差異比較", text: "系統扣除勞健保後，比較兩份薪資的實際年收入差異" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "薪資比較器", url: `${SITE_URL}/tools/salary-compare` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "薪資比較器" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        薪資比較器
      </h1>
      <p className="text-slate-500 mb-8">
        並排比較兩份工作的薪資條件，從月薪、年終到實領金額一目了然。
      </p>

      <SalaryComparer />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          如何正確比較兩份工作的薪資？
        </h2>
        <p className="text-slate-700 leading-relaxed my-4">
          面對兩份工作 Offer 時，單看月薪數字往往不夠準確。真正影響你口袋的是扣除勞健保後的「實領金額」，以及加上年終獎金和各項津貼後的「年度總收入」。本工具幫你一次算清楚，做出最明智的選擇。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          年度總收入的計算方式
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          年度總收入 = 月薪 x 12 + 年終獎金 + 每月津貼 x 12。年終獎金通常以「保障 N 個月」表示，例如保障 2 個月年終就是月薪乘以 2。通勤津貼、餐費補助等雖然金額不大，但一年累積下來也是不小的數字。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          實領薪資怎麼算？
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          每月實領 = 月薪 - 勞保自付額 - 健保自付額 + 津貼。勞保自付額依投保級距計算，約為投保薪資的 2.64%（含就業保險）。健保自付額則依健保級距計算，如果有眷屬加保，健保費用會隨之增加。這些法定扣繳金額會隨著薪資級距的不同而有顯著差異。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          別忽略雇主成本
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          雇主每月的實際成本遠高於你的月薪。除了月薪本身，雇主還需負擔勞保雇主份（約為投保薪資的 12.08%）、健保雇主份（約為投保薪資的 4.69%）、以及勞退提繳 6%。了解雇主成本有助於你在薪資談判時掌握全貌。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          薪資以外的考量
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          選擇工作不只看薪水。通勤時間與費用、加班文化、特休天數、員工福利（如團保、進修補助）、升遷空間等都是重要因素。建議在使用本工具做完薪資比較後，也將這些軟性條件納入評估。如果需要更詳細的薪資拆解，可以使用我們的薪資計算機查看完整的勞健保扣繳明細。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="薪資比較器" path="/tools/salary-compare" /></div>
      <FaqSection items={TOOL_FAQS["salary-compare"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["salary-compare"]}
        tools={TOOL_RELATED_TOOLS["salary-compare"]}
      />
    </div>
  );
}
