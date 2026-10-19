import { LABOR_CONSTANTS } from "@/data/constants";
import { calculateServiceYears } from "./service-years";

export interface AnnualLeaveResult {
  days: number;
  label: string;
  yearsOfService: number;
}

/**
 * 特休天數計算（勞基法第 38 條）
 * 年資以日曆上的到職週年判斷（例如 2010/1/1 到職，2020/1/1 即滿 10 年），
 * 避免用平均天數換算造成週年當天少算一個級距。
 */
export function calculateAnnualLeave(
  startDate: Date,
  endDate: Date = new Date()
): AnnualLeaveResult {
  const service = calculateServiceYears(startDate, endDate);
  const fullYears = service.years;
  const yearsOfService = service.totalMonths / 12;

  if (service.totalMonths < 6) {
    return { days: 0, label: "未滿 6 個月", yearsOfService };
  }

  const rules = LABOR_CONSTANTS.annualLeave;

  // 6 個月 ~ 未滿 1 年
  if (fullYears < 1) {
    return { days: rules[0].days, label: "滿 6 個月未滿 1 年", yearsOfService };
  }

  for (const rule of rules) {
    if ("minYears" in rule && "maxYears" in rule) {
      if (fullYears >= rule.minYears && fullYears < rule.maxYears) {
        if ("daysBase" in rule) {
          // 10 年以上：滿 10 年 16 天，之後每滿 1 年加 1 天，最多 30 天
          const extra = (fullYears - rule.minYears) * rule.extraPerYear;
          const days = Math.min(rule.daysBase + extra, rule.maxDays);
          return { days, label: `滿 ${fullYears} 年`, yearsOfService };
        }
        return { days: rule.days, label: `滿 ${fullYears} 年`, yearsOfService };
      }
    }
  }

  return { days: 0, label: "無法計算", yearsOfService };
}
