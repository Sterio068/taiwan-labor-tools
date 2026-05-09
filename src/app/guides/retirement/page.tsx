import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工退休金完全規劃 2026｜新制舊制、自提試算、月領一次領比較",
  description:
    "從勞退新制舊制差異、雇主 6% 提繳、勞工自提節稅、領取資格到勞保老年給付，台灣勞工退休規劃完整指南，含退休金試算工具與節稅技巧。",
  keywords: [
    "勞退", "勞工退休金", "勞退新制", "勞退自提", "退休金計算",
    "勞保老年給付", "月領退休金", "退休規劃", "2026勞退", "勞退節稅",
  ],
  path: "/guides/retirement",
});

const FAQS = [
  {
    question: "勞退新制和舊制差在哪裡？",
    answer:
      "2005 年 7 月 1 日上路的勞退新制，採「個人退休金專戶」設計，雇主每月提繳 6% 到勞工個人帳戶，帳戶跟著勞工走、換工作不歸零。舊制（勞基法退休金）則需同一雇主服務滿 25 年或 55 歲且服務滿 15 年，雇主倒閉就可能領不到。新制年資完全獨立、累積更安全。",
  },
  {
    question: "勞退自提 6% 真的划算嗎？",
    answer:
      "對中高所得者而言通常划算。自提金額可從當年度綜合所得總額中「全額扣除」，等於當年度所得稅即時節省。例如月薪 $50,000、自提 6% = $3,000/月、年自提 $36,000，若稅率 12% 可當年省稅 $4,320；若稅率 20% 省 $7,200。另外自提金額進入個人帳戶，退休時與雇主提繳部分合併領取，投資累積效果更顯著。",
  },
  {
    question: "退休金可以月領還是一次領？",
    answer:
      "勞退新制規定 60 歲可請領退休金。年資滿 15 年以上可選擇「月領」或「一次領」；未滿 15 年只能一次領。月領按個人帳戶累積總額除以平均餘命年金化，領到往生為止；一次領則是一次把帳戶餘額全部提出。月領較適合長壽規劃，一次領則方便運用資金。未領完的帳戶餘額可由遺屬繼承。",
  },
  {
    question: "可以提前領退休金嗎？",
    answer:
      "一般情況下勞退新制必須到 60 歲才可請領。但若有「重度以上身心障礙」或「未滿 60 歲死亡」等特殊情形，本人或遺屬可提前請領；另若移民海外喪失國籍者亦可一次領出。中途離職或換工作不會影響帳戶，因為帳戶屬於勞工個人所有，雇主不能動。",
  },
  {
    question: "換工作會影響退休金累積嗎？",
    answer:
      "完全不影響。勞退新制採個人帳戶制，無論換幾次工作，新雇主會繼續提繳 6% 到同一個專戶中，歷年累積金額持續成長。這是新制最大的優點，解決了舊制「離職就喪失年資」的最大痛點。勞工可至勞保局網站以自然人憑證登入查詢個人帳戶累積金額。",
  },
];

const RETIREMENT_TOOLS = [
  { name: "勞退退休金試算", href: "/tools/pension", desc: "估算退休時個人帳戶累積金額與月退休金" },
  { name: "退休年齡規劃", href: "/tools/retirement-planner", desc: "結合勞保、勞退規劃最佳退休時機" },
];

const RETIREMENT_ARTICLES = [
  { title: "勞退自提 6% 到底要不要？", href: "/articles/pension-voluntary" },
  { title: "舊制 vs 新制勞退完整比較", href: "/articles/old-vs-new-pension" },
  { title: "勞保老年給付怎麼算？", href: "/articles/labor-insurance-payout" },
];

export default function RetirementGuidePage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "勞工退休金完全規劃",
    description: "聚合勞退新制、勞保老年給付、自提節稅與退休規劃工具與文章",
    url: `${SITE_URL}/guides/retirement`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: RETIREMENT_TOOLS.map((tool, idx) => ({
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
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "退休規劃" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          勞工退休金完全規劃 2026
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          從勞退新舊制差異、自提 6% 節稅策略、月領一次領比較、勞保老年給付，
          到綜合退休規劃，一次搞懂台灣勞工的退休保障。
          2 個免費工具 + 3 篇深度文章，依 2026 最新勞工退休金條例。
        </p>
      </header>

      {/* 核心數字區塊 */}
      <section className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">雇主提繳</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">6%</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">自提上限</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">6%</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">退休年齡</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">60 歲</div>
        </div>
      </section>

      {/* 工具清單 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">退休金試算工具</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {RETIREMENT_TOOLS.map((tool) => (
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

      <AdBanner slot="guide-retirement-mid" />

      {/* 權益文章 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">深度文章</h2>
        <div className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
          {RETIREMENT_ARTICLES.map((a) => (
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
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">台灣勞工退休保障完整拆解</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞工的退休保障由<strong>三層金字塔</strong>組成：第一層是<strong>勞工保險老年給付</strong>，
          第二層是<strong>勞工退休金（勞退新制）</strong>，第三層則是個人自願購買的<strong>商業年金保險、投資理財</strong>。
          三層疊加愈高，退休後生活品質愈有保障。其中第一層與第二層是法定強制保障，勞工只要在職就自動累積；
          第三層則需個人規劃。許多人誤以為「勞退就是勞保」，事實上這是兩套完全獨立的制度，分屬不同主管機關、給付來源與請領條件。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">三層退休保障的關係</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          <strong>勞保老年給付</strong>由勞工保險局發放，費率內含於勞保 12.5% 中，給付金額取決於「年資」與「最高 60 個月平均月投保薪資」。
          <strong>勞退新制</strong>則由雇主強制每月提繳 6% 到勞工個人專戶，勞工可再自提最多 6%，退休時憑帳戶餘額領取。
          兩者同時存在：勞工 60 歲可領勞退、達法定年齡（依出生年調整至 65 歲）可領勞保老年給付。
          計算範例：月薪 $45,000、服務 30 年、平均投保薪資 $43,900，勞保老年年金約 $19,200/月；
          勞退新制若每年投報率 3%、累積本息約 $300 萬，月領約 $13,000。兩者加總約 $32,000/月，已接近基本退休所需。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">新制個人帳戶機制</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞退新制於 2005 年 7 月 1 日實施，核心設計是<strong>「可攜式個人帳戶」</strong>。
          每位勞工擁有一個專屬帳戶，雇主每月依投保薪資級距提繳 6% 進入帳戶；勞工換工作時帳戶跟著走、不會歸零或重新計算。
          帳戶金額由勞保局委託台銀進行最低收益保證投資，歷年平均收益率約 3-4%，若投資虧損由國家補足「兩年期定存利率」。
          舊制（勞基法退休金）則綁定同一雇主，要滿 25 年或 55 歲且 15 年才能領，公司倒閉常導致勞工拿不到錢。這也是新制的最大進步。
          注意：2005 年 7 月 1 日之前已在職者可選擇保留舊制或轉新制，兩種年資分段計算。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">自提節稅完整試算</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞退自提最大的誘因是<strong>「全額從綜合所得總額中扣除」</strong>，等同當年度所得即時節稅。
          試算例：月薪 $60,000、自提 6% = $3,600/月、年自提 $43,200。
          若適用稅率 20%，當年度立即節省稅額 $8,640；30 年累積節稅 $259,200，等同白賺一筆。
          除了節稅，自提金額進入個人帳戶後，與雇主提繳 6% 一起享投資收益，退休時領取金額更豐厚。
          注意事項：(1) 自提金額上限為月提繳工資的 6%；(2) 自提金額未滿 60 歲不可提領；(3) 自提不影響勞保、健保其他扣款。
          適合族群：所得稅率 12% 以上、有長期規劃、不擔心短期流動性需求者。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">領取資格與最佳時機</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          <strong>勞退新制</strong>請領條件：年滿 60 歲即可請領，不論是否仍在工作。
          年資滿 15 年可選擇<strong>月退休金</strong>（帳戶餘額除以平均餘命計算的年金）或<strong>一次退休金</strong>；
          未滿 15 年僅能一次請領。
          <strong>勞保老年給付</strong>則依出生年調整法定年齡：民國 51 年以後出生者需 65 歲、之前出生者依規定遞減。
          年資滿 15 年可選擇「老年年金」按月領（約投保薪資 1.55% × 年資）或「老年一次金」一次領。
          策略建議：(1) 健康狀況良好、家族長壽 → 選月領，長久領更多；
          (2) 急需資金或健康不佳 → 選一次領；
          (3) 可延後請領以獲得遞延加給（勞保可延至 70 歲，每延 1 年多加 4% 給付）。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">退休規劃策略建議</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          實務上建議分三階段規劃：
          (1) <strong>20-40 歲 累積期</strong>：優先確保雇主正確提繳勞退 6%，所得稅率達 12% 以上者開始自提，並配置指數型基金或 ETF 作為第三層；
          (2) <strong>40-55 歲 加速期</strong>：若財務許可，將自提提高到 6% 上限，並確認勞保投保薪資是否達上限 $45,800；同時檢視第三層是否足夠；
          (3) <strong>55-65 歲 準備期</strong>：試算退休金缺口，評估是否延後退休、啟動第三層提領策略。
          建議每年至少登入「勞保局個人網路專區」查詢勞退帳戶餘額與勞保年資，確認雇主有依法提繳且投保薪資正確。
          退休金準備沒有魔法，關鍵是<strong>「早開始、長期投入、善用節稅」</strong>三件事。
        </p>
      </article>

      <AdBanner slot="guide-retirement-bottom" />

      <FaqSection items={FAQS} />

      <section className="mt-12 rounded-[16px] border border-brand-100 bg-brand-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">立即試算你的退休金</h2>
        <p className="text-slate-600 mb-5">輸入月薪與年資，看退休時帳戶能累積多少</p>
        <Link
          href="/tools/pension"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-6 text-sm font-bold text-surface transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          開始計算 →
        </Link>
      </section>
    </div>
  );
}
