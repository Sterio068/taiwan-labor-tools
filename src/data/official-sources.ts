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
    lastChecked: "2026-10-19",
  },
  {
    id: "minimum-wage-2026",
    title: "115 年最低工資調整公告",
    agency: "勞動部",
    url: "https://www.mol.gov.tw/1607/1632/1633/84947/",
    description:
      "2026 年月最低工資 29,500 元、時最低工資 196 元，以及最低工資適用說明。",
    topics: ["salary", "minimum-wage", "hourly"],
    lastChecked: "2026-10-19",
  },
  {
    id: "labor-insurance-rate",
    title: "勞工保險保險費率及負擔比例",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0005478.html",
    description:
      "勞保普通事故保險費率、勞工/雇主/政府負擔比例與保險費計算依據；薪資工具另合併就業保險 1% 估算。",
    topics: ["salary", "insurance", "labor-insurance"],
    lastChecked: "2026-10-19",
  },
  {
    id: "labor-insurance-brackets",
    title: "勞工保險投保薪資分級表",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0100493.html",
    description:
      "115 年 1 月 1 日起適用之勞工保險投保薪資級距，用於勞保費與給付基準。",
    topics: ["salary", "insurance", "bracket"],
    lastChecked: "2026-05-10",
  },
  {
    id: "employment-insurance",
    title: "就業保險保險費與月投保薪資",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0006443.html",
    description:
      "就業保險投保、保險費與失業給付相關計算基礎。",
    topics: ["severance", "unemployment", "insurance"],
    lastChecked: "2026-10-19",
  },
  {
    id: "nhi-premium",
    title: "全民健康保險一般保險費計算公式",
    agency: "衛生福利部中央健康保險署",
    url: "https://www.nhi.gov.tw/ch/cp-3277-6c895-2588-1.html",
    description:
      "健保投保金額、5.17% 費率、負擔比率、眷屬人數與自付保費公式。",
    topics: ["salary", "insurance", "nhi"],
    lastChecked: "2026-05-10",
  },
  {
    id: "nhi-brackets-2026",
    title: "健保投保金額分級表",
    agency: "衛生福利部中央健康保險署",
    url: "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html",
    description:
      "115 年 1 月 1 日生效之健保投保金額級距，用於一般保費與薪資單扣款核對。",
    topics: ["salary", "insurance", "nhi", "bracket"],
    lastChecked: "2026-05-10",
  },
  {
    id: "labor-pension-intro",
    title: "勞退新制簡介",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0012933.html",
    description:
      "勞退新制、雇主提繳不低於每月工資 6%、個人專戶與可攜制度說明。",
    topics: ["pension", "salary", "retirement"],
    lastChecked: "2026-05-10",
  },
  {
    id: "labor-pension-brackets-2026",
    title: "勞工退休金月提繳工資分級表",
    agency: "勞動部勞工保險局",
    url: "https://www.bli.gov.tw/0013083.html",
    description:
      "115 年 1 月 1 日生效之勞退月提繳工資分級表，用於雇主提繳 6% 與自願提繳試算。",
    topics: ["pension", "salary", "bracket"],
    lastChecked: "2026-05-10",
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
    lastChecked: "2026-10-19",
  },
  {
    id: "minimum-wage-act",
    title: "最低工資法",
    agency: "法務部全國法規資料庫",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030028",
    description: "最低工資的適用對象、審議程序、約定低於最低工資時以最低工資為準，以及 2 萬至 100 萬元罰則。",
    topics: ["salary", "minimum-wage", "hourly"],
    lastChecked: "2026-10-19",
  },
  {
    id: "rest-day-overtime-faq",
    title: "因應勞動基準法修正常見問答集（114.11.13 版）",
    agency: "臺中市政府勞工局",
    url: encodeURI("https://www.labor.taichung.gov.tw/media/1351846/勞動基準法修正案常見問答集1141125.pdf"),
    description: "休息日出勤依實際時數覈實計算，以時薪 150 元示範 1、6、10 小時的加給金額，並說明特休結算區間。",
    topics: ["overtime", "leave"],
    lastChecked: "2026-10-19",
  },
  {
    id: "natural-disaster-attendance",
    title: "天然災害發生時勞工出勤與工資說明",
    agency: "勞動部",
    url: "https://www.mol.gov.tw/1607/1632/1640/76758/",
    description: "停止上班時勞工未出勤不得視為曠工或扣全勤，雇主宜不扣發工資；仍需出勤者照給工資並宜加給。",
    topics: ["overtime", "salary", "dispute"],
    lastChecked: "2026-10-19",
  },
  {
    id: "occupational-accident-act",
    title: "勞工職業災害保險及保護法",
    agency: "法務部全國法規資料庫",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050031",
    description: "職災保險傷病給付（前 2 個月全額、第 3 個月起 70%）、失能與死亡給付。",
    topics: ["injury", "insurance"],
    lastChecked: "2026-10-19",
  },
  {
    id: "national-pension-2026",
    title: "國民年金保險月投保金額 115 年 1 月 1 日調整為 21,103 元",
    agency: "衛生福利部",
    url: "https://mohw.gov.tw/cp-16-84487-1.html",
    description: "國保月投保金額依消費者物價指數累計成長率調整，影響保費與各項給付。",
    topics: ["insurance", "retirement"],
    lastChecked: "2026-10-19",
  },
];

export const DATA_UPDATE_LOG: UpdateRecord[] = [
  {
    date: "2026-10-19",
    title: "全站法規查核與內容整併",
    summary:
      "修正休息日加班費（107 年 3 月起依實際時數計算，已刪除 4/8/12 規則）、國定假日出勤（8 小時內加給 1 日工資）、特休滿 10 年 16 日、颱風出勤加給屬勸導性規定、職災傷病給付前 2 個月全額等內容；更正勞健保級距表、國保月投保金額與最低工資相關說明；所有工具頁補上法源、試算範例與常見錯誤；29 篇僅數字不同的試算文章整併至主題文章並設為不索引。",
    affectedPages: ["/tools/*", "/guides/*", "/compare/*", "/minimum-wage", "/articles/*"],
  },
  {
    date: "2026-05-10",
    title: "新增熱門問題與情境入口資料核對",
    summary:
      "核對 115 年最低工資、勞保投保薪資分級表、健保投保金額分級表與勞退月提繳工資分級表，補上熱門問題與情境入口使用的官方來源。",
    affectedPages: ["/questions", "/scenarios", "/sources", "/articles/*", "/tools/*"],
  },
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
