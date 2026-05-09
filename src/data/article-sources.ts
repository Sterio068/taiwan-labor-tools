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
    url: "https://www.bli.gov.tw/0005475.html",
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

export function getArticleSources(category: ArticleCategory) {
  return categorySources[category];
}
