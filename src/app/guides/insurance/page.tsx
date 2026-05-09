import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildPageMetadata, faqSchema, SITE_URL, SITE_NAME } from "@/lib/seo";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = buildPageMetadata({
  title: "勞健保完全攻略 2026｜費率、級距、給付、眷屬加保一次搞懂",
  description:
    "台灣勞健保制度完整說明：費率 12.5% 與 5.17%、投保級距計算原理、各項給付項目、眷屬加保策略、雇主低報檢舉管道，含免費保費試算工具。",
  keywords: [
    "勞健保", "勞保費率", "健保費率", "投保級距", "二代健保",
    "眷屬加保", "勞保給付", "2026勞健保", "勞保級距表", "健保補充保費",
  ],
  path: "/guides/insurance",
});

const FAQS = [
  {
    question: "勞保和健保的費率分別是多少？",
    answer:
      "2026 年勞保費率 12.5%（含就保 1%），負擔比例為勞工 20%、雇主 70%、政府 10%。健保費率 5.17%，一般受僱者勞工負擔 30%、雇主 60%、政府 10%。兩者都以「投保薪資」為計算基礎，並非實際月薪。",
  },
  {
    question: "為什麼我的勞保扣款跟月薪對不上？",
    answer:
      "勞健保不是直接用實際月薪計算，而是採用「投保薪資級距表」。系統會找到大於等於你月薪的最近一級，用該級距金額 × 費率 × 負擔比例。例如月薪 $45,000 會被歸類到 $45,800 級距，所以扣款會以 $45,800 × 費率計算。",
  },
  {
    question: "健保眷屬可以加保嗎？要付多少錢？",
    answer:
      "可以。依全民健保法，無工作收入的配偶、直系血親尊親屬（父母、祖父母）、未成年或學生子女可眷屬身分依附加保。每名眷屬需另繳一份健保費，但單一被保險人最多以 3 口眷屬計（超過 3 人免繳）。費用 = 投保金額 × 5.17% × 30% × 眷屬數（最多 3 人）。",
  },
  {
    question: "雇主低報投保薪資怎麼辦？",
    answer:
      "雇主依法應以勞工實際月薪申報投保薪資（含底薪、津貼、固定獎金），若低報可能導致勞保老年給付、職災給付、失業給付金額縮水，損失極大。勞工可向勞保局或地方勞工局檢舉，雇主最高可處 4 倍差額罰鍰並須補足差額，檢舉人身分受保密。",
  },
  {
    question: "自由工作者怎麼保勞保？",
    answer:
      "無固定雇主的自由工作者可透過「職業工會」加入勞保，如文字、設計、攝影等相關職業工會。費率與受僱勞工相同，但雇主端 70% 需自負，實際負擔較高；好處是保留完整就業保險與老年給付年資。若無相應工會，則只能加入「國民年金」與全民健保。",
  },
];

const INSURANCE_TOOLS = [
  { name: "勞健保保費計算", href: "/tools/insurance-premium", desc: "查級距與自付額、雇主負擔一目了然" },
  { name: "投保級距查詢", href: "/tools/insurance-bracket", desc: "輸入月薪秒查勞保、健保、勞退級距" },
  { name: "薪資明細計算機", href: "/tools/salary", desc: "完整試算實領金額與各項扣款" },
];

const INSURANCE_ARTICLES = [
  { title: "勞保 vs 國保 vs 農保差在哪？", href: "/articles/labor-insurance-comparison" },
  { title: "2026 勞保投保級距怎麼看？", href: "/articles/labor-insurance-bracket-2026" },
  { title: "2026 健保投保金額怎麼看？", href: "/articles/health-insurance-bracket-2026" },
  { title: "勞退 6% 可以從薪水扣嗎？", href: "/articles/labor-pension-6-percent" },
  { title: "沒幫我保勞保怎麼辦？檢舉流程", href: "/articles/no-labor-insurance" },
  { title: "勞保低報怎麼申訴？證據清單", href: "/articles/labor-insurance-underreporting-complaint" },
  { title: "二代健保補充保費完全攻略", href: "/articles/nhi-supplement-premium" },
  { title: "自由接案者怎麼保勞保？", href: "/articles/freelancer-insurance" },
  { title: "職災發生怎麼辦？完整 SOP", href: "/articles/work-injury-guide" },
  { title: "產假、陪產假、育嬰假完整解析", href: "/articles/maternity-leave-guide" },
  { title: "勞保老年給付怎麼算？", href: "/articles/labor-insurance-payout" },
];

export default function InsuranceGuidePage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "勞健保完全攻略",
    description: "聚合勞保、健保、投保級距、各項給付相關工具與深度文章",
    url: `${SITE_URL}/guides/insurance`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INSURANCE_TOOLS.map((tool, idx) => ({
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
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "勞健保攻略" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          勞健保完全攻略 2026
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          從勞保、健保、勞退三層保障，到投保級距原理、各項給付資格、眷屬加保策略，
          一次搞懂台灣社會保險制度。3 個免費工具 + 11 篇深度文章，依 2026 最新費率。
        </p>
      </header>

      {/* 核心數字區塊 */}
      <section className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">勞保費率</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">12.5%</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">健保費率</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">5.17%</div>
        </div>
        <div className="bg-brand-50 rounded-[12px] p-4 md:p-6 text-center">
          <div className="text-xs md:text-sm text-brand-700 mb-1">勞保投保上限</div>
          <div className="text-xl md:text-3xl font-extrabold text-brand-900">${formatMoney(45_800)}</div>
        </div>
      </section>

      {/* 工具清單 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">勞健保計算工具</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {INSURANCE_TOOLS.map((tool) => (
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

      <AdBanner slot="guide-insurance-mid" />

      {/* 權益文章 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">深度文章</h2>
        <div className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-surface shadow-[var(--shadow-card)]">
          {INSURANCE_ARTICLES.map((a) => (
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
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">台灣勞健保制度完整拆解</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞工的社會保險可分為<strong>三層保障</strong>：第一層是政府強制的
          <strong>勞工保險（含就業保險）</strong>與<strong>全民健康保險</strong>，第二層是雇主強制提繳的
          <strong>勞工退休金</strong>，第三層則是個人自願購買的商業保險。這三層疊加後才構成一位勞工完整的風險保障網。
          理解制度的運作邏輯，不僅能看懂薪資單，也能在生病、受傷、失業、退休等人生關鍵時刻，正確計算自己該拿的給付。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">三層保險制度概觀</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          <strong>勞工保險</strong>是「在職保險」，涵蓋老年、失能、死亡、生育、職災、傷病等 6 大給付；
          <strong>就業保險</strong>則給付失業、提早就業獎助、職業訓練津貼、育嬰留職停薪津貼等 4 大項目，費率 1% 內含於勞保 12.5% 之中。
          <strong>全民健康保險</strong>覆蓋所有國民的醫療就醫，並對「高額獎金、兼職薪資、股利、租金、利息、執行業務收入」加徵 2.11% 的補充保費。
          <strong>勞工退休金</strong>（新制）則是個人專屬帳戶，雇主每月必須提繳 6%，勞工也可自提最多 6% 享節稅，帳戶隨勞工移動、永不歸零。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">保費計算公式與級距原理</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞健保都以「<strong>投保薪資級距</strong>」為基礎計算，而非直接使用實際月薪。
          當雇主申報薪資時，系統會從級距表中選出「大於等於實際月薪」的最近一級。例如月薪 $45,000 會對應到 $45,800 級距。
          <strong>勞工自付額 = 級距 × 費率 × 自付比例</strong>。以月薪 $45,000 為例：
          勞保自付 = $45,800 × 12.5% × 20% = $1,145；
          健保自付 = $45,800 × 5.17% × 30% = $710；
          勞退 6% 則由雇主全額負擔 $2,748，不從勞工薪水扣。
          月薪超過上限 $45,800 者，勞保以上限計，但健保級距可至 $219,500，補充保費另計。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">勞保各項給付項目</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工保險是多功能的社會保險，主要給付包含：
          (1) <strong>老年給付</strong>：達請領年齡後可選月領或一次領，年資愈長給付比例愈高；
          (2) <strong>失能給付</strong>：因傷病無法工作時一次發給或按月發給；
          (3) <strong>職災醫療與傷病給付</strong>：因公受傷期間前 6 個月每月可領 70% 投保薪資、後續領 50%；
          (4) <strong>生育給付</strong>：分娩或早產可一次請領 2 個月投保薪資；
          (5) <strong>死亡給付</strong>：家屬可領喪葬津貼與遺屬年金；
          (6) <strong>失業給付</strong>：非自願離職者可領 60% 投保薪資，最長 6-9 個月。
          各項給付都有年資、事由、申請期限等限制，建議離職或發生事故後立即向勞保局查詢。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">雇主義務與違法檢舉</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          依勞工保險條例第 6 條及第 7 條，雇用 5 人以上事業單位必須強制為所有勞工投保勞保；健保則不論雇主規模，自到職日起一律加保。
          常見違法態樣：(1) 未依到職日加保；(2) 低報投保薪資（以底薪申報而非實際月薪）；(3) 以「派遣、外包、承攬」名義規避投保義務。
          這些違法行為會直接影響勞工老年給付、失業給付、職災補償的金額。
          檢舉管道：可向<strong>勞保局</strong>檢舉（勞保、就保）、<strong>健保署</strong>（健保）或<strong>地方勞工局</strong>（勞檢）。
          經查屬實，雇主除了要補繳差額外，還會被處以 4 倍罰鍰，檢舉人身分完全保密。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">眷屬加保策略與節費技巧</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          健保眷屬加保是許多家庭忽略的省錢技巧。依全民健保法，被保險人可攜帶下列對象以眷屬身分加保：
          (1) 無職業之配偶；(2) 無職業之直系血親尊親屬（父母、岳父母、祖父母）；(3) 無職業且未成年或成年後仍在學、身心障礙、無謀生能力之直系血親卑親屬。
          關鍵規則是「<strong>單一被保險人最多繳 3 口眷屬費</strong>」。所以家中長輩若無工作收入，建議由薪資較低的家人依附加保可省錢；有 4 位以上眷屬時，第 4 位起就免收。
          另注意：若有「較高投保薪資」的被保險人（如公務員），可能不適合搶著幫長輩加保，先算過級距再決定。
          相反，若家中長輩有租金、股利、退休金等收入，可能面臨<strong>二代健保補充保費</strong>，需另行規劃。
        </p>
      </article>

      <AdBanner slot="guide-insurance-bottom" />

      <FaqSection items={FAQS} />

      <section className="mt-12 rounded-[16px] border border-brand-100 bg-brand-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-3">立即試算你的勞健保費</h2>
        <p className="text-slate-600 mb-5">輸入月薪，自動查級距、算自付額與雇主負擔</p>
        <Link
          href="/tools/insurance-premium"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-brand-500 px-6 text-sm font-bold text-surface transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          開始計算 →
        </Link>
      </section>
    </div>
  );
}
