export interface HubLink {
  title: string;
  href: string;
  description?: string;
}

export interface GuideHub {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  emoji: string;
  keywords: string[];
  definition: string;
  tools: HubLink[];
  articles: HubLink[];
  steps: string[];
  faqs: { question: string; answer: string }[];
}

export const GUIDE_HUBS: GuideHub[] = [
  {
    slug: "salary",
    title: "台灣薪資完全指南 2026",
    shortTitle: "薪資與實領",
    description: "實領薪水、薪資單、最低工資、勞健保扣款與報稅一次整理。",
    emoji: "💰",
    keywords: ["薪資指南", "實領薪水", "薪資單", "最低工資", "勞健保扣款"],
    definition:
      "薪資與實領議題的核心，是把稅前月薪、勞保、健保、勞退、自提與所得稅拆開看，確認薪資單每一筆扣款都有法規依據。",
    tools: [
      { title: "薪資明細計算機", href: "/tools/salary", description: "月薪、勞健保、勞退、實領一次算" },
      { title: "薪資比較器", href: "/tools/salary-compare", description: "比較不同 offer 的實際待遇" },
      { title: "投保級距查詢", href: "/tools/insurance-bracket", description: "查勞保、健保、勞退級距" },
    ],
    articles: [
      { title: "2026 薪資單完全解讀", href: "/articles/salary-slip-explained" },
      { title: "最低工資 29,500：2026 新制影響", href: "/articles/minimum-wage-2026" },
      { title: "勞健保自付額與實領速查表（月薪 29,500～60,000）", href: "/articles/insurance-deduction-examples" },
      { title: "2026 勞健保投保級距對照", href: "/articles/labor-nhi-bracket-guide" },
      { title: "勞退自提 6% 值得嗎？", href: "/articles/pension-voluntary" },
      { title: "減薪合法嗎？", href: "/articles/salary-cut-rights" },
      { title: "2026 薪資報稅完全指南", href: "/articles/salary-tax-guide-2026" },
    ],
    steps: ["先確認月薪與固定津貼", "查投保級距", "核對勞健保扣款", "確認勞退 6% 沒被扣薪", "保存薪資單與轉帳紀錄"],
    faqs: [
      { question: "薪資單最先要看哪裡？", answer: "先看稅前總額、勞保、健保、勞退自提、加班費與實領金額是否一致。" },
      { question: "勞退 6% 是扣我的薪水嗎？", answer: "雇主提繳的 6% 不得從薪水扣除；只有自願提繳才會從薪水扣。" },
    ],
  },
  {
    slug: "overtime",
    title: "加班費與工時指南 2026",
    shortTitle: "加班費與工時",
    description: "平日、休息日、國定假日、責任制與工時上限完整整理。",
    emoji: "⏱️",
    keywords: ["加班費指南", "工時", "休息日加班", "責任制", "勞基法第24條"],
    definition:
      "加班費是勞工在正常工時外提供勞務時，雇主依法應加給的工資；倍率會依平日、休息日、國定假日與例假日而不同。",
    tools: [
      { title: "加班費計算機", href: "/tools/overtime", description: "輸入月薪與時數，自動算加班費" },
      { title: "時薪月薪換算", href: "/tools/hourly-monthly", description: "找出加班費時薪基數" },
      { title: "勞工權益健檢", href: "/tools/rights-check", description: "檢查工時與加班是否異常" },
    ],
    articles: [
      { title: "加班費怎麼算？完整圖解", href: "/articles/overtime-pay-guide" },
      { title: "加班費速查表：5 種月薪 × 平日、休息日、國定假日", href: "/articles/overtime-calculation-examples" },
      { title: "國定假日加班費與放假日清單", href: "/articles/holiday-overtime-complete" },
      { title: "加班費還是補休？", href: "/articles/overtime-pay-vs-compensatory-leave" },
      { title: "強迫加班違法嗎？", href: "/articles/forced-overtime-illegal" },
      { title: "責任制合法嗎？", href: "/articles/exempt-employee" },
      { title: "居家工作加班怎麼算？", href: "/articles/work-from-home-overtime" },
    ],
    steps: ["確認當日類型", "用月薪換算時薪基數", "套用法定倍率", "核對出勤紀錄", "保留排班與對話紀錄"],
    faqs: [
      { question: "公司規定加班要事前申請，沒申請就不算嗎？", answer: "公司可以訂加班申請流程，但若主管明知你在加班、指派工作或接受你下班後交付的成果，仍可能被認定為加班。出勤紀錄記載的時間，在勞動訴訟中推定為經雇主同意的工作時間。" },
      { question: "每月加班超過 46 小時，超過的部分就不用給加班費嗎？", answer: "不是。超過上限是雇主違反工時規定，會被裁罰；但勞工已經提供勞務，超過的時數仍應依法計給加班費。" },
      { question: "休息日加班 1 小時只算 1 小時嗎？", answer: "是。107 年 3 月 1 日修法後，休息日加班依實際出勤時數計算，不再有「不滿 4 小時以 4 小時計」的規定；但第 1–2 小時另再加給 1⅓ 倍，比平日加班高。" },
      { question: "公司說責任制就不用加班費，可以嗎？", answer: "不一定。責任制須符合特定職類、書面約定並報主管機關核備。" },
    ],
  },
  {
    slug: "severance",
    title: "離職資遣指南 2026",
    shortTitle: "資遣與離職",
    description: "資遣費、預告期、非自願離職證明、失業給付與自救流程。",
    emoji: "📋",
    keywords: ["資遣指南", "資遣費", "非自願離職", "失業給付", "離職預告"],
    definition:
      "資遣是雇主因法定事由終止勞動契約，除應給付資遣費外，也可能涉及預告工資、未休特休折現與非自願離職證明。",
    tools: [
      { title: "資遣費計算機", href: "/tools/severance" },
      { title: "離職預告期計算", href: "/tools/notice-period" },
      { title: "勞資爭議檢查器", href: "/tools/dispute-checker" },
    ],
    articles: [
      { title: "被資遣了怎麼辦？", href: "/articles/fired-what-to-do" },
      { title: "資遣費完整計算與年資速查表", href: "/articles/severance-calculation-complete" },
      { title: "資遣費、預告工資與特休折現", href: "/articles/severance-pay-notice-wages" },
      { title: "非自願離職證明怎麼拿？", href: "/articles/involuntary-separation-certificate" },
      { title: "失業給付怎麼領？", href: "/articles/unemployment-benefits" },
      { title: "被資遣和自請離職的差別", href: "/articles/layoff-compensation-comparison" },
      { title: "公司倒閉時勞工的權益", href: "/articles/company-bankrupt-workers" },
      { title: "離職要提前幾天？", href: "/articles/resignation-notice" },
    ],
    steps: ["先確認終止理由", "計算資遣費與預告工資", "索取非自願離職證明", "確認勞健保退保日", "必要時申請勞資調解"],
    faqs: [
      { question: "被資遣一定可以領失業給付嗎？", answer: "需符合非自願離職、就業保險年資等條件，並依就服站規定辦理。" },
      { question: "資遣費可以用底薪算嗎？", answer: "通常應以平均工資計算，不能只用被壓低的底薪。" },
    ],
  },
  {
    slug: "leave",
    title: "特休與請假指南 2026",
    shortTitle: "特休與請假",
    description: "特休、病假、事假、產假、育嬰留停與未休折現。",
    emoji: "🏖️",
    keywords: ["特休指南", "請假規定", "病假", "產假", "育嬰假"],
    definition:
      "特休與請假規則決定勞工能否依法休息、是否有薪，以及年度終結或離職時未休假是否折算工資。",
    tools: [
      { title: "特休天數計算", href: "/tools/annual-leave" },
      { title: "產假育嬰假計算", href: "/tools/maternity" },
      { title: "薪資明細計算機", href: "/tools/salary" },
    ],
    articles: [
      { title: "2026 特休假完整攻略", href: "/articles/annual-leave-2026" },
      { title: "到職滿 6 個月有幾天特休？", href: "/articles/annual-leave-after-6months" },

      { title: "公司拒絕特休怎麼辦？", href: "/articles/annual-leave-refused" },
      { title: "病假扣薪合法嗎？", href: "/articles/sick-leave-pay" },
      { title: "產假、陪產假、育嬰假一次搞懂", href: "/articles/maternity-leave-guide" },
    ],
    steps: ["確認到職日", "查年資對應天數", "保存請假申請紀錄", "年度終結核對未休天數", "離職時確認折現"],
    faqs: [
      { question: "請病假需要附診斷證明嗎？", answer: "勞工請假規則第 10 條規定，雇主可要求勞工提出有關證明文件；普通傷病假是否一律要診斷證明，依工作規則規定。請假時可先確認公司規定，保留就醫收據也有幫助。" },
      { question: "婚假一定要在結婚當天前後請嗎？", answer: "勞工請假規則規定婚假 14 日、工資照給。實務上婚假原則上應在結婚之日前 10 日起 3 個月內請畢，經雇主同意可延長至 1 年內請畢，詳細以勞動部解釋與工作規則為準。" },
      { question: "家庭照顧假會扣全勤嗎？", answer: "家庭照顧假併入事假計算、薪資依事假規定，但性別平等工作法第 21 條規定雇主不得因此視為缺勤而影響全勤獎金或考績。" },
      { question: "特休日期誰決定？", answer: "原則上由勞工排定，雇主只能在影響營運時與勞工協商調整。" },
      { question: "特休沒休完可以歸零嗎？", answer: "年度終結或契約終止時，未休特休應折算工資。" },
    ],
  },
  {
    slug: "insurance",
    title: "勞健保與勞退攻略 2026",
    shortTitle: "勞健保與勞退",
    description: "勞保、健保、勞退、投保級距、補充保費與低報檢查。",
    emoji: "🛡️",
    keywords: ["勞健保攻略", "勞保費", "健保費", "勞退", "投保級距"],
    definition:
      "勞健保與勞退是台灣受僱者最重要的社會保障，會影響每月扣款、雇主成本、失業給付、職災給付與退休金。",
    tools: [
      { title: "勞健保保費計算", href: "/tools/insurance-premium" },
      { title: "投保級距查詢", href: "/tools/insurance-bracket" },
      { title: "勞退退休金試算", href: "/tools/pension" },
    ],
    articles: [
      { title: "勞保 vs 國保 vs 農保", href: "/articles/labor-insurance-comparison" },
      { title: "2026 勞保投保級距怎麼看？", href: "/articles/labor-insurance-bracket-2026" },
      { title: "2026 勞健保投保級距對照表", href: "/articles/labor-nhi-bracket-guide" },
      { title: "勞退 6% 是什麼？", href: "/articles/labor-pension-6-percent" },
      { title: "沒幫我保勞保怎麼辦？", href: "/articles/no-labor-insurance" },
      { title: "二代健保補充保費完全攻略", href: "/articles/nhi-supplement-premium" },
      { title: "怎麼查勞退帳戶？", href: "/articles/pension-account-query" },
      { title: "舊制 vs 新制勞退", href: "/articles/old-vs-new-pension" },
    ],
    steps: ["確認實際月薪", "查三種投保級距", "核對薪資單扣款", "檢查雇主提繳 6%", "低報時保存證據"],
    faqs: [
      { question: "勞保與健保級距一樣嗎？", answer: "不一樣。勞保、健保、勞退各有不同級距表與上限。" },
      { question: "雇主低報薪資會怎樣？", answer: "可能降低未來失業、傷病、生育與老年給付，應盡快更正或申訴。" },
    ],
  },
  {
    slug: "disputes",
    title: "勞資爭議與申訴指南 2026",
    shortTitle: "勞資爭議",
    description: "欠薪、違法加班、未投保、霸凌、調解與勞動檢查流程。",
    emoji: "⚖️",
    keywords: ["勞資爭議", "勞工申訴", "勞資調解", "欠薪", "勞動檢查"],
    definition:
      "勞資爭議處理的重點，是先保全證據，再選擇申訴、調解、勞動檢查或法律程序，避免只靠口頭爭執。",
    tools: [
      { title: "勞資爭議檢查器", href: "/tools/dispute-checker" },
      { title: "勞工權益健檢", href: "/tools/rights-check" },
      { title: "資遣費計算機", href: "/tools/severance" },
    ],
    articles: [
      { title: "老闆欠薪怎麼辦？", href: "/articles/wage-theft-what-to-do" },
      { title: "勞資調解怎麼申請？", href: "/articles/labor-mediation" },
      { title: "勞動檢查來了怎麼辦？", href: "/articles/labor-inspection-guide" },
      { title: "勞保被低報：級距表與更正方式", href: "/articles/labor-insurance-bracket-2026" },
      { title: "公司倒閉、欠薪怎麼辦", href: "/articles/company-bankrupt-workers" },
      { title: "職場霸凌與騷擾怎麼辦？", href: "/articles/workplace-harassment" },
    ],
    steps: ["保留薪資單與對話紀錄", "整理時間線", "先用工具確認可能權益", "向勞工局申訴或調解", "必要時諮詢律師"],
    faqs: [
      { question: "申訴會被公司知道是我嗎？", answer: "勞基法第 74 條規定主管機關對申訴人身分資料應嚴守秘密，雇主也不得因申訴而解僱、降調或減薪；違反者該處分無效。" },
      { question: "調解要請律師嗎？", answer: "勞資爭議調解不需要律師，勞工可以自己出席，也可以委任代理人。若金額大或涉及解僱效力，可先向法律扶助基金會或縣市勞工局的法律諮詢服務詢問。" },
      { question: "已經離職很久還能主張嗎？", answer: "工資、加班費等定期給付的請求權時效為 5 年。離職後仍可主張，但越早整理證據越好。" },
      { question: "申請勞資調解要錢嗎？", answer: "多數縣市勞工局提供免費勞資爭議調解服務。" },
      { question: "只有口頭約定可以申訴嗎？", answer: "可以，但最好補強薪資轉帳、出勤、通訊紀錄等證據。" },
    ],
  },
];

export function getGuideHub(slug: string) {
  return GUIDE_HUBS.find((hub) => hub.slug === slug);
}
