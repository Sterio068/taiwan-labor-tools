import type { ArticleMeta, ArticleCategory } from "@/types";
import { contentStatus, getConsolidatedArticle, isIndexableArticle } from "@/lib/content-policy";

const RAW_ARTICLES: ArticleMeta[] = [
  {
    slug: "salary-slip-explained",
    title: "2026 薪資單完全解讀：每一項扣款是什麼？",
    description:
      "看不懂薪資單？逐項解析勞保、健保、勞退自提、所得稅預扣等常見扣款項目，讓你清楚每一筆錢的去向。",
    category: "salary",
    keywords: ["薪資單", "薪水條", "扣款", "勞保扣款", "健保扣款", "實領薪資"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "overtime-pay-guide",
    title: "加班費怎麼算？平日、休息日、國定假日與補休完整說明",
    description:
      "依勞基法第 24、32 條之 1、39 條，說明平日 4/3 與 5/3 倍、休息日依實際時數、國定假日加給 1 日工資的算法，附 5 種月薪對照表、加班換補休的規定與薪資單核對步驟。",
    category: "overtime",
    keywords: ["加班費", "加班費計算", "休息日加班", "國定假日加班", "加班補休", "勞基法第24條"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-11-17",
    readingMinutes: 12,
  },
  {
    slug: "fired-what-to-do",
    title: "被資遣了怎麼辦？該拿的錢與流程全攻略",
    description:
      "被資遣別慌，完整盤點資遣費、預告工資、非自願離職證明、失業給付申請流程，保障你的每一項權益。",
    category: "severance",
    keywords: ["資遣", "資遣費", "非自願離職", "失業給付", "預告工資"],
    publishedAt: "2026-04-07",
    readingMinutes: 8,
  },
  {
    slug: "annual-leave-2026",
    title: "2026 特休怎麼算：年資天數、週年制與曆年制、未休折發",
    description:
      "依勞基法第 38 條，滿 6 個月 3 天、滿 1 年 7 天起的特休天數表，說明新人滿半年的實務問題、週年制與曆年制、誰決定休假日期，以及未休特休與離職時的折發算法。",
    category: "leave",
    keywords: ["特休", "特休天數", "滿6個月特休", "曆年制", "未休特休", "勞基法第38條"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-11-17",
    readingMinutes: 9,
  },
  {
    slug: "labor-insurance-comparison",
    title: "勞保 vs 國保 vs 農保：差在哪一次搞懂",
    description:
      "比較勞工保險、國民年金保險、農民保險的投保資格、保費、給付項目差異，幫你選對保險。",
    category: "insurance",
    keywords: ["勞保", "國保", "農保", "社會保險", "投保資格", "保險比較"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "pension-voluntary",
    title: "勞退 6%：雇主提繳不能扣薪，自提要不要？",
    description:
      "雇主提繳的 6% 由雇主負擔、不得扣薪；勞工自提 0～6% 才會扣薪並可免計入所得。附 2026 提繳級距表、違法扣薪的處理方式，以及不同月薪與稅率的自提節稅試算。",
    category: "pension",
    keywords: ["勞退6%", "勞退自提", "自願提繳", "勞退扣薪", "節稅", "勞退提繳級距"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-11-17",
    readingMinutes: 10,
  },
  {
    slug: "no-labor-insurance",
    title: "沒幫我保勞保怎麼辦？檢舉管道與自救",
    description:
      "雇主未依法投保勞保？了解你的權益、檢舉管道、雇主罰則，以及未投保期間發生事故的補償方式。",
    category: "rights",
    keywords: ["未投保勞保", "檢舉", "勞保局", "雇主責任", "勞工權益"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "probation-rights",
    title: "試用期的 5 個法律真相",
    description:
      "試用期可以不保勞保嗎？試用期被開除有資遣費嗎？破解常見的試用期法律迷思。",
    category: "rights",
    keywords: ["試用期", "試用期勞保", "試用期資遣", "新人權益"],
    publishedAt: "2026-04-07",
    readingMinutes: 5,
  },
  {
    slug: "resignation-notice",
    title: "離職要提前幾天？預告期完整規定",
    description:
      "依勞基法第 15、16 條，勞工離職預告期天數一覽，附年資對照表與未履行預告的法律效果。",
    category: "severance",
    keywords: ["離職預告", "預告期", "離職天數", "勞基法第16條", "提前離職"],
    publishedAt: "2026-04-07",
    readingMinutes: 5,
  },
  {
    slug: "part-time-rights",
    title: "時薪制勞工權益懶人包",
    description:
      "打工族必看：2026 最低時薪 196 元、加班費、勞健保、特休假、國定假日出勤等權益完整整理。",
    category: "rights",
    keywords: ["時薪", "打工", "兼職", "基本時薪", "打工權益"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "maternity-leave-guide",
    title: "產假、陪產假、育嬰假一次搞懂",
    description:
      "產假 8 週、陪產檢及陪產假 7 天、育嬰留職停薪最長 2 年，各假別天數、薪資、申請方式全解析。",
    category: "leave",
    keywords: ["產假", "陪產假", "育嬰假", "育嬰留停", "生育給付"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "work-injury-guide",
    title: "職災發生怎麼辦？補償與雇主責任",
    description:
      "職業災害的認定標準、勞保職災給付、雇主補償責任、醫療費用與公傷病假權益完整說明。",
    category: "injury",
    keywords: ["職災", "職業災害", "工傷", "職災補償", "雇主責任", "公傷病假"],
    publishedAt: "2026-04-07",
    readingMinutes: 8,
  },
  {
    slug: "unemployment-benefits",
    title: "失業給付怎麼領？資格金額期限全解析",
    description:
      "非自願離職後如何申請失業給付？投保年資、給付金額、請領期限、提早就業獎助津貼一次看懂。",
    category: "severance",
    keywords: ["失業給付", "失業補助", "非自願離職", "就業保險", "就業獎助"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "exempt-employee",
    title: "責任制合法嗎？加班費爭議解析",
    description:
      "勞基法第 84-1 條責任制的適用條件、合法要件，以及常見的違法責任制加班爭議案例分析。",
    category: "overtime",
    keywords: ["責任制", "勞基法84-1", "加班費", "免打卡", "責任制加班"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "non-compete-clause",
    title: "競業禁止條款合法嗎？",
    description:
      "離職後的競業禁止條款需滿足哪些要件才合法？補償金、期間上限、範圍限制的法律規定與實務判決。",
    category: "rights",
    keywords: ["競業禁止", "離職條款", "同業限制", "補償金", "勞基法第9-1條"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "sick-leave-pay",
    title: "病假扣薪合法嗎？各假別薪資規定",
    description:
      "普通傷病假半薪、事假無薪、公假全薪⋯⋯各假別的薪資規定一次整理，搞懂請假到底扣多少。",
    category: "leave",
    keywords: ["病假", "病假扣薪", "事假", "請假薪資", "半薪"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-10-19",
    readingMinutes: 6,
  },
  {
    slug: "freelancer-insurance",
    title: "自由接案者怎麼保勞保？工會投保指南",
    description:
      "無固定雇主的自由工作者可透過職業工會投保勞保，了解加入條件、保費負擔與給付權益。",
    category: "freelance",
    keywords: ["自由工作者", "工會投保", "職業工會", "自由接案", "勞保"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "labor-mediation",
    title: "勞資調解怎麼申請？免費解決糾紛",
    description:
      "勞資爭議調解的申請流程、管轄機關、調解效力，以及調解不成後的訴訟途徑完整說明。",
    category: "rights",
    keywords: ["勞資調解", "勞資爭議", "調解申請", "勞動局", "免費調解"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "year-end-bonus",
    title: "年終獎金是法定的嗎？",
    description:
      "年終獎金是雇主義務還是恩惠？勞基法怎麼說？約定獎金 vs 恩惠性獎金的法律差異。",
    category: "salary",
    keywords: ["年終獎金", "年終", "法定獎金", "恩惠性給與", "勞基法"],
    publishedAt: "2026-04-07",
    readingMinutes: 5,
  },
  // — 第二批文章 —
  {
    slug: "remote-work-rights",
    title: "居家工作的勞基法權益：工時認定、加班費與出勤紀錄",
    description:
      "居家工作一樣適用勞基法。依勞基法第 30 條與勞動部「勞工在事業場所外工作時間指導原則」，說明哪些時間算工時、WFH 加班費怎麼算、出勤怎麼記錄、設備費用與職災認定。",
    category: "rights",
    keywords: ["居家工作", "遠距工作", "WFH", "居家加班費", "在家上班", "出勤紀錄"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-11-17",
    readingMinutes: 10,
  },
  {
    slug: "salary-tax-guide-2026",
    title: "2026 薪資報稅完全指南：稅級表、扣除額、節稅方法",
    description:
      "薪資所得稅怎麼算？2026 年綜所稅級距表、標準扣除額、特別扣除額完整說明，上班族報稅一次搞懂。",
    category: "salary",
    keywords: ["報稅", "薪資所得稅", "綜合所得稅", "稅級表", "扣除額", "節稅"],
    publishedAt: "2026-04-07",
    readingMinutes: 8,
  },
  {
    slug: "wage-theft-what-to-do",
    title: "老闆欠薪怎麼辦？7 步驟催討薪水完全指南",
    description:
      "遭遇欠薪、遲發薪水時的完整處理流程：證據保全、1955 專線、勞工局申訴、調解與訴訟途徑。",
    category: "rights",
    keywords: ["欠薪", "遲發薪水", "催討薪資", "積欠工資", "老闆不發薪水"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "nhi-supplement-premium",
    title: "二代健保補充保費完全攻略：什麼時候要繳？怎麼算？",
    description:
      "補充保費的觸發條件（獎金、租金、利息、股利）、費率 2.11%、計算方式與免扣門檻完整解說。",
    category: "insurance",
    keywords: ["補充保費", "二代健保", "獎金扣補充保費", "健保補充保費"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "old-vs-new-pension",
    title: "舊制 vs 新制勞退：差在哪？該怎麼選？",
    description:
      "勞退舊制與新制的資格條件、計算公式、可攜性、請領方式完整比較，幫你搞懂退休金制度。",
    category: "pension",
    keywords: ["舊制勞退", "新制勞退", "退休金比較", "勞退制度", "退休金怎麼算"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "side-job-tax-insurance",
    title: "副業收入怎麼報稅？兼職勞保健保完全指南",
    description:
      "斜槓族的稅務申報：執行業務所得 vs 薪資所得、多重投保規則、開發票與收據處理方式。",
    category: "freelance",
    keywords: ["副業報稅", "兼職", "斜槓", "副業勞保", "兼職所得稅"],
    publishedAt: "2026-04-07",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "workplace-harassment",
    title: "職場性騷擾怎麼處理？申訴流程與法律保障",
    description:
      "性別平等工作法下的職場性騷擾定義、雇主防治義務、內外部申訴管道、證據保全與賠償請求。",
    category: "rights",
    keywords: ["職場性騷擾", "性騷擾申訴", "性平法", "職場霸凌"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "overwork-karoshi",
    title: "過勞認定標準與職災申請：加班超時怎麼保護自己",
    description:
      "過勞（職業促發腦心血管疾病）認定基準、加班時數對照、職災給付申請流程與雇主法律責任。",
    category: "injury",
    keywords: ["過勞", "過勞死", "加班超時", "職業病", "腦心血管疾病"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "contract-vs-permanent",
    title: "定期契約 vs 不定期契約：差別在哪？權益比較",
    description:
      "定期與不定期勞動契約的法律差異、適用情境、自動轉換規則、資遣費與特休權益比較。",
    category: "hr",
    keywords: ["定期契約", "不定期契約", "勞動契約", "約聘", "臨時工"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "labor-inspection-guide",
    title: "勞動檢查來了怎麼辦？雇主與勞工都該知道的事",
    description:
      "勞動檢查的觸發原因、檢查項目、雇主文件義務、勞工匿名檢舉管道、常見違規與罰鍰。",
    category: "hr",
    keywords: ["勞動檢查", "勞檢", "檢舉雇主", "勞動局", "罰鍰"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  // — 第三批文章：高流量長尾關鍵字 —
  {
    slug: "labor-insurance-payout",
    title: "勞保老年給付怎麼算？一次領 vs 月領試算",
    description:
      "勞保老年給付的一次領與月領公式、計算範例、適用資格與選擇建議，幫你規劃退休現金流。",
    category: "pension",
    keywords: ["勞保老年給付", "勞保退休金", "勞保年金", "一次領月領"],
    publishedAt: "2026-04-09",
    readingMinutes: 8,
  },
  {
    slug: "quit-job-rights",
    title: "自願離職前必看：這 8 件事不能漏",
    description:
      "自願離職前的完整檢查清單：預告期、特休折算、失業給付影響、離職證明、勞保轉出等關鍵事項。",
    category: "severance",
    keywords: ["自願離職", "離職前注意", "自請離職", "離職流程"],
    publishedAt: "2026-04-09",
    readingMinutes: 7,
  },
  {
    slug: "night-shift-allowance",
    title: "夜班津貼合法嗎？夜班工時與加給完全指南",
    description:
      "夜間工作（22:00-06:00）的法律規範、夜班津貼是否強制、女性勞工夜間工作規定、輪班制勞工權益解析。",
    category: "rights",
    keywords: ["夜班津貼", "夜班工時", "輪班", "大夜班薪水"],
    publishedAt: "2026-04-09",
    readingMinutes: 7,
  },
  {
    slug: "layoff-compensation-comparison",
    title: "資遣費 vs 退職金 vs 離職金：差別在哪？",
    description:
      "資遣費、退職金、離職金三者定義、適用情境、稅務處理與給付標準的完整對照。",
    category: "severance",
    keywords: ["資遣費退職金", "退職金差別", "離職金", "資遣費退職金比較"],
    publishedAt: "2026-04-09",
    readingMinutes: 6,
  },
  {
    slug: "forced-overtime-illegal",
    title: "強迫加班違法嗎？加班上限與拒絕加班的權利",
    description:
      "勞基法規定的每月加班時數上限（46 小時），雇主能否強迫加班、拒絕加班的法律依據，以及違法加班的投訴管道。",
    category: "overtime",
    keywords: ["強迫加班", "拒絕加班", "加班上限", "加班時數規定", "不想加班"],
    publishedAt: "2026-04-10",
    readingMinutes: 6,
  },
  {
    slug: "salary-cut-rights",
    title: "雇主可以降薪嗎？被降薪的法律對策",
    description:
      "雇主單方面降薪是否合法？依勞基法第 11 條的規定，降薪需經勞工同意，否則勞工可主張資遣費並離職。",
    category: "rights",
    keywords: ["雇主降薪", "被降薪怎麼辦", "薪資被減少", "強制降薪合法嗎"],
    publishedAt: "2026-04-10",
    readingMinutes: 6,
  },
  {
    slug: "company-bankrupt-workers",
    title: "公司倒閉怎麼辦？勞工薪資與資遣費保障",
    description:
      "公司解散、破產、歇業時，勞工的薪資、資遣費、勞保如何保障？積欠工資墊償基金申請完整教學。",
    category: "severance",
    keywords: ["公司倒閉", "雇主倒閉", "積欠工資", "積欠薪資", "墊償基金"],
    publishedAt: "2026-04-10",
    readingMinutes: 7,
  },
  {
    slug: "holiday-overtime-complete",
    title: "國定假日加班費怎麼算？2026 放假日清單與計算表",
    description:
      "依勞基法第 37、39 條與紀念日及節日實施條例，整理國定假日清單、月薪制 8 小時內加給 1 日工資的算法、超過 8 小時與調移規定。",
    category: "overtime",
    keywords: ["國定假日加班", "過年加班費", "國慶日加班", "勞動節加班", "假日加班工資"],
    publishedAt: "2026-04-10",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "pension-account-query",
    title: "如何查詢勞退帳戶餘額？線上查詢完整教學",
    description:
      "透過勞動部勞工保險局官網，免費查詢個人勞退帳戶餘額與歷年提繳紀錄，3 分鐘完成線上申請。",
    category: "pension",
    keywords: ["勞退帳戶查詢", "勞退餘額", "個人退休金查詢", "勞退線上查詢"],
    publishedAt: "2026-04-10",
    readingMinutes: 5,
  },
  {
    slug: "employment-contract-traps",
    title: "勞動契約 5 大地雷條款，簽前必讀",
    description:
      "「試用期不保勞保」「競業禁止不給補償」「責任制不計加班費」等常見非法條款識別與應對方式。",
    category: "hr",
    keywords: ["勞動契約地雷", "不合理條款", "勞動契約違法", "簽約注意", "勞動契約問題"],
    publishedAt: "2026-04-10",
    readingMinutes: 7,
  },
  {
    slug: "annual-leave-refused",
    title: "老闆不讓請特休怎麼辦？拒絕特休違法嗎？",
    description:
      "雇主拒絕特休申請的法律依據與例外情形，員工可採取的行動步驟，以及未休完特休的折算權益。",
    category: "leave",
    keywords: ["特休被拒絕", "老闆不讓請假", "特休假被拒", "拒給特休違法"],
    publishedAt: "2026-04-10",
    readingMinutes: 6,
  },
  {
    slug: "part-time-health-insurance",
    title: "打工族健保怎麼保？4 種情況完整說明",
    description:
      "兼職打工的健保加保規定：雇主何時強制投保、如何以眷屬加保、工作多份的健保轉換注意事項。",
    category: "insurance",
    keywords: ["打工健保", "兼職健保", "部分工時健保", "打工加保", "兼差健保"],
    publishedAt: "2026-04-10",
    readingMinutes: 6,
  },
  {
    slug: "salary-negotiation-rights",
    title: "薪資談判的勞基法底線：這些雇主不能做",
    description:
      "薪資談判中雇主不得低於基本工資、不得因族群/性別差異薪資、不得以試用期為由低薪，勞工的法定談判底線。",
    category: "salary",
    keywords: ["薪資談判", "談薪水", "薪資歧視", "薪資底線", "基本工資談判"],
    publishedAt: "2026-04-10",
    readingMinutes: 6,
  },
  {
    slug: "involuntary-separation-certificate",
    title: "非自願離職證明拿不到怎麼辦？被資遣文件清單",
    description:
      "被資遣時非自願離職證明為什麼重要？整理申請失業給付前要確認的文件、常見錯誤文字與公司拒開時的處理方式。",
    category: "severance",
    keywords: ["非自願離職證明", "離職證明", "被資遣文件", "失業給付"],
    publishedAt: "2026-05-10",
    updatedAt: "2026-10-19",
    readingMinutes: 7,
  },
  {
    slug: "labor-nhi-bracket-guide",
    title: "2026 勞健保投保級距表與低報處理",
    description:
      "2026 年勞保（含就保）29,500～45,800 元、健保 29,500～219,500 元、勞退 1,500～150,000 元的分級表，說明級距怎麼套、被低報會少領多少，以及向公司與勞保局要求更正的方式。",
    category: "insurance",
    keywords: ["勞保級距", "健保級距", "投保薪資", "低報", "勞保費率", "投保金額"],
    publishedAt: "2026-07-03",
    updatedAt: "2026-11-17",
    readingMinutes: 10,
  },
  // — 第六批文章：原創深度文章 —
  {
    slug: "severance-calculation-complete",
    title: "資遣費與預告工資怎麼算：年資、月薪對照與完整案例",
    description:
      "新制與舊制資遣費公式、各年資與月薪的對照表、預告期與預告工資算法，附一個完整案例、拿不到資遣費的情形與被資遣後要拿的文件。",
    category: "severance",
    keywords: ["資遣費計算", "資遣費公式", "預告工資", "預告期", "新制資遣費", "非自願離職"],
    publishedAt: "2026-07-03",
    updatedAt: "2026-11-17",
    readingMinutes: 11,
  },
  {
    slug: "insurance-deduction-examples",
    title: "勞健保自付額計算：2026 各級距扣款與實領速查表",
    description:
      "2026 年勞保（含就保）12.5%、健保 5.17%，列出各投保級距的勞工與雇主負擔、眷屬加保保費，以及月薪 29,500 到 60,000 元的實領速查表。",
    category: "insurance",
    keywords: ["勞保自付額", "健保自付額", "勞健保扣款", "薪資單核對", "勞保級距", "健保級距", "實領金額"],
    publishedAt: "2026-07-03",
    updatedAt: "2026-11-17",
    readingMinutes: 7,
  },
];

export const ARTICLES: ArticleMeta[] = RAW_ARTICLES.map((article) => ({
  ...article,
  updatedAt: article.updatedAt ?? article.publishedAt,
  contentStatus: contentStatus(article.slug),
  noindex: article.noindex ?? getConsolidatedArticle(article.slug) !== undefined,
}));

export { isIndexableArticle };

export function getIndexableArticles(): ArticleMeta[] {
  return ARTICLES.filter(isIndexableArticle);
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: ArticleCategory,
): ArticleMeta[] {
  return getIndexableArticles().filter((a) => a.category === category);
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  salary: "薪資",
  overtime: "加班",
  leave: "假別",
  insurance: "勞健保",
  pension: "退休金",
  severance: "資遣離職",
  rights: "權益",
  injury: "職災",
  freelance: "自由工作",
  hr: "人資",
};

export function getAllCategories(): {
  category: ArticleCategory;
  label: string;
  count: number;
}[] {
  const counts = new Map<ArticleCategory, number>();
  for (const a of getIndexableArticles()) {
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  }
  return (
    Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]
  )
    .filter(([cat]) => (counts.get(cat) ?? 0) > 0)
    .map(([category, label]) => ({
      category,
      label,
      count: counts.get(category) ?? 0,
    }));
}
