import { calculateSeverance } from "@/lib/calculations/severance";
import { formatMoney } from "@/lib/format";
import { CHECKED_AT, lawArticleUrl, PCODE, type ToolExplainerContent } from "./types";

const lsa = (article: string) => lawArticleUrl(PCODE.laborStandards, article);
const pensionAct = (article: string) => lawArticleUrl(PCODE.laborPension, article);

const newSystem = calculateSeverance("new", 42_000, 3, 6);
const cappedNewSystem = calculateSeverance("new", 50_000, 21, 0);
const oldSystemPart = calculateSeverance("old", 50_000, 2, 0);
const noticeDays = 20;
const noticeDailyWage = Math.round(42_000 / 30);

const severance: ToolExplainerContent = {
  heading: "資遣費計算機算的是什麼",
  intro: [
    "資遣費是雇主依勞基法第 11 條（歇業、虧損、業務緊縮、不能勝任等）或第 13 條但書終止契約，或勞工因雇主違法依第 14 條不經預告離職時，雇主依法應給的離職補償。計算機用「平均工資 × 年資 × 給付基數」估算金額，並區分勞退新制與舊制兩套規則。",
    "2005 年 7 月 1 日勞工退休金條例施行後的年資適用新制：每滿 1 年給 0.5 個月平均工資，未滿 1 年按比例計，最高 6 個月。施行前的年資若保留舊制，則依勞基法第 17 條每滿 1 年給 1 個月平均工資，沒有上限；跨越兩個制度的人要分段計算再相加。",
    "平均工資依勞基法第 2 條第 4 款，是資遣事由發生當日前 6 個月內的工資總額除以該期間總日數，月薪制通常再乘以 30 換算成月平均工資。加班費、固定津貼、全勤獎金屬於工資要算進去；年終獎金、三節節金等非經常性給與不列入。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 11 條、第 16 條",
      text: "雇主只能在法定事由下預告終止契約，並依年資給 10、20 或 30 日預告期，未預告應給預告期間工資。",
      url: lsa("11"),
    },
    {
      label: "勞動基準法第 17 條",
      text: "舊制每滿 1 年發給 1 個月平均工資，剩餘月數按比例計、未滿 1 個月以 1 個月計，並應於契約終止 30 日內發給。",
      url: lsa("17"),
    },
    {
      label: "勞工退休金條例第 12 條",
      text: "適用新制後的年資，每滿 1 年發給 1/2 個月平均工資，未滿 1 年按比例計給，最高以 6 個月平均工資為限。",
      url: pensionAct("12"),
    },
    {
      label: "勞動基準法第 14 條",
      text: "雇主欠薪、違法扣薪、不依約給付工資、暴行或重大侮辱等情形，勞工可不經預告終止契約，並準用資遣費規定。",
      url: lsa("14"),
    },
    {
      label: "勞動基準法第 18 條",
      text: "勞工因第 12 條（懲戒解僱）或第 15 條（自請離職）離職，或定期契約期滿，不能請求預告工資與資遣費。",
      url: lsa("18"),
    },
    {
      label: "勞動基準法第 2 條第 4 款",
      text: "平均工資為事由發生當日前 6 個月內工資總額除以該期間總日數。",
      url: lsa("2"),
    },
  ],
  examples: [
    {
      title: "試算範例一：新制，平均工資 42,000 元、年資 3 年 6 個月",
      scenario: "小黃 2022 年到職，公司以業務緊縮為由資遣，最近 6 個月平均月薪 42,000 元（含固定津貼）。",
      steps: [
        "年資換算：3 年 6 個月 = 3.5 年。",
        `給付基數：3.5 × 0.5 = ${newSystem.months} 個月。`,
        `資遣費：42,000 × ${newSystem.months} = ${formatMoney(newSystem.amount)} 元。`,
        `另外：年資 1 年以上未滿 3 年應有 20 日預告期，未預告須給 ${noticeDays} 日工資，即 ${formatMoney(noticeDailyWage)} × ${noticeDays} = ${formatMoney(noticeDailyWage * noticeDays)} 元。`,
      ],
      result: `資遣費 ${formatMoney(newSystem.amount)} 元，未預告時再加預告工資 ${formatMoney(noticeDailyWage * noticeDays)} 元，以及未休特休折發工資。`,
    },
    {
      title: "試算範例二：舊制年資 2 年、新制年資 21 年",
      scenario: "老周 2003 年 7 月到職，2005 年選擇新制並保留舊制年資，2026 年 7 月被資遣，平均工資 50,000 元。",
      steps: [
        `舊制部分：2 年 × 1 個月 = ${oldSystemPart.months} 個月，${formatMoney(oldSystemPart.amount)} 元。`,
        `新制部分：21 年 × 0.5 = 10.5 個月，超過上限，以 ${cappedNewSystem.months} 個月計，${formatMoney(cappedNewSystem.amount)} 元。`,
      ],
      result: `合計 ${formatMoney(oldSystemPart.amount + cappedNewSystem.amount)} 元。6 個月上限只套用在新制年資，舊制年資另外計算。`,
    },
  ],
  mistakes: [
    {
      title: "只用底薪計算平均工資",
      body: "平均工資要用前 6 個月實際領到的工資總額，包含加班費與每月固定發放的津貼。只拿底薪計算，資遣費會明顯偏低。",
    },
    {
      title: "被要求簽「自願離職」",
      body: "公司若以業務緊縮或績效為由要你走，卻要求簽自願離職書，你可能因此失去資遣費、預告工資，也拿不到非自願離職證明而無法請領失業給付。簽名前先確認離職事由寫的是勞基法第 11 條。",
    },
    {
      title: "忘了預告工資與特休折現",
      body: "資遣費之外，雇主沒有依第 16 條預告就要給預告期間工資；離職時未休的特休也要依施行細則第 24 條之 1 折發。三筆錢性質不同，不能互相抵銷。",
    },
    {
      title: "超過 30 日才付",
      body: "資遣費應在契約終止 30 日內發給。拖延不付可向地方勞工局申訴或申請勞資爭議調解。",
    },
  ],
  prepare: [
    "資遣通知或終止契約的書面文件，確認引用的法條與事由。",
    "最近 6 個月薪資單與入帳紀錄，用來計算平均工資。",
    "到職日證明，以及 2005 年 7 月以前到職者的新舊制選擇紀錄。",
    "勞保局 e 化服務系統上的勞退提繳與勞保投保紀錄。",
  ],
  readNext: [
    { label: "資遣費完整計算指南", href: "/articles/severance-calculation-complete" },
    { label: "資遣費、預告工資與特休折現", href: "/articles/severance-pay-notice-wages" },
    { label: "非自願離職證明怎麼拿", href: "/articles/involuntary-separation-certificate" },
    { label: "被資遣後的失業給付", href: "/articles/unemployment-benefits" },
  ],
  checkedAt: CHECKED_AT,
};

const resignNoticeDays = 20;

const noticePeriod: ToolExplainerContent = {
  heading: "離職預告期計算機算的是什麼",
  intro: [
    "輸入到職日，計算機依年資算出離職應提前幾天告知，並推算最晚何時要提出。勞基法第 16 條原本規範雇主資遣時的預告期，第 15 條第 2 項規定不定期契約的勞工自請離職時「準用」同一套天數，所以雙方的預告期是一樣的。",
    "年資未滿 3 個月沒有法定預告期；3 個月以上未滿 1 年為 10 日；1 年以上未滿 3 年為 20 日；3 年以上為 30 日。工作規則或契約可以約定得比法律更短，但不宜要求勞工預告得比法律更長，例如一律要求 2 個月。",
    "如果是雇主資遣，預告期間勞工每週可請最多 2 日的謀職假，工資照給；雇主沒有預告，就要給付預告期間的工資。如果是勞工自請離職，沒有依法預告雖然可能讓雇主主張實際損害賠償，但雇主仍應全額給付已工作期間的工資，不能直接扣薪抵銷。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 15 條第 2 項",
      text: "不定期契約的勞工終止契約時，應準用第 16 條第 1 項規定的期間預告雇主。",
      url: lsa("15"),
    },
    {
      label: "勞動基準法第 16 條",
      text: "繼續工作 3 個月以上 1 年未滿 10 日、1 年以上 3 年未滿 20 日、3 年以上 30 日；預告期間可請謀職假每週 2 日，未預告應給預告期間工資。",
      url: lsa("16"),
    },
    {
      label: "勞動基準法第 22 條、第 26 條",
      text: "工資應全額直接給付勞工；雇主不得預扣工資作為違約金或賠償費用。",
      url: lsa("26"),
    },
    {
      label: "勞動基準法第 19 條",
      text: "勞動契約終止時，勞工請求發給服務證明書，雇主不得拒絕。",
      url: lsa("19"),
    },
  ],
  examples: [
    {
      title: "試算範例一：年資 1 年 8 個月要離職",
      scenario: "小許 2024 年 12 月到職，打算 2026 年 8 月底離職。",
      steps: [
        "年資 1 年以上未滿 3 年，適用 20 日預告期。",
        `最後工作日若是 8 月 31 日，最晚應在 8 月 11 日前提出（往前推 ${resignNoticeDays} 日）。`,
        "建議用 Email 或書面提出並保留紀錄，寫明最後工作日。",
      ],
      result: "預告 20 日即可，公司不能要求一律提前 1 個月或 2 個月才放人。",
    },
    {
      title: "試算範例二：被資遣卻當天就被要求離開",
      scenario: `小許月薪 42,000 元、年資 1 年 8 個月，公司當天通知資遣並要求立刻離開。`,
      steps: [
        `一日工資：42,000 ÷ 30 = ${formatMoney(noticeDailyWage)} 元。`,
        `預告期間工資：${formatMoney(noticeDailyWage)} × 20 = ${formatMoney(noticeDailyWage * 20)} 元。`,
      ],
      result: `公司除資遣費外，應另給 ${formatMoney(noticeDailyWage * 20)} 元預告期間工資。`,
    },
  ],
  mistakes: [
    {
      title: "以為預告期就是交接期",
      body: "預告期是法律給雙方準備的時間，交接內容可以協商，但公司不能以「交接未完成」為由拒絕你離職或扣留最後一個月薪水。",
    },
    {
      title: "未預告就被扣薪",
      body: "勞工沒有依法預告，雇主若有實際損害只能另外主張，不能直接從工資扣除。違反全額給付原則可向勞工局申訴。",
    },
    {
      title: "試用期就不用預告",
      body: "勞基法沒有排除試用期。只要繼續工作滿 3 個月，就適用 10 日預告期；試用期間被資遣，也一樣有資遣費。",
    },
    {
      title: "定期契約到期也要預告嗎",
      body: "定期契約期滿離職，依勞基法第 18 條不能請求預告工資與資遣費；但如果定期契約是違法約定（例如繼續性工作卻一直簽定期契約），就可能被認定為不定期契約，仍適用預告與資遣規定。",
    },
  ],
  prepare: ["到職日證明與勞動契約。", "工作規則中的離職申請流程。", "可保留的書面離職通知（Email、通訊軟體或簽收單）。"],
  readNext: [
    { label: "離職預告期與注意事項", href: "/articles/resignation-notice" },
    { label: "自請離職的權益清單", href: "/articles/quit-job-rights" },
    { label: "試用期的勞動權益", href: "/articles/probation-rights" },
    { label: "被資遣和自請離職差在哪", href: "/compare/fired-vs-quit" },
  ],
  checkedAt: CHECKED_AT,
};

const bonusMonthly = 45_000;
const bonusMonths = 1.5;
const workedMonths = 7;
const proRated = Math.round(bonusMonthly * bonusMonths * (workedMonths / 12));

const bonus: ToolExplainerContent = {
  heading: "年終獎金計算機算的是什麼",
  intro: [
    "計算機用「月薪 × 年終月數 × 在職月數 ÷ 12」估算年終獎金，適合到職未滿一年、年中離職或想比較不同 offer 的年薪。它計算的是公司制度下的比例金額，不代表法律規定一定要發多少個月。",
    "勞基法第 29 條只規定：事業單位營業年度結算有盈餘，在繳稅、彌補虧損與提列股息公積後，對全年工作並無過失的勞工應給獎金或分配紅利。法律沒有規定年終的月數，因此能不能領、能領多少，主要看勞動契約、工作規則、聘僱信或公司長期慣例。",
    "如果公司在 offer 寫明「保障年薪 14 個月」或在工作規則固定發放，年終就成為契約上的給付義務，不能任意取消；若寫的是「視公司營運與個人績效發放」，則屬於恩惠性給與，公司有較大裁量空間。年終獎金屬於非經常性給與，依施行細則第 10 條不列入平均工資。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 29 條",
      text: "營業年度終了結算有盈餘，對全年工作並無過失之勞工，應給與獎金或分配紅利。",
      url: lsa("29"),
    },
    {
      label: "勞動基準法施行細則第 10 條",
      text: "年終獎金、競賽獎金、三節節金等屬非經常性給與，不屬於計算平均工資的工資。",
      url: lawArticleUrl(PCODE.laborStandardsRules, "10"),
    },
    {
      label: "全民健康保險法第 31 條",
      text: "投保單位全年累計發給的獎金，超過當月投保金額 4 倍的部分，應扣取補充保險費。",
      url: lawArticleUrl(PCODE.nhi, "31"),
    },
  ],
  examples: [
    {
      title: "試算範例：月薪 45,000 元、年終 1.5 個月、在職 7 個月",
      scenario: "小蘇 6 月 1 日到職，公司制度寫明年終 1.5 個月，未滿一年按在職月數比例發放。",
      steps: [
        `全年年終：45,000 × 1.5 = ${formatMoney(bonusMonthly * bonusMonths)} 元。`,
        `按比例：${formatMoney(bonusMonthly * bonusMonths)} × 7 ÷ 12 = ${formatMoney(proRated)} 元。`,
        "若年終單筆加上當年度其他獎金累計超過投保金額 4 倍，超出部分會被扣補充保費。",
      ],
      result: `依公司比例制度，年終約 ${formatMoney(proRated)} 元；比例規則必須是公司制度或契約明定的才算數。`,
    },
  ],
  mistakes: [
    {
      title: "以為法律規定年終至少 1 個月",
      body: "勞基法沒有規定年終月數。爭取年終要回頭看契約、工作規則或過去固定發放的慣例，並保留 offer 與公告。",
    },
    {
      title: "發放前離職就一定拿不到",
      body: "若公司制度或慣例是按在職比例計算，或年終已經屬於約定的固定給付，離職不一定喪失請求權；反之，若制度明定以發放日在職為條件，就較難主張。",
    },
    {
      title: "把年終算進資遣費平均工資",
      body: "年終獎金屬非經常性給與，通常不列入平均工資；但若名為年終、實為每月分攤的固定給付，仍可能被認定為工資，需看實際給付方式。",
    },
    {
      title: "年終被扣補充保費以為是扣錯",
      body: "全年累計獎金超過當月投保金額 4 倍的部分，投保單位要依全民健康保險法第 31 條扣取補充保費。例如投保金額 45,800 元，全年獎金在 183,200 元以內不用扣；超過的部分才會被扣，年終越高被扣的金額越多。",
    },
    {
      title: "把三節獎金和年終混在一起比較",
      body: "三節節金與年終都屬非經常性給與，但發放條件可能不同。比較 offer 時要分開列出，並確認哪些是保障、哪些是視績效發放。",
    },
  ],
  prepare: ["聘僱信或 offer 中關於年薪、年終的文字。", "工作規則或公司公告的年終發放辦法。", "過去幾年實際發放月數的紀錄。"],
  readNext: [
    { label: "年終獎金的法律規定與常見爭議", href: "/articles/year-end-bonus" },
    { label: "二代健保補充保費怎麼扣", href: "/articles/nhi-supplement-premium" },
    { label: "薪資單逐項說明", href: "/articles/salary-slip-explained" },
    { label: "比較兩份 offer 的年薪", href: "/tools/salary-compare" },
  ],
  checkedAt: CHECKED_AT,
};

export const SEPARATION_EXPLAINERS: Record<string, ToolExplainerContent> = {
  severance,
  "notice-period": noticePeriod,
  bonus,
};
