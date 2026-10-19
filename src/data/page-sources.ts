import type { OfficialSourceLink } from "@/components/seo/OfficialSources";
import { lawArticleUrl, PCODE } from "@/data/tool-explainers/types";

const lsa = (article: string) => lawArticleUrl(PCODE.laborStandards, article);
const lia = (article: string) => lawArticleUrl(PCODE.laborInsurance, article);
const pension = (article: string) => lawArticleUrl(PCODE.laborPension, article);
const employment = (article: string) => lawArticleUrl(PCODE.employmentInsurance, article);

const BLI_RATE = "https://www.bli.gov.tw/0005478.html";
const MOL_MINIMUM_WAGE = "https://www.mol.gov.tw/1607/1632/1633/84947/";
const MOL_HOURLY_BASE = "https://www.mol.gov.tw/1607/1632/1640/20597/";
const MOHW_NATIONAL_PENSION_2026 = "https://mohw.gov.tw/cp-16-84487-1.html";

/** 比較頁與指南頁引用的官方來源，集中管理方便每年查核。 */
export const PAGE_SOURCES: Record<string, OfficialSourceLink[]> = {
  "compare/fired-vs-quit": [
    { label: "勞動基準法第 11、16、17 條", url: lsa("11"), note: "雇主資遣的法定事由、預告期與舊制資遣費。" },
    { label: "勞動基準法第 14、15、18 條", url: lsa("14"), note: "勞工可不經預告離職的情形、自請離職的預告，以及不能請求資遣費的情況。" },
    { label: "勞工退休金條例第 12 條", url: pension("12"), note: "新制年資每滿 1 年 0.5 個月平均工資、最高 6 個月。" },
    { label: "就業保險法第 11 條", url: employment("11"), note: "失業給付須非自願離職、離職前 3 年內保險年資滿 1 年。" },
  ],
  "compare/labor-vs-national-insurance": [
    { label: "勞工保險條例第 6 條", url: lia("6"), note: "僱用 5 人以上事業單位的勞工應以雇主為投保單位強制加保。" },
    { label: "勞工保險條例第 58 條之 1", url: lia("58-1"), note: "勞保老年年金兩種公式擇優發給。" },
    { label: "勞工保險局：保險費率", url: BLI_RATE, note: "勞保普通事故保險費率自 114 年 1 月 1 日起實收 11.5%。" },
    { label: "衛生福利部：國民年金月投保金額調整", url: MOHW_NATIONAL_PENSION_2026, note: "115 年 1 月 1 日起國保月投保金額調整為 21,103 元。" },
  ],
  "compare/monthly-vs-hourly": [
    { label: "最低工資法第 5 條", url: lawArticleUrl(PCODE.minimumWage, "5"), note: "約定工資不得低於最低工資。" },
    { label: "勞動部 115 年最低工資公告", url: MOL_MINIMUM_WAGE, note: "2026 年月最低工資 29,500 元、時最低工資 196 元。" },
    { label: "勞動部 107 年 9 月 14 日說明", url: MOL_HOURLY_BASE, note: "月薪 ÷ 30 ÷ 8 為平日每小時工資額。" },
    { label: "勞動基準法第 39 條", url: lsa("39"), note: "例假、休息日、國定假日與特休工資照給，國定假日出勤加倍。" },
  ],
  "compare/new-vs-old-pension": [
    { label: "勞工退休金條例第 6、14 條", url: pension("14"), note: "雇主按月提繳至個人專戶，提繳率不低於 6%，勞工可自提 6% 以內。" },
    { label: "勞工退休金條例第 24 條", url: pension("24"), note: "年滿 60 歲請領，年資滿 15 年可選月領。" },
    { label: "勞動基準法第 55 條", url: lsa("55"), note: "舊制退休金每滿 1 年 2 個基數，超過 15 年每年 1 個基數，最高 45 個基數。" },
    { label: "勞動基準法第 84 條之 2", url: lsa("84-2"), note: "適用勞基法前後年資的資遣費與退休金計算規則。" },
  ],
  "guides/salary": [
    { label: "勞動基準法第 22、23、26 條", url: lsa("22"), note: "工資全額直接給付、每月至少發給 2 次並提供明細、不得預扣工資作違約金。" },
    { label: "最低工資法第 5 條", url: lawArticleUrl(PCODE.minimumWage, "5"), note: "約定工資低於最低工資者，以最低工資為準。" },
    { label: "勞工保險局：保險費率及負擔比例", url: BLI_RATE, note: "勞保 11.5%、就保 1%，受僱勞工自付 20%。" },
    { label: "全民健康保險法第 27 條", url: lawArticleUrl(PCODE.nhi, "27"), note: "受僱者自付 30%、投保單位 60%、政府 10%。" },
  ],
  "guides/insurance": [
    { label: "勞工保險局：保險費率及負擔比例", url: BLI_RATE, note: "勞保普通事故 11.5%（114 年起），另加就業保險 1%。" },
    { label: "勞工保險條例第 14 條", url: lia("14"), note: "依月薪資總額按分級表申報投保薪資。" },
    { label: "全民健康保險法第 18、27 條", url: lawArticleUrl(PCODE.nhi, "18"), note: "眷屬最多計 3 口，受僱者自付 30%。" },
    { label: "勞工退休金條例第 14 條", url: pension("14"), note: "雇主提繳不低於 6%，自提不計入當年度薪資所得。" },
  ],
  "guides/retirement": [
    { label: "勞工保險條例第 58 條", url: lia("58"), note: "老年給付請領條件，請領年齡逐步提高至 65 歲。" },
    { label: "勞工保險條例第 58 條之 1", url: lia("58-1"), note: "老年年金：平均月投保薪資 × 年資 × 0.775% + 3,000 元，或 × 1.55%，擇優發給。" },
    { label: "勞工退休金條例第 24 條", url: pension("24"), note: "勞退 60 歲請領，年資滿 15 年可選月領。" },
    { label: "勞動基準法第 55 條", url: lsa("55"), note: "舊制退休金基數計算。" },
  ],
  "guides/severance": [
    { label: "勞動基準法第 16、17 條", url: lsa("17"), note: "預告期間、預告工資與舊制資遣費，30 日內發給。" },
    { label: "勞工退休金條例第 12 條", url: pension("12"), note: "新制資遣費每滿 1 年 0.5 個月、最高 6 個月。" },
    { label: "就業保險法第 16 條", url: employment("16"), note: "失業給付按平均月投保薪資 60% 按月發給，最長 6 個月（45 歲以上或身障 9 個月）。" },
    { label: "勞動基準法第 19 條", url: lsa("19"), note: "勞工請求服務證明書，雇主不得拒絕。" },
  ],
};
