import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "2026 最低工資：月薪 29,500、時薪 196 元完整解說",
  description:
    "2026 年最低工資月薪 $29,500、時薪 $196。含歷年調整趨勢、實領薪水試算、違反最低工資申訴方法，以及對時薪制勞工的影響。",
  keywords: [
    "2026基本工資",
    "最低薪資2026",
    "基本工資月薪",
    "基本時薪196",
    "基本工資計算",
  ],
  path: "/minimum-wage",
});

const HISTORY = [
  { year: "2026", monthly: "$29,500", hourly: "$196" },
  { year: "2025", monthly: "$28,590", hourly: "$190" },
  { year: "2024", monthly: "$27,470", hourly: "$183" },
  { year: "2023", monthly: "$26,400", hourly: "$176" },
  { year: "2022", monthly: "$25,250", hourly: "$168" },
  { year: "2021", monthly: "$24,000", hourly: "$160" },
];

const FAQ_ITEMS = [
  {
    question: "2026 基本工資是多少？",
    answer: "月薪 $29,500、時薪 $196。",
  },
  {
    question: "試用期薪資可以低於基本工資嗎？",
    answer:
      "不行，試用期仍受勞基法保護，薪資不得低於基本工資。",
  },
  {
    question: "時薪工作要看哪個標準？",
    answer:
      "依規定最低不得低於時薪 $196。如果你的月薪折算每小時低於 $196，也是違法。",
  },
  {
    question: "加班費也要依基本工資計算嗎？",
    answer:
      "是的，加班費計算的時薪基準，不得低於最低時薪 $196。月薪制以月薪÷30÷8換算時薪，但結果不得低於 $196。",
  },
  {
    question: "發現老闆給的薪資低於基本工資怎麼辦？",
    answer:
      "可向雇主所在縣市的勞動局申訴，勞動局會進行勞動檢查，雇主違反基本工資規定最高罰款 $30 萬元，並需補發差額。",
  },
];

export default function MinimumWagePage() {
  const faqJsonLd = faqSchema(FAQ_ITEMS);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "首頁", url: SITE_URL },
    { name: "2026 基本工資", url: `${SITE_URL}/minimum-wage` },
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "2026 基本工資" },
        ]}
      />

      {/* 大數字展示區 */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          2026 基本工資
        </h1>
        <p className="text-slate-500 text-lg mb-8">
          依勞基法第 21 條，雇主給付工資不得低於基本工資。2026 年標準如下：
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-[16px] border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              月薪制
            </p>
            <p className="text-5xl font-extrabold text-brand-600 mb-1">
              $29,500
            </p>
            <p className="text-slate-500 text-sm">每月最低工資</p>
          </div>
          <div className="bg-white rounded-[16px] border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              時薪制
            </p>
            <p className="text-5xl font-extrabold text-brand-600 mb-1">
              $196
            </p>
            <p className="text-slate-500 text-sm">每小時最低工資</p>
          </div>
        </div>
      </div>

      {/* 說明區塊 */}
      <div className="space-y-5 mb-10">
        <div className="bg-slate-50 rounded-[16px] border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            基本工資是什麼？
          </h2>
          <p className="text-slate-600 leading-relaxed">
            基本工資（最低工資）是政府依《勞動基準法》第 21 條訂定的薪資下限，雇主不得以任何理由給付低於此標準的工資。違反規定最高可處 $30 萬元罰鍰，且須補發差額。基本工資每年由勞動部召開基本工資審議委員會檢討調整。
          </p>
        </div>

        <div className="bg-white rounded-[16px] border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            如何計算時薪？
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            月薪制勞工的時薪換算公式：
          </p>
          <div className="bg-slate-100 rounded-[10px] px-5 py-4 font-mono text-sm text-slate-700">
            時薪 = 月薪 ÷ 30 ÷ 8
          </div>
          <p className="text-slate-500 text-sm mt-3">
            例如月薪 $30,000：時薪 = 30,000 ÷ 30 ÷ 8 = $125。但兼職或時薪制勞工，時薪不得低於 $196，即使月薪折算低於此值也違法。
          </p>
        </div>

        <div className="bg-slate-50 rounded-[16px] border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            加班費怎麼算？
          </h2>
          <p className="text-slate-600 leading-relaxed">
            加班費以時薪為基準計算，且時薪不得低於最低時薪 $196。月薪制勞工以「月薪 ÷ 30 ÷ 8」換算時薪；時薪制勞工直接以時薪計算。平日前 2 小時加班費為時薪 × 4/3，第 3 小時起為時薪 × 5/3。
          </p>
        </div>
      </div>

      {/* 歷年趨勢表格 */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          歷年基本工資趨勢
        </h2>
        <div className="bg-white rounded-[16px] border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 font-semibold text-slate-600">年份</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">月薪</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">時薪</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row, idx) => (
                <tr
                  key={row.year}
                  className={`border-b border-slate-100 last:border-0 ${
                    idx === 0 ? "bg-brand-50" : ""
                  }`}
                >
                  <td className="px-5 py-3 text-slate-800 font-medium">
                    {row.year}
                    {idx === 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                        最新
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right text-slate-700 font-semibold">
                    {row.monthly}
                  </td>
                  <td className="px-5 py-3 text-right text-slate-700 font-semibold">
                    {row.hourly}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 實領試算 CTA */}
      <div className="mb-10 p-6 bg-brand-50 rounded-[16px]">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          算算你的實領薪資
        </h2>
        <p className="text-slate-500 text-sm mb-4">
          輸入月薪或時薪，自動計算扣除勞健保後的實領金額，以及雇主總成本。
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tools/salary"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white font-bold rounded-[10px] hover:bg-brand-700 transition-colors text-sm"
          >
            月薪實領計算機
          </Link>
          <Link
            href="/tools/hourly-monthly"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-600 font-bold rounded-[10px] hover:bg-brand-50 transition-colors border border-brand-200 text-sm"
          >
            時薪 ↔ 月薪換算
          </Link>
        </div>
      </div>

      {/* 申訴說明 */}
      <div className="mb-10 bg-white rounded-[16px] border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          違反基本工資如何申訴？
        </h2>
        <ol className="space-y-2 text-slate-600 text-sm">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">1</span>
            <span>保留薪資單、存摺轉帳紀錄、勞動契約等證據。</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">2</span>
            <span>向雇主所在縣市勞動局（地方主管機關）提出申訴，或撥打 1955 勞工諮詢專線。</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">3</span>
            <span>勞動局受理後進行勞動檢查，違反者依勞基法處 $2 萬至 $30 萬元罰鍰，並須補發薪資差額。</span>
          </li>
        </ol>
      </div>

      {/* FAQ 視覺呈現 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">常見問題</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className={`group rounded-[16px] border border-slate-200 overflow-hidden ${
                idx % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                <span>{item.question}</span>
                <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                  ▾
                </span>
              </summary>
              <p className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed border-t border-slate-100">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
