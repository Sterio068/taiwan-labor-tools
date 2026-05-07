import type { RelatedLink } from "@/data/tool-related";

export interface ToolScenario {
  label: string;
  href: string;
  description: string;
}

export interface ToolGuidance {
  title: string;
  summary: string;
  formula: string[];
  useCases: string[];
  limitations: string[];
  mistakes: string[];
  sourceTopics: string[];
  nextSteps: RelatedLink[];
  presets?: ToolScenario[];
}

export const TOOL_GUIDANCE: Record<string, ToolGuidance> = {
  salary: {
    title: "薪資明細計算機",
    summary:
      "用投保級距、勞保費率、健保費率與勞退提繳規則估算每月實領薪資。",
    formula: [
      "實領薪資 = 稅前月薪 - 勞保自付額 - 健保自付額 - 勞退自提 - 所得稅預扣",
      "勞保自付額 = 勞保投保薪資級距 × 勞保費率 × 勞工負擔比例",
      "健保自付額 = 健保投保金額 × 健保費率 × 30% × (本人 + 眷屬人數)",
      "健保雇主負擔 = 健保投保金額 × 5.17% × 60% × (1 + 平均眷口數)",
      "雇主勞退提繳 = 勞退月提繳工資 × 6%，不得從工資扣除",
    ],
    useCases: ["核對每月薪資單", "比較 offer 實領差異", "估算眷屬加保後的健保扣款"],
    limitations: ["未納入個人所得稅特殊扣除額", "獎金、補充保費、非經常性給與需另行判斷"],
    mistakes: ["直接用月薪乘費率，忽略投保級距", "把雇主 6% 勞退誤以為從薪水扣", "忘記健保眷屬最多計三口"],
    sourceTopics: ["salary", "insurance", "pension"],
    nextSteps: [
      { label: "下載薪資單檢查表", href: "/checklists#salary-slip" },
      { label: "閱讀薪資完全指南", href: "/guides/salary" },
      { label: "查投保級距", href: "/tools/insurance-bracket" },
    ],
    presets: [
      { label: "月薪 30,000", href: "/tools/salary?m=30000&d=0&s=0", description: "入門月薪實領試算" },
      { label: "月薪 45,000", href: "/tools/salary?m=45000&d=0&s=0", description: "常見上班族薪資" },
      { label: "月薪 60,000 + 自提 6%", href: "/tools/salary?m=60000&d=0&s=6", description: "估算節稅與實領差異" },
    ],
  },
  overtime: {
    title: "加班費計算機",
    summary:
      "依平日、休息日、國定假日與例假日不同規則，估算應領加班費。",
    formula: [
      "月薪制時薪基數 = 月薪 ÷ 30 ÷ 8",
      "平日前 2 小時 = 時薪基數 × 4/3；第 3 小時起 = 時薪基數 × 5/3",
      "休息日加班需套用 4/8/12 小時計薪規則",
      "國定假日出勤原則上工資加倍",
    ],
    useCases: ["核對加班費", "估算休息日出勤報酬", "判斷責任制或無加班費說法是否合理"],
    limitations: ["實際加班認定仍需出勤紀錄、排班表與公司制度佐證", "變形工時或特殊行業需另行確認"],
    mistakes: ["把休息日實際 1 小時只算 1 小時", "把底薪當作唯一加班費基數", "誤以為責任制就完全沒有加班費"],
    sourceTopics: ["overtime", "salary"],
    nextSteps: [
      { label: "下載加班自保清單", href: "/checklists#overtime" },
      { label: "閱讀加班費完整指南", href: "/guides/overtime" },
      { label: "檢查勞工權益", href: "/tools/rights-check" },
    ],
    presets: [
      { label: "月薪 45,000 平日 2 小時", href: "/tools/overtime?w=45000&h=2&ot=weekday", description: "最常見加班情境" },
      { label: "月薪 45,000 休息日 4 小時", href: "/tools/overtime?w=45000&h=4&ot=rest-day", description: "套用休息日最低計薪" },
      { label: "月薪 29,500 國定假日 8 小時", href: "/tools/overtime?w=29500&h=8&ot=holiday", description: "月最低工資假日出勤" },
    ],
  },
  severance: {
    title: "資遣費計算機",
    summary:
      "用離職前 6 個月平均工資與年資，估算新制或舊制資遣費。",
    formula: [
      "新制資遣費 = 平均月薪 × 年資 × 0.5，上限 6 個月",
      "舊制資遣費 = 平均月薪 × 年資",
      "平均工資通常以事由發生前 6 個月工資總額換算",
    ],
    useCases: ["被資遣時估算應領金額", "核對資遣協議", "評估非自願離職後下一步"],
    limitations: ["平均工資是否納入獎金與津貼需依個案判斷", "舊制/新制銜接年資可能需分段計算"],
    mistakes: ["只用底薪計算平均工資", "忘記預告工資與未休特休折現", "沒有索取非自願離職證明"],
    sourceTopics: ["severance", "pension", "unemployment"],
    nextSteps: [
      { label: "下載資遣自保清單", href: "/checklists#severance" },
      { label: "閱讀離職資遣指南", href: "/guides/severance" },
      { label: "試算離職預告期", href: "/tools/notice-period" },
    ],
  },
  "annual-leave": {
    title: "特休天數計算",
    summary:
      "依到職日與年資估算法定特別休假天數，協助核對週年制或曆年制。",
    formula: [
      "滿 6 個月至未滿 1 年：3 天",
      "滿 1 年：7 天；滿 2 年：10 天；滿 3 年：14 天；滿 5 年：15 天",
      "滿 10 年後每年加 1 天，最高 30 天",
    ],
    useCases: ["核對公司特休表", "離職前估算未休折現", "規劃年度休假"],
    limitations: ["公司可採週年制或曆年制，但不得低於法定天數", "特休排定與遞延需看公司制度與勞資協議"],
    mistakes: ["到職滿 6 個月沒有給 3 天", "未休特休被直接歸零", "雇主單方面拒絕特休排定"],
    sourceTopics: ["leave"],
    nextSteps: [
      { label: "閱讀特休與請假指南", href: "/guides/leave" },
      { label: "下載離職檢查表", href: "/checklists#resignation" },
      { label: "查看特休完整文章", href: "/articles/annual-leave-2026" },
    ],
  },
  "insurance-premium": {
    title: "勞健保保費計算",
    summary:
      "依勞保、健保投保級距與負擔比例估算勞工自付額與雇主成本。",
    formula: [
      "勞保費 = 勞保投保薪資 × 勞保費率 × 負擔比例",
      "健保費 = 健保投保金額 × 5.17% × 負擔比例 × 眷屬口數",
      "投保單位健保負擔另乘平均眷口數 0.56",
    ],
    useCases: ["核對薪資單保費", "檢查雇主是否低報", "估算眷屬加保影響"],
    limitations: ["補充保費、職災費率與特殊身分負擔比例需另行確認"],
    mistakes: ["忽略勞保與健保上限不同", "未用級距表", "低報投保薪資影響未來給付"],
    sourceTopics: ["insurance", "nhi", "labor-insurance"],
    nextSteps: [
      { label: "查投保級距", href: "/tools/insurance-bracket" },
      { label: "閱讀勞健保攻略", href: "/guides/insurance" },
      { label: "下載薪資單檢查表", href: "/checklists#salary-slip" },
    ],
  },
  pension: {
    title: "勞退退休金試算",
    summary:
      "估算雇主 6% 提繳與自願提繳在長期退休帳戶中的累積效果。",
    formula: [
      "雇主提繳 = 月提繳工資 × 6%",
      "自願提繳 = 月提繳工資 × 0-6%",
      "退休金帳戶 = 每月提繳累積 + 收益分配",
    ],
    useCases: ["評估勞退自提", "估算長期退休金", "比較新舊制差異"],
    limitations: ["未來收益率與通膨無法保證", "實際請領方式以勞保局規定為準"],
    mistakes: ["把勞退與勞保老年給付混在一起", "忽略勞退上限", "認為換工作勞退會歸零"],
    sourceTopics: ["pension", "retirement"],
    nextSteps: [
      { label: "閱讀勞健保與勞退攻略", href: "/guides/insurance" },
      { label: "查勞退自提文章", href: "/articles/pension-voluntary" },
      { label: "規劃退休年齡", href: "/tools/retirement-planner" },
    ],
  },
};

export function getToolGuidance(slug: string) {
  return TOOL_GUIDANCE[slug];
}
