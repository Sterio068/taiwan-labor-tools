import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "月薪 vs 時薪：哪個比較划算？2026 完整比較表｜台灣勞工權益",
  description:
    "月薪制和時薪制差在哪？勞健保、加班費、特休、資遣費怎麼算？用 2026 最低工資 $29,500 vs 時薪 $196 為基準，一次比較兩種僱用型態的優缺點與適合對象。",
  keywords: [
    "月薪vs時薪",
    "月薪時薪比較",
    "時薪制",
    "月薪制",
    "哪個划算",
    "2026基本工資",
    "時薪196",
    "月薪29500",
    "部分工時",
    "勞健保時薪",
  ],
  path: "/compare/monthly-vs-hourly",
});

const FAQS = [
  {
    question: "時薪 $196 換算成月薪是多少？",
    answer:
      "以全職每月工作 174 小時（每週 40 小時 × 4.35 週）計算，時薪 $196 × 174 小時 ≈ $34,104，已高於月薪最低工資 $29,500。但時薪制勞工通常不會穩定排到 174 小時，實際月收入多為 $20,000~$30,000。",
  },
  {
    question: "時薪制也有勞健保嗎？",
    answer:
      "有。只要符合「就業服務法」受僱關係，即使是時薪制、部分工時、兼職，雇主都必須為勞工投保勞保、健保、勞退。月薪少於 $29,500 的部分工時勞工，可按實際投保薪資級距投保，但雇主不得藉故不保。",
  },
  {
    question: "時薪制有特休和資遣費嗎？",
    answer:
      "有。勞基法第 38 條的特休權利適用於所有勞工（含時薪制），只是按比例給假。資遣費也一樣適用新制（每年 0.5 個月平均工資），計算基礎為被資遣前 6 個月的平均工資。",
  },
  {
    question: "月薪制的加班費基數怎麼算？",
    answer:
      "月薪制時薪基數 = 月薪 ÷ 30 ÷ 8。2026 年月薪最低工資 $29,500，換算時薪基數約 $123，已低於最低時薪 $196。這是月薪制加班費常被低估的主因，也是許多勞檢開罰的重點。",
  },
  {
    question: "部分工時一定要用時薪制嗎？",
    answer:
      "不一定。部分工時可用時薪、日薪、月薪制，法律並未強制。但時薪制方便按實際工時結算，對排班彈性的工作（餐飲、零售、家教）較實用。",
  },
];

const ROWS: Array<{
  label: string;
  monthly: string;
  hourly: string;
}> = [
  {
    label: "計算基礎",
    monthly: "每月固定金額（不論實際工時）",
    hourly: "實際工時 × 時薪",
  },
  {
    label: "2026 最低工資",
    monthly: "月薪 $29,500（底線）",
    hourly: "時薪 $196（底線）",
  },
  {
    label: "勞健保適用",
    monthly: "全適用，按投保級距扣繳",
    hourly: "同樣全適用，按實際工資級距",
  },
  {
    label: "加班費倍率",
    monthly: "時薪基數 = 月薪 ÷ 30 ÷ 8，約 $123",
    hourly: "直接以時薪 × 1.34 或 1.67 倍",
  },
  {
    label: "特別休假",
    monthly: "依年資給滿額天數",
    hourly: "依年資 × 當月工時比例給假",
  },
  {
    label: "資遣費（新制）",
    monthly: "每年 0.5 月平均工資，上限 6 個月",
    hourly: "同樣適用，以前 6 個月平均工資計",
  },
  {
    label: "收入穩定性",
    monthly: "高，收入不受淡旺季影響",
    hourly: "低，月收入依排班大幅波動",
  },
  {
    label: "工時彈性",
    monthly: "低，需配合公司固定時段",
    hourly: "高，可挑時段、接多份工作",
  },
  {
    label: "加班認定",
    monthly: "超過 8 小時即屬加班",
    hourly: "超過每日約定時數才屬加班",
  },
  {
    label: "適合族群",
    monthly: "全職、通勤族、需穩定收入者",
    hourly: "學生、家管、斜槓、退休人士",
  },
];

const SCENARIOS: Array<{ title: string; body: string }> = [
  {
    title: "你要養家、需要穩定月收入",
    body: "選月薪制。月薪制每月收入固定，方便做房貸、房租、車貸等長期財務規劃，勞健保、勞退提繳金額也穩定累積。",
  },
  {
    title: "你是學生或需要時間彈性",
    body: "選時薪制。時薪制可依課表、家庭狀況自由排班，時薪 $196 也已高於月薪換算的時薪 $123，實際每小時工資反而更高。",
  },
  {
    title: "你想同時兼多份工作",
    body: "選時薪制。時薪制較容易兼職多份工作，不受單一公司工時綁定。但要注意所有薪資合計若達二代健保補充保費門檻會被扣繳。",
  },
  {
    title: "你擔心被惡意壓低工時",
    body: "選月薪制。月薪制受每月固定金額保障，雇主不能用「今天沒客人你早點回去」來扣薪水；時薪制則常遇到排班忽增忽減。",
  },
];

const RELATED_TOOLS = [
  {
    name: "時薪月薪換算機",
    href: "/tools/hourly-monthly",
    desc: "輸入時薪自動換算月薪，或反向計算",
  },
  {
    name: "薪資明細計算機",
    href: "/tools/salary",
    desc: "算月薪實領，含勞健保與所得稅預扣",
  },
];

const RELATED_ARTICLES = [
  { title: "打工族必懂：部分工時勞工的 7 大權益", href: "/articles/part-time-rights" },
  { title: "2026 最低時薪 $196 完全解析", href: "/articles/minimum-wage-hourly-2026" },
];

export default function MonthlyVsHourlyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "比較", href: "/compare" },
          { label: "月薪 vs 時薪" },
        ]}
      />

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
        月薪 vs 時薪：哪個比較划算？
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-10">
        2026 年月薪最低工資 $29,500、最低時薪 $196，兩者是同一條最低工資底線的兩種呈現方式。
        但對勞工來說，選擇月薪制還是時薪制會影響加班費、勞健保、收入穩定性，甚至退休金累積速度。
        這份完整對照表幫你快速看懂兩者差異。
      </p>

      {/* 比較表 */}
      <section className="mb-10 overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-[12px] overflow-hidden border border-slate-200 text-sm md:text-base">
          <thead>
            <tr className="bg-brand-50">
              <th className="p-3 md:p-4 text-left font-bold text-slate-900 w-32">
                項目
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-brand-700">
                月薪制
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-slate-700">
                時薪制
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="p-3 md:p-4 font-semibold text-slate-700 bg-slate-50/50 align-top">
                  {row.label}
                </td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.monthly}</td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.hourly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 時薪換算月薪情境 */}
      <section className="mb-10 p-6 bg-white rounded-[16px] border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          時薪換算月薪：不同工時情境
        </h2>
        <div className="space-y-2 text-slate-700">
          <p>
            以 <strong>2026 年時薪 $196</strong> 為基準，不同每月工時換算的月收入：
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>每月 80 小時（兼職、週末打工）≈ $15,680</li>
            <li>每月 120 小時（約每週 28 小時）≈ $23,520</li>
            <li>每月 160 小時（約每週 37 小時）≈ $31,360（已超過月薪底線）</li>
            <li>每月 174 小時（全職換算）≈ $34,104</li>
          </ul>
          <p className="text-sm text-slate-500 mt-3">
            備註：月薪最低工資 $29,500 換算時薪約 $123，實際時薪 $196 已高出約 59%，也因此時薪制在單價上通常優於月薪制。
          </p>
        </div>
      </section>

      {/* 優缺點 */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-brand-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-brand-900">月薪制的優點</h3>
          <ul className="space-y-2 text-slate-700">
            <li>收入穩定，方便做長期財務規劃</li>
            <li>勞退提繳金額固定，退休金累積穩定</li>
            <li>特休、國定假日不影響當月工資</li>
            <li>颱風天、公司停工仍可領全薪</li>
            <li>信用卡、房貸、租屋較容易核准</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-slate-900">時薪制的優點</h3>
          <ul className="space-y-2 text-slate-700">
            <li>實際時薪單價較高（$196 vs $123）</li>
            <li>工時彈性，適合兼職、副業</li>
            <li>加班認定明確，超時必算加班費</li>
            <li>可同時接多份工作，分散風險</li>
            <li>沒有責任制陷阱，做多久領多久</li>
          </ul>
        </div>
      </section>

      <AdBanner slot="compare-monthly-hourly-mid" />

      {/* 該怎麼選 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">該怎麼選？4 種情境</h2>
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
