import type { ArticleCategory } from "@/types";

export interface ArticleSource {
  label: string;
  url: string;
  description: string;
}

const laborStandardsSources: ArticleSource[] = [
  {
    label: "勞動基準法",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030001",
    description: "工資、工時、加班、休假、資遣與勞動條件的主要法源。",
  },
  {
    label: "勞動部勞動法令查詢系統",
    url: "https://laws.mol.gov.tw/",
    description: "勞動部主管法規、函釋與行政規則查詢。",
  },
];

const insuranceSources: ArticleSource[] = [
  {
    label: "勞工保險條例",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050001",
    description: "勞保投保、保費負擔與各項給付的法律依據。",
  },
  {
    label: "勞工保險投保薪資分級表",
    url: "https://www.bli.gov.tw/0100493.html",
    description: "勞保投保薪資級距與保險費計算基礎。",
  },
  {
    label: "全民健康保險法",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0060001",
    description: "健保投保、保費與眷屬加保的法律依據。",
  },
  {
    label: "健保投保金額分級表",
    url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html",
    description: "全民健保投保金額級距與一般保費計算基礎。",
  },
];

const pensionSources: ArticleSource[] = [
  {
    label: "勞工退休金條例",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030020",
    description: "新制勞退、雇主提繳與勞工自願提繳的法律依據。",
  },
  {
    label: "勞保局勞工退休金業務",
    url: "https://www.bli.gov.tw/0012967.html",
    description: "勞退開始提繳、申報與自願提繳作業說明。",
  },
];

const categorySources: Record<ArticleCategory, ArticleSource[]> = {
  salary: [...laborStandardsSources, ...insuranceSources, ...pensionSources],
  overtime: laborStandardsSources,
  leave: laborStandardsSources,
  insurance: insuranceSources,
  pension: pensionSources,
  severance: [...laborStandardsSources, ...pensionSources],
  rights: [...laborStandardsSources, ...insuranceSources],
  injury: [...laborStandardsSources, ...insuranceSources],
  freelance: [...insuranceSources, ...pensionSources],
  hr: laborStandardsSources,
};

const articleSourceOverrides: Record<string, ArticleSource[]> = {
  "overtime-pay-vs-compensatory-leave": [
    { label: "勞動基準法第 32-1 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32-1", description: "加班後補休選擇、時數換算與補休期限的法定依據。" },
    { label: "勞動部勞動基準法第 32-1 條說明", url: "https://laws.mol.gov.tw/flaw/FLAWDOC01.aspx?flno=32-1&id=FL014930", description: "勞動部對加班後補休選擇、時數換算與期限的公開說明。" },
  ],
  "severance-calculation-complete": [
    { label: "勞動基準法第 16 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=16", description: "資遣預告期間與預告工資的法定依據。" },
    { label: "勞工退休金條例第 12 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=12", description: "新制資遣費計算基準與年資比例。" },
  ],
  "insurance-deduction-examples": [
    { label: "勞工保險投保薪資分級表", url: "https://www.bli.gov.tw/0100493.html", description: "勞保投保薪資級距與保費計算基礎。" },
    { label: "健保投保金額分級表", url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html", description: "健保投保金額級距與一般保費計算基礎。" },
  ],
  "annual-leave-resignation-payout-example": [
    { label: "勞動基準法第 38 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38", description: "特別休假日數、排定與未休工資的法定依據。" },
    { label: "勞動部特別休假專區", url: "https://www.mol.gov.tw/1607/28162/28166/28180/81521/81536/", description: "勞動部對特別休假與未休工資的公開說明。" },
  ],
  "health-insurance-bracket-2026": [
    { label: "健保投保金額分級表", url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html", description: "全民健保投保金額級距與一般保費計算基礎。" },
    { label: "勞工保險投保薪資分級表", url: "https://www.bli.gov.tw/0100493.html", description: "勞保投保薪資級距與保費計算基礎。" },
  ],
  "holiday-overtime-8hours": [
    { label: "勞動基準法第 39 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=39", description: "休假日工作工資及工資照給的法定依據。" },
    { label: "勞動部休假日工資說明", url: "https://www.mol.gov.tw/1607/28162/28166/28180/81521/81533/", description: "勞動部對休假日出勤與工資計算的公開說明。" },
  ],
  "labor-insurance-underreporting-complaint": [
    { label: "勞工保險投保薪資分級表", url: "https://www.bli.gov.tw/0100493.html", description: "核對勞保投保薪資級距與申報基礎。" },
    { label: "勞工保險條例", url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050001", description: "勞保投保、申報與給付責任的法定依據。" },
  ],
  "overtime-evidence-checklist": [
    { label: "勞動基準法第 24 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24", description: "延長工作時間工資計算的法定依據。" },
    { label: "勞動部延長工時工資說明", url: "https://www.mol.gov.tw/1607/28162/28166/28180/81521/81707/", description: "勞動部對工時、加班費與出勤紀錄的公開說明。" },
  ],
  "unused-annual-leave-wage": [
    { label: "勞動基準法第 38 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38", description: "未休特別休假工資的法定依據。" },
    { label: "勞動部特別休假專區", url: "https://www.mol.gov.tw/1607/28162/28166/28180/81521/81536/", description: "勞動部對未休特休工資結算的公開說明。" },
  ],
};

export function getArticleSources(category: ArticleCategory, slug?: string) {
  return (slug && articleSourceOverrides[slug]) || categorySources[category];
}
