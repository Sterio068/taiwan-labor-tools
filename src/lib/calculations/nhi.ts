import { LABOR_CONSTANTS } from "@/data/constants";
import { findNhiBracket } from "./bracket-lookup";

export interface NhiResult {
  bracket: number;
  total: number;
  workerShare: number;
  employerShare: number;
  govShare: number;
  dependents: number;
  workerShareWithDependents: number;
}

/**
 * 健保保費計算
 * 公式：投保金額 × 費率 × 負擔比例 × (1 + 眷屬人數)
 * 眷屬最多計 3 口
 */
export function calculateNhi(
  monthlySalary: number,
  dependents: number = 0
): NhiResult {
  const bracket = findNhiBracket(monthlySalary);
  const cappedDependents = Math.min(dependents, 3);
  const total = Math.round(bracket * LABOR_CONSTANTS.nhiRate);
  const workerShare = Math.round(total * LABOR_CONSTANTS.nhiWorkerShare);
  const employerShare = Math.round(
    total *
      LABOR_CONSTANTS.nhiEmployerShare *
      (1 + LABOR_CONSTANTS.nhiAverageDependentCount)
  );
  const govShare = Math.round(total * LABOR_CONSTANTS.nhiGovShare);
  const workerShareWithDependents = workerShare * (1 + cappedDependents);

  return {
    bracket,
    total,
    workerShare,
    employerShare,
    govShare,
    dependents: cappedDependents,
    workerShareWithDependents,
  };
}
