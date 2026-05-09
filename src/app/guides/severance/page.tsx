import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "離職資遣完整指南 2026｜資遣費、失業給付、預告期、自願離職全攻略",
  description:
    "從被資遣怎麼辦、資遣費新舊制怎麼算、非自願離職證明、失業給付資格到離職預告期，台灣勞工離職資遣完整權益說明，含免費計算工具與申辦流程。",
  keywords: [
    "離職資遣", "資遣費計算", "失業給付", "非自願離職", "預告期",
    "自願離職", "勞基法資遣", "2026資遣費", "資遣新制", "離職證明",
  ],
  path: "/guides/severance",
});

const FAQS = [
  {
    question: "資遣費新制跟舊制差在哪？",
    answer:
      "2005 年 7 月 1 日勞退新制上路後，年資分兩段計算。新制每滿 1 年發 0.5 個月平均工資，未滿 1 年按比例計算，上限 6 個月。舊制每滿 1 年發 1 個月，未滿 1 年以 1 個月計，無上限。同一雇主年資橫跨新舊制者，兩段分別計算後加總。",
  },
  {
    question: "平均工資要怎麼認定？",
    answer:
      "依勞基法第 2 條，平均工資是指資遣事由發生當日前 6 個月內所得工資總額除以該期間總日數所得金額。工資包含底薪、全勤、伙食津貼、加班費、獎金等有對價關係的給付。紅利、年終獎金等非經常性給予則不算入工資總額。",
  },
  {
    question: "失業給付要怎樣才能領？",
    answer:
      "須同時符合四條件：(1) 非自願離職（資遣、定期契約屆滿、大量解僱、歇業等）；(2) 離職前 3 年內就保年資合計滿 1 年；(3) 具有工作能力與繼續工作意願；(4) 親自向公立就業服務機構辦理求職登記，14 天內未媒合成功。符合者可按月領投保薪資 60%，最長 6 個月（45 歲以上或身障者可領 9 個月）。",
  },
  {
    question: "雇主沒有預告就資遣我，我可以怎麼辦？",
    answer:
      "依勞基法第 16 條第 3 項，雇主未依法定期間預告即終止勞動契約，必須給付「預告期間工資」。例如年資滿 3 年以上需預告 30 天，若隔天就解雇，雇主需額外給 30 天工資。這筆錢是強制性的，不能用資遣費抵扣。",
  },
  {
    question: "非自願離職證明要去哪裡拿？公司不給怎麼辦？",
    answer:
      "離職證明由雇主開立，應載明離職原因、到職日與離職日。若雇主拒發或記載不實，可向當地勞工局申訴；勞工局會協助開立或介入調解。就算雇主不給，勞工仍可持薪資單、投保資料等證據到就業服務站辦理失業認定。",
  },
];

const SEVERANCE_TOOLS = [
  { name: "資遣費計算機", href: "/tools/severance", desc: "輸入年資與月薪，算新制舊制資遣費" },
  { name: "離職預告期計算", href: "/tools/notice-period", desc: "依年資算最後工作日與預告天數" },
  { name: "薪資比較器", href: "/tools/salary-compare", desc: "比較新舊 Offer 實際待遇" },
];

const SEVERANCE_ARTICLES = [
  { title: "被資遣了怎麼辦？5 步驟自保", href: "/articles/fired-what-to-do" },
  { title: "工作 3 年被資遣多少錢？試算實例", href: "/articles/severance-3years" },
  { title: "失業給付怎麼領？完整申請流程", href: "/articles/unemployment-benefits" },
  { title: "離職要提前幾天？預告期規定", href: "/articles/resignation-notice" },
  { title: "自願離職前必看 5 件事", href: "/articles/quit-job-rights" },
  { title: "資遣費 vs 退職金 vs 離職金差在哪？", href: "/articles/layoff-compensation-comparison" },
  { title: "勞資調解怎麼申請？流程全解", href: "/articles/labor-mediation" },
  { title: "老闆欠薪怎麼辦？7 步驟催討", href: "/articles/wage-theft-what-to-do" },
  { title: "試用期的 5 個法律真相", href: "/articles/probation-rights" },
];

export default function SeveranceGuidePage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "離職資遣完整指南",
    description: "聚合資遣費、失業給付、預告期、離職證明等工具與文章",
    url: `${SITE_URL}/guides/severance`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SEVERANCE_TOOLS.map((tool, idx) => ({
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
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "離職資遣指南" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          離職資遣完整指南 2026
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          被資遣了怎麼辦？資遣費怎麼算？失業給付能領多少？
          從離職原因判定到資遣費試算、非自願離職證明、失業給付申辦流程，一次說清楚。
          3 個免費工具 + 9 篇深度文章，依據 2026 最新勞基法與就業保險法。
        </p>
      </header>

      {/* 核心數字區塊 */}
      <section className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">新制資遣費上限</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">6 個月</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">預告期最長</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">30 天</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">失業給付最長</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">6-9 個月</div>
        </div>
      </section>

      {/* 工具清單 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">離職資遣計算工具</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SEVERANCE_TOOLS.map((tool) => (
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

      <AdBanner slot="guide-severance-mid" />

      {/* 權益文章 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">深度文章</h2>
        <div className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
          {SEVERANCE_ARTICLES.map((a) => (
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

      {/* 長文內容 */}
      <article className="prose-custom mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">離職資遣權益完整拆解</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞工的離職可分為兩大類：<strong>「自願離職」</strong>與<strong>「非自願離職」</strong>。
          兩者在資遣費、預告期、失業給付、離職證明等權益上有巨大差異。搞懂自己的離職類型是保護權益的第一步。
          依勞基法第 11 條、第 12 條、第 13 條與第 16 條，不同離職原因對應的法律效果完全不同，務必謹慎處理每一份文件。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">資遣費計算原則</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          資遣費的計算基礎是<strong>「平均工資」</strong>，依勞基法第 2 條第 4 款定義，是指資遣事由發生當日前 6 個月所得工資總額除以總日數。
          工資包含底薪、全勤獎金、伙食津貼、加班費、績效獎金等任何具「勞務對價性」與「經常性給與」的給付，但紅利、年終獎金、三節禮金等非經常性發放則不計入。
          許多雇主會刻意在資遣前降低給付來壓低平均工資，這屬違法行為，勞工可向勞工局申訴或提起民事訴訟。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">新制與舊制的關鍵差異</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          2005 年 7 月 1 日勞退新制上路後，資遣費計算分為兩段。
          <strong>新制（勞退條例第 12 條）</strong>：每滿 1 年發給 0.5 個月平均工資，未滿 1 年按比例計算，最高 6 個月。
          <strong>舊制（勞基法第 17 條）</strong>：每滿 1 年發給 1 個月，未滿 1 年以 1 個月計，無上限。
          若勞工在 2005 年 7 月 1 日前已任職於同一雇主且未選擇改適用新制，舊制年資依勞基法第 17 條計算，新制年資依勞退條例第 12 條計算，兩段合計即為完整資遣費。
          舉例：在同一公司服務 10 年，其中舊制 4 年、新制 6 年，舊制段資遣費為 4 個月、新制段為 3 個月，共 7 個月平均工資。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">非自願離職的法定條件</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          能領到資遣費與失業給付的前提是「非自願離職」，法定情形主要有：
          (1) 勞基法第 11 條：歇業轉讓、虧損業務緊縮、不可抗力停工、業務性質變更、勞工不能勝任；
          (2) 勞基法第 13 條但書：天災事變雇主獲准終止；
          (3) 勞基法第 14 條：雇主違反勞動契約（如欠薪、調職不合理、暴力對待），勞工可不經預告終止契約並請求資遣費；
          (4) 定期契約屆期不續約；(5) 大量解僱、歇業關廠。
          反之，若是勞工自行請辭、合意終止契約或勞基法第 12 條的懲戒解雇，則無法領取資遣費。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">失業給付完整申辦流程</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          失業給付是就業保險五大給付之一，由勞保局核發，每月發給離職前 6 個月平均月投保薪資的 60%，最長領 6 個月（45 歲以上或身心障礙者最長 9 個月）。
          申辦步驟：
          (1) 持雇主開立的「非自願離職證明書」、身分證、存摺、一吋照片到戶籍地或實際居住地的<strong>公立就業服務機構</strong>辦理求職登記；
          (2) 由就服員認定並轉介 2 個工作或安排 1 次就業諮詢；
          (3) 若 14 日內未成功媒合，次日起即認定為「失業」，就服員會協助填寫「失業認定表」送勞保局審核；
          (4) 審核通過後每月到就服站辦理失業再認定並持續求職，即可按月領取。中斷求職或找到工作要主動通報。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">離職程序與必備文件</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          不論是哪種離職，勞工應確保拿到以下文件：
          (1) <strong>離職證明書</strong>：勞基法第 19 條規定雇主不得拒絕發給，內容須載明到職日、離職日、離職原因；
          (2) <strong>非自願離職證明書</strong>（如適用）：申請失業給付必備，由雇主於資遣通知時一併開立；
          (3) <strong>服務證明書</strong>：記錄年資與工作內容，用於後續求職；
          (4) <strong>薪資單、出勤紀錄、投保資料</strong>：作為未來勞資爭議或資遣費爭執的舉證基礎；
          (5) <strong>特休未休折算</strong>：依勞基法第 38 條，當年度特休未休部分雇主應折算工資給付。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">雇主違法該怎麼處理</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          若雇主未依法給付資遣費、預告期工資、拒開離職證明，或以「記過、曠職」等方式規避資遣義務，勞工的救濟途徑有：
          (1) <strong>向勞工局申訴</strong>：可要求勞檢介入與行政裁罰；
          (2) <strong>申請勞資爭議調解</strong>：向地方勞工局提出，免費且具強制力，雇主無正當理由不得拒絕；
          (3) <strong>勞動仲裁或訴訟</strong>：調解不成可進入勞動法庭，法扶基金會提供免費或低費率律師諮詢；
          (4) <strong>勞動部檢舉</strong>：違反勞基法可處 2 萬至 100 萬元罰鍰並公布公司名稱。
          記得所有爭議都以「書面證據」為王，離職前請備妥勞動契約、薪資單、打卡紀錄、LINE 對話截圖等資料。
        </p>
      </article>

      <AdBanner slot="guide-severance-bottom" />

      <FaqSection items={FAQS} />

      <section className="mt-12 rounded-[16px] border border-brand-100 bg-brand-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">立即試算你的資遣費</h2>
        <p className="text-slate-600 mb-5">免費、即時、不需註冊，輸入年資與月薪馬上算</p>
        <Link
          href="/tools/severance"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-6 text-sm font-bold text-surface transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          開始計算 →
        </Link>
      </section>
    </div>
  );
}
