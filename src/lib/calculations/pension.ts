import { LABOR_CONSTANTS } from "@/data/constants";
import { findPensionBracket } from "./bracket-lookup";

export interface PensionResult {
  bracket: number;
  employerContribution: number;
  workerVoluntary: number;
  workerVoluntaryRate: number;
  taxBenefit: number;
}

export interface PensionProjection {
  totalContribution: number;
  estimatedBalance: number;
  monthlyPension: number;
  years: number;
}

/**
 * 勞退提繳計算
 */
export function calculatePension(
  monthlySalary: number,
  workerVoluntaryRate: number = 0
): PensionResult {
  const bracket = findPensionBracket(monthlySalary);
  const employerContribution = Math.round(bracket * LABOR_CONSTANTS.laborPensionEmployerRate);
  const workerVoluntary = Math.round(bracket * workerVoluntaryRate);

  // 自提部分可從當年度個人綜合所得總額中全數扣除（節稅）
  // 假設適用稅率 5%-12%
  const taxBenefit = Math.round(workerVoluntary * 12 * 0.05); // 保守以 5% 估算年省稅額

  return {
    bracket,
    employerContribution,
    workerVoluntary,
    workerVoluntaryRate,
    taxBenefit,
  };
}

/**
 * 退休金累積試算
 * 假設年化報酬率（勞退基金歷年平均約 3-4%）
 */
export function projectPension(
  monthlySalary: number,
  currentAge: number,
  retireAge: number,
  annualReturn: number = 0.03,
  workerVoluntaryRate: number = 0
): PensionProjection {
  const bracket = findPensionBracket(monthlySalary);
  const monthlyContribution =
    Math.round(bracket * LABOR_CONSTANTS.laborPensionEmployerRate) +
    Math.round(bracket * workerVoluntaryRate);

  const years = retireAge - currentAge;
  const months = years * 12;
  const monthlyReturn = annualReturn / 12;

  // 年金終值公式：PMT × [(1+r)^n - 1] / r
  let balance: number;
  if (monthlyReturn === 0) {
    balance = monthlyContribution * months;
  } else {
    balance = monthlyContribution * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
  }

  // 月退休金：帳戶餘額 ÷ 平均餘命月數（以 24 年 = 288 個月估算）
  const lifeExpectancyMonths = 288;
  const monthlyPension = Math.round(balance / lifeExpectancyMonths);

  return {
    totalContribution: monthlyContribution * months,
    estimatedBalance: Math.round(balance),
    monthlyPension,
    years,
  };
}
