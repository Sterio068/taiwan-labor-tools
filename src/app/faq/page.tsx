import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工常見問題 FAQ — 薪資、加班、離職、保險解答",
  description:
    "彙整 40 個台灣勞工最常見的問題，涵蓋薪資計算、加班費、資遣費、特休、勞健保，每個問題都有詳細解答與法條依據。",
  keywords: ["勞工問題", "勞基法FAQ", "薪資問題", "加班問題", "資遣問題"],
  path: "/faq",
});

const CATEGORIES = [
  {
    title: "薪資相關",
    items: [
      {
        q: "月薪 30,000 實領多少？",
        a: "以 2026 年費率，勞保自付約 $766、健保自付約 $476（無眷屬），實領約 $28,758。如有眷屬加保會再多扣健保費。",
      },
      {
        q: "投保薪資跟月薪一樣嗎？",
        a: "不一樣。投保薪資依「投保薪資級距表」找到大於等於月薪的最近一級，再用該級距計算保費。例如月薪 32,000 對應到 33,300 級距。",
      },
      {
        q: "勞退提繳是從薪水扣的嗎？",
        a: "雇主強制提繳的 6% 不從薪水扣，直接由雇主支付。勞工「自願提繳」的部分才從薪水扣，但可享節稅。",
      },
      {
        q: "底薪和月薪差在哪？",
        a: "底薪是固定基本薪資，月薪通常包含底薪加上固定津貼（如職務加給、交通補助）。勞健保投保薪資以月薪計算，不只是底薪。",
      },
      {
        q: "補充保費是什麼？什麼時候要扣？",
        a: "二代健保補充保費費率 2.11%，當單次領取的獎金、加班費、兼職收入等超過當月投保金額 4 倍時需扣繳，年終獎金也適用。",
      },
    ],
  },
  {
    title: "加班費",
    items: [
      {
        q: "平日加班費怎麼算？",
        a: "時薪 = 月薪 ÷ 30 ÷ 8。前 2 小時加班費為時薪 × 4/3，第 3 小時起為時薪 × 5/3。加班費應另行發給，不得以補休代替（除非勞工同意）。",
      },
      {
        q: "休息日加班怎麼算？",
        a: "休息日出勤工時不足 4 小時以 4 小時計，超過 4 小時不足 8 小時以 8 小時計。費率與平日相同（前 2 小時 4/3 倍，第 3 小時起 5/3 倍），但工時計算有最低門檻。",
      },
      {
        q: "國定假日強制出勤合法嗎？",
        a: "法定國定假日原則上應放假，如需出勤，工資必須加倍（共領 2 倍工資）。雇主不能片面以補休取代，需經勞工同意。",
      },
      {
        q: "例假日加班有補償嗎？",
        a: "例假日（每 7 日至少一日）僅限天災、事變或突發事件才能出勤，出勤工資加倍發給並須另補假一日。非法定原因要求例假出勤為違法。",
      },
      {
        q: "責任制加班費要發嗎？",
        a: "責任制（勞基法第 84-1 條）需主管機關核定，且仍有上限。如未依程序核定，雇主仍需依法發給加班費。私下約定「責任制不發加班費」無效。",
      },
    ],
  },
  {
    title: "資遣與離職",
    items: [
      {
        q: "被資遣一定有資遣費嗎？",
        a: "適用新制（2005 年後）的勞工，服務滿一年給一個月平均工資，未滿一年按比例給付。每滿一年最高 6 個月，最多發 6 個月。",
      },
      {
        q: "自願離職有資遣費嗎？",
        a: "自願離職（非雇主資遣）原則上沒有資遣費。但若因雇主違法（欠薪、調職不合理等）而被迫離職，可主張「準用資遣」要求資遣費。",
      },
      {
        q: "離職預告期幾天？",
        a: "勞工主動離職：年資 3 個月以上未滿 1 年預告 10 日；1 年以上 3 年以下預告 20 日；3 年以上預告 30 日。雇主資遣同上但起算條件不同。",
      },
      {
        q: "離職後可以馬上領失業給付嗎？",
        a: "失業給付須被非自願離職（資遣、合約到期等），且勞保年資累計 1 年以上，離職後 2 年內申請。一般自願離職不符資格。",
      },
      {
        q: "離職後公司不給薪怎麼辦？",
        a: "勞工申請離職後，雇主應在最後工作日給付所有薪資；若拖延，可向地方勞動局申訴，並要求加計利息。",
      },
    ],
  },
  {
    title: "特休假",
    items: [
      {
        q: "特休怎麼計算？",
        a: "到職滿 6 個月 3 天、滿 1 年 7 天、2 年 10 天、3 年 14 天、4 年 15 天、5 年 15 天、6 年以上每年 15 天（最多 30 天）。依到職週年日計算，非曆年。",
      },
      {
        q: "特休未休完可以換錢嗎？",
        a: "年度終結或契約終止時，未休的特休應折算工資發給，雇主不得拒絕或強制員工放棄。工資計算以離職前 6 個月平均工資為準。",
      },
      {
        q: "病假、事假扣薪合法嗎？",
        a: "病假前 30 天給半薪（需持醫療證明），超過 30 天無薪；事假為無薪假，1 年最多 14 天。這是法定規定，雇主不能再扣更多。",
      },
      {
        q: "生理假要扣薪嗎？",
        a: "女性勞工每月可請 1 天生理假，全年不得超過 3 天，不扣薪。超過 3 天的部分可請病假，前 30 天半薪。",
      },
      {
        q: "陪產假有幾天？",
        a: "配偶分娩前後，受雇者可請陪產假 7 天，薪資照給，可分次使用，須在配偶分娩後 6 個月內使用完畢。",
      },
    ],
  },
  {
    title: "勞健保",
    items: [
      {
        q: "沒幫我保勞保合法嗎？",
        a: "只要每週工作超過 20 小時，雇主就必須為勞工投保勞保，違反可向勞動部舉報。兼職若同時有多個雇主，應以工時最多的雇主加保。",
      },
      {
        q: "健保眷屬可以加保幾個？",
        a: "配偶及直系親屬（父母、子女）可加保，每人加計 1 口眷屬費用。但眷屬人數最多計 3 口，超過 3 口保費不再增加。",
      },
      {
        q: "自由接案者怎麼保勞保？",
        a: "自由業者可透過職業工會加保勞保（各職業工會收費不同，需自行負擔全額保費）。若有兼任教職或法人代表等身份，可從相關渠道加保。",
      },
      {
        q: "勞保老年給付怎麼算？",
        a: "勞保老年年金 = 平均月投保薪資 × 年資 × 1.55%，選擇一次給付則按年資 × 最後三年平均月投保薪資。通常年金制對長年資者較有利。",
      },
      {
        q: "離職後健保要怎麼辦？",
        a: "離職後須在 30 天內完成健保轉出，可加保到配偶的眷屬、職業工會，或以個人身份投保（後者費用通常較高）。",
      },
    ],
  },
  {
    title: "職場權益",
    items: [
      {
        q: "試用期可以隨便解僱嗎？",
        a: "不行。試用期勞工仍受勞基法保護，雇主不得無故解僱。若要解僱，須有正當事由，且試用期結束後若繼續讓員工上班，即視為成立不定期勞動契約。",
      },
      {
        q: "職場霸凌雇主要負責嗎？",
        a: "依性別平等工作法，雇主有防治職場霸凌的義務，須訂定相關措施。若雇主知情不處理，勞工可向地方主管機關申訴，雇主最高可罰 100 萬元。",
      },
      {
        q: "加班沒申報可以主張加班費嗎？",
        a: "可以。加班事實存在即可主張，不以「主管簽核加班單」為前提。但勞工需自行舉證出勤事實（打卡紀錄、通訊紀錄等）。",
      },
      {
        q: "競業禁止條款有效嗎？",
        a: "需同時符合：有正當事業利益需保護、勞工有接觸機密、限制合理（地域/職業/期間）、補償勞工損失（月薪 50% 以上）。未給補償或限制過寬均可能無效。",
      },
      {
        q: "勞資爭議要去哪裡申訴？",
        a: "可向雇主所在地的地方勞動局（縣市）申請勞資調解，免費且快速（30 日內）。若調解不成，可向法院提起訴訟，或申請勞動仲裁。",
      },
    ],
  },
];

const ALL_FAQ_ITEMS = CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ question: item.q, answer: item.a }))
);

export default function FaqPage() {
  const faqJsonLd = faqSchema(ALL_FAQ_ITEMS);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "首頁", url: SITE_URL },
    { name: "勞工常見問題 FAQ", url: `${SITE_URL}/faq` },
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
          { label: "常見問題 FAQ" },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          勞工常見問題 FAQ
        </h1>
        <p className="text-slate-500 text-lg">
          彙整 40 個台灣勞工最常見的問題，每個解答均附有法條依據，點擊問題即可展開說明。
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((cat, catIdx) => (
          <section key={cat.title}>
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => (
                <details
                  key={itemIdx}
                  className={`group rounded-[16px] border border-slate-200 overflow-hidden ${
                    catIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-slate-800 hover:bg-slate-100 transition-colors list-none">
                    <span>{item.q}</span>
                    <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                      ▾
                    </span>
                  </summary>
                  <p className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-brand-50 rounded-[16px] text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">需要精確計算？</h2>
        <p className="text-slate-500 text-sm mb-4">
          使用免費工具自動算出薪資、加班費、資遣費，或閱讀深度文章了解更多。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white font-bold rounded-[10px] hover:bg-brand-700 transition-colors text-sm"
          >
            查看全部工具
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-600 font-bold rounded-[10px] hover:bg-brand-50 transition-colors border border-brand-200 text-sm"
          >
            瀏覽深度文章
          </Link>
        </div>
      </div>
    </div>
  );
}
