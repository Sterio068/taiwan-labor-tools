/**
 * 台灣勞動法規常數
 * 最後更新：115年(2026年) 1月1日起適用
 *
 * 每年 1 月需更新：基本工資、費率、級距表
 */

export const LABOR_CONSTANTS = {
  year: 2026,

  // 基本工資
  minimumMonthlyWage: 29_500,
  minimumHourlyWage: 196,

  // 月薪制每小時工資計算基礎
  monthlyWorkHours: 240, // 30 天 × 8 小時（勞基法施行細則第 7 條）

  // 勞保費率（含就保 1%）
  laborInsuranceRate: 0.125,
  laborInsuranceWorkerShare: 0.2,
  laborInsuranceEmployerShare: 0.7,
  laborInsuranceGovShare: 0.1,
  employmentInsuranceRate: 0.01, // 就保費率（內含於勞保費率）

  // 健保費率
  nhiRate: 0.0517,
  nhiWorkerShare: 0.3,
  nhiEmployerShare: 0.6,
  nhiGovShare: 0.1,
  nhiAverageDependentCount: 0.56, // 投保單位負擔平均眷口數，113 年 1 月 1 日起
  nhiDependentMultiplier: 1, // 眷屬人數上限 3 口

  // 勞退
  laborPensionEmployerRate: 0.06,
  laborPensionWorkerMaxRate: 0.06,

  // 加班費倍率（勞基法第 24 條）
  overtimeRates: {
    weekday: { first2h: 4 / 3, after2h: 5 / 3 },
    restDay: { first2h: 4 / 3, after2h: 5 / 3 }, // 休息日另有工時計算
    holiday: { rate: 2 }, // 國定假日、例假日
  },

  // 休息日加班工時計算（勞基法第 24 條第 2 項）
  restDayMinHours: {
    first: 4, // 前 4 小時以 4 小時計
    second: 8, // 超過 4 小時以 8 小時計
    max: 12, // 超過 8 小時以 12 小時計
  },

  // 特休天數（勞基法第 38 條）
  annualLeave: [
    { minMonths: 6, maxMonths: 12, days: 3 },
    { minYears: 1, maxYears: 2, days: 7 },
    { minYears: 2, maxYears: 3, days: 10 },
    { minYears: 3, maxYears: 5, days: 14 },
    { minYears: 5, maxYears: 10, days: 15 },
    { minYears: 10, maxYears: Infinity, daysBase: 15, extraPerYear: 1, maxDays: 30 },
  ],

  // 資遣費
  severanceNewSystem: 0.5, // 新制：每滿 1 年 = 0.5 個月，上限 6 個月
  severanceNewSystemMax: 6, // 上限 6 個月
  severanceOldSystem: 1.0, // 舊制：每滿 1 年 = 1 個月

  // 預告期間（勞基法第 16 條）
  noticePeriod: [
    { minYears: 0, maxYears: 0.25, minMonths: 3, days: 0 },
    { minYears: 0.25, maxYears: 1, days: 10 },
    { minYears: 1, maxYears: 3, days: 20 },
    { minYears: 3, maxYears: Infinity, days: 30 },
  ],

  // 勞保投保薪資級距表（2026 年）
  laborInsuranceBrackets: [
    29_500, 30_300, 31_800, 33_300, 34_800,
    36_300, 38_200, 40_100, 42_000, 43_900, 45_800,
  ],

  // 勞退月提繳分級表
  pensionBrackets: [
    1_500, 3_000, 4_500, 6_000, 7_500, 8_700, 9_900,
    11_100, 12_540, 13_500, 15_000, 16_500, 18_300,
    19_200, 20_100, 21_000, 21_900, 22_800, 24_000,
    25_200, 26_400, 27_600, 28_800, 29_500, 30_300,
    31_800, 33_300, 34_800, 36_300, 38_200, 40_100,
    42_000, 43_900, 45_800, 48_200, 50_600, 53_000,
    55_400, 57_800, 60_800, 63_800, 66_800, 69_800,
    72_800, 76_500, 80_200, 83_900, 87_600, 92_100,
    96_600, 101_100, 105_600, 110_100, 115_500,
    120_900, 126_300, 131_700, 137_100, 142_500,
    147_900, 150_000,
  ],

  // 健保投保金額表（一般被保險人常用級距）
  nhiBrackets: [
    29_500, 30_300, 31_800, 33_300, 34_800,
    36_300, 38_200, 40_100, 42_000, 43_900, 45_800,
    48_200, 50_600, 53_000, 55_400, 57_800,
    60_800, 63_800, 66_800, 69_800, 72_800,
    76_500, 80_200, 83_900, 87_600, 92_100,
    96_600, 101_100, 105_600, 110_100, 115_500,
    120_900, 126_300, 131_700, 137_100, 142_500,
    147_900, 150_000, 156_400, 162_800, 169_200,
    175_600, 182_000, 189_500, 197_000, 219_500,
  ],
} as const;

/** 所有工具的靜態資訊 */
export const TOOLS: {
  name: string;
  description: string;
  href: string;
  icon: string;
  keywords: string[];
}[] = [
  {
    name: "薪資明細計算機",
    description: "輸入月薪，立即算出勞健保扣款、勞退提繳與實領金額",
    href: "/tools/salary",
    icon: "calculator",
    keywords: ["薪資計算", "實領薪水", "勞健保扣多少"],
  },
  {
    name: "加班費計算機",
    description: "依勞基法第 24 條，計算平日、休息日、國定假日加班費",
    href: "/tools/overtime",
    icon: "clock",
    keywords: ["加班費計算", "加班費怎麼算"],
  },
  {
    name: "資遣費計算機",
    description: "輸入年資與月薪，算出新制或舊制資遣費",
    href: "/tools/severance",
    icon: "briefcase",
    keywords: ["資遣費計算", "資遣費多少"],
  },
  {
    name: "特休天數計算",
    description: "依勞基法第 38 條，輸入到職日算出特休天數",
    href: "/tools/annual-leave",
    icon: "calendar",
    keywords: ["特休幾天", "年假計算"],
  },
  {
    name: "勞健保保費計算",
    description: "查詢投保級距，計算勞保、健保自付額與雇主負擔",
    href: "/tools/insurance-premium",
    icon: "shield",
    keywords: ["勞保自付額", "健保費計算"],
  },
  {
    name: "勞退退休金試算",
    description: "估算勞退新制帳戶累積金額與每月退休金",
    href: "/tools/pension",
    icon: "piggy-bank",
    keywords: ["勞退試算", "退休金多少"],
  },
  // Phase 2
  {
    name: "時薪月薪換算",
    description: "時薪轉月薪、月薪轉時薪，打工族必備",
    href: "/tools/hourly-monthly",
    icon: "arrows",
    keywords: ["時薪換算月薪", "月薪換時薪"],
  },
  {
    name: "產假育嬰假計算",
    description: "產假、陪產假、育嬰留停天數與勞保給付試算",
    href: "/tools/maternity",
    icon: "heart",
    keywords: ["產假幾天", "育嬰留停", "陪產假"],
  },
  {
    name: "職災給付計算",
    description: "職業災害補償金額概算，含雇主責任與勞保給付",
    href: "/tools/work-injury",
    icon: "alert",
    keywords: ["職災賠償", "工傷補助"],
  },
  {
    name: "投保級距查詢",
    description: "輸入月薪，查詢勞保、健保、勞退三種投保級距",
    href: "/tools/insurance-bracket",
    icon: "table",
    keywords: ["勞保級距表", "投保級距"],
  },
  {
    name: "年終獎金計算",
    description: "依在職月數計算年終獎金，含未滿一年比例計算",
    href: "/tools/bonus",
    icon: "gift",
    keywords: ["年終怎麼算", "年終獎金"],
  },
  {
    name: "離職預告期計算",
    description: "依年資計算離職需提前幾天預告，附建議最後工作日",
    href: "/tools/notice-period",
    icon: "log-out",
    keywords: ["離職預告", "離職提前幾天"],
  },
  // Phase 3
  {
    name: "勞工權益健檢",
    description: "回答幾個問題，檢查你的勞動條件是否合法",
    href: "/tools/rights-check",
    icon: "check-circle",
    keywords: ["勞基法", "被壓榨"],
  },
  {
    name: "薪資比較器",
    description: "比較不同工作 offer 的實際待遇（含福利換算）",
    href: "/tools/salary-compare",
    icon: "bar-chart",
    keywords: ["薪水比較", "offer 比較"],
  },
  {
    name: "勞資爭議檢查器",
    description: "描述你的狀況，看看老闆可能違反了哪些法規",
    href: "/tools/dispute-checker",
    icon: "search",
    keywords: ["老闆違法", "勞資爭議"],
  },
  {
    name: "退休年齡規劃",
    description: "綜合勞保老年給付與勞退，規劃你的退休時間",
    href: "/tools/retirement-planner",
    icon: "sunset",
    keywords: ["幾歲退休", "退休規劃"],
  },
  {
    name: "颱風假薪資計算機",
    description: "颱風出勤雙倍工資怎麼算？一秒計算應得補償金額。",
    href: "/tools/typhoon",
    icon: "shield",
    keywords: ["颱風假薪資", "颱風出勤加倍", "颱風假不能扣薪"],
  },
];
