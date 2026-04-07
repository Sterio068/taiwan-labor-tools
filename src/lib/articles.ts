import type { ArticleMeta, ArticleCategory } from "@/types";

export const ARTICLES: ArticleMeta[] = [
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
    title: "加班費怎麼算？平日/休息日/國定假日完整圖解",
    description:
      "依勞基法第 24 條，圖解平日加班 1.34 倍與 1.67 倍、休息日、國定假日加班費計算方式，附實際算例。",
    category: "overtime",
    keywords: ["加班費", "加班費計算", "休息日加班", "國定假日加班", "勞基法第24條"],
    publishedAt: "2026-04-07",
    readingMinutes: 8,
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
    title: "2026 特休假完整攻略：年資對照＋未休折算",
    description:
      "依勞基法第 38 條，年資對照特休天數一覽表，未休完可折算工資，附到職日自動計算教學。",
    category: "leave",
    keywords: ["特休", "年假", "特休天數", "未休折算", "勞基法第38條"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
  },
  {
    slug: "labor-insurance-comparison",
    title: "勞保 vs 國保 vs 農保：差在哪一次搞懂",
    description:
      "比較勞工保險、國民年金保險、農民保險的投保資格、保費、給付項目差異，幫你選對保險。",
    category: "insurance",
    keywords: ["勞保", "國保", "農保", "社會保險", "投保資格", "保險比較"],
    publishedAt: "2026-04-07",
    readingMinutes: 7,
  },
  {
    slug: "pension-voluntary",
    title: "勞退自提 6% 到底要不要？節稅效果試算",
    description:
      "勞退自願提繳 6% 的節稅效果有多大？依不同月薪級距試算，分析自提的優缺點與適合族群。",
    category: "pension",
    keywords: ["勞退自提", "自願提繳", "節稅", "退休金", "勞退新制"],
    publishedAt: "2026-04-07",
    readingMinutes: 6,
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
      "打工族必看：2026 基本時薪 190 元、加班費、勞健保、特休假、國定假日出勤等權益完整整理。",
    category: "rights",
    keywords: ["時薪", "打工", "兼職", "基本時薪", "打工權益"],
    publishedAt: "2026-04-07",
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
    slug: "minimum-wage-2026",
    title: "最低工資 29,500：2026 新制影響",
    description:
      "2026 年基本工資調整為月薪 29,500 元、時薪 190 元，對勞健保保費、加班費基數的連動影響。",
    category: "salary",
    keywords: ["基本工資", "最低工資", "基本工資2026", "時薪190", "月薪29500"],
    publishedAt: "2026-04-07",
    readingMinutes: 5,
  },
  {
    slug: "sick-leave-pay",
    title: "病假扣薪合法嗎？各假別薪資規定",
    description:
      "普通傷病假半薪、事假無薪、公假全薪⋯⋯各假別的薪資規定一次整理，搞懂請假到底扣多少。",
    category: "leave",
    keywords: ["病假", "病假扣薪", "事假", "請假薪資", "半薪"],
    publishedAt: "2026-04-07",
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
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: ArticleCategory,
): ArticleMeta[] {
  return ARTICLES.filter((a) => a.category === category);
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
  for (const a of ARTICLES) {
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
