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
  "overtime-pay-guide": [
    { label: "勞動基準法第 24 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24", description: "平日延長工時與休息日出勤的加給標準。" },
    { label: "勞動基準法第 32 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32", description: "延長工時的程序與每月時數上限。" },
    { label: "勞動基準法第 32 條之 1", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32-1", description: "加班補休依工作時數計算，未休補休應折發工資。" },
    { label: "勞動基準法第 39 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=39", description: "國定假日出勤工資加倍發給。" },
    { label: "勞動基準法第 40 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=40", description: "天災、事變或突發事件停止例假的要件。" },
    { label: "勞動基準法施行細則第 22 條之 2", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030002&flno=22-2", description: "補休的排定順序與未休補休工資的發給期限。" },
  ],
  "remote-work-rights": [
    { label: "勞動基準法第 30 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30", description: "正常工時與雇主置備出勤紀錄、保存 5 年的義務。" },
    { label: "勞工在事業場所外工作時間指導原則", url: "https://www.mol.gov.tw/1607/1632/1640/19356/", description: "勞動部對在外工作者工時、加班回報與出勤紀錄方式的指導原則。" },
    { label: "勞動部：出勤紀錄得由勞雇約定記載方式", url: "https://www.mol.gov.tw/1607/1632/1640/44137/", description: "出勤紀錄不限打卡，可約定以其他足以記錄出勤時間的方式記載。" },
  ],
  "pension-voluntary": [
    { label: "勞工退休金條例第 14 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=14", description: "雇主提繳不得低於 6%，勞工可在 6% 範圍內自願提繳並免計入所得。" },
    { label: "勞工退休金條例第 23 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=23", description: "退休金累積收益不得低於 2 年定期存款利率計算的收益。" },
    { label: "勞工退休金條例第 24 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=24", description: "年滿 60 歲請領，年資滿 15 年可選月領。" },
    { label: "勞保局勞工退休金業務", url: "https://www.bli.gov.tw/0012967.html", description: "勞退提繳、自願提繳與月提繳工資分級表。" },
  ],
  "labor-nhi-bracket-guide": [
    { label: "勞工保險條例第 14 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=14", description: "投保薪資依月薪資總額申報。" },
    { label: "勞工保險條例第 72 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=72", description: "投保薪資以多報少的罰則與勞工損失賠償。" },
    { label: "勞工保險投保薪資分級表", url: "https://www.bli.gov.tw/0100493.html", description: "勞保投保薪資級距與保費計算基礎。" },
    { label: "健保投保金額分級表", url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html", description: "健保投保金額級距與一般保費計算基礎。" },
  ],
  "annual-leave-2026": [
    { label: "勞動基準法第 38 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38", description: "特休天數、由勞工排定、遞延與未休工資的發給。" },
    { label: "勞動基準法施行細則第 24 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030002&flno=24", description: "特休的年資計算與雇主告知義務。" },
    { label: "勞動基準法施行細則第 24 條之 1", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030002&flno=24-1", description: "未休特休工資的計算方式與發給期限。" },
  ],
  "severance-calculation-complete": [
    { label: "勞動基準法第 16 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=16", description: "資遣預告期間與預告工資的法定依據。" },
    { label: "勞工退休金條例第 12 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=12", description: "新制資遣費計算基準與年資比例。" },
    { label: "勞動基準法第 17 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=17", description: "舊制年資資遣費的計算。" },
    { label: "勞動基準法第 18 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=18", description: "不得請求資遣費與預告工資的情形。" },
    { label: "勞動基準法第 19 條", url: "https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=19", description: "勞工請求時雇主應發給服務證明書。" },
  ],
  "insurance-deduction-examples": [
    { label: "勞工保險投保薪資分級表", url: "https://www.bli.gov.tw/0100493.html", description: "勞保投保薪資級距與保費計算基礎。" },
    { label: "健保投保金額分級表", url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html", description: "健保投保金額級距與一般保費計算基礎。" },
  ],
};

export function getArticleSources(category: ArticleCategory, slug?: string) {
  return (slug && articleSourceOverrides[slug]) || categorySources[category];
}
