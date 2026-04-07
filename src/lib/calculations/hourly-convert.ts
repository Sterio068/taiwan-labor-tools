import { LABOR_CONSTANTS } from "@/data/constants";

export interface HourlyConvertResult {
  monthlySalary: number;
  hourlySalary: number;
  dailySalary: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

/** 月薪 → 時薪（勞基法：月薪 ÷ 30 ÷ 8） */
export function monthlyToHourly(monthlySalary: number): HourlyConvertResult {
  const dailySalary = monthlySalary / 30;
  const hourlySalary = dailySalary / 8;
  return {
    monthlySalary,
    hourlySalary: Math.round(hourlySalary * 100) / 100,
    dailySalary: Math.round(dailySalary * 100) / 100,
    hoursPerDay: 8,
    daysPerMonth: 30,
  };
}

/** 時薪 → 月薪估算（時薪 × 每日時數 × 每月工作天數） */
export function hourlyToMonthly(
  hourlySalary: number,
  hoursPerDay: number = 8,
  daysPerMonth: number = 22
): HourlyConvertResult {
  const dailySalary = hourlySalary * hoursPerDay;
  const monthlySalary = Math.round(dailySalary * daysPerMonth);
  return {
    monthlySalary,
    hourlySalary,
    dailySalary,
    hoursPerDay,
    daysPerMonth,
  };
}

/** 檢查是否低於基本工資 */
export function isBelowMinimumWage(hourlyRate: number): boolean {
  return hourlyRate < LABOR_CONSTANTS.minimumHourlyWage;
}
