import { LABOR_CONSTANTS } from "@/data/constants";
import { findLaborInsuranceBracket } from "./bracket-lookup";

export interface LaborInsuranceResult {
  bracket: number;
  total: number;
  workerShare: number;
  employerShare: number;
  govShare: number;
}

/**
 * 勞保保費計算
 * 公式：投保薪資 × 費率 × 負擔比例
 */
export function calculateLaborInsurance(monthlySalary: number): LaborInsuranceResult {
  const bracket = findLaborInsuranceBracket(monthlySalary);
  const total = Math.round(bracket * LABOR_CONSTANTS.laborInsuranceRate);
  const workerShare = Math.round(total * LABOR_CONSTANTS.laborInsuranceWorkerShare);
  const employerShare = Math.round(total * LABOR_CONSTANTS.laborInsuranceEmployerShare);
  const govShare = total - workerShare - employerShare;

  return { bracket, total, workerShare, employerShare, govShare };
}
