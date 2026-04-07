import { LABOR_CONSTANTS } from "@/data/constants";

/** 根據月薪找到適用的投保級距（取 >= 月薪的最低級距） */
export function findBracket(salary: number, brackets: readonly number[]): number {
  for (const bracket of brackets) {
    if (bracket >= salary) return bracket;
  }
  return brackets[brackets.length - 1];
}

/** 勞保投保級距 */
export function findLaborInsuranceBracket(salary: number): number {
  return findBracket(salary, LABOR_CONSTANTS.laborInsuranceBrackets);
}

/** 健保投保級距 */
export function findNhiBracket(salary: number): number {
  return findBracket(salary, LABOR_CONSTANTS.nhiBrackets);
}

/** 勞退提繳級距 */
export function findPensionBracket(salary: number): number {
  return findBracket(salary, LABOR_CONSTANTS.pensionBrackets);
}
