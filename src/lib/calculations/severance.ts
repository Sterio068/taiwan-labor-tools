import { LABOR_CONSTANTS } from "@/data/constants";

export interface SeveranceResult {
  system: "new" | "old";
  months: number;
  amount: number;
  avgSalary: number;
  yearsOfService: number;
}

/**
 * 資遣費計算
 * 新制（勞退新制）：每滿 1 年 → 0.5 個月平均工資，上限 6 個月
 * 舊制（勞退舊制）：每滿 1 年 → 1 個月平均工資
 */
export function calculateSeverance(
  system: "new" | "old",
  avgMonthlySalary: number,
  years: number,
  months: number
): SeveranceResult {
  const totalYears = years + months / 12;

  let severanceMonths: number;

  if (system === "new") {
    severanceMonths = totalYears * LABOR_CONSTANTS.severanceNewSystem;
    severanceMonths = Math.min(severanceMonths, LABOR_CONSTANTS.severanceNewSystemMax);
  } else {
    severanceMonths = totalYears * LABOR_CONSTANTS.severanceOldSystem;
  }

  const amount = Math.round(avgMonthlySalary * severanceMonths);

  return {
    system,
    months: severanceMonths,
    amount,
    avgSalary: avgMonthlySalary,
    yearsOfService: totalYears,
  };
}
