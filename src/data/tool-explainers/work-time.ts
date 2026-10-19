import { LABOR_CONSTANTS } from "@/data/constants";
import { calculateAnnualLeave } from "@/lib/calculations/annual-leave";
import { hourlyToMonthly, monthlyToHourly } from "@/lib/calculations/hourly-convert";
import { calculateOvertime } from "@/lib/calculations/overtime";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";
import { CHECKED_AT, lawArticleUrl, PCODE, type ToolExplainerContent } from "./types";

const TAICHUNG_FAQ_URL = encodeURI(
  "https://www.labor.taichung.gov.tw/media/1351846/勞動基準法修正案常見問答集1141125.pdf",
);
const MOL_HOURLY_BASE_URL = "https://www.mol.gov.tw/1607/1632/1640/20597/";
const MOL_MINIMUM_WAGE_URL = "https://www.mol.gov.tw/1607/1632/1633/84947/";

const lsa = (article: string) => lawArticleUrl(PCODE.laborStandards, article);

const weekday = calculateOvertime(36_000, 3, "weekday");
const restDay = calculateOvertime(36_000, 6, "rest-day");
const holiday = calculateOvertime(45_000, 2, "holiday");
const holidayDailyWage = Math.round(45_000 / 30);

const overtime: ToolExplainerContent = {
  heading: "加班費計算機算的是什麼",
  intro: [
    "這個計算機先把月薪換算成「平日每小時工資額」（月薪 ÷ 30 ÷ 8），再套用勞基法第 24 條、第 39 條與第 40 條的加給標準，估算一次出勤應另外拿到多少加班費。它適合月薪制勞工核對薪資單上的加班費或延長工時工資，也能在公司提出「只能補休」「休息日做 1 小時只給 1 小時」之類說法時，先算出法定最低金額。",
    "加班費是否成立，看的是雇主是否要求或知悉並同意你在正常工時以外工作，而不是名稱叫「加班」或「自願留下」。勞基法第 30 條規定正常工時每日不超過 8 小時、每週不超過 40 小時；超過的部分就是延長工作時間，連同正常工時一天最多 12 小時，延長工時每月原則上不得超過 46 小時。",
    "時薪基數應以經常性給與計算，例如本薪、職務加給、固定津貼與全勤獎金；年終獎金、三節節金等非經常性給與依勞基法施行細則第 10 條不列入。若公司把一部分月薪標成「固定加班費」，仍要用實際加班時數回推，確認是否足額。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 24 條",
      text: "平日延長工時前 2 小時加給 1/3 以上、再 2 小時加給 2/3 以上；休息日工作 2 小時以內另再加給 1⅓ 以上，之後另再加給 1⅔ 以上。",
      url: lsa("24"),
    },
    {
      label: "勞動基準法第 32 條",
      text: "正常工時連同延長工時一日不得超過 12 小時，延長工時每月不得超過 46 小時；經工會或勞資會議同意可調整為每月 54 小時、每 3 個月 138 小時。",
      url: lsa("32"),
    },
    {
      label: "勞動基準法第 32 條之 1",
      text: "加班或休息日出勤後，須由勞工選擇補休並經雇主同意；補休時數依工作時數計算，期限屆滿或離職時未休完要折發工資。",
      url: lsa("32-1"),
    },
    {
      label: "勞動基準法第 39 條、第 40 條",
      text: "國定假日經勞工同意出勤，工資加倍發給；例假只有天災、事變或突發事件才可停止，工資加倍並應事後補假。",
      url: lsa("39"),
    },
    {
      label: "勞動部 107 年 9 月 14 日說明",
      text: "月薪除以 30 得一日工資、再除以 8 得平日每小時工資額，作為加班費計算基礎。",
      url: MOL_HOURLY_BASE_URL,
    },
    {
      label: "臺中市政府勞工局《因應勞動基準法修正常見問答集》（114.11.13 版）",
      text: "休息日出勤依實際時數覈實計算，並以時薪 150 元示範出勤 1、6、10 小時的加給金額。",
      url: TAICHUNG_FAQ_URL,
    },
  ],
  examples: [
    {
      title: "試算範例一：月薪 36,000 元，平日加班 3 小時",
      scenario: "小陳週三下班後被主管要求留下處理出貨，打卡紀錄顯示比正常下班晚 3 小時。",
      steps: [
        `平日每小時工資額：36,000 ÷ 30 ÷ 8 = ${formatMoney(weekday.hourlyBase)} 元。`,
        `前 2 小時：${formatMoney(weekday.hourlyBase)} × 4/3 × 2 = ${formatMoney(weekday.breakdown[0].pay)} 元。`,
        `第 3 小時：${formatMoney(weekday.hourlyBase)} × 5/3 × 1 = ${formatMoney(weekday.breakdown[1].pay)} 元。`,
      ],
      result: `平日加班 3 小時，應另給加班費 ${formatMoney(weekday.overtimePay)} 元。`,
    },
    {
      title: "試算範例二：同一人週六（休息日）出勤 6 小時",
      scenario: "公司採週休二日，週六為休息日、週日為例假。小陳週六被叫回公司盤點 6 小時。",
      steps: [
        `第 1–2 小時：150 × 1⅓ × 2 = ${formatMoney(restDay.breakdown[0].pay)} 元。`,
        `第 3–6 小時：150 × 1⅔ × 4 = ${formatMoney(restDay.breakdown[1].pay)} 元。`,
        "月薪已包含休息日當天的工資，所以上面是「另再加給」的金額，與臺中市勞工局問答的 1,400 元一致。",
        "若誤用 107 年 3 月 1 日已刪除的「4/8/12 小時」規則，6 小時會被當成 8 小時，得到 1,900 元，這是舊法算法。",
      ],
      result: `休息日出勤 6 小時，應另再加給 ${formatMoney(restDay.overtimePay)} 元，6 小時也要計入每月 46 小時的加班上限。`,
    },
    {
      title: "試算範例三：月薪 45,000 元，國定假日只上班 2 小時",
      scenario: "公司請同仁在勞動節回來支援 2 小時。",
      steps: [
        `一日工資：45,000 ÷ 30 = ${formatMoney(holidayDailyWage)} 元。`,
        "勞動部說明：國定假日出勤 8 小時以內，雇主應在原月薪之外再加給 1 日工資，不按實際出勤時數打折。",
      ],
      result: `國定假日出勤 2 小時，月薪之外應加給 ${formatMoney(holiday.overtimePay)} 元；超過 8 小時的部分再依第 24 條第 1 項計算。`,
    },
  ],
  mistakes: [
    {
      title: "沿用已刪除的休息日 4/8/12 小時規則",
      body: "106 年施行的版本曾規定休息日工作不滿 4 小時以 4 小時計，但 107 年 3 月 1 日修法後已改為覈實計算。現在休息日做多少小時就算多少小時，只是倍率比平日高；網路上仍有不少舊文章引用舊規定。",
    },
    {
      title: "只用底薪算時薪基數",
      body: "勞基法第 2 條的工資包含經常性給與。若每月固定領的職務加給、伙食津貼或全勤獎金被排除在時薪基數之外，每小時加班費會被低估。拿薪資單逐項核對，固定且每月都有的項目原則上都要算進去。",
    },
    {
      title: "未經勞工選擇就直接改成補休",
      body: "補休必須由勞工選擇並經雇主同意，補休時數按實際工作時數 1:1 換算；公司不能單方面規定「加班一律補休」，補休期限到了沒休完，還要依加班當日的標準折發工資。",
    },
    {
      title: "把「責任制」當成不用給加班費的理由",
      body: "責任制（勞基法第 84 條之 1）只適用勞動部核定公告的職務，還要有書面約定並報地方主管機關核備。只是職稱掛「主管」或薪資單寫「責任制」，仍適用一般工時與加班費規定。",
    },
    {
      title: "國定假日只上班幾小時就按時數給",
      body: "國定假日出勤 8 小時以內，月薪制勞工應另加給 1 日工資。上班 2 小時與 8 小時，加給金額相同；若公司只給 2 小時的雙倍時薪，金額通常不足。",
    },
  ],
  prepare: [
    "打卡紀錄、排班表或門禁紀錄，確認每天實際下班時間。",
    "主管指派工作的訊息、Email 或工作群組紀錄，證明公司知悉加班。",
    "近 6 個月薪資單，列出哪些是每月固定領取的經常性給與。",
    "工作規則中的加班申請、補休期限與國定假日調移規定。",
  ],
  readNext: [
    { label: "加班費計算範例：平日、休息日、國定假日一次看", href: "/articles/overtime-calculation-examples" },
    { label: "加班費還是補休？勞工可以選擇嗎", href: "/articles/overtime-pay-vs-compensatory-leave" },
    { label: "責任制合法嗎？", href: "/articles/exempt-employee" },
    { label: "加班費完整指南", href: "/guides/overtime" },
  ],
  checkedAt: CHECKED_AT,
};

const leaveExample = calculateAnnualLeave(
  new Date("2023-03-01T00:00:00+08:00"),
  new Date("2026-03-02T00:00:00+08:00"),
);
const tenYearExample = calculateAnnualLeave(
  new Date("2016-01-01T00:00:00+08:00"),
  new Date("2026-01-02T00:00:00+08:00"),
);
const unusedDays = 5;
const unusedDailyWage = Math.round(42_000 / 30);

const annualLeave: ToolExplainerContent = {
  heading: "特休天數計算機算的是什麼",
  intro: [
    "輸入到職日，計算機依勞基法第 38 條的年資級距，算出你目前這一個特休年度應有的特別休假天數，並列出下一個級距何時到。特休是勞工在同一雇主繼續工作滿一定期間後取得的法定權利，不是公司福利，也不需要公司「核准才有」。",
    "公司可以採週年制（從到職日起算）、曆年制或會計年度制給假，但任何制度換算下來都不能少於法定天數。地方勞工主管機關的問答也提醒，即使約定採曆年制，仍應以勞工到職日作為結算特休天數的區間，不能讓勞工因為制度轉換而少拿。",
    "特休原則上由勞工排定日期，雇主只有在企業經營有急迫需求時才能與勞工協商調整。年度終結或離職時沒休完的天數，雇主應依「最近一個月正常工作時間工資 ÷ 30」折算工資發給；雙方也可以協商遞延到下一年度，但遞延後仍沒休完，一樣要折發。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 38 條",
      text: "滿 6 個月 3 日、滿 1 年 7 日、滿 2 年 10 日、滿 3 年 14 日、滿 5 年 15 日；10 年以上每 1 年加給 1 日，加至 30 日為止。未休日數應發給工資。",
      url: lsa("38"),
    },
    {
      label: "勞動基準法施行細則第 24 條之 1",
      text: "未休特休工資按未休日數乘以一日工資計發；月薪制一日工資為年度終結或離職前最近一個月正常工作時間工資除以 30。",
      url: lawArticleUrl(PCODE.laborStandardsRules, "24-1"),
    },
    {
      label: "勞動基準法第 39 條",
      text: "特別休假期間工資由雇主照給，不能因為請特休而扣全勤或減薪。",
      url: lsa("39"),
    },
  ],
  examples: [
    {
      title: "試算範例一：2023 年 3 月 1 日到職，2026 年 3 月起有幾天？",
      scenario: "小林在同一家公司連續任職，2026 年 3 月 1 日剛好滿 3 年。",
      steps: [
        "滿 6 個月（2023/9/1）：3 天。",
        "滿 1 年（2024/3/1）：7 天；滿 2 年（2025/3/1）：10 天。",
        "滿 3 年（2026/3/1）起進入「3 年以上 5 年未滿」級距。",
      ],
      result: `2026/3/1 起的特休年度應有 ${leaveExample.days} 天，直到滿 5 年才會變成 15 天。`,
    },
    {
      title: "試算範例二：滿 10 年是 15 天還是 16 天？",
      scenario: "老王 2016 年 1 月 1 日到職，2026 年 1 月 1 日滿 10 年。",
      steps: [
        "5 年以上 10 年未滿：每年 15 天。",
        "第 38 條第 1 項第 6 款：10 年以上者，每 1 年加給 1 日。",
      ],
      result: `滿 10 年應有 ${tenYearExample.days} 天，之後每多 1 年加 1 天，滿 24 年達到 30 天上限。`,
    },
    {
      title: "試算範例三：離職時還有 5 天特休沒休",
      scenario: `小林月薪 42,000 元，離職時還有 ${unusedDays} 天特休未休。`,
      steps: [
        `一日工資：42,000 ÷ 30 = ${formatMoney(unusedDailyWage)} 元。`,
        `未休工資：${formatMoney(unusedDailyWage)} × ${unusedDays} = ${formatMoney(unusedDailyWage * unusedDays)} 元。`,
      ],
      result: `離職時應折發 ${formatMoney(unusedDailyWage * unusedDays)} 元，不能以「特休逾期作廢」為由不給。`,
    },
  ],
  mistakes: [
    {
      title: "未滿 1 年就說沒有特休",
      body: "到職滿 6 個月就有 3 天特休。不少公司只在滿週年才給 7 天，跳過前面的 3 天，這是常見短給。",
    },
    {
      title: "年底沒休完就歸零",
      body: "未休特休必須折發工資，或經雙方協商遞延到下一年度。工作規則寫「逾期作廢」並不能免除雇主的給付義務。",
    },
    {
      title: "滿 10 年仍給 15 天",
      body: "法條寫「10 年以上者，每 1 年加給 1 日」，滿 10 年就是 16 天。部分試算表把加給算到滿 11 年才開始，會少 1 天。",
    },
    {
      title: "請特休被扣全勤獎金",
      body: "特休期間工資照給，屬於法定休假。以請特休為由扣全勤獎金或考績，容易被認定為不利處分。",
    },
  ],
  prepare: [
    "勞動契約或在職證明上的到職日。",
    "公司特休制度採週年制、曆年制或其他年度區間。",
    "薪資單上每年特休未休天數與折發金額的紀錄（勞基法第 38 條第 5 項要求雇主書面通知）。",
  ],
  readNext: [
    { label: "2026 特休天數表與排休規則", href: "/articles/annual-leave-2026" },
    { label: "到職滿半年的 3 天特休", href: "/articles/annual-leave-after-6months" },
    { label: "特休被拒怎麼辦", href: "/articles/annual-leave-refused" },
    { label: "請假與特休完整指南", href: "/guides/leave" },
  ],
  checkedAt: CHECKED_AT,
};

const minimumMonthlyAsHourly = monthlyToHourly(LABOR_CONSTANTS.minimumMonthlyWage);
const minimumHourlyAsMonthly = hourlyToMonthly(LABOR_CONSTANTS.minimumHourlyWage, 8, 22);
const sampleHourly = monthlyToHourly(42_000);

const hourlyMonthly: ToolExplainerContent = {
  heading: "時薪月薪換算器算的是什麼",
  intro: [
    "這個換算器做兩件事：月薪換時薪時，依勞動部說明用「月薪 ÷ 30 ÷ 8」算出平日每小時工資額，這也是加班費、請假扣薪的計算基礎；時薪換月薪時，用「時薪 × 每日工時 × 每月出勤天數」估算一個月大約能領多少，方便比較打工與正職 offer。",
    `2026 年最低工資為月薪 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元、時薪 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)} 元。兩者不能直接互換：月最低工資換算成每小時約 ${formatMoneyDecimal(minimumMonthlyAsHourly.hourlySalary)} 元，低於時薪最低工資，原因是時薪最低工資審議時，已把按時計酬者例假與休息日應得的工資納入，所以時薪制不會再另外領例假、休息日工資。`,
    "部分工時（兼職、工讀）同樣適用勞基法，加班費、國定假日出勤加倍、特休與勞健保都有保障。時薪制勞工休息日出勤，即使當週工時未滿 40 小時，仍要依休息日加給標準計算。",
  ],
  legalBasis: [
    {
      label: "最低工資法第 4 條、第 5 條",
      text: "最低工資分為每月與每小時兩種；勞雇議定的工資不得低於最低工資，低於者以最低工資為準。",
      url: lawArticleUrl(PCODE.minimumWage, "5"),
    },
    {
      label: "勞動部 115 年最低工資調整公告",
      text: `自 2026 年 1 月 1 日起，月最低工資 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元、時最低工資 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)} 元。`,
      url: MOL_MINIMUM_WAGE_URL,
    },
    {
      label: "勞動部 107 年 9 月 14 日說明",
      text: "月薪 ÷ 30 為一日工資、再 ÷ 8 為平日每小時工資額。",
      url: MOL_HOURLY_BASE_URL,
    },
    {
      label: "臺中市政府勞工局常見問答",
      text: "按時計酬者的例假及休息日工資已納入時薪最低工資計算，未出勤毋須再加給；休息日出勤仍依加給標準計算。",
      url: TAICHUNG_FAQ_URL,
    },
  ],
  examples: [
    {
      title: "試算範例一：月薪 42,000 元換算時薪",
      scenario: "想知道請 1 小時事假會被扣多少、加班 1 小時的基數是多少。",
      steps: [
        `一日工資：42,000 ÷ 30 = ${formatMoney(sampleHourly.dailySalary)} 元。`,
        `平日每小時工資額：${formatMoney(sampleHourly.dailySalary)} ÷ 8 = ${formatMoney(sampleHourly.hourlySalary)} 元。`,
      ],
      result: `時薪基數 ${formatMoney(sampleHourly.hourlySalary)} 元；平日加班前 2 小時每小時至少 ${formatMoney(sampleHourly.hourlySalary * 4 / 3)} 元。`,
    },
    {
      title: "試算範例二：時薪 196 元，每天 8 小時、每月 22 天",
      scenario: "比較全職打工與月薪工作的收入差距。",
      steps: [
        `一日工資：196 × 8 = ${formatMoney(minimumHourlyAsMonthly.dailySalary)} 元。`,
        `每月估算：${formatMoney(minimumHourlyAsMonthly.dailySalary)} × 22 = ${formatMoney(minimumHourlyAsMonthly.monthlySalary)} 元。`,
        "實際天數依排班而定，國定假日放假是否有薪、是否投保勞健保，都會影響實領。",
      ],
      result: `估算月收入約 ${formatMoney(minimumHourlyAsMonthly.monthlySalary)} 元，再扣除勞健保自付額才是實領。`,
    },
  ],
  mistakes: [
    {
      title: "用 2026 月最低工資推算時薪低於 196 元",
      body: `29,500 ÷ 240 約 ${formatMoneyDecimal(minimumMonthlyAsHourly.hourlySalary)} 元，只能用來算月薪制的加班與請假基數；按時計酬的工作，每小時不得低於 196 元。`,
    },
    {
      title: "把月薪 ÷ 22 天當成日薪",
      body: "依勞動部說明，月薪制一日工資以 30 天計算。用 22 個工作天去除，會讓請假扣薪變多、與法定算法不一致。",
    },
    {
      title: "兼職就不投保勞健保",
      body: "部分工時勞工與全職勞工一樣，雇主應依勞工保險、就業保險、職業災害保險與勞工退休金相關規定辦理加保與提繳；工時短不是不保的理由。",
    },
  ],
  prepare: ["勞動契約約定的計薪方式（月薪、日薪或時薪）。", "近一個月排班表與實際出勤時數。", "薪資單上的加給與扣款項目。"],
  readNext: [
    { label: "2026 時薪最低工資 196 元說明", href: "/articles/minimum-wage-hourly-2026" },
    { label: "兼職打工的勞動權益", href: "/articles/part-time-rights" },
    { label: "月薪制與時薪制比較", href: "/compare/monthly-vs-hourly" },
    { label: "最低工資總整理", href: "/minimum-wage" },
  ],
  checkedAt: CHECKED_AT,
};

export const WORK_TIME_EXPLAINERS: Record<string, ToolExplainerContent> = {
  overtime,
  "annual-leave": annualLeave,
  "hourly-monthly": hourlyMonthly,
};
