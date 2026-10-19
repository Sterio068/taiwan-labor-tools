export interface LegalBasis {
  label: string;
  text: string;
  url: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  steps: string[];
  result: string;
}

export interface ExplainerSection {
  title: string;
  body: string;
}

export interface ToolExplainerContent {
  heading: string;
  intro: string[];
  legalBasis: LegalBasis[];
  examples: WorkedExample[];
  mistakes: ExplainerSection[];
  prepare: string[];
  readNext: { label: string; href: string }[];
  checkedAt: string;
}

const LAW_BASE = "https://law.moj.gov.tw/LawClass/LawSingle.aspx";

/** 全國法規資料庫（法務部）條文單頁連結 */
export function lawArticleUrl(pcode: string, article: string): string {
  return `${LAW_BASE}?pcode=${pcode}&flno=${article}`;
}

export const PCODE = {
  laborStandards: "N0030001",
  laborStandardsRules: "N0030002",
  laborPension: "N0030020",
  laborInsurance: "N0050001",
  employmentInsurance: "N0050021",
  occupationalAccident: "N0050031",
  genderEquality: "N0030014",
  leaveRules: "N0030006",
  minimumWage: "N0030028",
  nhi: "L0060001",
  disputes: "N0020007",
} as const;

export const CHECKED_AT = "2026-10-19";
