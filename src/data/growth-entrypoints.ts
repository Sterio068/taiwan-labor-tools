export interface GrowthQuestion {
  question: string;
  answer: string;
  href: string;
  topic: string;
  toolHref?: string;
}

export interface ScenarioEntry {
  slug: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  steps: string[];
  links: { label: string; href: string }[];
}

export const GROWTH_QUESTIONS: GrowthQuestion[] = [
  {
    question: "月薪 30000 實領多少？",
    answer: "單身、不自提勞退時，主要扣款是勞保與健保；實際金額仍要看眷屬與自提比例。",
    href: "/articles/salary-30000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=30000",
  },
  {
    question: "月薪 35000 實領多少？",
    answer: "月薪 35,000 通常會落在 36,300 元附近的投保級距，實領要同時看勞保、健保與自提勞退。",
    href: "/articles/salary-35000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=35000",
  },
  {
    question: "月薪 38000 實領多少？",
    answer: "月薪 38,000 常見級距約在 38,200 元，單身不自提時主要扣勞保與健保，仍要核對薪資單。",
    href: "/articles/salary-38000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=38000",
  },
  {
    question: "月薪 50000 實領多少？",
    answer: "月薪 50,000 的健保與勞退級距通常比帳面薪資高一級，若有眷屬或自提會明顯影響實領。",
    href: "/articles/salary-50000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=50000",
  },
  {
    question: "平日加班 3 小時怎麼算？",
    answer: "前 2 小時按 4/3 倍，第 3 小時起按 5/3 倍，先用月薪換算時薪基數再分段計算。",
    href: "/articles/overtime-3hours-calculation",
    topic: "加班",
    toolHref: "/tools/overtime?h=3&ot=weekday",
  },
  {
    question: "平日加班 2.5 小時怎麼算？",
    answer: "前 2 小時按 4/3 倍，後 0.5 小時按 5/3 倍，不能全部用同一倍率粗算。",
    href: "/articles/overtime-2-5hours-calculation",
    topic: "加班",
    toolHref: "/tools/overtime?w=45000&h=2.5&ot=weekday",
  },
  {
    question: "國定假日上班要給雙倍嗎？",
    answer: "國定假日出勤原則上應加倍發給工資，排班制也不能用排班名義直接取消國定假日權益。",
    href: "/articles/holiday-overtime-complete",
    topic: "加班",
    toolHref: "/tools/overtime?ot=holiday",
  },
  {
    question: "工作 2 年被資遣可以拿多少？",
    answer: "新制通常是 1 個月平均工資的資遣費，還要另看預告工資、特休折現與非自願離職證明。",
    href: "/articles/severance-2years",
    topic: "資遣",
    toolHref: "/tools/severance",
  },
  {
    question: "工作 6 個月被資遣有資遣費嗎？",
    answer: "新制工作滿 6 個月通常已有資遣費，約為 0.25 個月平均工資，還要確認是否另有預告工資。",
    href: "/articles/severance-6months",
    topic: "資遣",
    toolHref: "/tools/severance",
  },
  {
    question: "非自願離職證明拿不到怎麼辦？",
    answer: "先保存資遣通知與對話紀錄，再向地方勞工局或就業服務機構詢問協助，避免被寫成自願離職。",
    href: "/articles/involuntary-separation-certificate",
    topic: "資遣",
    toolHref: "/tools/dispute-checker",
  },
  {
    question: "特休沒休完一定要折現嗎？",
    answer: "年度終結或契約終止時，未休特休通常應折算工資；公司不能只用內規讓特休歸零。",
    href: "/articles/unused-annual-leave-wage",
    topic: "特休",
    toolHref: "/tools/annual-leave",
  },
  {
    question: "離職前剩 3 天特休可以拿多少？",
    answer: "月薪制常見估算是月薪除以 30 再乘以未休天數，離職薪資結清時應一併確認。",
    href: "/articles/annual-leave-resignation-payout-example",
    topic: "特休",
    toolHref: "/tools/annual-leave",
  },
  {
    question: "勞保級距怎麼查？",
    answer: "勞保投保薪資按月薪總額歸級，若雇主低報，未來失業、傷病、老年給付都可能變少。",
    href: "/articles/labor-insurance-bracket-2026",
    topic: "勞健保",
    toolHref: "/tools/insurance-bracket",
  },
  {
    question: "健保眷屬為什麼讓扣款變多？",
    answer: "第 1 類受僱勞工的健保費會按本人加眷屬人數計收，最多計到 3 口眷屬。",
    href: "/articles/health-insurance-bracket-2026",
    topic: "勞健保",
    toolHref: "/tools/insurance-premium",
  },
  {
    question: "勞保低報怎麼申訴？",
    answer: "先用投保資料、薪資單與銀行入帳紀錄比對差異，再以書面要求說明或向主管機關詢問。",
    href: "/articles/labor-insurance-underreporting-complaint",
    topic: "勞健保",
    toolHref: "/tools/insurance-bracket",
  },
  {
    question: "勞退 6% 可以從薪水扣嗎？",
    answer: "雇主強制提繳的 6% 是雇主負擔，不能從原本約定薪資扣；只有勞工自願提繳才會扣薪。",
    href: "/articles/labor-pension-6-percent",
    topic: "勞退",
    toolHref: "/tools/pension",
  },
  {
    question: "薪資單看起來怪怪的先查哪裡？",
    answer: "先看應發總額、勞健保扣款、勞退自提、加班費與實領是否能互相對上。",
    href: "/articles/salary-slip-explained",
    topic: "薪資",
    toolHref: "/tools/salary",
  },
  {
    question: "月薪 42000 實領多少？",
    answer: "月薪 42,000 通常級距也會落在 42,000，單身不自提時可先估勞保與健保自付額。",
    href: "/articles/salary-42000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=42000",
  },
  {
    question: "月薪 55000 實領多少？",
    answer: "月薪 55,000 要注意勞保有上限，但健保與勞退級距仍會往上，雇主提繳 6% 不得扣薪。",
    href: "/articles/salary-55000-take-home",
    topic: "薪資",
    toolHref: "/tools/salary?m=55000",
  },
  {
    question: "加班費爭議要留什麼證據？",
    answer: "至少保存打卡、排班、主管訊息、系統交付紀錄與薪資單，才能把工時、指派與金額串起來。",
    href: "/articles/overtime-evidence-checklist",
    topic: "加班",
    toolHref: "/tools/overtime",
  },
];

export const SCENARIO_ENTRIES: ScenarioEntry[] = [
  {
    slug: "monthly-worker",
    title: "我是月薪族，想確認實領與扣款",
    description: "適合每月領固定薪資、想核對勞健保、勞退、自提與薪資單的人。",
    primaryHref: "/tools/salary",
    primaryLabel: "先算薪資明細",
    steps: ["輸入稅前月薪與眷屬人數", "核對勞保、健保、勞退級距", "保存薪資單與轉帳紀錄"],
    links: [
      { label: "月薪 35000 實領多少", href: "/articles/salary-35000-take-home" },
      { label: "月薪 42000 實領多少", href: "/articles/salary-42000-take-home" },
      { label: "薪資單完全解讀", href: "/articles/salary-slip-explained" },
      { label: "勞退 6% 是否能扣薪", href: "/articles/labor-pension-6-percent" },
    ],
  },
  {
    slug: "part-time-worker",
    title: "我是打工族，想確認時薪與假日出勤",
    description: "適合時薪制、排班制、餐飲零售與兼職工作者。",
    primaryHref: "/tools/hourly-monthly",
    primaryLabel: "換算時薪月薪",
    steps: ["確認時薪是否低於最低工資", "核對國定假日或休息日出勤", "保留排班與打卡紀錄"],
    links: [
      { label: "時薪 196 元合理嗎", href: "/articles/minimum-wage-hourly-2026" },
      { label: "打工族權益懶人包", href: "/articles/part-time-rights" },
      { label: "國定假日加班費", href: "/articles/holiday-overtime-complete" },
    ],
  },
  {
    slug: "laid-off",
    title: "我被資遣，想確認該拿的錢",
    description: "適合收到資遣通知、公司歇業、被要求簽離職文件的人。",
    primaryHref: "/tools/severance",
    primaryLabel: "試算資遣費",
    steps: ["確認終止理由與最後工作日", "拆開資遣費、預告工資、特休折現", "索取非自願離職證明"],
    links: [
      { label: "工作 2 年資遣費", href: "/articles/severance-2years" },
      { label: "工作 6 個月資遣費", href: "/articles/severance-6months" },
      { label: "非自願離職證明", href: "/articles/involuntary-separation-certificate" },
      { label: "失業給付怎麼領", href: "/articles/unemployment-benefits" },
    ],
  },
  {
    slug: "leave-before-resigning",
    title: "我準備離職，想確認特休與預告期",
    description: "適合自願離職、交接前想確認預告期、特休與薪資結清的人。",
    primaryHref: "/tools/notice-period",
    primaryLabel: "計算離職預告期",
    steps: ["用書面留下離職日期", "確認未休特休是否折現", "結清薪資、加班費與服務證明"],
    links: [
      { label: "自願離職前必看", href: "/articles/quit-job-rights" },
      { label: "離職前特休折現範例", href: "/articles/annual-leave-resignation-payout-example" },
      { label: "特休未休折現", href: "/articles/unused-annual-leave-wage" },
      { label: "離職要提前幾天", href: "/articles/resignation-notice" },
    ],
  },
  {
    slug: "overtime-dispute",
    title: "我有加班爭議，想保存證據",
    description: "適合被要求加班、加班費少給、責任制或遠距工時爭議。",
    primaryHref: "/tools/overtime",
    primaryLabel: "試算加班費",
    steps: ["確認當天是平日、休息日或國定假日", "整理打卡、排班、主管訊息", "用工具估算短少金額"],
    links: [
      { label: "平日加班 3 小時", href: "/articles/overtime-3hours-calculation" },
      { label: "加班費爭議證據清單", href: "/articles/overtime-evidence-checklist" },
      { label: "強迫加班違法嗎", href: "/articles/forced-overtime-illegal" },
      { label: "居家上班加班費", href: "/articles/work-from-home-overtime" },
    ],
  },
  {
    slug: "insurance-check",
    title: "我想查勞健保與勞退有沒有低報",
    description: "適合懷疑投保級距偏低、薪資單扣款不合理或雇主沒提繳勞退的人。",
    primaryHref: "/tools/insurance-bracket",
    primaryLabel: "查投保級距",
    steps: ["輸入實際月薪查三種級距", "核對薪資單與投保資料", "保留低報證據再申訴"],
    links: [
      { label: "勞保級距怎麼查", href: "/articles/labor-insurance-bracket-2026" },
      { label: "勞保低報怎麼申訴", href: "/articles/labor-insurance-underreporting-complaint" },
      { label: "健保級距怎麼看", href: "/articles/health-insurance-bracket-2026" },
      { label: "沒幫我保勞保", href: "/articles/no-labor-insurance" },
    ],
  },
];
