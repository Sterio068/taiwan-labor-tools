import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "被資遣 vs 自願離職：差別與影響完整比較｜2026 勞工權益",
  description:
    "被資遣跟自願離職差在哪？資遣費、預告期、失業給付、非自願離職證明怎麼算？一次看懂兩種離職方式的法律差異，避開老闆誘你自己寫辭職書的陷阱。",
  keywords: [
    "資遣自願離職",
    "非自願離職",
    "被資遣差別",
    "離職方式",
    "資遣費",
    "失業給付",
    "非自願離職證明",
    "預告期",
    "資遣預告",
  ],
  path: "/compare/fired-vs-quit",
});

const FAQS = [
  {
    question: "老闆要我自己遞辭職書才給資遣費，合法嗎？",
    answer:
      "不合法。資遣費的前提是「非自願離職」，雇主用勞基法第 11 條或第 13 條資遣你。若你簽署自願離職書，法律上就是自行終止契約，雇主可以拒絕給資遣費、拒發非自願離職證明，也會讓你失去失業給付資格。強烈建議不要輕易簽署。",
  },
  {
    question: "失業給付只有被資遣才能領嗎？",
    answer:
      "是的。就業保險法規定，失業給付僅適用於「非自願離職」的投保人，並必須取得「非自願離職證明」才能向勞保局申請。自願離職、契約屆滿、退休、被開除的勞工都無法領取。",
  },
  {
    question: "被資遣跟被開除一樣嗎？",
    answer:
      "不一樣。被資遣是雇主依勞基法第 11 條（業務緊縮、虧損、不能勝任等）終止契約，勞工有資遣費和失業給付；被開除則是雇主依第 12 條懲戒解僱（嚴重違紀），勞工既無資遣費也無法領失業給付。兩者的非自願離職證明也有差異。",
  },
  {
    question: "預告期雇主沒遵守怎麼辦？",
    answer:
      "資遣時雇主應依年資給預告期（3 個月 ~ 1 年給 10 天、1 ~ 3 年給 20 天、3 年以上給 30 天）。若未預告直接資遣，雇主應付「預告期工資」作為替代。勞工可向當地勞工局申訴或提起訴訟追討。",
  },
  {
    question: "離職後找新工作會不會被問到離職原因？",
    answer:
      "會。但回答方式要注意：非自願離職可照實說，並能出示非自願離職證明以佐證。自願離職通常建議以「生涯規劃」「家庭因素」等中性說法回答，不必主動提及負面細節。履歷上的離職原因不須詳述，面試中被問到才解釋。",
  },
];

const ROWS: Array<{
  label: string;
  fired: string;
  quit: string;
}> = [
  {
    label: "法律性質",
    fired: "雇主終止勞動契約（非自願）",
    quit: "勞工終止勞動契約（自願）",
  },
  {
    label: "資遣費（新制）",
    fired: "每滿 1 年給 0.5 月平均工資（上限 6 月）",
    quit: "沒有（除非雇主違反契約）",
  },
  {
    label: "預告期",
    fired: "雇主依年資給 10~30 天預告期",
    quit: "勞工需提前 10~30 天告知雇主",
  },
  {
    label: "失業給付",
    fired: "可領（最高 60% 投保薪資，6 個月）",
    quit: "不可領",
  },
  {
    label: "非自願離職證明",
    fired: "雇主必須開立",
    quit: "無，只有一般離職證明",
  },
  {
    label: "勞保職災保障",
    fired: "離職後仍享未結的職災給付請求權",
    quit: "同樣保有未結請求權",
  },
  {
    label: "對下份工作影響",
    fired: "可正大光明說明原因，不影響就業",
    quit: "較少被質疑，但沒有過渡期保障",
  },
  {
    label: "勞資關係處理",
    fired: "可向勞工局申請調解、提告",
    quit: "雇主違約才可爭訟",
  },
  {
    label: "找工作過渡期保障",
    fired: "可依賴失業給付 + 資遣費撐 3~6 個月",
    quit: "靠個人存款，無政府補助",
  },
  {
    label: "實務上建議",
    fired: "務必拿到書面資遣證明",
    quit: "評估是否能轉為資遣、爭取較佳條件",
  },
];

const SCENARIOS: Array<{ title: string; body: string }> = [
  {
    title: "老闆暗示要你離職、口頭說要資遣",
    body: "要求雇主出具書面資遣通知及非自願離職證明，並載明勞基法第 11 條哪一款理由。不要先簽辭職書，否則會被認定為自願離職，失去資遣費與失業給付。",
  },
  {
    title: "你想主動離職但希望能領失業給付",
    body: "除非雇主違反勞動契約（第 14 條），否則自願離職無法領失業給付。可觀察雇主是否有減薪、積欠薪資、調動違約等事由，若符合，可依第 14 條終止契約並要求資遣費。",
  },
  {
    title: "你被雇主用「業績不佳」名義資遣",
    body: "可以領資遣費及失業給付。但雇主需證明已盡輔導義務，否則資遣不合法。建議保留績效改善計畫、考核紀錄等文件，勞資爭議時作為證據。",
  },
  {
    title: "你想跳槽但公司挽留，要你簽保密協議",
    body: "這是自願離職。請把「離職生效日」寫清楚、結清所有加班費與特休未休工資、取得一般離職證明。保密條款若涉競業禁止須符合勞基法第 9-1 條，不合理條款可拒簽。",
  },
];

const RELATED_TOOLS = [
  {
    name: "資遣費計算機",
    href: "/tools/severance",
    desc: "輸入年資與平均工資，秒算資遣費金額",
  },
];

const RELATED_ARTICLES = [
  { title: "被資遣怎麼辦？7 步驟完整攻略", href: "/articles/fired-what-to-do" },
  { title: "自願離職前必讀：8 大權益清單", href: "/articles/quit-job-rights" },
  { title: "失業給付申請完全指南", href: "/articles/unemployment-benefits" },
];

export default function FiredVsQuitPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "比較", href: "/compare" },
          { label: "被資遣 vs 自願離職" },
        ]}
      />

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
        被資遣 vs 自願離職：差別與影響
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-10">
        一次離職在不同名義下，可能差幾十萬。「被資遣」屬於<strong>非自願離職</strong>，勞工享有資遣費、預告期工資、失業給付等保障；
        「自願離職」則是勞工主動終止，這些權益通通沒有。
        許多雇主會誘導勞工自己寫辭職書，藉此規避資遣費與失業給付——
        這份完整對照表幫你看懂兩者差異，避開離職陷阱。
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
                被資遣
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-slate-700">
                自願離職
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="p-3 md:p-4 font-semibold text-slate-700 bg-slate-50/50 align-top">
                  {row.label}
                </td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.fired}</td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.quit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 關鍵提醒 */}
      <section className="mb-10 p-6 bg-brand-50 rounded-[16px] border border-brand-200">
        <h2 className="text-xl font-bold text-brand-900 mb-3">
          關鍵差異：失業給付只保障非自願離職
        </h2>
        <p className="text-slate-700 leading-relaxed">
          <strong>就業保險法</strong>規定，失業給付僅適用於「非自願離職」的勞工。
          以月薪 $40,000 為例，最高可領 60% × 6 個月 = <strong>$144,000</strong>，
          若你簽下自願離職書，這筆錢就沒了。因此當雇主暗示你離職時，務必爭取「資遣」名義處理。
        </p>
      </section>

      {/* 優缺點 */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-brand-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-brand-900">被資遣的保障</h3>
          <ul className="space-y-2 text-slate-700">
            <li>拿到資遣費（新制每年 0.5 月）</li>
            <li>領到預告期工資</li>
            <li>可申請失業給付 6 個月</li>
            <li>可參加職訓津貼補助</li>
            <li>非自願離職證明可佐證事由</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-slate-900">自願離職的彈性</h3>
          <ul className="space-y-2 text-slate-700">
            <li>可自選離職時機、無需等待</li>
            <li>履歷上較無爭議、面試解釋空間大</li>
            <li>不須證明「非我所願」</li>
            <li>缺點：無資遣費</li>
            <li>缺點：無失業給付過渡期</li>
          </ul>
        </div>
      </section>

      <AdBanner slot="compare-fired-quit-mid" />

      {/* 該怎麼選 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">常見情境 4 選 1</h2>
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
