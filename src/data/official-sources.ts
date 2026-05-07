export interface OfficialSource {
  id: string;
  title: string;
  agency: string;
  url: string;
  description: string;
  topics: string[];
  lastChecked: string;
}

export interface UpdateRecord {
  date: string;
  title: string;
  summary: string;
  affectedPages: string[];
}

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: "labor-standards-act",
    title: "勞動基準法",
    agency: "勞動部勞動法令查詢系統",
    url: "https://laws.mol.gov.tw/FLAW/FLAWDAT01.aspx?id=FL014930",
    description:
      "工資、工時、加班費、特別休假、資遣與職災補償等主要法源。",
    topics: ["salary", "overtime", "leave", "severance", "dispute", "injury"],
    lastChecked: "2026-05-07",
  },
  {
    id: "minimum-wage-2026",
    title: "115 年最低工資調整公告",
    agency: "勞動部",
    url: "https://www.mol.gov.tw/1607/1632/1633/84947/",
    description:
      "2026 年月最低工資 29,500 元、時最低工資 196 元，以及最低工資適用說明。",
    topics: ["salary", "minimum-wage", "hourly"],
    lastChecked: "2026-05-07",
  },
  {
    id: "labor-insurance-rate",
    title: "勞工保險保險費率及負擔比例",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0005478.html",
    description:
      "勞保普通事故保險費率、勞工/雇主/政府負擔比例與保險費計算依據；薪資工具另合併就業保險 1% 估算。",
    topics: ["salary", "insurance", "labor-insurance"],
    lastChecked: "2026-05-07",
  },
  {
    id: "labor-insurance-brackets",
    title: "勞工保險投保薪資分級表",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0005475.html",
    description:
      "115 年 1 月 1 日起適用之勞工保險投保薪資級距，用於勞保費與給付基準。",
    topics: ["salary", "insurance", "bracket"],
    lastChecked: "2026-05-07",
  },
  {
    id: "employment-insurance",
    title: "就業保險保險費與月投保薪資",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0006443.html",
    description:
      "就業保險投保、保險費與失業給付相關計算基礎。",
    topics: ["severance", "unemployment", "insurance"],
    lastChecked: "2026-05-07",
  },
  {
    id: "nhi-premium",
    title: "全民健康保險一般保險費計算公式",
    agency: "衛生福利部中央健康保險署",
    url: "https://www.nhi.gov.tw/ch/cp-3277-6c895-2588-1.html",
    description:
      "健保投保金額、5.17% 費率、負擔比率、眷屬人數與自付保費公式。",
    topics: ["salary", "insurance", "nhi"],
    lastChecked: "2026-05-07",
  },
  {
    id: "labor-pension-intro",
    title: "勞退新制簡介",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0012933.html",
    description:
      "勞退新制、雇主提繳不低於每月工資 6%、個人專戶與可攜制度說明。",
    topics: ["pension", "salary", "retirement"],
    lastChecked: "2026-05-07",
  },
  {
    id: "voluntary-pension",
    title: "個人自願提繳退休金",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0108501.htm",
    description:
      "勞工自願提繳 0-6% 勞退、所得稅扣除與適用對象說明。",
    topics: ["pension", "tax", "retirement"],
    lastChecked: "2026-05-07",
  },
  {
    id: "labor-pension-act",
    title: "勞工退休金條例",
    agency: "勞動部勞動法令查詢系統",
    url: "https://laws.mol.gov.tw/FLAW/FLAWDAT01.aspx?id=FL030634",
    description:
      "勞退新制、雇主提繳、個人自願提繳與資遣費制度之法源。",
    topics: ["pension", "severance", "retirement"],
    lastChecked: "2026-05-07",
  },
];

export const DATA_UPDATE_LOG: UpdateRecord[] = [
  {
    date: "2026-05-07",
    title: "建立官方來源與更新紀錄中心",
    summary:
      "補上勞基法、最低工資、勞保、健保、勞退等官方來源，供工具頁與文章查證。",
    affectedPages: ["/sources", "/about", "/tools/*", "/articles/*"],
  },
  {
    date: "2026-04-30",
    title: "AdSense 審核準備與索引送審",
    summary:
      "確認 ads.txt、sitemap、Search Console 索引請求、AdSense 政策中心狀態。",
    affectedPages: ["/ads.txt", "/sitemap.xml", "/"],
  },
  {
    date: "2026-04-07",
    title: "2026 年勞動法規資料第一版",
    summary:
      "建立 2026 年最低工資、勞保、健保、勞退與核心工具計算基礎。",
    affectedPages: ["/tools/salary", "/tools/overtime", "/tools/severance"],
  },
];

export function getSourcesByTopic(topic: string) {
  return OFFICIAL_SOURCES.filter((source) => source.topics.includes(topic));
}
