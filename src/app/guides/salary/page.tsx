import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { OfficialSources } from "@/components/seo/OfficialSources";
import { PAGE_SOURCES } from "@/data/page-sources";
import { buildPageMetadata, faqSchema, SITE_URL, SITE_NAME } from "@/lib/seo";
import { LABOR_CONSTANTS } from "@/data/constants";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = buildPageMetadata({
  title: "台灣薪資完全指南 2026｜實領計算、扣款、報稅、年終一次搞懂",
  description:
    "從月薪如何算實領、勞健保扣多少、薪資所得稅計算、年終獎金到加班費規則，台灣上班族薪資相關知識完整整理，含免費計算工具與法規解析。",
  keywords: [
    "薪資指南", "薪水計算", "實領薪水", "月薪計算", "薪資所得稅", "勞健保扣款",
    "2026薪資", "台灣薪資", "薪水明細", "加班費"
  ],
  path: "/guides/salary",
});

const FAQS = [
  {
    question: "月薪 45000 實領多少？",
    answer:
      "以 2026 費率，月薪 $45,000 單身勞工每月實領約 $43,145。勞保與就保扣 $1,145、健保扣 $710、勞退雇主提繳 $2,748 不扣薪。實際金額依眷屬人數、所得稅預扣、自提比例而定。",
  },
  {
    question: "為什麼薪資單的勞保扣款跟我想的不一樣？",
    answer:
      "勞健保以「投保薪資級距表」計算，不是直接用實際月薪。系統找到大於等於你月薪的最近一級，用這個級距金額 × 費率 × 負擔比例計算。例如月薪 45,000 對應到 45,800 級距。",
  },
  {
    question: "勞保和健保費率分別是多少？",
    answer:
      "2026 年勞保費率 12.5%（含就保 1%），勞工負擔 20%、雇主 70%、政府 10%。健保費率 5.17%，一般受僱者負擔 30%、雇主 60%、政府 10%。",
  },
  {
    question: "勞退 6% 是從薪水扣嗎？",
    answer:
      "雇主提繳的 6% 不會從你的薪水扣除，是額外由雇主負擔。但你可以選擇「自願提繳」最多 6%，自提部分會從薪水扣除，但可享節稅效果。",
  },
  {
    question: "薪資單上的「底薪」跟「月薪」有差嗎？",
    answer:
      "很可能有。底薪是固定本薪，月薪則包含底薪＋各種津貼（全勤、伙食、職務加給等）。但注意：雇主不能用「非經常性津貼」壓低基本工資或加班費計算基數。",
  },
];

const SALARY_TOOLS = [
  { name: "薪資明細計算機", href: "/tools/salary", desc: "輸入月薪，秒算實領金額與扣款明細" },
  { name: "加班費計算機", href: "/tools/overtime", desc: "平日、休息日、國定假日加班費試算" },
  { name: "時薪月薪換算", href: "/tools/hourly-monthly", desc: "時薪轉月薪、月薪轉時薪" },
  { name: "年終獎金計算", href: "/tools/bonus", desc: "依在職月數算年終獎金（含比例）" },
  { name: "勞健保保費計算", href: "/tools/insurance-premium", desc: "查詢投保級距與自付額" },
  { name: "薪資比較器", href: "/tools/salary-compare", desc: "比較兩份 Offer 的實際待遇" },
];

const SALARY_ARTICLES = [
  { title: "2026 薪資單完全解讀", href: "/articles/salary-slip-explained" },
  { title: "實領速查表：月薪 29,500～60,000 各扣多少", href: "/articles/insurance-deduction-examples" },
  { title: "2026 勞健保投保級距對照表", href: "/articles/labor-nhi-bracket-guide" },
  { title: "2026 薪資報稅完全指南", href: "/articles/salary-tax-guide-2026" },
  { title: "最低工資 29,500：2026 新制影響", href: "/articles/minimum-wage-2026" },
  { title: "時薪 196 元合理嗎？", href: "/articles/minimum-wage-hourly-2026" },
  { title: "加班費速查表：平日、休息日、國定假日", href: "/articles/overtime-calculation-examples" },
  { title: "加班費完整圖解指南", href: "/articles/overtime-pay-guide" },
  { title: "責任制加班合法嗎？", href: "/articles/exempt-employee" },
  { title: "老闆欠薪怎麼辦？7 步驟催討", href: "/articles/wage-theft-what-to-do" },
  { title: "年終獎金是法定的嗎？", href: "/articles/year-end-bonus" },
  { title: "二代健保補充保費完全攻略", href: "/articles/nhi-supplement-premium" },
  { title: "副業收入怎麼報稅？", href: "/articles/side-job-tax-insurance" },
];

export default function SalaryGuidePage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "台灣薪資完全指南",
    description: "聚合薪資計算、扣款、報稅、加班費等相關工具與文章",
    url: `${SITE_URL}/guides/salary`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SALARY_TOOLS.map((tool, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: tool.name,
        url: `${SITE_URL}${tool.href}`,
      })),
    },
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "薪資指南" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          台灣薪資完全指南 2026
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          從月薪實領到報稅、加班費、年終，一次搞懂台灣上班族的薪資知識。
          6 個免費計算工具與精選深度文章，依據 2026 年勞基法、勞保局與健保署公告的費率。
        </p>
      </header>

      {/* 核心數字區塊 */}
      <section className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">2026 月薪基本工資</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)}</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">2026 時薪基本工資</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">${LABOR_CONSTANTS.minimumHourlyWage}</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">勞保費率</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">12.5%</div>
        </div>
      </section>

      {/* 工具清單 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">薪資計算工具</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SALARY_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-[14px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slot="guide-salary-mid" />

      {/* 權益文章 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">深度文章</h2>
        <div className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
          {SALARY_ARTICLES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors"
            >
              <span className="text-brand-500">→</span>
              <span className="text-slate-700 hover:text-brand-600">{a.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 薪資計算邏輯說明 */}
      <article className="prose-custom mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">台灣薪資結構完整拆解</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞工的月薪拆解後包含三個層次：<strong>「實領薪水」</strong>（勞工拿到的）、
          <strong>「帳面月薪」</strong>（薪資單上的數字）、以及<strong>「雇主總成本」</strong>
          （公司實際支出）。這三個數字不同，中間的差距就是勞保、健保、勞退與所得稅預扣。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">實領薪水的計算公式</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          實領薪水 = 帳面月薪 − 勞保自付額 − 健保自付額 − 所得稅預扣額 − 勞退自提（若有）。
          勞保和健保都以「投保薪資級距」為基礎計算，而非實際月薪。例如月薪 $45,000 在勞保對應到 $45,800 級距，健保同樣對應到 $45,800 級距。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">雇主總成本與你的月薪差多少？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          以月薪 $45,000 為例：雇主除了付你月薪外，還要額外負擔勞保雇主端（約 $4,007）、健保雇主端（約 $2,216，含平均眷口數）、勞退 6% 提繳（$2,748），合計每月成本約 $53,971。
          也就是說，你每月為公司創造的「人事成本」比你實領薪水還多約 $10,000。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">加班費與基本工資連動</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          月薪制勞工的加班費時薪基數 = 月薪 ÷ 30 ÷ 8。2026 年月薪基本工資 $29,500，代表時薪基數至少 $123。平日加班前 2 小時 × 4/3 倍，第 3 小時起 × 5/3 倍。
          許多雇主會刻意將月薪拆成「底薪 + 全勤 + 伙食」來壓低加班費基數，但法律規定工資總額都要計入。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">薪資所得稅怎麼扣？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          公司依「各類所得扣繳率標準」與財政部公布的薪資所得扣繳稅額表預扣所得稅，未達起扣標準的月份不會預扣。
          年度結束後申報綜所稅時，再根據你的總收入與扣除額計算實際應繳稅金，多退少補。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">常見月薪的實領對照</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          以 2026 年費率、沒有眷屬加保、沒有勞退自提計算：月薪 $29,500 實領約 $28,304；月薪 $35,000 實領約 $33,529；
          月薪 $40,000 實領約 $38,375；月薪 $45,000 實領約 $43,145；月薪 $50,000 實領約 $48,070；月薪 $60,000 實領約 $57,912。
          月薪超過 $45,800 後勞保停在上限，扣款增加主要來自健保。每多加保一位眷屬，就多一份與本人相同的健保費，最多計 3 口。
          完整的級距與眷屬保費表見<Link href="/articles/insurance-deduction-examples" className="text-brand-600 underline-offset-2 hover:underline">勞健保自付額速查表</Link>。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">薪資給付的基本規則</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞基法第 22 條規定工資應全額直接給付勞工；第 23 條規定每月至少定期發給 2 次（約定按月預付者除外），並要提供各項目計算方式的明細，雇主應置備工資清冊保存 5 年。
          第 26 條禁止雇主預扣工資作為違約金或賠償費用。所以「離職沒交接就扣最後一個月薪水」「遲到一次扣 500 元」這類做法，都可能違法。
          工資也不得低於最低工資：2026 年月薪 {formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元、時薪 {LABOR_CONSTANTS.minimumHourlyWage} 元，約定低於最低工資的部分，依最低工資法以最低工資為準。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">如何自我檢查薪資單？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          每個月拿到薪資單時，應該確認：(1) 底薪 + 津貼的總額是否正確；
          (2) 勞保與健保扣款是否符合投保級距；(3) 加班費是否按倍率計算；
          (4) 特休折算、獎金是否入帳。發現問題可直接找人資詢問，或向當地勞工局申訴。
        </p>
      </article>

      <AdBanner slot="guide-salary-bottom" />

      <FaqSection items={FAQS} />

      <OfficialSources sources={PAGE_SOURCES["guides/salary"]} />

      <section className="mt-12 rounded-[16px] border border-brand-100 bg-brand-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">立即試算你的薪資</h2>
        <p className="text-slate-600 mb-5">免費、即時、不需註冊，一秒算出實領金額</p>
        <Link
          href="/tools/salary"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-6 text-sm font-bold text-surface transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          開始計算 →
        </Link>
      </section>
    </div>
  );
}
