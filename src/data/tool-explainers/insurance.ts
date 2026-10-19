import { LABOR_CONSTANTS } from "@/data/constants";
import { findLaborInsuranceBracket, findNhiBracket, findPensionBracket } from "@/lib/calculations/bracket-lookup";
import { calculateLaborInsurance } from "@/lib/calculations/labor-insurance";
import { calculateNhi } from "@/lib/calculations/nhi";
import { calculatePension, projectPension } from "@/lib/calculations/pension";
import { calculateSalaryBreakdown } from "@/lib/calculations/salary-breakdown";
import { calculateWorkInjury } from "@/lib/calculations/work-injury";
import { formatMoney } from "@/lib/format";
import { CHECKED_AT, lawArticleUrl, PCODE, type ToolExplainerContent } from "./types";

const lsa = (article: string) => lawArticleUrl(PCODE.laborStandards, article);
const lia = (article: string) => lawArticleUrl(PCODE.laborInsurance, article);
const nhiAct = (article: string) => lawArticleUrl(PCODE.nhi, article);
const pensionAct = (article: string) => lawArticleUrl(PCODE.laborPension, article);

const BLI_RATE_URL = "https://www.bli.gov.tw/0005478.html";
const BLI_EMPLOYMENT_INSURANCE_URL = "https://www.bli.gov.tw/0006443.html";
const BLI_BRACKET_URL = "https://www.bli.gov.tw/0100493.html";
const NHI_BRACKET_URL = "https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html";
const BLI_PENSION_BRACKET_URL = "https://www.bli.gov.tw/0013083.html";
const BLI_BIRTH_SUBSIDY_URL = "https://www.bli.gov.tw/0109618.html";

const pct = (value: number) => `${Math.round(value * 10_000) / 100}%`;
const liRate = pct(LABOR_CONSTANTS.laborInsuranceRate);
const nhiRate = pct(LABOR_CONSTANTS.nhiRate);
const liMax = LABOR_CONSTANTS.laborInsuranceBrackets[LABOR_CONSTANTS.laborInsuranceBrackets.length - 1];
const nhiMax = LABOR_CONSTANTS.nhiBrackets[LABOR_CONSTANTS.nhiBrackets.length - 1];
const pensionMax = LABOR_CONSTANTS.pensionBrackets[LABOR_CONSTANTS.pensionBrackets.length - 1];

const salary45k = calculateSalaryBreakdown(45_000, 1, 0);
const salary60k = calculateSalaryBreakdown(60_000, 0, 0.06);

const salary: ToolExplainerContent = {
  heading: "薪資明細計算機算的是什麼",
  intro: [
    "輸入稅前月薪、健保眷屬人數與勞退自提比例，計算機會依 2026 年的投保級距與費率，拆出勞保、就業保險、健保自付額與勞退自提，算出每月實際入帳金額，同時列出雇主為你負擔的保險費與 6% 勞退，讓你看懂公司的人事成本。",
    `勞保與就保合計費率 ${liRate}（普通事故保險 11.5% 加就業保險 1%），一般受僱勞工自付 20%、雇主 70%、政府 10%；健保費率 ${nhiRate}，本人與每位眷屬各自付 30%，眷屬超過 3 口以 3 口計。這些保費不是用實際月薪直接相乘，而是先對照投保薪資分級表，找到大於或等於月薪的最近一級。`,
    "雇主每月另依勞退月提繳分級表提繳 6% 到你的勞退個人專戶，這筆錢不從薪水扣；你也可以自願提繳 0% 至 6%，自提金額不計入當年度薪資所得課稅。所得稅預扣、補充保費、福利金、借支等項目因人而異，計算機沒有納入。",
  ],
  legalBasis: [
    {
      label: "勞工保險局：保險費費率及負擔比例",
      text: "自 114 年 1 月 1 日起勞工保險保險費率實收 11.5%；一般受僱者勞工負擔 20%、投保單位 70%、政府 10%。",
      url: BLI_RATE_URL,
    },
    {
      label: "勞工保險局：就業保險保險費",
      text: "就業保險保險費按月投保薪資 1% 計收，負擔比例與勞保相同。",
      url: BLI_EMPLOYMENT_INSURANCE_URL,
    },
    {
      label: "勞工保險條例第 14 條",
      text: "月投保薪資由投保單位按勞工的月薪資總額，依投保薪資分級表申報。",
      url: lia("14"),
    },
    {
      label: "全民健康保險法第 18 條、第 27 條",
      text: "保費依投保金額乘以費率計算，眷屬超過 3 口以 3 口計；受僱者自付 30%、投保單位 60%、政府 10%。",
      url: nhiAct("27"),
    },
    {
      label: "勞工退休金條例第 14 條",
      text: "雇主提繳不得低於每月工資 6%；勞工可在 6% 範圍內自願提繳，且不計入提繳年度薪資所得課稅。",
      url: pensionAct("14"),
    },
  ],
  examples: [
    {
      title: "試算範例一：月薪 45,000 元、健保加保 1 位眷屬",
      scenario: "小吳月薪 45,000 元（含固定津貼），健保依附 1 位無工作的配偶，沒有勞退自提。",
      steps: [
        `勞保級距 ${formatMoney(salary45k.laborInsuranceBracket)} 元：${formatMoney(salary45k.laborInsuranceBracket)} × ${liRate} × 20% ≈ ${formatMoney(salary45k.laborInsurance)} 元。`,
        `健保級距 ${formatMoney(salary45k.nhiBracket)} 元：${formatMoney(salary45k.nhiBracket)} × ${nhiRate} × 30% × (本人 + 1 位眷屬) ≈ ${formatMoney(salary45k.nhi)} 元。`,
        `扣款合計 ${formatMoney(salary45k.totalDeductions)} 元。`,
        `雇主另外負擔勞保、健保與 6% 勞退 ${formatMoney(salary45k.pensionEmployer)} 元，總人事成本約 ${formatMoney(salary45k.employerCost)} 元。`,
      ],
      result: `每月實領約 ${formatMoney(salary45k.netSalary)} 元（未含所得稅預扣）。`,
    },
    {
      title: "試算範例二：月薪 60,000 元、勞退自提 6%",
      scenario: "想知道自提 6% 後每月少領多少。",
      steps: [
        `勞保已達投保上限 ${formatMoney(liMax)} 元，自付 ${formatMoney(salary60k.laborInsurance)} 元。`,
        `健保級距 ${formatMoney(salary60k.nhiBracket)} 元，本人自付 ${formatMoney(salary60k.nhi)} 元。`,
        `勞退級距 ${formatMoney(salary60k.pensionBracket)} 元，自提 6% = ${formatMoney(salary60k.pensionWorker)} 元，與雇主提繳的 ${formatMoney(salary60k.pensionEmployer)} 元一起進入個人專戶。`,
      ],
      result: `每月實領約 ${formatMoney(salary60k.netSalary)} 元；自提的 ${formatMoney(salary60k.pensionWorker * 12)} 元／年不計入當年度薪資所得。`,
    },
  ],
  mistakes: [
    {
      title: "直接用月薪乘以費率",
      body: "保費要先對照級距。月薪 45,000 元的勞保與健保都用 45,800 元級距計算；用 45,000 元直接乘，會和薪資單上的數字對不起來。",
    },
    {
      title: "以為 6% 勞退是從薪水扣的",
      body: "雇主提繳的 6% 是雇主的法定負擔，不能從工資扣除。薪資單上若出現「勞退 6%」扣款，而你沒有申請自提，就應向公司確認或向勞工局申訴。",
    },
    {
      title: "投保級距低於實際薪資",
      body: "雇主少報投保薪資（俗稱高薪低報）可以省保費，但會讓你的失業給付、傷病給付、生育給付與勞保老年年金一起變少。拿薪資單和勞保局 e 化服務系統的投保紀錄比對，就能發現。",
    },
    {
      title: "眷屬人數算超過 3 口",
      body: "健保眷屬自付保費最多計 3 口，第 4 位以後的眷屬不會再增加你的健保扣款。",
    },
  ],
  prepare: ["最近一張薪資單（看投保級距與各項扣款）。", "健保依附眷屬人數。", "是否有申請勞退自提及比例。"],
  readNext: [
    { label: "薪資單逐項說明", href: "/articles/salary-slip-explained" },
    { label: "勞健保扣款試算範例", href: "/articles/insurance-deduction-examples" },
    { label: "勞退自提 6% 值得嗎", href: "/articles/labor-pension-6-percent" },
    { label: "薪資完整指南", href: "/guides/salary" },
  ],
  checkedAt: CHECKED_AT,
};

const premium38k = { li: calculateLaborInsurance(38_000), nhi: calculateNhi(38_000, 2) };

const insurancePremium: ToolExplainerContent = {
  heading: "勞健保保費計算機算的是什麼",
  intro: [
    "這個工具把勞保（含就業保險）與健保拆開計算，同時列出勞工、雇主與政府各負擔多少。適合核對薪資單扣款、估算眷屬加保後的變化，或是在談薪時了解公司的實際保費成本。",
    `2026 年勞保投保薪資最低一級為 ${formatMoney(LABOR_CONSTANTS.laborInsuranceBrackets[0])} 元、最高 ${formatMoney(liMax)} 元；健保投保金額最高 ${formatMoney(nhiMax)} 元。月薪超過勞保上限時，勞保費固定在上限計算，但健保仍會隨薪資級距往上調。`,
    `雇主的健保負擔不是按你實際的眷屬人數計算，而是乘上健保署公告的平均眷口數（目前為 ${LABOR_CONSTANTS.nhiAverageDependentCount}）。職業災害保險費則全部由雇主負擔，費率依行業別不同，這個工具沒有列入勞工自付額。`,
  ],
  legalBasis: [
    {
      label: "勞工保險條例第 13 條、第 15 條",
      text: "普通事故保險費率依法逐步調整；受僱勞工的普通事故保險費由勞工負擔 20%、投保單位 70%、政府 10%，職災保險費全部由投保單位負擔。",
      url: lia("15"),
    },
    {
      label: "勞工保險局：保險費費率及負擔比例",
      text: "自 114 年 1 月 1 日起勞工保險保險費率實收 11.5%，就業保險另計 1%。",
      url: BLI_RATE_URL,
    },
    {
      label: "勞工保險局：投保薪資分級表",
      text: "115 年 1 月 1 日起適用的勞保、就保投保薪資級距。",
      url: BLI_BRACKET_URL,
    },
    {
      label: "全民健康保險法第 18 條、第 27 條",
      text: "眷屬保費由被保險人繳納、超過 3 口以 3 口計；受僱者自付 30%、投保單位 60%、政府 10%。",
      url: nhiAct("18"),
    },
    {
      label: "健保署：投保金額分級表與保費計算公式",
      text: "115 年 1 月 1 日生效的投保金額級距，以及一般保險費計算公式。",
      url: NHI_BRACKET_URL,
    },
  ],
  examples: [
    {
      title: "試算範例：月薪 38,000 元、健保加保 2 位眷屬",
      scenario: "小鄭月薪 38,000 元，配偶與一名子女依附健保。",
      steps: [
        `勞保（含就保）級距 ${formatMoney(premium38k.li.bracket)} 元，總保費 ${formatMoney(premium38k.li.total)} 元：勞工 ${formatMoney(premium38k.li.workerShare)} 元、雇主 ${formatMoney(premium38k.li.employerShare)} 元、政府 ${formatMoney(premium38k.li.govShare)} 元。`,
        `健保級距 ${formatMoney(premium38k.nhi.bracket)} 元，每人自付 ${formatMoney(premium38k.nhi.workerShare)} 元，本人加 2 位眷屬共 ${formatMoney(premium38k.nhi.workerShareWithDependents)} 元。`,
        `雇主健保負擔 = ${formatMoney(premium38k.nhi.bracket)} × ${nhiRate} × 60% × (1 + ${LABOR_CONSTANTS.nhiAverageDependentCount}) ≈ ${formatMoney(premium38k.nhi.employerShare)} 元。`,
      ],
      result: `小鄭每月勞健保自付合計約 ${formatMoney(premium38k.li.workerShare + premium38k.nhi.workerShareWithDependents)} 元。`,
    },
  ],
  mistakes: [
    {
      title: "把勞保費率寫成 11.5% 含就保",
      body: "11.5% 是勞保普通事故保險費率，就業保險 1% 另外計收，合計 12.5%。兩者在薪資單上常合併成一筆「勞保費」。",
    },
    {
      title: "只看勞保、忽略健保上限較高",
      body: `勞保上限 ${formatMoney(liMax)} 元，但健保上限到 ${formatMoney(nhiMax)} 元。高薪者的勞保費不會再增加，健保費仍會隨級距上升。`,
    },
    {
      title: "調薪後級距沒有跟著調整",
      body: "投保單位應依勞工月薪資總額申報。調薪後幾個月薪資單的保費都沒變，可以請公司確認是否已辦理投保薪資調整。",
    },
  ],
  prepare: ["薪資單上的勞保、健保扣款與投保金額。", "健保依附眷屬人數。", "勞保局 e 化服務系統或健保快易通 App 的投保紀錄。"],
  readNext: [
    { label: "2026 勞保投保級距表", href: "/articles/labor-insurance-bracket-2026" },
    { label: "2026 健保投保級距表", href: "/articles/health-insurance-bracket-2026" },
    { label: "勞保被低報怎麼申訴", href: "/articles/labor-insurance-underreporting-complaint" },
    { label: "勞健保完整攻略", href: "/guides/insurance" },
  ],
  checkedAt: CHECKED_AT,
};

const bracketSample = 41_000;

const insuranceBracket: ToolExplainerContent = {
  heading: "投保級距查詢工具算的是什麼",
  intro: [
    "輸入月薪，工具會同時找出勞保（含就保）、健保與勞退三種分級表中對應的級距。三張表的級距與上限不同，所以同一份薪水在三種保險可能落在不同金額。",
    `級距的規則是「找到大於或等於月薪的最近一級」。2026 年勞保最高 ${formatMoney(liMax)} 元、健保最高 ${formatMoney(nhiMax)} 元、勞退月提繳工資最高 ${formatMoney(pensionMax)} 元。最低一級與最低工資 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元連動，全時勞工不能低於這一級。`,
    "月薪資總額包含本薪與每月經常性給付的津貼、加給。查到的級距若明顯低於薪資單上的實際薪資，就要留意是否有低報投保薪資的情形。",
  ],
  legalBasis: [
    {
      label: "勞工保險條例第 14 條",
      text: "投保單位應按被保險人的月薪資總額，依投保薪資分級表申報月投保薪資。",
      url: lia("14"),
    },
    {
      label: "勞工保險局：投保薪資分級表",
      text: "115 年 1 月 1 日起適用之勞工保險投保薪資級距。",
      url: BLI_BRACKET_URL,
    },
    {
      label: "健保署：投保金額分級表",
      text: "115 年 1 月 1 日生效之健保投保金額級距。",
      url: NHI_BRACKET_URL,
    },
    {
      label: "勞工保險局：勞工退休金月提繳工資分級表",
      text: "115 年 1 月 1 日生效之勞退月提繳工資分級表。",
      url: BLI_PENSION_BRACKET_URL,
    },
  ],
  examples: [
    {
      title: `試算範例：月薪 ${formatMoney(bracketSample)} 元落在哪一級？`,
      scenario: "本薪 38,000 元加上每月固定的職務加給 3,000 元。",
      steps: [
        `月薪資總額：38,000 + 3,000 = ${formatMoney(bracketSample)} 元。`,
        `勞保／就保：大於等於 ${formatMoney(bracketSample)} 的最近一級是 ${formatMoney(findLaborInsuranceBracket(bracketSample))} 元。`,
        `健保：${formatMoney(findNhiBracket(bracketSample))} 元；勞退：${formatMoney(findPensionBracket(bracketSample))} 元。`,
        "若公司只用本薪 38,000 元申報，勞保級距會落在 38,200 元，屬於少報。",
      ],
      result: `三種保險都應以 ${formatMoney(findLaborInsuranceBracket(bracketSample))} 元左右的級距投保，而不是只看本薪。`,
    },
  ],
  mistakes: [
    {
      title: "只用本薪申報",
      body: "固定津貼、職務加給屬於月薪資總額的一部分，應一併申報。只用本薪申報會讓你未來的各項給付變少。",
    },
    {
      title: "以為三種保險級距一定相同",
      body: "勞保有上限、健保與勞退的級距更細，上限也不同。例如月薪 60,000 元，勞保仍是上限級距，健保與勞退則是 60,800 元。",
    },
    {
      title: "兼職或試用期投保最低級距",
      body: "部分工時勞工可依實際薪資適用較低的部分工時級距，但全時勞工不能因為試用期就投保最低級距；應依約定薪資申報。",
    },
  ],
  prepare: ["薪資單上的本薪與固定津貼。", "勞保局 e 化服務系統的投保薪資紀錄。", "健保快易通 App 的投保金額。"],
  readNext: [
    { label: "2026 勞保級距表", href: "/articles/labor-insurance-bracket-2026" },
    { label: "勞健保級距一次看懂", href: "/articles/labor-nhi-bracket-guide" },
    { label: "勞保低報申訴步驟", href: "/articles/labor-insurance-underreporting-complaint" },
  ],
  checkedAt: CHECKED_AT,
};

const pension45k = calculatePension(45_000, 0.06);
const projection = projectPension(45_000, 30, 65, 0.03, 0);
const projectionWithVoluntary = projectPension(45_000, 30, 65, 0.03, 0.06);

const pension: ToolExplainerContent = {
  heading: "勞退退休金試算算的是什麼",
  intro: [
    "勞退新制是「個人專戶制」：雇主每月依勞退月提繳分級表提繳至少 6%，存進勞保局為你開立的勞工退休金個人專戶；換工作時專戶跟著你走，不會因為離職而歸零。計算機用月提繳工資、提繳率、工作年數與假設報酬率，估算 65 歲左右的帳戶累積金額與月領參考值。",
    "勞工年滿 60 歲即可請領：提繳年資滿 15 年可選月領或一次領，未滿 15 年只能一次領。帳戶實際收益依勞動基金運用成果分配，並有不低於二年定期存款利率的保證收益，因此試算中的報酬率只是假設，不代表未來績效。",
    "勞退和勞保老年年金是兩套制度：勞退看的是個人專戶累積的本金與收益，勞保老年年金看的是保險年資與平均月投保薪資。想估算兩者加總的退休收入，可以再用退休年齡規劃工具。",
  ],
  legalBasis: [
    {
      label: "勞工退休金條例第 6 條、第 14 條",
      text: "雇主應按月提繳退休金至勞保局的個人專戶，提繳率不得低於每月工資 6%；勞工可在 6% 範圍內自願提繳，且不計入當年度薪資所得課稅。",
      url: pensionAct("14"),
    },
    {
      label: "勞工退休金條例第 24 條",
      text: "年滿 60 歲可請領；工作年資滿 15 年可選月退或一次退，未滿 15 年請領一次退休金。",
      url: pensionAct("24"),
    },
    {
      label: "勞工保險局：月提繳工資分級表",
      text: `115 年 1 月 1 日生效，最高月提繳工資 ${formatMoney(pensionMax)} 元。`,
      url: BLI_PENSION_BRACKET_URL,
    },
  ],
  examples: [
    {
      title: "試算範例：月薪 45,000 元、30 歲到 65 歲",
      scenario: "假設薪資不變、年報酬率 3%，比較只有雇主 6% 與再加上自提 6% 的差異。",
      steps: [
        `月提繳工資級距 ${formatMoney(pension45k.bracket)} 元，雇主 6% = ${formatMoney(pension45k.employerContribution)} 元／月。`,
        `只有雇主提繳：35 年後帳戶約 ${formatMoney(projection.estimatedBalance)} 元。`,
        `加上自提 6%（${formatMoney(pension45k.workerVoluntary)} 元／月）：約 ${formatMoney(projectionWithVoluntary.estimatedBalance)} 元。`,
      ],
      result: `自提 6% 讓帳戶多約 ${formatMoney(projectionWithVoluntary.estimatedBalance - projection.estimatedBalance)} 元（假設值，實際依收益分配與薪資變動而定）。`,
    },
  ],
  mistakes: [
    {
      title: "以為換工作勞退就沒了",
      body: "新制是個人專戶，換工作只是換一個雇主繼續提繳。可以在勞保局 e 化服務系統查詢每月提繳紀錄，發現漏繳要及早反映。",
    },
    {
      title: "雇主用實際薪資以下的級距提繳",
      body: "提繳工資應依實際月薪資對照分級表。若提繳級距低於薪資，可要求補提繳，也可向勞保局或勞工局檢舉。",
    },
    {
      title: "自提一定划算",
      body: "自提可以節稅，但資金要到 60 歲才能動用。所得稅率低或短期需要現金的人，節稅效果有限，應先確認自己的稅率與資金規劃。",
    },
  ],
  prepare: ["勞保局 e 化服務系統的個人專戶餘額與提繳紀錄。", "目前月薪與預計工作年數。", "是否已申請自願提繳。"],
  readNext: [
    { label: "勞退自提 6% 值得嗎", href: "/articles/labor-pension-6-percent" },
    { label: "勞退帳戶怎麼查", href: "/articles/pension-account-query" },
    { label: "勞退新制與舊制比較", href: "/compare/new-vs-old-pension" },
    { label: "退休規劃完整指南", href: "/guides/retirement" },
  ],
  checkedAt: CHECKED_AT,
};

const retirementBracket = 45_800;
const retirementYears = 30;
const annuityA = Math.round(retirementBracket * retirementYears * 0.00775 + 3_000);
const annuityB = Math.round(retirementBracket * retirementYears * 0.0155);

const retirementPlanner: ToolExplainerContent = {
  heading: "退休年齡規劃工具算的是什麼",
  intro: [
    "台灣受僱勞工的退休收入通常來自兩個來源：勞保老年給付（社會保險，按保險年資與平均月投保薪資計算）與勞退新制個人專戶（雇主 6% 加自提的累積）。這個工具把兩者放在一起，估算不同退休年齡下每月大約能領多少，以及占目前薪資的比例（所得替代率）。",
    "勞保老年年金需保險年資滿 15 年，月領金額依兩種公式擇優：平均月投保薪資 × 年資 × 0.775% + 3,000 元，或平均月投保薪資 × 年資 × 1.55%。法定請領年齡自 2009 年起逐步提高，2026 年起為 65 歲；可提前最多 5 年請領減額年金，或延後最多 5 年增額請領。",
    "勞退新制則是年滿 60 歲就能請領，與勞保年金的年齡不同。因此「幾歲退休」不只是一個數字：60 到 65 歲之間可能只有勞退、沒有勞保年金，規劃時要把這段空窗期算進去。",
  ],
  legalBasis: [
    {
      label: "勞工保險條例第 58 條",
      text: "保險年資滿 15 年請領老年年金，未滿 15 年請領老年一次金；請領年齡自 97 年修法施行後第 10 年起逐步提高至 65 歲。",
      url: lia("58"),
    },
    {
      label: "勞工保險條例第 58 條之 1",
      text: "老年年金依「平均月投保薪資 × 年資 × 0.775% + 3,000 元」或「平均月投保薪資 × 年資 × 1.55%」擇優發給。",
      url: lia("58-1"),
    },
    {
      label: "勞工退休金條例第 24 條",
      text: "勞退年滿 60 歲即可請領，提繳年資滿 15 年可選擇月領。",
      url: pensionAct("24"),
    },
  ],
  examples: [
    {
      title: "試算範例：平均月投保薪資 45,800 元、保險年資 30 年",
      scenario: "以勞保投保上限 45,800 元計算，65 歲請領老年年金。",
      steps: [
        `公式 A：45,800 × 30 × 0.775% + 3,000 = ${formatMoney(annuityA)} 元。`,
        `公式 B：45,800 × 30 × 1.55% = ${formatMoney(annuityB)} 元。`,
        "兩者擇優，採公式 B。",
      ],
      result: `勞保老年年金每月約 ${formatMoney(annuityB)} 元，再加上勞退專戶月領金額，才是完整的退休月收入。`,
    },
  ],
  mistakes: [
    {
      title: "把勞保和勞退當成同一筆錢",
      body: "勞保老年給付由勞保基金支付、看保險年資；勞退是個人專戶、看累積金額。兩者分開請領，條件與年齡也不同。",
    },
    {
      title: "用目前薪資當平均月投保薪資",
      body: "勞保年金的平均月投保薪資是加保期間最高 60 個月的平均，且最高只到 45,800 元。高薪者的勞保年金不會隨薪資無限增加。",
    },
    {
      title: "忽略提前請領的減額",
      body: "提前請領老年年金，每提前 1 年減給 4%，最多提前 5 年；一旦核付就不能再改。提早退休前要先比較終身少領的金額。",
    },
  ],
  prepare: ["勞保局 e 化服務系統的勞保年資與投保薪資紀錄。", "勞退個人專戶目前餘額。", "預計退休年齡與期望的月生活費。"],
  readNext: [
    { label: "勞保老年給付怎麼領", href: "/articles/labor-insurance-payout" },
    { label: "勞退新舊制比較", href: "/articles/old-vs-new-pension" },
    { label: "退休規劃完整指南", href: "/guides/retirement" },
  ],
  checkedAt: CHECKED_AT,
};

const maternityInsured = 40_100;

const maternity: ToolExplainerContent = {
  heading: "產假育嬰假計算工具算的是什麼",
  intro: [
    "選擇假別並輸入投保薪資，工具會列出產假、陪產檢及陪產假、育嬰留職停薪與流產假的法定天數、期間薪資如何給付，以及勞保生育給付與就業保險育嬰留職停薪津貼的估算金額。",
    "產假由勞基法第 50 條與性別平等工作法第 15 條保障：分娩前後 8 週，受僱滿 6 個月工資照給、未滿 6 個月減半發給。妊娠期間另有 7 日產檢假；配偶陪產檢及陪產假合計 7 日，期間薪資照給，雇主就超過 5 日的部分可向勞保局申請補助。",
    "育嬰留職停薪是任職滿 6 個月後、子女滿 3 歲前可申請，每一子女最長 2 年。留停期間沒有薪水，但符合就業保險資格者可領育嬰留職停薪津貼，法定為平均月投保薪資 60%，每一子女父母各最長 6 個月；政府另有加發補助，實際比例與「以日申請」等彈性規定，請以勞保局公告為準。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 50 條",
      text: "分娩前後給產假 8 星期；受僱 6 個月以上工資照給，未滿 6 個月減半發給。",
      url: lsa("50"),
    },
    {
      label: "性別平等工作法第 15 條",
      text: "產假 8 星期、各週數流產假；產檢假 7 日；陪產檢及陪產假 7 日，期間薪資照給。",
      url: lawArticleUrl(PCODE.genderEquality, "15"),
    },
    {
      label: "性別平等工作法第 16 條",
      text: "任職滿 6 個月後，於每一子女滿 3 歲前可申請育嬰留職停薪，最長 2 年。",
      url: lawArticleUrl(PCODE.genderEquality, "16"),
    },
    {
      label: "勞工保險條例第 32 條",
      text: "被保險人分娩或早產，按平均月投保薪資一次給與生育補助費 60 日（分娩費部分因全民健保施行停止適用）。",
      url: lia("32"),
    },
    {
      label: "就業保險法第 19 條之 2",
      text: "育嬰留職停薪津貼以平均月投保薪資 60% 計算，每一子女合計最長發給 6 個月。",
      url: lawArticleUrl(PCODE.employmentInsurance, "19-2"),
    },
    {
      label: "勞工保險局：勞工生育補助、彈性育嬰留職停薪",
      text: "政府加發的生育補助與育嬰留停以日申請等最新措施說明。",
      url: BLI_BIRTH_SUBSIDY_URL,
    },
  ],
  examples: [
    {
      title: `試算範例：平均月投保薪資 ${formatMoney(maternityInsured)} 元`,
      scenario: "小芳受僱 2 年，勞保加保滿 280 日後分娩，之後申請育嬰留職停薪 6 個月。",
      steps: [
        "產假：8 週（56 天），任職滿 6 個月，期間工資照給。",
        `勞保生育補助費：${formatMoney(maternityInsured)} ÷ 30 × 60 日 = ${formatMoney(maternityInsured * 2)} 元。`,
        `育嬰留停津貼（法定 60%）：${formatMoney(maternityInsured)} × 60% = ${formatMoney(Math.round(maternityInsured * 0.6))} 元／月，最長 6 個月。`,
      ],
      result: "政府另有加發補助，實際入帳以勞保局核定為準；配偶也可就同一子女另外申請育嬰留停津貼。",
    },
  ],
  mistakes: [
    {
      title: "產假被算成工作天",
      body: "產假 8 週以「星期」計算，期間遇到例假、國定假日都包含在內，不是 40 個工作天。",
    },
    {
      title: "試用期就不給產假",
      body: "產假沒有任職期間門檻，只是受僱未滿 6 個月時工資減半。以試用期為由拒給產假，或因懷孕而解僱，都違反性別平等工作法。",
    },
    {
      title: "育嬰留停被要求先離職",
      body: "育嬰留職停薪是留職，期滿後雇主原則上應讓你復職；留停期間也可以選擇繼續參加勞保、健保，原由雇主負擔的保費免繳。",
    },
  ],
  prepare: ["預產期與到職日。", "勞保投保紀錄（確認加保是否滿 280 日）。", "就業保險加保年資（育嬰津貼需累計滿 1 年）。"],
  readNext: [
    { label: "產假、陪產假、育嬰假完整說明", href: "/articles/maternity-leave-guide" },
    { label: "請假與特休完整指南", href: "/guides/leave" },
    { label: "病假怎麼給薪", href: "/articles/sick-leave-pay" },
  ],
  checkedAt: CHECKED_AT,
};

const injuryWageLoss = calculateWorkInjury(42_000, 42_000, "wage-loss", 30);

const workInjury: ToolExplainerContent = {
  heading: "職災給付計算工具算的是什麼",
  intro: [
    "勞工因執行職務受傷、罹患職業病或在上下班途中發生事故，會同時涉及兩套保障：勞基法第 59 條規定雇主的職業災害補償責任（醫療費用、原領工資、失能與死亡補償），以及 2022 年 5 月施行的勞工職業災害保險及保護法提供的保險給付。這個工具依傷害類型估算兩者的金額。",
    "雇主的補償責任是「無過失責任」，不論雇主有沒有過失都要補償；但同一事故已由職災保險給付的部分，雇主可以抵充。因此結果表中的保險給付列為參考，不重複計入雇主補償合計。",
    "醫療期間不能工作，雇主應按原領工資補償；職災保險的傷病給付從不能工作第 4 天起算，前 2 個月按平均月投保薪資發給，第 3 個月起發給 70%，最長 2 年。失能與死亡補償則依平均工資與失能等級計算。",
  ],
  legalBasis: [
    {
      label: "勞動基準法第 59 條",
      text: "雇主應補償必需醫療費用、醫療中不能工作期間的原領工資、失能補償；死亡時給 5 個月平均工資喪葬費及 40 個月平均工資死亡補償。已由保險給付的部分可抵充。",
      url: lsa("59"),
    },
    {
      label: "勞工職業災害保險及保護法第 42 條",
      text: "不能工作第 4 日起可請領傷病給付，前 2 個月按平均月投保薪資、第 3 個月起按 70% 發給，最長 2 年。",
      url: lawArticleUrl(PCODE.occupationalAccident, "42"),
    },
    {
      label: "勞工職業災害保險及保護法第 43 條、第 49 條",
      text: "永久失能可請領失能給付；死亡時支出殯葬費者可請領喪葬津貼，遺屬可依順序請領遺屬年金或一次金。",
      url: lawArticleUrl(PCODE.occupationalAccident, "43"),
    },
    {
      label: "勞動基準法第 13 條",
      text: "勞工在職災醫療期間，雇主原則上不得終止契約。",
      url: lsa("13"),
    },
  ],
  examples: [
    {
      title: "試算範例：月薪 42,000 元，職災休養 30 天",
      scenario: "小洪在倉庫搬貨時腰椎受傷，醫師開立 30 天不能工作的診斷證明，投保薪資 42,000 元。",
      steps: [
        `雇主原領工資補償：42,000 ÷ 30 × 30 = ${formatMoney(injuryWageLoss.compensations[0].amount)} 元。`,
        `職災保險傷病給付：第 4 天起算 27 天 × 投保薪資日額 1,400 元 = ${formatMoney(injuryWageLoss.compensations[1].amount)} 元。`,
        "雇主可用保險給付抵充工資補償，差額仍由雇主補足；醫療費用另依實際支出補償。",
      ],
      result: `小洪不能工作期間至少應拿到原領工資 ${formatMoney(injuryWageLoss.totalEstimate)} 元，其中一部分可由職災保險給付支應。`,
    },
  ],
  mistakes: [
    {
      title: "公傷假被扣薪或扣全勤",
      body: "職災醫療期間的公傷病假，雇主應按原領工資補償，不能比照普通病假只給半薪，也不宜因此扣全勤。",
    },
    {
      title: "治療期間被資遣",
      body: "勞基法第 13 條規定醫療期間原則上不得終止契約。若在這段期間收到資遣通知，應先向勞工局諮詢。",
    },
    {
      title: "公司沒投保就以為什麼都領不到",
      body: "職災保險法施行後，受僱勞工從到職當日起就受職災保險保障；雇主未加保時，勞工仍可向勞保局請領給付，勞保局再向雇主求償。",
    },
  ],
  prepare: ["醫師診斷證明與不能工作期間的證明。", "事故經過紀錄、證人與照片。", "近 6 個月薪資單（計算平均工資與原領工資）。"],
  readNext: [
    { label: "職災發生後的處理流程", href: "/articles/work-injury-guide" },
    { label: "過勞與職業病認定", href: "/articles/overwork-karoshi" },
    { label: "勞資爭議怎麼調解", href: "/articles/labor-mediation" },
  ],
  checkedAt: CHECKED_AT,
};

export const INSURANCE_EXPLAINERS: Record<string, ToolExplainerContent> = {
  salary,
  "insurance-premium": insurancePremium,
  "insurance-bracket": insuranceBracket,
  pension,
  "retirement-planner": retirementPlanner,
  maternity,
  "work-injury": workInjury,
};

