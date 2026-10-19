import { LABOR_CONSTANTS } from "@/data/constants";

export type OvertimeType = "weekday" | "rest-day" | "holiday" | "national-holiday";

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

type Tier = { from: number; to: number; rate: number; label: string };

const MAX_DAILY_HOURS = 12;

function applyTiers(hourlyBase: number, hours: number, tiers: Tier[]): OvertimeResult["breakdown"] {
  return tiers
    .map((tier) => {
      const tierHours = Math.max(0, Math.min(hours, tier.to) - tier.from);
      return {
        hours: tierHours,
        billedHours: tierHours,
        rate: tier.rate,
        pay: Math.round(hourlyBase * tier.rate * tierHours),
        label: tier.label,
      };
    })
    .filter((row) => row.hours > 0);
}

/**
 * 加班費計算（勞基法第 24、39、40 條）
 * 月薪制平日每小時工資額 = 月薪 ÷ 30 ÷ 8（勞動部 107.9.14 澄清稿）
 *
 * - 平日：前 2 小時加給 1/3（× 4/3），再 2 小時加給 2/3（× 5/3）。
 * - 休息日：依實際出勤時數覈實計算（107.3.1 修法後已無 4/8/12 小時計薪規則）。
 *   第 1–2 小時另再加給 1⅓、第 3–8 小時另再加給 1⅔、第 9–12 小時另再加給 2⅔。
 * - 國定假日（第 37、39 條）：8 小時以內，月薪之外另加給 1 日工資；
 *   第 9–10 小時按第 24 條第 1 項加給 1/3、第 11–12 小時加給 2/3。
 * - 例假（第 40 條）：僅限天災、事變或突發事件，工資加倍（另加給 1 日工資）並應事後補假；
 *   超過 8 小時的部分依第 24 條第 1 項第 3 款按平日每小時工資額加倍發給。
 */
export function calculateOvertime(monthlySalary: number, hours: number, type: OvertimeType): OvertimeResult {
  const hourlyBase = monthlySalary / LABOR_CONSTANTS.monthlyWorkHours;
  const workedHours = Math.max(0, Math.min(hours, MAX_DAILY_HOURS));
  let breakdown: OvertimeResult["breakdown"] = [];
  let note: string | undefined;

  if (type === "weekday") {
    const { first2h, after2h } = LABOR_CONSTANTS.overtimeRates.weekday;
    breakdown = applyTiers(hourlyBase, Math.min(workedHours, 4), [
      { from: 0, to: 2, rate: first2h, label: "前 2 小時" },
      { from: 2, to: 4, rate: after2h, label: "第 3 小時起" },
    ]);
    if (hours > 4) note = "平日正常工時 8 小時加上延長工時，一日合計不得超過 12 小時，本表只計前 4 小時加班。";
  } else if (type === "rest-day") {
    const { first2h, after2h, after8h } = LABOR_CONSTANTS.overtimeRates.restDay;
    breakdown = applyTiers(hourlyBase, workedHours, [
      { from: 0, to: 2, rate: first2h, label: "休息日第 1–2 小時" },
      { from: 2, to: 8, rate: after2h, label: "休息日第 3–8 小時" },
      { from: 8, to: 12, rate: after8h, label: "休息日第 9–12 小時" },
    ]);
    note = "休息日加班依實際出勤時數覈實計算；月薪已含休息日當日工資，表中金額為另再加給的部分。";
  } else {
    const isRegularDayOff = type === "national-holiday";
    const dailyWage = Math.round(hourlyBase * 8);
    if (workedHours > 0) {
      breakdown.push({
        hours: Math.min(workedHours, 8),
        billedHours: 8,
        rate: 1,
        pay: dailyWage,
        label: isRegularDayOff ? "例假出勤：加給 1 日工資" : "國定假日 8 小時內：加給 1 日工資",
      });
    }
    if (isRegularDayOff) {
      // 第 40 條停止假期而延長工時，屬第 32 條第 4 項之延長，依第 24 條第 1 項第 3 款按平日每小時工資額加倍發給
      breakdown.push(
        ...applyTiers(hourlyBase, workedHours, [{ from: 8, to: 12, rate: 2, label: "第 9–12 小時（加倍發給）" }]),
      );
      note = "例假依第 40 條僅限天災、事變或突發事件出勤，雇主除工資加倍外，應於事後給予補假休息；超過 8 小時的部分依第 24 條第 1 項第 3 款按平日每小時工資額加倍發給。";
    } else {
      const { first2h, after2h } = LABOR_CONSTANTS.overtimeRates.weekday;
      breakdown.push(
        ...applyTiers(hourlyBase, workedHours, [
          { from: 8, to: 10, rate: first2h, label: "第 9–10 小時" },
          { from: 10, to: 12, rate: after2h, label: "第 11–12 小時" },
        ]),
      );
      note = "國定假日出勤 8 小時以內，不論實際做幾小時，月薪之外都應另加給 1 日工資。";
    }
  }

  if (hours > MAX_DAILY_HOURS) {
    note = `${note ?? ""} 一日工時上限為 12 小時，超過部分未列入試算。`.trim();
  }

  const overtimePay = breakdown.reduce((sum, b) => sum + b.pay, 0);
  const billedHours = breakdown.reduce((sum, b) => sum + b.billedHours, 0);

  return { hourlyBase, overtimePay, billedHours, breakdown, note };
}
