import { LABOR_CONSTANTS } from "@/data/constants";

export interface OvertimeResult {
  hourlyBase: number;
  overtimePay: number;
  breakdown: {
    hours: number;
    rate: number;
    pay: number;
    label: string;
  }[];
}

/**
 * 加班費計算（勞基法第 24 條）
 * 月薪制每小時工資 = 月薪 ÷ 30 ÷ 8
 */
export function calculateOvertime(
  monthlySalary: number,
  hours: number,
  type: "weekday" | "rest-day" | "holiday" | "national-holiday"
): OvertimeResult {
  const hourlyBase = monthlySalary / 30 / 8;
  const breakdown: OvertimeResult["breakdown"] = [];

  if (type === "holiday" || type === "national-holiday") {
    // 國定假日/例假日加班：加倍（另外再給 1 倍）
    const pay = Math.round(hourlyBase * LABOR_CONSTANTS.overtimeRates.holiday.rate * hours);
    breakdown.push({
      hours,
      rate: LABOR_CONSTANTS.overtimeRates.holiday.rate,
      pay,
      label: type === "holiday" ? "國定假日加班" : "例假日加班",
    });
  } else if (type === "rest-day") {
    // 休息日加班：前 2 小時 4/3，之後 5/3
    const rates = LABOR_CONSTANTS.overtimeRates.restDay;
    const h1 = Math.min(hours, 2);
    const h2 = Math.max(0, hours - 2);
    if (h1 > 0) {
      breakdown.push({
        hours: h1,
        rate: rates.first2h,
        pay: Math.round(hourlyBase * rates.first2h * h1),
        label: "休息日前 2 小時",
      });
    }
    if (h2 > 0) {
      breakdown.push({
        hours: h2,
        rate: rates.after2h,
        pay: Math.round(hourlyBase * rates.after2h * h2),
        label: "休息日第 3 小時起",
      });
    }
  } else {
    // 平日加班：前 2 小時 4/3，之後 5/3
    const rates = LABOR_CONSTANTS.overtimeRates.weekday;
    const h1 = Math.min(hours, 2);
    const h2 = Math.max(0, hours - 2);
    if (h1 > 0) {
      breakdown.push({
        hours: h1,
        rate: rates.first2h,
        pay: Math.round(hourlyBase * rates.first2h * h1),
        label: "前 2 小時",
      });
    }
    if (h2 > 0) {
      breakdown.push({
        hours: h2,
        rate: rates.after2h,
        pay: Math.round(hourlyBase * rates.after2h * h2),
        label: "第 3-4 小時",
      });
    }
  }

  const overtimePay = breakdown.reduce((sum, b) => sum + b.pay, 0);

  return { hourlyBase, overtimePay, breakdown };
}
