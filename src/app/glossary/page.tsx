import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "勞動法名詞解釋 — 勞基法、勞退、資遣費等 40 個名詞",
  description:
    "勞基法常見名詞完整解釋：基本工資、投保薪資、資遣費、平均工資、特休、勞退新舊制等 40 個勞動法術語，附計算公式。",
  keywords: ["勞動法名詞", "勞基法術語", "資遣費定義", "平均工資", "投保薪資"],
  path: "/glossary",
});

interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

interface GlossaryGroup {
  groupTitle: string;
  terms: GlossaryTerm[];
}

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    groupTitle: "薪資與工資",
    terms: [
      {
        term: "基本工資",
        definition:
          "2026 年月薪 $29,500、時薪 $196，雇主不得低於此標準給付工資。",
        example: "月薪 $28,000 已違反基本工資規定。",
      },
      {
        term: "平均工資",
        definition:
          "計算事由發生前 6 個月的薪資總額除以總日數。用於計算資遣費、職災補償等。",
        example: "過去 6 個月共領 $270,000，平均工資 = $1,500/天。",
      },
      {
        term: "投保薪資",
        definition:
          "勞健保費率計算的基準，按月薪對照投保薪資級距表找最接近的級距。",
        example: "月薪 $35,000 對應投保薪資 $36,300。",
      },
      {
        term: "工資",
        definition:
          "依約定支付的報酬，包含底薪及具有勞務對價性的固定津貼；不包含恩惠性給與（如慰問金）。",
        example: "交通津貼若為全員固定發放，計入工資；春節慰問金則否。",
      },
      {
        term: "平均工資計算期間",
        definition:
          "資遣費、職災補償等以「事由發生前 6 個月總工資 ÷ 總日數」計算。",
        example: "若在 7 月 1 日離職，計算 1 月 1 日至 6 月 30 日的薪資總額。",
      },
      {
        term: "三節獎金",
        definition:
          "春節、端午、中秋發放的獎金，若勞動契約明確約定則屬工資；若為恩惠性給與則雇主可自行決定是否發給。",
        example: "合約寫明「保障三節各一個月」則屬工資，不能片面取消。",
      },
    ],
  },
  {
    groupTitle: "保險與提繳",
    terms: [
      {
        term: "勞退新制",
        definition:
          "2005 年起施行，雇主每月提繳月薪 6% 到個人帳戶，勞工所有權，不因離職流失。",
        example: "月薪 $40,000，雇主每月存入 $2,400 到你的帳戶。",
      },
      {
        term: "勞退舊制",
        definition:
          "2005 年前施行，退休金由雇主管理，需滿 15 年年資才能領取，換工作即歸零。",
        example: "現在仍有勞工保有舊制年資，可在退休時選擇要新制或舊制。",
      },
      {
        term: "自願提繳",
        definition:
          "勞工自行額外提繳勞退（0-6%），從薪水扣除，可享全額所得稅扣除。",
        example: "月薪 $40,000 自提 6% = $2,400，每年可少報 $28,800 所得。",
      },
      {
        term: "勞保年金",
        definition:
          "勞保老年給付的年金制，公式為月投保薪資 × 年資 × 1.55%，每月領取到死亡。",
        example: "投保薪資 $43,900 × 30 年 × 1.55% = 每月約 $20,413。",
      },
      {
        term: "補充保費",
        definition:
          "二代健保對特定所得（獎金、加班費、兼職收入）另課 2.11%，超過當月投保薪資 4 倍才扣繳。",
        example: "年終獎金 $100,000，若超過門檻需扣 $2,110 補充保費。",
      },
      {
        term: "積欠工資墊償基金",
        definition:
          "雇主倒閉欠薪時，政府代為墊付部分工資（最高 6 個月），事後向雇主追討。",
        example: "公司突然倒閉，員工可申請基金墊償最多 $177,000 欠薪。",
      },
      {
        term: "職業工會",
        definition:
          "以職業為單位的工會組織，自由業、兼職者可透過職業工會加保勞保，費率自行全額負擔。",
        example: "自由攝影師加入攝影工會，以最低投保薪資 $26,400 加保。",
      },
      {
        term: "就業保險",
        definition:
          "提供失業給付、提早就業獎助、職業訓練生活津貼等保障的社會保險。",
        example: "非自願離職且符合年資條件者，可依就業保險申請失業給付。",
      },
    ],
  },
  {
    groupTitle: "離職與資遣",
    terms: [
      {
        term: "資遣費",
        definition:
          "雇主依法定事由終止契約時應給的補償；新制每滿 1 年給 0.5 個月平均工資，最高 6 個月。",
        example: "新制年資 3 年，平均月薪 $40,000，資遣費 = $60,000。",
      },
      {
        term: "預告期",
        definition:
          "終止勞動契約前須提前告知的天數。年資 1-3 年需提前 20 天。",
        example: "預告期間照常上班，若雇主不讓上班仍須發代通知金。",
      },
      {
        term: "代通知金",
        definition:
          "雇主未依規定給足預告期，需給付勞工的金額，等於預告期工資。",
        example: "年資 2 年應給 20 天預告，若立即資遣需多給 20 天工資。",
      },
      {
        term: "失業給付",
        definition:
          "勞工被非自願離職後，每月領取前 6 個月平均月投保薪資的 60%，最長 6 個月。",
        example: "離職前 6 個月平均投保薪資 $40,000，每月可領 $24,000。",
      },
      {
        term: "不定期契約",
        definition:
          "一般正職員工的契約類型，雇主若要終止需有正當事由並遵守預告期與資遣費規定。",
        example: "試用期通過後繼續工作，自動成立不定期契約。",
      },
      {
        term: "定期契約",
        definition:
          "有固定到期日的勞動契約，到期自然終止不給資遣費；但若工作本質非臨時性，視為不定期契約。",
        example: "6 個月的工程專案約定定期契約合法。",
      },
      {
        term: "非自願離職證明",
        definition:
          "證明離職原因屬非自願的文件，常用於申請失業給付與職業訓練生活津貼。",
        example: "資遣時應請雇主開立非自願離職證明。",
      },
      {
        term: "服務證明書",
        definition:
          "勞工離職時得要求雇主發給的文件，載明任職期間、職務與工作內容。",
        example: "求職時可用服務證明書證明過往年資。",
      },
      {
        term: "合意終止",
        definition:
          "勞雇雙方同意結束勞動契約，法律效果取決於協議內容，未必等同資遣。",
        example: "簽署離職協議前應確認是否保留資遣費與非自願離職證明。",
      },
    ],
  },
  {
    groupTitle: "假別與工時",
    terms: [
      {
        term: "特別休假（特休）",
        definition:
          "依年資累積的有薪假，到職 6 個月 3 天、1 年 7 天，依週年制計算。",
        example: "到職 2 年有 10 天特休，可在週年日後使用。",
      },
      {
        term: "例假",
        definition:
          "每 7 天至少 1 天的完全休息日，原則上不得出勤，雇主不得任意安排工作。",
        example: "通常是週日，違反例假出勤每人每次罰 $2-$100 萬。",
      },
      {
        term: "休息日",
        definition:
          "例假外的非工作日（通常週六），可彈性安排出勤，出勤須依規定給加班費。",
        example: "週六被叫進來工作，最少以 4 小時計算加班費。",
      },
      {
        term: "國定假日",
        definition:
          "政府規定的特定假日（元旦、春節、清明等），出勤工資加倍。",
        example: "春節初一出勤 8 小時，工資 $1,500 × 2 = $3,000。",
      },
      {
        term: "責任制",
        definition:
          "勞基法第 84-1 條，特定職業可另行約定工時，但需主管機關核定，且仍有上限。",
        example: "未經核定擅自約定「責任制」不發加班費為違法。",
      },
      {
        term: "工時",
        definition:
          "勞基法規定每日正常工時 8 小時、每週 40 小時，延長工時（加班）每月上限 54 小時。",
        example: "每週超過 40 小時的部分須依法給付加班費。",
      },
      {
        term: "變形工時",
        definition:
          "在符合法定行業、程序與工時上限下，將正常工時彈性分配到不同工作日的制度。",
        example: "公司採四週變形工時仍須遵守每日與每週上限。",
      },
      {
        term: "補休",
        definition:
          "勞工加班後經同意選擇補休而非領加班費，補休期限與未休折算應依約定及法規處理。",
        example: "補休期限屆滿未休完時，雇主仍應依法折算加班費。",
      },
      {
        term: "出勤紀錄",
        definition:
          "記錄上、下班與加班時間的資料，是工時、加班費與勞資爭議的重要證據。",
        example: "打卡紀錄、排班表與主管訊息都可能佐證加班。",
      },
    ],
  },
  {
    groupTitle: "給付與補償",
    terms: [
      {
        term: "生育給付",
        definition:
          "女性勞工分娩時，勞保給付 2 個月投保薪資（難產或死產另計）。",
        example: "投保薪資 $35,000，可領生育給付 $70,000。",
      },
      {
        term: "育嬰留職停薪",
        definition:
          "勞工（男女均可）在子女滿 3 歲前可申請留停，最長 2 年，期間可領育嬰津貼（月投保薪資 60%，最長 6 個月）。",
        example: "月投保薪資 $38,200，育嬰津貼每月約 $22,920。",
      },
      {
        term: "職業災害",
        definition:
          "因執行職務而受傷、生病或死亡，雇主依勞基法第 59 條負補償責任，不論過失。",
        example: "在公司搬貨受傷、上下班途中車禍（部分條件）均可能構成職災。",
      },
      {
        term: "勞動檢查",
        definition:
          "政府勞動主管機關（縣市勞動局）的稽查行為，對象包含工時、薪資、安全衛生等。",
        example: "勞動局可不預告突擊檢查，雇主拒絕最高罰 $150 萬。",
      },
      {
        term: "勞資調解",
        definition:
          "向地方勞動局申請免費調解服務，雙方出席後由調解委員協助達成協議，30 日內完成。",
        example: "薪資糾紛申請調解後，雇主同意補發欠薪，調解成立。",
      },
      {
        term: "調解成立",
        definition:
          "勞資雙方在調解程序中達成協議，調解紀錄通常可作為日後強制執行或訴訟的重要文件。",
        example: "雇主承諾分期給付欠薪，應寫入調解成立內容。",
      },
      {
        term: "低報投保薪資",
        definition:
          "雇主以低於實際薪資的金額投保勞保、健保或勞退，可能影響保費、給付與退休金。",
        example: "月薪 $45,000 卻以最低級距投保，可能構成低報。",
      },
      {
        term: "薪資清冊",
        definition:
          "雇主保存的薪資發放明細，包含工資、扣款、獎金與加班費，是勞檢與爭議常用文件。",
        example: "勞檢時可能要求雇主提出薪資清冊與出勤紀錄。",
      },
    ],
  },
];

export default function GlossaryPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "首頁", url: SITE_URL },
    { name: "名詞解釋", url: `${SITE_URL}/glossary` },
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "名詞解釋" },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          勞動法名詞解釋
        </h1>
        <p className="text-slate-500 text-lg">
          40 個勞基法常用術語，附定義與計算範例，快速搞懂薪資單、合約中的法律用語。
        </p>
      </div>

      <div className="space-y-10">
        {GLOSSARY_GROUPS.map((group, groupIdx) => (
          <section key={group.groupTitle}>
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {group.groupTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.terms.map((item) => (
                <div
                  key={item.term}
                  className={`rounded-[16px] border border-slate-200 overflow-hidden ${
                    groupIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <div className="px-5 pt-5 pb-3">
                    <p className="font-bold text-slate-900 text-base mb-2">
                      {item.term}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                  <div className="mx-5 mb-5 px-4 py-2 bg-slate-100 rounded-[8px]">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-semibold text-slate-600">例：</span>
                      {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-brand-50 rounded-[16px] text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">實際計算看這裡</h2>
        <p className="text-slate-500 text-sm mb-4">
          了解名詞定義後，用免費工具自動試算薪資、加班費、資遣費。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-600 text-white font-bold rounded-[10px] hover:bg-brand-700 transition-colors text-sm"
          >
            查看全部計算工具
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-600 font-bold rounded-[10px] hover:bg-brand-50 transition-colors border border-brand-200 text-sm"
          >
            常見問題 FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
