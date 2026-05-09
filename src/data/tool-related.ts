/**
 * 每個工具頁面推薦的「相關文章」和「相關工具」
 * 用於內部連結強化 SEO 與使用者瀏覽深度
 */

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

export const TOOL_RELATED_ARTICLES: Record<string, RelatedLink[]> = {
  salary: [
    { label: "2026 薪資單完全解讀：每一項扣款是什麼？", href: "/articles/salary-slip-explained" },
    { label: "月薪 42,000 實領多少？2026 級距與扣款試算", href: "/articles/salary-42000-take-home" },
    { label: "月薪 55,000 實領多少？勞保上限與健保級距試算", href: "/articles/salary-55000-take-home" },
    { label: "月薪 60,000 實領多少？勞健保扣款完整試算", href: "/articles/salary-60000-take-home" },
    { label: "2026 薪資報稅完全指南：稅級表、扣除額、節稅方法", href: "/articles/salary-tax-guide-2026" },
    { label: "最低工資 29,500：2026 新制影響", href: "/articles/minimum-wage-2026" },
  ],
  overtime: [
    { label: "加班費怎麼算？平日/休息日/國定假日完整圖解", href: "/articles/overtime-pay-guide" },
    { label: "平日加班 2.5 小時怎麼算？分段倍率完整試算", href: "/articles/overtime-2-5hours-calculation" },
    { label: "加班費爭議證據清單：打卡、訊息、交付紀錄怎麼留", href: "/articles/overtime-evidence-checklist" },
    { label: "平日加班 4 小時多少錢？第 3、4 小時倍率試算", href: "/articles/overtime-4hours-calculation" },
    { label: "責任制加班合法嗎？加班費爭議解析", href: "/articles/exempt-employee" },
    { label: "過勞認定標準與職災申請", href: "/articles/overwork-karoshi" },
  ],
  severance: [
    { label: "被資遣了怎麼辦？該拿的錢與流程全攻略", href: "/articles/fired-what-to-do" },
    { label: "工作 6 個月被資遣有資遣費嗎？新制試算", href: "/articles/severance-6months" },
    { label: "工作 1 年 6 個月資遣費怎麼算？2026 新制", href: "/articles/severance-18months" },
    { label: "工作 5 年被資遣有多少錢？新制資遣費完整試算", href: "/articles/severance-5years" },
    { label: "非自願離職證明拿不到怎麼辦？被資遣文件清單", href: "/articles/involuntary-separation-certificate" },
    { label: "失業給付怎麼領？資格金額期限全解析", href: "/articles/unemployment-benefits" },
    { label: "離職要提前幾天？預告期完整規定", href: "/articles/resignation-notice" },
  ],
  "annual-leave": [
    { label: "2026 特休假完整攻略：年資對照＋未休折算", href: "/articles/annual-leave-2026" },
    { label: "離職前特休沒休完怎麼算？未休折現範例", href: "/articles/annual-leave-resignation-payout-example" },
    { label: "病假扣薪合法嗎？各假別薪資規定", href: "/articles/sick-leave-pay" },
  ],
  "insurance-premium": [
    { label: "勞保 vs 國保 vs 農保：差在哪一次搞懂", href: "/articles/labor-insurance-comparison" },
    { label: "2026 勞保投保級距怎麼看？投保薪資低報檢查", href: "/articles/labor-insurance-bracket-2026" },
    { label: "勞保低報怎麼申訴？證據清單與處理流程", href: "/articles/labor-insurance-underreporting-complaint" },
    { label: "沒幫我保勞保怎麼辦？檢舉管道與自救", href: "/articles/no-labor-insurance" },
    { label: "二代健保補充保費完全攻略", href: "/articles/nhi-supplement-premium" },
  ],
  pension: [
    { label: "勞退自提 6% 到底要不要？節稅效果試算", href: "/articles/pension-voluntary" },
    { label: "舊制 vs 新制勞退：差在哪？該怎麼選？", href: "/articles/old-vs-new-pension" },
  ],
  "hourly-monthly": [
    { label: "時薪制勞工權益懶人包", href: "/articles/part-time-rights" },
    { label: "最低工資 29,500：2026 新制影響", href: "/articles/minimum-wage-2026" },
  ],
  maternity: [
    { label: "產假、陪產假、育嬰假一次搞懂", href: "/articles/maternity-leave-guide" },
  ],
  "work-injury": [
    { label: "職災發生怎麼辦？補償與雇主責任", href: "/articles/work-injury-guide" },
    { label: "過勞認定標準與職災申請", href: "/articles/overwork-karoshi" },
  ],
  "insurance-bracket": [
    { label: "2026 勞保投保級距怎麼看？投保薪資低報檢查", href: "/articles/labor-insurance-bracket-2026" },
    { label: "勞保低報怎麼申訴？證據清單與處理流程", href: "/articles/labor-insurance-underreporting-complaint" },
    { label: "沒幫我保勞保怎麼辦？檢舉管道與自救", href: "/articles/no-labor-insurance" },
    { label: "自由接案者怎麼保勞保？工會投保指南", href: "/articles/freelancer-insurance" },
  ],
  bonus: [
    { label: "年終獎金是法定的嗎？", href: "/articles/year-end-bonus" },
    { label: "2026 薪資報稅完全指南", href: "/articles/salary-tax-guide-2026" },
  ],
  "notice-period": [
    { label: "離職要提前幾天？預告期完整規定", href: "/articles/resignation-notice" },
    { label: "定期契約 vs 不定期契約：差別在哪？權益比較", href: "/articles/contract-vs-permanent" },
  ],
  "rights-check": [
    { label: "老闆欠薪怎麼辦？7 步驟催討薪水完全指南", href: "/articles/wage-theft-what-to-do" },
    { label: "勞資調解怎麼申請？免費解決糾紛", href: "/articles/labor-mediation" },
    { label: "試用期的 5 個法律真相", href: "/articles/probation-rights" },
  ],
  "salary-compare": [
    { label: "2026 薪資報稅完全指南", href: "/articles/salary-tax-guide-2026" },
    { label: "競業禁止條款合法嗎？", href: "/articles/non-compete-clause" },
  ],
  "dispute-checker": [
    { label: "勞資調解怎麼申請？免費解決糾紛", href: "/articles/labor-mediation" },
    { label: "老闆欠薪怎麼辦？7 步驟催討薪水完全指南", href: "/articles/wage-theft-what-to-do" },
    { label: "勞動檢查來了怎麼辦？", href: "/articles/labor-inspection-guide" },
  ],
  "retirement-planner": [
    { label: "勞退自提 6% 到底要不要？節稅效果試算", href: "/articles/pension-voluntary" },
    { label: "舊制 vs 新制勞退：差在哪？該怎麼選？", href: "/articles/old-vs-new-pension" },
  ],
  typhoon: [
    { label: "強迫加班違法嗎？加班費爭議解析", href: "/articles/forced-overtime-illegal" },
    { label: "加班費怎麼算？平日/休息日/國定假日完整圖解", href: "/articles/overtime-pay-guide" },
  ],
};

export const TOOL_RELATED_TOOLS: Record<string, RelatedLink[]> = {
  salary: [
    { label: "勞健保保費計算", href: "/tools/insurance-premium" },
    { label: "勞退退休金試算", href: "/tools/pension" },
    { label: "加班費計算機", href: "/tools/overtime" },
  ],
  overtime: [
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "特休天數計算", href: "/tools/annual-leave" },
  ],
  severance: [
    { label: "離職預告期計算", href: "/tools/notice-period" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  "annual-leave": [
    { label: "加班費計算機", href: "/tools/overtime" },
    { label: "產假育嬰假計算", href: "/tools/maternity" },
  ],
  "insurance-premium": [
    { label: "投保級距查詢", href: "/tools/insurance-bracket" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  pension: [
    { label: "退休年齡規劃", href: "/tools/retirement-planner" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  "hourly-monthly": [
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "加班費計算機", href: "/tools/overtime" },
    { label: "年終獎金計算機", href: "/tools/bonus" },
  ],
  maternity: [
    { label: "特休天數計算", href: "/tools/annual-leave" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  "work-injury": [
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker" },
  ],
  "insurance-bracket": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium" },
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "勞退退休金試算", href: "/tools/pension" },
  ],
  bonus: [
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "薪資比較器", href: "/tools/salary-compare" },
    { label: "離職預告期計算", href: "/tools/notice-period" },
  ],
  "notice-period": [
    { label: "資遣費計算機", href: "/tools/severance" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  "rights-check": [
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker" },
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "加班費計算機", href: "/tools/overtime" },
  ],
  "salary-compare": [
    { label: "薪資明細計算機", href: "/tools/salary" },
    { label: "年終獎金計算機", href: "/tools/bonus" },
  ],
  "dispute-checker": [
    { label: "勞工權益健檢", href: "/tools/rights-check" },
    { label: "資遣費計算機", href: "/tools/severance" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  "retirement-planner": [
    { label: "勞退退休金試算", href: "/tools/pension" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
  typhoon: [
    { label: "加班費計算機", href: "/tools/overtime" },
    { label: "勞工權益健檢", href: "/tools/rights-check" },
    { label: "薪資明細計算機", href: "/tools/salary" },
  ],
};
