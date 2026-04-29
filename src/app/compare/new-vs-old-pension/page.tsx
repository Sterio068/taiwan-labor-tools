import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞退新制 vs 舊制：差在哪？該怎麼選？2026 最新對照",
  description:
    "勞退新制與舊制差在哪裡？2005 年 7 月 1 日上路的新制與舊制有什麼不同？從適用對象、提繳方式、可攜性、年資累積到領取條件，一次看懂兩種勞退制度的完整差異。",
  keywords: [
    "勞退新制舊制",
    "新制舊制比較",
    "勞工退休金條例",
    "退休金選擇",
    "勞退個人帳戶",
    "勞基法退休金",
    "2005勞退",
    "勞退自提",
    "退休金可攜",
  ],
  path: "/compare/new-vs-old-pension",
});

const FAQS = [
  {
    question: "為什麼 2005 年 7 月 1 日是分界點？",
    answer:
      "因為《勞工退休金條例》自 2005 年 7 月 1 日施行，該日之後初次受僱的勞工一律適用新制。該日之前已在職的勞工則享有「5 年選擇期」，可自行決定沿用舊制或轉換新制，未選擇者預設為新制。",
  },
  {
    question: "舊制年資會不會因為換工作就消失？",
    answer:
      "舊制年資必須在「同一家公司」持續累積才有意義。一旦換公司，舊制年資就重新計算為零，這就是舊制最大的風險。新制則因為是個人帳戶，無論換幾次工作都能持續累積。",
  },
  {
    question: "雇主要負擔多少勞退？",
    answer:
      "新制下，雇主每月必須提繳勞工月薪的 6% 到勞工個人退休金帳戶。舊制則按公司「勞工退休準備金」提撥，比例由勞資協議但不得低於工資總額 2%，且存放在台灣銀行的專戶。",
  },
  {
    question: "勞退自提 6% 是新制才有的嗎？",
    answer:
      "是的。《勞工退休金條例》第 14 條規定勞工可自願再提繳最多 6%，這部分從薪水扣款但可自綜所稅總額中全額扣除，達到節稅效果。舊制沒有自提機制。",
  },
  {
    question: "我可以兩種制度都有嗎？",
    answer:
      "可以。若你是 2005/7/1 前就已在同一雇主工作、當時選擇保留舊制年資的勞工，你就會同時擁有舊制（於該雇主的舊制年資）與新制（之後所有薪資的 6% 提繳）。這是所謂的「雙軌並行」情況。",
  },
];

const ROWS: Array<{
  label: string;
  newPlan: string;
  oldPlan: string;
}> = [
  {
    label: "法源依據",
    newPlan: "《勞工退休金條例》(2005/7/1 上路)",
    oldPlan: "《勞動基準法》第 53-58 條",
  },
  {
    label: "適用對象",
    newPlan: "2005/7/1 起初次受僱者一律適用",
    oldPlan: "2005/7/1 前在職且選擇保留舊制者",
  },
  {
    label: "帳戶型態",
    newPlan: "個人退休金專戶（勞保局）",
    oldPlan: "公司專戶（台灣銀行）",
  },
  {
    label: "雇主提繳",
    newPlan: "每月薪資 6%（強制）",
    oldPlan: "工資總額 2%~15%（依公司精算）",
  },
  {
    label: "勞工自提",
    newPlan: "可自提最多 6%，可節稅",
    oldPlan: "無自提機制",
  },
  {
    label: "可攜性",
    newPlan: "高，換工作帳戶跟著走",
    oldPlan: "無，離開公司年資歸零",
  },
  {
    label: "年資累積方式",
    newPlan: "每月 6% 金額累積於個人帳戶",
    oldPlan: "年資必須在同一雇主持續累積",
  },
  {
    label: "請領條件",
    newPlan: "60 歲起可請領（年資 15 年以上領月退，不滿則領一次金）",
    oldPlan: "工作 25 年或 15 年以上且滿 55 歲",
  },
  {
    label: "風險承擔",
    newPlan: "政府保證最低收益率（兩年期定存）",
    oldPlan: "公司倒閉或未提撥足額有領不到風險",
  },
  {
    label: "2005/7/1 分界",
    newPlan: "之後新進勞工必用",
    oldPlan: "之後無新進勞工，只有舊員工續用",
  },
];

const SCENARIOS: Array<{ title: string; body: string }> = [
  {
    title: "你是 2005/7/1 後初次受僱",
    body: "你只有新制一種選擇，沒有選擇權。但記得善用「自願提繳 6%」的節稅功能，特別是高薪勞工每年可省下可觀所得稅。",
  },
  {
    title: "你同時有舊制年資與新制提繳",
    body: "只要你打算在同一雇主繼續待到退休，舊制年資對你有利（老闆得提撥足額退休金）。建議持續追蹤公司是否準時提撥「勞工退休準備金」。",
  },
  {
    title: "你有舊制年資但想換工作",
    body: "換工作前與前雇主結算舊制退休金（或維持年資計算）是關鍵。一旦離職未結清，舊制年資等同歸零，非常不划算。可先諮詢勞工局再決定。",
  },
  {
    title: "你是高薪、追求節稅",
    body: "選擇新制並開啟自提 6%。以月薪 $100,000 為例，每月自提 $6,000、年度可自所得總額扣除 $72,000，邊際稅率 20% 者每年省稅約 $14,400。",
  },
];

const RELATED_TOOLS = [
  {
    name: "勞退自提試算器",
    href: "/tools/pension",
    desc: "計算自提 6% 的節稅金額與退休金累積",
  },
];

const RELATED_ARTICLES = [
  { title: "勞退新制 vs 舊制：完整差異解析", href: "/articles/old-vs-new-pension" },
  { title: "勞退自提 6% 該不該開？節稅完整計算", href: "/articles/pension-voluntary" },
];

export default function NewVsOldPensionPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "比較", href: "/compare" },
          { label: "勞退新制 vs 舊制" },
        ]}
      />

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
        勞退新制 vs 舊制：差在哪？該怎麼選？
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-10">
        台灣勞工退休金制度以 <strong>2005 年 7 月 1 日</strong> 為分水嶺：之前是「勞基法舊制」，之後改採「勞退新制」。
        兩者在適用對象、提繳方式、可攜性、請領條件上差異巨大，有人還可能同時擁有兩種制度。
        這份 2026 最新對照表幫你看懂每一項差異。
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
                勞退新制
              </th>
              <th className="p-3 md:p-4 text-left font-bold text-slate-700">
                勞退舊制
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="p-3 md:p-4 font-semibold text-slate-700 bg-slate-50/50 align-top">
                  {row.label}
                </td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.newPlan}</td>
                <td className="p-3 md:p-4 text-slate-700 align-top">{row.oldPlan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 2005 分界說明 */}
      <section className="mb-10 p-6 bg-brand-50 rounded-[16px] border border-brand-200">
        <h2 className="text-xl font-bold text-brand-900 mb-3">
          2005 年 7 月 1 日：關鍵分界
        </h2>
        <p className="text-slate-700 leading-relaxed">
          《勞工退休金條例》於 <strong>2005 年 7 月 1 日</strong> 正式施行，這一天是勞退制度的分水嶺：
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1 text-slate-700">
          <li>
            <strong>此日後初次受僱</strong>：一律強制適用新制，沒有選擇權。
          </li>
          <li>
            <strong>此日前已在職者</strong>：有 5 年選擇期（至 2010/6/30），可選擇保留舊制年資或全部轉為新制。
          </li>
          <li>
            <strong>未選擇者</strong>：法律預設為新制，但舊制年資仍保留於原雇主。
          </li>
        </ul>
      </section>

      {/* 優缺點 */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-brand-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-brand-900">勞退新制的優點</h3>
          <ul className="space-y-2 text-slate-700">
            <li>個人帳戶，換工作也跟著走</li>
            <li>政府保證最低收益，風險低</li>
            <li>可自提 6% 享節稅效果</li>
            <li>勞保局統一管理，公司倒閉不影響</li>
            <li>60 歲即可請領，門檻較低</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-6 rounded-[16px]">
          <h3 className="font-bold text-xl mb-4 text-slate-900">勞退舊制的特色</h3>
          <ul className="space-y-2 text-slate-700">
            <li>年資長者給付金額可能較高</li>
            <li>若公司提撥足額，退休金可觀</li>
            <li>25 年年資即可請領</li>
            <li>缺點：換工作即歸零</li>
            <li>缺點：公司倒閉可能領不到</li>
          </ul>
        </div>
      </section>

      <AdBanner slot="compare-pension-mid" />

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
