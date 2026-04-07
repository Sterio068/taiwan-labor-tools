export interface MaternityResult {
  type: string;
  days: number;
  salary: "full" | "half" | "unpaid";
  salaryNote: string;
  benefit?: number;
  benefitNote?: string;
}

/**
 * 產假/育嬰假/陪產假計算
 */
export function calculateMaternityLeave(
  leaveType: string,
  monthlySalary: number,
  insuredSalary: number
): MaternityResult {
  switch (leaveType) {
    case "maternity":
      return {
        type: "產假",
        days: 56,
        salary: "full",
        salaryNote: "任職滿 6 個月：8 週全薪。未滿 6 個月：8 週半薪",
        benefit: Math.round(insuredSalary * 2),
        benefitNote: "勞保生育給付：投保薪資 × 2 個月（一次領）",
      };
    case "paternity":
      return {
        type: "陪產檢及陪產假",
        days: 7,
        salary: "full",
        salaryNote: "7 天全薪（可分次請、可於配偶分娩前後 15 天內請）",
      };
    case "parental":
      return {
        type: "育嬰留職停薪",
        days: 730,
        salary: "unpaid",
        salaryNote: "最長 2 年（可同時或輪流請）",
        benefit: Math.round(insuredSalary * 0.8 * 6),
        benefitNote: "育嬰留停津貼：投保薪資 × 80% × 6 個月",
      };
    case "miscarriage-3m":
      return {
        type: "流產假（未滿 3 個月）",
        days: 5,
        salary: "unpaid",
        salaryNote: "5 天，工資依勞工請假規則",
      };
    case "miscarriage-3m+":
      return {
        type: "流產假（3 個月以上）",
        days: 28,
        salary: "full",
        salaryNote: "4 週全薪",
      };
    default:
      return {
        type: "產假",
        days: 56,
        salary: "full",
        salaryNote: "8 週全薪",
      };
  }
}
