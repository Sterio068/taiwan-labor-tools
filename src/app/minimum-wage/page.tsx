import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { OfficialSources, type OfficialSourceLink } from "@/components/seo/OfficialSources";
import { LABOR_CONSTANTS } from "@/data/constants";
import { lawArticleUrl, PCODE } from "@/data/tool-explainers/types";
import { calculateSalaryBreakdown } from "@/lib/calculations/salary-breakdown";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";
import { breadcrumbSchema, buildPageMetadata, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "2026 最低工資：月薪 29,500、時薪 196 元完整解說",
  description:
    "2026 年最低工資月薪 29,500 元、時薪 196 元。依最低工資法整理適用對象、月薪與時薪怎麼看、哪些項目可以算進最低工資、實領試算、歷年調整與違法申訴方式。",
  keywords: ["2026最低工資", "最低薪資2026", "基本工資月薪", "時薪196", "最低工資法"],
  path: "/minimum-wage",
});

const MONTHLY = LABOR_CONSTANTS.minimumMonthlyWage;
const HOURLY = LABOR_CONSTANTS.minimumHourlyWage;
const monthlyAsHourly = MONTHLY / LABOR_CONSTANTS.monthlyWorkHours;
const takeHome = calculateSalaryBreakdown(MONTHLY, 0, 0);

const HISTORY = [
  { year: "2026", monthly: 29_500, hourly: 196 },
  { year: "2025", monthly: 28_590, hourly: 190 },
  { year: "2024", monthly: 27_470, hourly: 183 },
  { year: "2023", monthly: 26_400, hourly: 176 },
  { year: "2022", monthly: 25_250, hourly: 168 },
  { year: "2021", monthly: 24_000, hourly: 160 },
];

const FAQ_ITEMS = [
  {
    question: "2026 年最低工資是多少？",
    answer: `自 2026 年 1 月 1 日起，每月最低工資 ${formatMoney(MONTHLY)} 元、每小時最低工資 ${HOURLY} 元。`,
  },
  {
    question: "月薪 29,500 元換算時薪不到 196 元，違法嗎？",
    answer: `不違法。月薪制看的是每月最低工資 ${formatMoney(MONTHLY)} 元；29,500 ÷ 30 ÷ 8 約 ${formatMoneyDecimal(monthlyAsHourly)} 元，是計算加班費與請假扣薪的時薪基數。時薪 ${HOURLY} 元是給按時計酬的工作使用，時薪最低工資已把例假與休息日的工資考量在內。`,
  },
  {
    question: "試用期薪資可以低於最低工資嗎？",
    answer: "不行。最低工資法適用所有適用勞基法的勞工，試用期也不例外。",
  },
  {
    question: "全勤獎金、伙食津貼可以算進最低工資嗎？",
    answer: "最低工資比較的是勞工因工作而獲得的工資。每月固定發給的伙食津貼等經常性給與屬於工資；但加班費、國定假日出勤加給，以及年終、三節節金等非經常性給與，一般不用來湊足最低工資。實際個案可向勞工局確認。",
  },
  {
    question: "老闆給的薪水低於最低工資怎麼辦？",
    answer: "約定低於最低工資的部分，依最低工資法第 5 條以最低工資為準，可以要求補發差額。可向工作地縣市勞工局申訴，雇主可處 2 萬元以上 100 萬元以下罰鍰（最低工資法第 17 條）。",
  },
];

const SOURCES: OfficialSourceLink[] = [
  { label: "最低工資法第 3、5 條", url: lawArticleUrl(PCODE.minimumWage, "5"), note: "適用於所有適用勞基法的勞工；約定工資低於最低工資者，以最低工資為準。" },
  { label: "最低工資法第 9、14 條", url: lawArticleUrl(PCODE.minimumWage, "9"), note: "審議參採消費者物價指數年增率等指標，核定後原則自次年 1 月 1 日實施。" },
  { label: "最低工資法第 17 條", url: lawArticleUrl(PCODE.minimumWage, "17"), note: "低於最低工資者，處雇主 2 萬元以上 100 萬元以下罰鍰。" },
  { label: "勞動部 115 年最低工資公告", url: "https://www.mol.gov.tw/1607/1632/1633/84947/", note: "2026 年月最低工資 29,500 元、時最低工資 196 元。" },
];

export default function MinimumWagePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={faqSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "2026 最低工資", url: `${SITE_URL}/minimum-wage` },
        ])}
      />
      <Breadcrumb jsonLd={false} items={[{ label: "首頁", href: "/" }, { label: "2026 最低工資" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">2026 最低工資</h1>
        <p className="text-slate-600 text-lg leading-8 mb-8">
          最低工資法自 2025 年起取代勞基法的「基本工資」規定。勞動部公告自 2026 年 1 月 1 日起，月薪制最低 {formatMoney(MONTHLY)} 元、時薪制最低 {HOURLY} 元；
          雙方約定的工資低於這個數字，依法以最低工資為準。
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-surface rounded-[16px] border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-500 mb-2">月薪制</p>
            <p className="text-5xl font-extrabold text-brand-600 mb-1">${formatMoney(MONTHLY)}</p>
            <p className="text-slate-500 text-sm">每月最低工資</p>
          </div>
          <div className="bg-surface rounded-[16px] border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-500 mb-2">時薪制</p>
            <p className="text-5xl font-extrabold text-brand-600 mb-1">${HOURLY}</p>
            <p className="text-slate-500 text-sm">每小時最低工資</p>
          </div>
        </div>
      </header>

      <article className="prose prose-slate max-w-3xl prose-headings:text-slate-900 prose-p:leading-8">
        <h2>誰適用最低工資</h2>
        <p>
          最低工資法第 3 條規定，適用對象是所有適用勞動基準法的勞工，包括全職、兼職、工讀、試用期與派遣勞工，本國籍與外籍勞工都一樣。
          最低工資由勞動部的最低工資審議會每年第三季開會審議，主要參考消費者物價指數年增率，經行政院核定後原則自次年 1 月 1 日實施。
        </p>

        <h2>月薪與時薪要分開看</h2>
        <p>
          月薪制勞工比的是每月最低工資 {formatMoney(MONTHLY)} 元，時薪制勞工比的是每小時 {HOURLY} 元。兩者不能直接互換：
          {formatMoney(MONTHLY)} ÷ 30 ÷ 8 約為 {formatMoneyDecimal(monthlyAsHourly)} 元，這是月薪制計算加班費、請假扣薪的「平日每小時工資額」，並不違法。
          時薪最低工資比較高，是因為審議時把按時計酬者例假與休息日應得的工資納入考量，所以時薪制勞工例假、休息日沒有出勤時，不會再另外領工資。
        </p>
        <p>
          部分工時勞工若約定按月計酬，可依約定工時占全時工時的比例計算，但不得低於每月最低工資按同一比例換算的金額；按時計酬者，每小時一律不得低於 {HOURLY} 元。
        </p>

        <h2>哪些錢可以算進最低工資</h2>
        <ul>
          <li>可以：本薪，以及每月固定發給、屬於工資的津貼與加給（例如職務加給、固定伙食津貼）。</li>
          <li>不宜：加班費、國定假日出勤加給，這些是法定的額外報酬，不能拿來補足正常工時的最低工資。</li>
          <li>不算：年終獎金、三節節金、紅利等勞基法施行細則第 10 條所列的非經常性給與。</li>
        </ul>
        <p>常見違法手法是把底薪壓在最低工資以下，再用「全勤獎金」「績效獎金」湊數；只要獎金有條件、不是每月固定領到，就不能確保每月工資達到最低工資。</p>

        <h2>領最低工資，每月實領多少</h2>
        <p>
          月薪 {formatMoney(MONTHLY)} 元、沒有眷屬加保與勞退自提時，勞保（含就保）自付 {formatMoney(takeHome.laborInsurance)} 元、健保自付 {formatMoney(takeHome.nhi)} 元，
          每月實領約 {formatMoney(takeHome.netSalary)} 元；雇主另外提繳勞退 {formatMoney(takeHome.pensionEmployer)} 元到你的個人專戶。
          最低工資調整時，勞保、健保、勞退的最低級距也會一起調整到 {formatMoney(MONTHLY)} 元。
        </p>

        <h2>歷年最低工資</h2>
        <table>
          <thead>
            <tr>
              <th>實施年度</th>
              <th>每月最低工資</th>
              <th>每小時最低工資</th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{formatMoney(row.monthly)} 元</td>
                <td>{row.hourly} 元</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>2024 年以前依勞基法稱為「基本工資」，2025 年起依最低工資法稱為「最低工資」。</p>

        <h2>薪水低於最低工資怎麼辦</h2>
        <ol>
          <li>保留薪資單、銀行入帳紀錄、勞動契約與排班表，算出每月或每小時的差額。</li>
          <li>先以書面向公司要求補發差額。</li>
          <li>向工作地縣市勞工局申訴，或撥打勞動部 1955 專線；雇主可處 2 萬元以上 100 萬元以下罰鍰。</li>
          <li>差額屬於工資，可一併申請勞資爭議調解；工資請求權時效為 5 年。</li>
        </ol>
        <p>
          想核對自己的金額，可用<Link href="/tools/salary">薪資明細計算機</Link>與<Link href="/tools/hourly-monthly">時薪月薪換算</Link>；
          更多說明見<Link href="/articles/minimum-wage-2026">2026 最低工資調整影響</Link>與<Link href="/articles/minimum-wage-hourly-2026">時薪 196 元說明</Link>。
        </p>
      </article>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">常見問題</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group rounded-[16px] border border-slate-200 bg-surface overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-slate-800 hover:bg-slate-50 transition-colors list-none">
                <span>{item.question}</span>
                <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <p className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed border-t border-slate-100">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-3xl">
        <OfficialSources sources={SOURCES} />
      </div>
    </div>
  );
}
