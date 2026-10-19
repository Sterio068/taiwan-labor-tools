import { LABOR_CONSTANTS } from "@/data/constants";
import { calculateOvertime } from "@/lib/calculations/overtime";
import { calculateSalaryBreakdown } from "@/lib/calculations/salary-breakdown";
import { formatMoney } from "@/lib/format";
import { CHECKED_AT, lawArticleUrl, PCODE, type ToolExplainerContent } from "./types";

const lsa = (article: string) => lawArticleUrl(PCODE.laborStandards, article);
const disputes = (article: string) => lawArticleUrl(PCODE.disputes, article);
const MOL_TYPHOON_URL = "https://www.mol.gov.tw/1607/1632/1640/76758/";

const restDayExample = calculateOvertime(32_000, 4, "rest-day");

const rightsCheck: ToolExplainerContent = {
  heading: "勞工權益健檢在檢查什麼",
  intro: [
    "健檢用幾個是非題，快速比對你目前的勞動條件是否低於勞基法與相關法令的最低標準，例如薪資是否低於最低工資、加班有沒有加班費、特休天數是否足夠、勞健保是否依實際薪資投保、離職時有沒有拿到資遣費與服務證明。每一題都對應到一條法律與一個可以進一步試算的工具。",
    `勞基法是最低標準：公司可以給得更好，不能給得更少。2026 年月最低工資 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元、時薪 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)} 元；正常工時每日 8 小時、每週 40 小時；每 7 日應有 1 日例假、1 日休息日；勞工到職滿 6 個月起就有特休。只要有一題答「否」，就值得進一步確認。`,
    "健檢結果不是法律判斷，而是幫你把問題整理清楚。若發現疑似違法，可以先蒐集薪資單、打卡紀錄與對話紀錄，再向雇主反映、撥打勞動部 1955 專線諮詢，或向工作地的縣市勞工局申訴與申請調解。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 21 條與最低工資法",
      text: "工資由勞雇議定，但不得低於最低工資。",
      url: lsa("21"),
    },
    {
      label: "勞動基準法第 30 條、第 36 條",
      text: "正常工時每日不超過 8 小時、每週不超過 40 小時；每 7 日應有例假與休息日各 1 日。",
      url: lsa("30"),
    },
    {
      label: "勞動基準法第 23 條",
      text: "工資每月至少定期發給 2 次並應提供各項目計算方式明細；雇主應置備工資清冊保存 5 年。",
      url: lsa("23"),
    },
    {
      label: "勞動基準法第 74 條",
      text: "勞工向雇主或主管機關申訴違法情事，雇主不得因此解僱、降調、減薪或為其他不利處分；主管機關應於 60 日內書面通知處理情形。",
      url: lsa("74"),
    },
  ],
  examples: [
    {
      title: "使用範例：月薪 32,000 元、週六常被叫回公司",
      scenario: "小簡每週六都要回公司半天，薪資單沒有加班費項目，公司說「已含在月薪裡」。",
      steps: [
        "健檢題目「休息日出勤有沒有另外給加班費」答「否」。",
        "對應法條：勞基法第 24 條第 2 項，休息日出勤應另再加給。",
        `下一步：用加班費計算機選擇「休息日」，32,000 元月薪出勤 4 小時，應另再加給約 ${formatMoney(restDayExample.overtimePay)} 元。`,
      ],
      result: "健檢把「感覺不對」變成具體的法條與金額，申訴或協商時更有依據。",
    },
  ],
  mistakes: [
    {
      title: "簽了同意書就不能主張",
      body: "勞動契約或同意書約定低於勞基法標準的部分無效，例如「自願放棄加班費」「特休逾期作廢」，仍可依法主張。",
    },
    {
      title: "怕申訴被報復而不敢查",
      body: "勞基法第 74 條禁止雇主因申訴而不利對待勞工，違反者該處分無效。申訴時可以要求主管機關不透露身分。",
    },
    {
      title: "只靠口頭約定",
      body: "勞資爭議時，書面證據最有力。重要約定請用 Email 或訊息留存，薪資單、打卡紀錄要自己保存一份。",
    },
  ],
  prepare: ["勞動契約或 offer。", "最近 3 至 6 個月薪資單。", "打卡紀錄與排班表。", "勞保局 e 化服務系統的投保紀錄。"],
  readNext: [
    { label: "勞動檢查與申訴指南", href: "/articles/labor-inspection-guide" },
    { label: "勞動契約常見陷阱", href: "/articles/employment-contract-traps" },
    { label: "勞資爭議指南", href: "/guides/disputes" },
  ],
  checkedAt: CHECKED_AT,
};

const disputeChecker: ToolExplainerContent = {
  heading: "勞資爭議檢查器在檢查什麼",
  intro: [
    "選擇爭議類型（薪資、加班、資遣、休假、保險），檢查器會列出這類爭議最常見的違法情形、對應法條、需要準備的證據，以及可以採取的處理管道。目標是讓你在找雇主談、打 1955 或去勞工局之前，先把事實與法律依據整理清楚。",
    "勞資爭議處理法把爭議分成「權利事項」與「調整事項」。個人最常遇到的欠薪、短付加班費、資遣費、特休折現、投保不實，都是權利事項，可以向勞務提供地的縣市主管機關申請調解。調解不收費，由調解人或調解委員會居中協調；調解成立的內容視同雙方之間的契約。",
    "調解不成立時，可以再循勞動事件法向法院提起勞動訴訟，並可依勞資爭議處理法申請訴訟扶助。對於雇主違反勞基法的行為（例如欠薪、未給加班費），也可以同時向勞工局申訴，由勞動檢查認定是否違法並裁罰。",
  ],
  legalBasis: [
    {
      label: "勞資爭議處理法第 5 條",
      text: "權利事項爭議指依法令、團體協約、勞動契約所生的權利義務爭議；調整事項爭議指勞動條件維持或變更的爭議。",
      url: disputes("5"),
    },
    {
      label: "勞資爭議處理法第 9 條、第 11 條",
      text: "向勞務提供地的直轄市或縣（市）主管機關申請調解，可選擇指派調解人或組成調解委員會。",
      url: disputes("9"),
    },
    {
      label: "勞資爭議處理法第 23 條",
      text: "調解成立者，視為爭議雙方當事人間之契約。",
      url: disputes("23"),
    },
    {
      label: "勞資爭議處理法第 6 條",
      text: "權利事項爭議的勞方提起訴訟或仲裁時，中央主管機關得給予適當扶助。",
      url: disputes("6"),
    },
    {
      label: "勞動基準法第 27 條、第 74 條",
      text: "雇主不按期給付工資，主管機關得限期令其給付；勞工申訴不得因此受不利處分。",
      url: lsa("27"),
    },
  ],
  examples: [
    {
      title: "使用範例：公司連續兩個月延遲發薪",
      scenario: "小柯的公司說資金周轉困難，已經兩個月延後 15 天才發薪，第三個月只發一半。",
      steps: [
        "選擇「薪資問題」，檢查器指出：工資應按期全額給付（勞基法第 22、23 條），不按期給付可由主管機關限期令其給付（第 27 條）。",
        "雇主不依約給付工資，勞工可依第 14 條不經預告終止契約，並請求資遣費。",
        "準備證據：薪資單、銀行入帳紀錄、公司延遲發薪的公告或訊息。",
        "管道：先書面要求雇主給付；未改善則向勞工局申訴並申請調解。",
      ],
      result: "把欠薪事實、法條與證據整理好，調解時能直接主張欠薪金額與資遣費。",
    },
  ],
  mistakes: [
    {
      title: "先離職再說",
      body: "依第 14 條離職前，最好先保留證據並以書面說明離職理由與法條。若只說「個人因素」，之後主張資遣費與非自願離職證明會比較困難。",
    },
    {
      title: "調解時沒帶計算依據",
      body: "調解是協商，金額要有依據。用本站的加班費、資遣費、特休計算機先算出金額，並附上薪資單與打卡紀錄，比較容易談成。",
    },
    {
      title: "超過時效才主張",
      body: "工資等請求權有時效限制（民法規定工資類請求權為 5 年）。發現問題後不要拖太久，越早整理證據越好。",
    },
  ],
  prepare: ["爭議發生的時間線。", "薪資單、入帳紀錄、打卡紀錄。", "與主管或人資的訊息、Email。", "勞動契約與工作規則。"],
  readNext: [
    { label: "勞資爭議調解流程", href: "/articles/labor-mediation" },
    { label: "被欠薪怎麼辦", href: "/articles/wage-theft-what-to-do" },
    { label: "公司倒閉時勞工的權益", href: "/articles/company-bankrupt-workers" },
    { label: "勞資爭議指南", href: "/guides/disputes" },
  ],
  checkedAt: CHECKED_AT,
};

const offerA = calculateSalaryBreakdown(48_000, 0, 0);
const offerB = calculateSalaryBreakdown(44_000, 0, 0);
const annualA = offerA.netSalary * 12 + 48_000 * 1;
const annualB = offerB.netSalary * 12 + 44_000 * 3;

const salaryCompare: ToolExplainerContent = {
  heading: "薪資比較器算的是什麼",
  intro: [
    "兩份 offer 只看月薪常會比錯。比較器把月薪、保障年終月數與每月固定津貼都換算成年收入，再扣除勞保、就保、健保自付額，算出兩份工作的「年度實領」，同時列出公司為你負擔的勞健保與 6% 勞退，讓你看到總待遇而不只是帳面數字。",
    "比較時要分清楚「保障」與「看績效」：寫進 offer 或工作規則的保障年薪、固定津貼，屬於公司的給付義務；寫著「視營運發放」的年終或分紅，則不一定拿得到。建議只把保障部分放進比較器，績效獎金另外當作加分。",
    "薪資之外，工時與休假也會影響實際時薪。同樣年薪，若其中一份工作經常需要加班卻沒有加班費，換算後的時薪可能更低；特休天數、通勤時間、遠端工作彈性，也值得一起列入考量。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 2 條第 3 款",
      text: "工資包含工資、薪金及按計時、計日、計月、計件給付的獎金、津貼及其他任何名義的經常性給與。",
      url: lsa("2"),
    },
    {
      label: "勞動基準法第 29 條",
      text: "年終獎金或紅利以營業年度有盈餘且勞工全年無過失為前提，金額由契約或公司制度決定。",
      url: lsa("29"),
    },
    {
      label: "勞動基準法施行細則第 7 條",
      text: "勞動契約應約定工資的議定、調整、計算、結算與給付日期及方法。",
      url: lawArticleUrl(PCODE.laborStandardsRules, "7"),
    },
  ],
  examples: [
    {
      title: "試算範例：月薪 48,000 元年終 1 個月，對比月薪 44,000 元年終 3 個月",
      scenario: "兩份 offer 都寫明保障年終，沒有其他固定津貼。",
      steps: [
        `方案 A 每月實領約 ${formatMoney(offerA.netSalary)} 元，年度實領 ≈ ${formatMoney(offerA.netSalary)} × 12 + 48,000 = ${formatMoney(annualA)} 元。`,
        `方案 B 每月實領約 ${formatMoney(offerB.netSalary)} 元，年度實領 ≈ ${formatMoney(offerB.netSalary)} × 12 + 132,000 = ${formatMoney(annualB)} 元。`,
        "年終也可能被扣補充保費與所得稅，這裡先以稅前金額比較。",
      ],
      result: `雖然方案 A 月薪較高，方案 B 年度實領多約 ${formatMoney(annualB - annualA)} 元；但若年終不是保障的，結論就可能相反。`,
    },
  ],
  mistakes: [
    {
      title: "把「年薪 14 個月」當成保障",
      body: "要看 offer 的原文。寫「保障 14 個月」與「平均 14 個月」意義不同，後者可能因績效或公司營運而減少。",
    },
    {
      title: "忽略加班文化",
      body: "用年度實領除以實際工時算出時薪，才看得出差異。常態加班卻沒有加班費，等於變相降薪。",
    },
    {
      title: "只比較實領、不看雇主負擔",
      body: "雇主負擔的勞退 6% 會進到你的個人專戶。若某公司提繳級距偏低，長期退休金也會少。",
    },
    {
      title: "忽略試用期與調薪條件",
      body: "部分 offer 試用期薪資較低，或約定一年後才調薪。比較年收入時，要把試用期月數、調薪時間與幅度一起放進計算。",
    },
  ],
  prepare: ["兩份 offer 的書面內容。", "固定津貼、年終保障月數與發放條件。", "預估每月加班時數與通勤時間。"],
  readNext: [
    { label: "談薪時可以主張的權益", href: "/articles/salary-negotiation-rights" },
    { label: "年終獎金的法律規定", href: "/articles/year-end-bonus" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  checkedAt: CHECKED_AT,
};

const typhoonMonthly = 40_000;
const typhoonDaily = Math.round(typhoonMonthly / 30);

const typhoon: ToolExplainerContent = {
  heading: "颱風假薪資計算機算的是什麼",
  intro: [
    "颱風天的出勤與工資，主要依勞動部「天然災害發生事業單位勞工出勤管理及工資給付要點」處理。計算機依月薪或時薪算出當日工資，並分別列出「停班仍出勤」與「停班未出勤」兩種情況的權益，以及公司若比照加倍時的參考金額。",
    "要點的保護範圍是：工作地、居住地或上班必經途中，任一轄區首長已宣布停止上班，或因天災造成交通阻斷而無法準時到班。符合時，勞工未出勤不能被視為曠工、遲到，雇主不得強迫請事假或其他假別、要求補班、扣全勤獎金或因此解僱，並「宜」不扣發當日工資。",
    "如果公司因營運需要請勞工停班日照常出勤，應照給當日工資，並「宜」再加給工資，提供交通工具、交通津貼或其他必要協助。要點的「宜」屬勸導性規定，法律並未強制加倍；但颱風日若剛好是休息日或國定假日，或出勤超過 8 小時，就要依勞基法加班規定計算。上下班途中發生事故，屬職業災害者另有公傷病假與職災補償。",
  ],
  legalBasis: [
    {
      label: "勞動部：天然災害勞工出勤說明（113 年 10 月 29 日）",
      text: "任一轄區停止上班時，勞工因天災未出勤，雇主宜不扣發工資，不得視為曠工或扣發全勤獎金；仍需出勤者應照給工資並宜加給。",
      url: MOL_TYPHOON_URL,
    },
    {
      label: "勞動基準法第 24 條、第 39 條",
      text: "颱風日若是休息日或國定假日，出勤仍依休息日加給或國定假日加倍規定計算。",
      url: lsa("24"),
    },
    {
      label: "勞動基準法第 59 條",
      text: "上下班途中發生事故屬職業災害時，雇主應依規定給予職業災害補償。",
      url: lsa("59"),
    },
  ],
  examples: [
    {
      title: `試算範例：月薪 ${formatMoney(typhoonMonthly)} 元，平日遇颱風停班`,
      scenario: "居住地宣布停止上班、公司所在地沒有停班。小葉住在停班區，公司請她照常進辦公室。",
      steps: [
        `一日工資：${formatMoney(typhoonMonthly)} ÷ 30 = ${formatMoney(typhoonDaily)} 元。`,
        `若出勤：當日工資照給 ${formatMoney(typhoonDaily)} 元；公司若比照加倍，另加 ${formatMoney(typhoonDaily)} 元，合計 ${formatMoney(typhoonDaily * 2)} 元（勸導性，非強制）。`,
        "若未出勤：因居住地已停班，不得記曠職或扣全勤；雇主宜照給當日工資。",
      ],
      result: "居住地停班就在要點保護範圍內，不只看公司所在地有沒有放假。",
    },
  ],
  mistakes: [
    {
      title: "以為颱風出勤一定雙倍",
      body: "要點寫的是雇主「宜」加給，不是法定加倍。實際有沒有加給，要看工作規則、團體協約或公司公告；若公司有承諾，就應依承諾給付。",
    },
    {
      title: "只看公司所在地有沒有放假",
      body: "工作地、居住地或上班必經途中任一地停班就適用要點。跨縣市通勤的人，最容易在這點被誤解。",
    },
    {
      title: "颱風假被要求補班或扣全勤",
      body: "符合要點保護範圍時，雇主不得強迫補行工作、扣全勤獎金，也不得要求改請事假或特休。",
    },
  ],
  prepare: ["各地政府停班公告截圖（工作地、居住地、通勤路線）。", "公司颱風天出勤規定或主管通知。", "出勤時的打卡紀錄與交通費收據。"],
  readNext: [
    { label: "國定假日出勤怎麼算", href: "/articles/holiday-overtime-complete" },
    { label: "加班費計算機", href: "/tools/overtime" },
    { label: "職災發生後怎麼辦", href: "/articles/work-injury-guide" },
  ],
  checkedAt: CHECKED_AT,
};

export const RIGHTS_EXPLAINERS: Record<string, ToolExplainerContent> = {
  "rights-check": rightsCheck,
  "dispute-checker": disputeChecker,
  "salary-compare": salaryCompare,
  typhoon,
};
