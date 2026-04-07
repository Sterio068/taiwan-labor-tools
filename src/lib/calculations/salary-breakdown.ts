import { calculateLaborInsurance } from "./labor-insurance";
import { calculateNhi } from "./nhi";
import { calculatePension } from "./pension";

export interface SalaryBreakdownResult {
  grossSalary: number;
  laborInsurance: number;
  laborInsuranceBracket: number;
  nhi: number;
  nhiBracket: number;
  nhiDependents: number;
  pensionEmployer: number;
  pensionWorker: number;
  pensionBracket: number;
  totalDeductions: number;
  netSalary: number;
  employerCost: number;
}

/**
 * 薪資明細拆解
 * 計算勞保、健保自付額與勞退，得出實領薪資
 */
export function calculateSalaryBreakdown(
  monthlySalary: number,
  dependents: number = 0,
  workerPensionRate: number = 0
): SalaryBreakdownResult {
  const li = calculateLaborInsurance(monthlySalary);
  const nhi = calculateNhi(monthlySalary, dependents);
  const pension = calculatePension(monthlySalary, workerPensionRate);

  const totalDeductions = li.workerShare + nhi.workerShareWithDependents + pension.workerVoluntary;
  const netSalary = monthlySalary - totalDeductions;

  // 雇主總成本 = 月薪 + 勞保雇主負擔 + 健保雇主負擔 + 勞退雇主提繳
  const employerCost =
    monthlySalary + li.employerShare + nhi.employerShare + pension.employerContribution;

  return {
    grossSalary: monthlySalary,
    laborInsurance: li.workerShare,
    laborInsuranceBracket: li.bracket,
    nhi: nhi.workerShareWithDependents,
    nhiBracket: nhi.bracket,
    nhiDependents: nhi.dependents,
    pensionEmployer: pension.employerContribution,
    pensionWorker: pension.workerVoluntary,
    pensionBracket: pension.bracket,
    totalDeductions,
    netSalary,
    employerCost,
  };
}
