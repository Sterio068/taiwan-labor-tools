/**
 * 每篇文章對應的主要推薦工具
 * 在文章底部顯示「使用工具計算」CTA
 */
export interface ArticleTool {
  label: string;
  href: string;
  desc: string;
}

export const ARTICLE_TOOLS: Record<string, ArticleTool[]> = {
  "salary-slip-explained": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "輸入月薪，自動計算扣款與實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢勞保/健保/勞退投保級距" },
  ],
  "overtime-pay-guide": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "平日/休息日/國定假日加班費" },
    { label: "薪資明細計算機", href: "/tools/salary", desc: "含加班費的薪資完整試算" },
  ],
  "fired-what-to-do": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "輸入年資計算你的資遣費" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "計算法定預告天數" },
  ],
  "annual-leave-2026": [
    { label: "特休天數計算", href: "/tools/annual-leave", desc: "輸入到職日自動算特休天數" },
  ],
  "labor-insurance-comparison": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "計算每月勞健保自付額" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢三種投保級距對照表" },
  ],
  "pension-voluntary": [
    { label: "勞退退休金試算", href: "/tools/pension", desc: "試算自提對帳戶的影響" },
    { label: "退休年齡規劃", href: "/tools/retirement-planner", desc: "規劃退休時間與月退金額" },
  ],
  "resignation-notice": [
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "計算你的法定預告天數" },
    { label: "資遣費計算機", href: "/tools/severance", desc: "確認你應得的資遣費" },
  ],
  "part-time-rights": [
    { label: "時薪月薪換算器", href: "/tools/hourly-monthly", desc: "換算時薪與月薪，檢查基本工資" },
    { label: "加班費計算機", href: "/tools/overtime", desc: "時薪制加班費計算" },
  ],
  "maternity-leave-guide": [
    { label: "產假育嬰假計算機", href: "/tools/maternity", desc: "天數與勞保生育給付試算" },
  ],
  "work-injury-guide": [
    { label: "職災給付計算機", href: "/tools/work-injury", desc: "職災補償金額試算" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "了解申訴與調解流程" },
  ],
  "unemployment-benefits": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "確認你應得的資遣費" },
  ],
  "exempt-employee": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "計算合法加班費金額" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "快速確認勞動條件是否合法" },
  ],
  "minimum-wage-2026": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "依基本工資試算實領金額" },
    { label: "時薪月薪換算器", href: "/tools/hourly-monthly", desc: "基本時薪換算月薪" },
  ],
  "no-labor-insurance": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "計算正確的勞健保保費" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認雇主是否依法投保" },
  ],
  "probation-rights": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "快速確認試用期權益" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "試用期離職預告天數" },
  ],
  "salary-tax-guide-2026": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "試算含稅前後的薪資明細" },
  ],
  "year-end-bonus": [
    { label: "年終獎金計算機", href: "/tools/bonus", desc: "依在職月數計算年終" },
    { label: "薪資比較器", href: "/tools/salary-compare", desc: "含年終的年度收入比較" },
  ],
  "freelancer-insurance": [
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "工會投保級距試算" },
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "計算自行投保的保費" },
  ],
  "non-compete-clause": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認勞動條件是否合法" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "了解競業禁止爭議處理" },
  ],
  "labor-mediation": [
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "確認爭議類型與處理方式" },
  ],
  "old-vs-new-pension": [
    { label: "勞退退休金試算", href: "/tools/pension", desc: "試算新制退休金累積金額" },
    { label: "退休年齡規劃", href: "/tools/retirement-planner", desc: "整合規劃退休收入" },
  ],
  "nhi-supplement-premium": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "計算每月健保費" },
    { label: "薪資明細計算機", href: "/tools/salary", desc: "含補充保費的試算" },
  ],
  "wage-theft-what-to-do": [
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "欠薪爭議處理流程" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認雇主是否違法" },
  ],
  "overwork-karoshi": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "計算合法加班費" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "過勞爭議處理" },
  ],
  "contract-vs-permanent": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認勞動條件是否合法" },
    { label: "資遣費計算機", href: "/tools/severance", desc: "定期契約到期試算" },
  ],
  "sick-leave-pay": [
    { label: "特休天數計算", href: "/tools/annual-leave", desc: "假別總覽與特休計算" },
  ],
  "remote-work-rights": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "遠端工作權益確認" },
    { label: "加班費計算機", href: "/tools/overtime", desc: "居家加班費試算" },
  ],
  "side-job-tax-insurance": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "副業保費試算" },
    { label: "薪資明細計算機", href: "/tools/salary", desc: "主副業收入合計試算" },
  ],
  "workplace-harassment": [
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "職場霸凌申訴流程" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認雇主是否違法" },
  ],
  "labor-inspection-guide": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "自我檢查勞動條件" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "了解申訴管道" },
  ],
  "salary-45000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "精確計算月薪 45000 實領" },
  ],
  "salary-40000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary?m=40000", desc: "精確計算月薪 40000 實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢對應投保薪資級距" },
  ],
  "salary-50000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary?m=50000", desc: "精確計算月薪 50000 實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢勞健保與勞退級距" },
  ],
  "salary-60000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "精確計算月薪 60000 實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢勞健保與勞退級距" },
  ],
  "overtime-2hours-calculation": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "加班 2 小時費用試算" },
  ],
  "overtime-1hour-calculation": [
    { label: "加班費計算機", href: "/tools/overtime?h=1&ot=weekday", desc: "平日加班 1 小時費用試算" },
  ],
  "overtime-3hours-calculation": [
    { label: "加班費計算機", href: "/tools/overtime?h=3&ot=weekday", desc: "平日加班 3 小時分段試算" },
  ],
  "overtime-4hours-calculation": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "平日加班 4 小時分段試算" },
  ],
  "severance-1year": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "工作 1 年資遣費試算" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "確認是否另有預告工資" },
  ],
  "severance-2years": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "工作 2 年資遣費試算" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "確認是否另有 20 天預告工資" },
  ],
  "severance-3years": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "工作 3 年資遣費試算" },
  ],
  "severance-5years": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "工作 5 年資遣費試算" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "確認是否另有 30 天預告工資" },
  ],
  "severance-10years": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "工作 10 年資遣費試算" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "確認是否另有 30 天預告工資" },
  ],
  "annual-leave-after-6months": [
    { label: "特休天數計算", href: "/tools/annual-leave", desc: "到職 6 個月特休天數" },
  ],
  "minimum-wage-hourly-2026": [
    { label: "時薪月薪換算器", href: "/tools/hourly-monthly", desc: "基本時薪月收入試算" },
  ],
  "labor-insurance-payout": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "計算勞保保費與給付" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢你的投保級距" },
  ],
  "quit-job-rights": [
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "計算離職預告天數" },
    { label: "資遣費計算機", href: "/tools/severance", desc: "確認資遣費計算" },
  ],
  "night-shift-allowance": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "夜班加班費試算" },
  ],
  "layoff-compensation-comparison": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "資遣費完整試算" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認資遣條件合法性" },
  ],
  "work-from-home-overtime": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "居家加班費計算" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "遠端工作權益確認" },
  ],
  "salary-30000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "精確計算月薪 30000 實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢對應投保薪資級距" },
  ],
  "salary-35000-take-home": [
    { label: "薪資明細計算機", href: "/tools/salary?m=35000", desc: "精確計算月薪 35000 實領" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢 36300 附近級距" },
  ],
  "forced-overtime-illegal": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "計算應得加班費金額" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "強迫加班申訴流程" },
  ],
  "salary-cut-rights": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "試算減薪前後實領差異" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認減薪是否合法" },
  ],
  "company-bankrupt-workers": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "計算應得資遣費金額" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "雇主倒閉申訴流程" },
  ],
  "holiday-overtime-complete": [
    { label: "加班費計算機", href: "/tools/overtime", desc: "國定假日/例假加班費試算" },
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認假日出勤是否合法" },
  ],
  "pension-account-query": [
    { label: "勞退退休金試算", href: "/tools/pension", desc: "試算退休金累積金額" },
    { label: "退休年齡規劃", href: "/tools/retirement-planner", desc: "規劃退休收入" },
  ],
  "employment-contract-traps": [
    { label: "勞工權益健檢", href: "/tools/rights-check", desc: "確認勞動條件是否合法" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "合約問題申訴流程" },
  ],
  "annual-leave-refused": [
    { label: "特休天數計算", href: "/tools/annual-leave", desc: "確認你的特休天數" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "特休被拒申訴流程" },
  ],
  "part-time-health-insurance": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "兼職勞健保費試算" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢投保薪資級距" },
  ],
  "salary-negotiation-rights": [
    { label: "薪資比較器", href: "/tools/salary-compare", desc: "比較不同薪資方案實領差異" },
    { label: "薪資明細計算機", href: "/tools/salary", desc: "試算談判後的實領金額" },
  ],
  "labor-insurance-bracket-2026": [
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "查詢勞保、健保、勞退級距" },
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "試算自付額與雇主負擔" },
  ],
  "health-insurance-bracket-2026": [
    { label: "勞健保保費計算", href: "/tools/insurance-premium", desc: "輸入眷屬數試算健保扣款" },
    { label: "投保級距查詢", href: "/tools/insurance-bracket", desc: "核對健保投保金額級距" },
  ],
  "labor-pension-6-percent": [
    { label: "薪資明細計算機", href: "/tools/salary", desc: "比較自提 0% 與 6% 實領" },
    { label: "勞退退休金試算", href: "/tools/pension", desc: "估算長期退休金累積" },
  ],
  "unused-annual-leave-wage": [
    { label: "特休天數計算", href: "/tools/annual-leave", desc: "先確認剩餘特休天數" },
    { label: "離職預告期計算", href: "/tools/notice-period", desc: "離職前同步確認預告期" },
  ],
  "involuntary-separation-certificate": [
    { label: "資遣費計算機", href: "/tools/severance", desc: "先估資遣費與年資" },
    { label: "勞資爭議檢查器", href: "/tools/dispute-checker", desc: "整理公司拒開文件的爭議" },
  ],
};

/** 根據 slug 和 category 取得 3 篇相關文章 slug */
export function getRelatedSlugs(
  currentSlug: string,
  currentCategory: string,
  allSlugs: { slug: string; category: string }[]
): string[] {
  // 先找同分類
  const sameCat = allSlugs
    .filter((a) => a.slug !== currentSlug && a.category === currentCategory)
    .slice(0, 3)
    .map((a) => a.slug);
  // 如果不夠 3 篇，補其他分類
  if (sameCat.length >= 3) return sameCat;
  const others = allSlugs
    .filter((a) => a.slug !== currentSlug && a.category !== currentCategory)
    .slice(0, 3 - sameCat.length)
    .map((a) => a.slug);
  return [...sameCat, ...others];
}
