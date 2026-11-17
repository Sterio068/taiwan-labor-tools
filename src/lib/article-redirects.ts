/**
 * 2026-11 內容整併：主題重疊或只換數字的文章已合併進主題文章，舊網址 301 轉到合併後的頁面。
 * next.config.ts 依這份對照產生轉址；站內連結也應直接指向新網址。
 */
export const ARTICLE_REDIRECTS: Record<string, string> = {
  // 加班費
  "overtime-calculation-examples": "/articles/overtime-pay-guide",
  "overtime-pay-vs-compensatory-leave": "/articles/overtime-pay-guide",
  "overtime-1hour-calculation": "/articles/overtime-pay-guide",
  "overtime-1-5hours-calculation": "/articles/overtime-pay-guide",
  "overtime-2hours-calculation": "/articles/overtime-pay-guide",
  "overtime-2-5hours-calculation": "/articles/overtime-pay-guide",
  "overtime-3hours-calculation": "/articles/overtime-pay-guide",
  "overtime-4hours-calculation": "/articles/overtime-pay-guide",
  "overtime-evidence-checklist": "/guides/overtime",
  "holiday-overtime-8hours": "/articles/holiday-overtime-complete",
  "work-from-home-overtime": "/articles/remote-work-rights",
  // 資遣費
  "severance-pay-notice-wages": "/articles/severance-calculation-complete",
  "severance-6months": "/articles/severance-calculation-complete",
  "severance-18months": "/articles/severance-calculation-complete",
  "severance-1year": "/articles/severance-calculation-complete",
  "severance-2years": "/articles/severance-calculation-complete",
  "severance-3years": "/articles/severance-calculation-complete",
  "severance-4years": "/articles/severance-calculation-complete",
  "severance-5years": "/articles/severance-calculation-complete",
  "severance-10years": "/articles/severance-calculation-complete",
  // 勞健保、勞退
  "labor-pension-6-percent": "/articles/pension-voluntary",
  "labor-insurance-bracket-2026": "/articles/labor-nhi-bracket-guide",
  "health-insurance-bracket-2026": "/articles/labor-nhi-bracket-guide",
  "labor-insurance-underreporting-complaint": "/articles/labor-nhi-bracket-guide",
  "salary-30000-take-home": "/articles/insurance-deduction-examples",
  "salary-35000-take-home": "/articles/insurance-deduction-examples",
  "salary-38000-take-home": "/articles/insurance-deduction-examples",
  "salary-40000-take-home": "/articles/insurance-deduction-examples",
  "salary-42000-take-home": "/articles/insurance-deduction-examples",
  "salary-45000-take-home": "/articles/insurance-deduction-examples",
  "salary-50000-take-home": "/articles/insurance-deduction-examples",
  "salary-55000-take-home": "/articles/insurance-deduction-examples",
  "salary-60000-take-home": "/articles/insurance-deduction-examples",
  // 最低工資
  "minimum-wage-2026": "/minimum-wage",
  "minimum-wage-hourly-2026": "/minimum-wage",
  // 特休
  "annual-leave-after-6months": "/articles/annual-leave-2026",
  "annual-leave-resignation-payout-example": "/articles/annual-leave-2026",
  "unused-annual-leave-wage": "/articles/annual-leave-2026",
};
