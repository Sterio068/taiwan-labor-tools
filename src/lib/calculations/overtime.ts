import { LABOR_CONSTANTS } from "@/data/constants";

export interface OvertimeResult {
  hourlyBase: number;
  overtimePay: number;
  billedHours: number;
  breakdown: {
    hours: number;
    billedHours: number;
    rate: number;
    pay: number;
    label: string;
  }[];
  note?: string;
}

/**
 * 加班費計算（勞基法第 24 條）
 * 月薪制每小時工資 = 月薪 ÷ 30 ÷ 8
 *
 * 休息日特殊規則（第 24 條第 2 項）：
 * 實際工作 ≤ 4h → 以 4h 計
 * 實際工作 > 4h 且 ≤ 8h → 以 8h 計
 * 實際工作 > 8h 且 ≤ 12h → 以 12h 計
 */
export function calculateOvertime(
  monthlySalary: number,
  hours: number,
  type: "weekday" | "rest-day" | "holiday" | "national-holiday"
): OvertimeResult {
  const hourlyBase = monthlySalary / 30 / 8;
  const breakdown: OvertimeResult["breakdown"] = [];
  let note: string | undefined;

  if (type === "holiday" || type === "national-holiday") {
    // 國定假日/例假日加班：加倍（另外再給 1 倍）
    const pay = Math.round(hourlyBase * LABOR_CONSTANTS.overtimeRates.holiday.rate * hours);
    breakdown.push({
      hours,
      billedHours: hours,
      rate: LABOR_CONSTANTS.overtimeRates.holiday.rate,
      pay,
      label: type === "holiday" ? "國定假日加班" : "例假日加班",
    });
  } else if (type === "rest-day") {
    // 休息日加班：倍率同平日，但工時有最低計算規則
    const { first, second, max } = LABOR_CONSTANTS.restDayMinHours;
    let billedTotal: number;
    if (hours <= 0) {
      billedTotal = 0;
    } else if (hours <= first) {
      billedTotal = first; // ≤4h 以 4h 計
    } else if (hours <= second) {
      billedTotal = second; // ≤8h 以 8h 計
    } else {
      billedTotal = max; // ≤12h 以 12h 計
    }

    const rates = LABOR_CONSTANTS.overtimeRates.restDay;
    const bh1 = Math.min(billedTotal, 2);
    const bh2 = Math.max(0, billedTotal - 2);

    if (bh1 > 0) {
      breakdown.push({
        hours: Math.min(hours, 2),
        billedHours: bh1,
        rate: rates.first2h,
        pay: Math.round(hourlyBase * rates.first2h * bh1),
        label: "休息日前 2 小時",
      });
    }
    if (bh2 > 0) {
      breakdown.push({
        hours: Math.max(0, Math.min(hours, billedTotal) - 2),
        billedHours: bh2,
        rate: rates.after2h,
        pay: Math.round(hourlyBase * rates.after2h * bh2),
        label: "休息日第 3 小時起",
      });
    }

    if (billedTotal > hours) {
      note = `休息日加班實際 ${hours} 小時，依法以 ${billedTotal} 小時計算工資`;
    }
  } else {
    // 平日加班：前 2 小時 4/3，第 3 小時起 5/3
    const rates = LABOR_CONSTANTS.overtimeRates.weekday;
    const h1 = Math.min(hours, 2);
    const h2 = Math.max(0, hours - 2);
    if (h1 > 0) {
      breakdown.push({
        hours: h1,
        billedHours: h1,
        rate: rates.first2h,
        pay: Math.round(hourlyBase * rates.first2h * h1),
        label: "前 2 小時",
      });
    }
    if (h2 > 0) {
      breakdown.push({
        hours: h2,
        billedHours: h2,
        rate: rates.after2h,
        pay: Math.round(hourlyBase * rates.after2h * h2),
        label: "第 3 小時起",
      });
    }
  }

  const overtimePay = breakdown.reduce((sum, b) => sum + b.pay, 0);
  const billedHours = breakdown.reduce((sum, b) => sum + b.billedHours, 0);

  return { hourlyBase, overtimePay, billedHours, breakdown, note };
}
