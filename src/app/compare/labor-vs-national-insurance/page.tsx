import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞保 vs 國保:差別在哪?哪個保障比較好?2026 完整比較",
  description:
    "勞工保險和國民年金差在哪裡?誰有勞保資格?誰必須投國保?從保費、給付項目、老年年金、費率到投保金額,一次看懂兩種社會保險的所有差異。",
  keywords: [
    "勞保國保差別",
    "國民年金",
    "勞工保險",
    "保險比較",
    "老年年金",
    "國保保費",
    "勞保費率",
    "未納保",
    "社會保險",
  ],
  path: "/compare/labor-vs-national-insurance",
});

const FAQS = [
  {
    question: "國民年金是什麼人必須加保?",
    answer:
      "國民年金是為「未能加入勞保、農保、公教保、軍保」的 25~65 歲國民所設計的社會保險,由政府強制納保。自由業、家管、失業者、學生年滿 25 歲後未就業,均屬於國保被保險人。離職後也會自動由勞保轉為國保,直到重新就業再回到勞保。",
  },
  {
    question: "我可以同時有勞保和國保嗎?",
    answer:
      "不行。勞保和國保是互斥的身份。有勞保期間不需繳國保,離職後才會從次月起轉為國保。但可以有勞保年資加上國保年資分別計算老年給付,即退休時兩邊都能領。",
  },
  {
    question: "勞保的老年給付多少?國保呢?",
    answer:
      "勞保老年年金月領金額 = 平均月投保薪資 × 年資 × 1.55%（或選 0.775% 加計算式）。以投保 $45,800、年資 30 年計算,月領約 $21,296。國保月領則是「月投保金額 × 年資 × 1.3% + $3,772」,以 2026 年月投保金額 $19,761、年資 30 年計算,月領約 $11,479。",
  },
  {
    question: "國保的費率是多少?",
    answer:
      "2026 年國保費率為 10.5%,保費 = 月投保金額 $19,761 × 10.5% = $2,074。其中政府補助 40%,被保險人自付 60% 約 $1,244。低收入戶、身心障礙者另有更高補助。",
  },
  {
    question: "沒收入為什麼還要繳國保?",
    answer:
      "因為國保的設計目的就是「讓沒勞保的人也能有退休保障」。若長期欠費會影響將來的老年年金給付資格與金額。建議即使沒收入也要繳,或申請經濟困難者緩繳、分期。",
  },
];

const ROWS: Array<{
  label: string;
  labor: string;
  national: string;
}> = [
  {
    label: "適用對象",
    labor: "受僱勞工、雇主",
    national: "25~65 歲未加入其他社保者",
  },
  {
    label: "加保性質",
    labor: "透過雇主投保(強制)",
    national: "政府強制,無投保單位",
  },
  {
    label: "保費負擔",
    labor: "勞工 20%、雇主 70%、政府 10%",
    national: "被保險人 60%、政府 40%",
  },
  {
    label: "費率(2026)",
    labor: "12.5%(含就保 1%)",
    national: "10.5%",
  },
  {
    label: "投保金額",
    labor: "依實際月薪投保級距表",
    national: "固定 $19,761(2026 年度)",
  },
  {
    label: "老年給付",
    labor: "月投保薪資 × 年資 × 1.55%",
    national: "$19,761 × 年資 × 1.3% + $3,772",
  },
  {
    label: "失能給付",
    labor: "依失能等級 × 月投保薪資",
    national: "有,但金額較低",
  },
  {
    label: "死亡給付",
    labor: "喪葬費 + 遺屬年金(或一次金)",
    national: "喪葬費 + 遺屬年金",
  },
  {
    label: "生育給付",
    labor: "60 日月投保薪資(約 2 個月工資)",
    national: "2 個月月投保金額($39,522)",
  },
  {
    label: "職災保障",
    labor: "有(勞保職災保險)",
    national: "無",
  },
  {
    label: "失業給付",
    labor: "有(就業保險給付)",
    national: "無",
  },
];

const SCENARIOS: Array<{ title: string; body: string }> = [
  {
    title: "你是受僱勞工",
    body: "雇主必須為你投保勞保,你無法選擇國保。勞保給付項目多、金額較高,對勞工來說是全面的保障。建議確認雇主是否按實際薪資投保,避免低報。",
  },
  {
    title: "你剛離職、還在找工作",
    body: "離職次月起會自動轉為國保,直到重新就業。期間可申請失業給付(前提是非自願離職且於離職前 3 年有加保 1 年以上),同時繼續繳國保累積年資。",
  },
  {
    title: "你是自由工作者、接案族",
    body: "若沒有固定雇主,只能投保國保。想要更多保障,可加入相關公會或職業工會投勞保(需注意工會是否合法、費用是否合理)。",
  },
  {
    title: "你是家管、學生、退休者",
    body: "只能投保國保。建議把握低保費機會累積年資,未來老年年金才能持續領取。經濟有困難可申請補助或緩繳。",
  },
];

const RELATED_TOOLS = [
  {
    name: "勞健保保費計算器",
    href: "/tools/insurance-premium",
    desc: "輸入月薪算勞保、健保自付額",
  },
];

const RELATED_ARTICLES = [
  { title: "勞保、健保、國保大比較", href: "/articles/labor-insurance-comparison" },
  { title: "自由工作者的保險攻略", href: "/articles/freelancer-insurance" },
];

export default function LaborVsNationalInsurancePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "比較", href: "/compare" },
          { label: "勞保 vs 國保" },
        ]}
      />

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
        勞保 vs 國保:差別在哪?哪個保障比較好?
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-10">
        勞工保險(勞保)與國民年金(國保)是台灣最重要的兩大社會保險,但適用對象完全不同。
        勞保是為「受僱勞工」設計,由雇主強制投保;國保則是為「未能加入其他社保」的國民而設,讓家管、自由業、失業者也有基本保障。
        這份 2026 最新對照表幫你看清每一項差異。
      </p>

      {/* 比較表 */}
      <section className="mb-10 overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-[12px] overflow-hidden border border-slate-200 text-sm md:text-base">
          <thead>
            <tr className="bg-brand-50">
              <th className="p-3 md:p-4 text-left font-bold text-slate-900 w-28">
                項目
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-brand-700">
                勞工保險(勞保)
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-slate-700">
                國民年金(國保)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="p-3 md:p-4 font-semibold text-slate-700 bg-slate-50/50 align-top">
                  {row.label}
                </td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.labor}</td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.national}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 國保設計目的 */}
      <section className="mb-10 p-6 bg-brand-50 rounded-[16px] border border-brand-200">
        <h2 className="text-xl font-bold text-brand-900 mb-3">
          國保:為誰而設計?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          國民年金於 2008 年 10 月上路,是為了解決「沒有勞保、農保、公教保」的 25~65 歲國民的老年、失能、死亡保障問題。
          加保條件有兩種:<strong>主動加保</strong>(沒工作的家管、自由業)與<strong>被動加保</strong>(離職後自動轉保)。
          不像勞保有雇主分攤,國保由被保險人自付 60%、政府補助 40%,費率和給付金額都較低。
        </p>
      </section>

      {/* 優缺點 */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-brand-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-brand-900">勞保的優點</h3>
          <ul className="space-y-2 text-slate-700">
            <li>雇主負擔 70% 保費,個人只付 20%</li>
            <li>給付項目多:老年、失能、死亡、生育、職災</li>
            <li>含就業保險,可申請失業給付</li>
            <li>老年年金給付金額較高</li>
            <li>有職災保險,工作受傷有保障</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-slate-900">國保的特色</h3>
          <ul className="space-y-2 text-slate-700">
            <li>無須雇主,任何人都能加保</li>
            <li>政府補助 40% 保費</li>
            <li>月投保金額固定,保費便宜</li>
            <li>缺點:給付金額明顯較低</li>
            <li>缺點:無失業給付、無職災保障</li>
          </ul>
        </div>
      </section>

      <AdBanner slot="compare-insurance-mid" />

      {/* 該怎麼選 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          你該歸屬哪一邊?4 種情境
        </h2>
        <div className="space-y-3">
          {SCENARIOS.map((s) => (
            <div
              key={s.title}
              className="p-5 bg-white rounded-[14px] border border-slate-200"
            >
              <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 相關連結 */}
      <section className="mb-10 p-6 bg-white rounded-[16px] border border-slate-200">
        <h3 className="font-bold text-lg mb-4 text-slate-900">相關工具與文章</h3>
        <ul className="space-y-3">
          {RELATED_TOOLS.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="flex items-start gap-3 hover:text-brand-600 transition-colors"
              >
                <span className="text-brand-500 mt-0.5">→</span>
                <span>
                  <strong>{t.name}</strong>
                  <span className="block text-sm text-slate-500">{t.desc}</span>
                </span>
              </Link>
            </li>
          ))}
          {RELATED_ARTICLES.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="flex items-start gap-3 hover:text-brand-600 transition-colors"
              >
                <span className="text-brand-500 mt-0.5">→</span>
                <span>{a.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection items={FAQS} />
    </div>
  );
}
