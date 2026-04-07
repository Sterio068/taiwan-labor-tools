import { LABOR_CONSTANTS } from "@/data/constants";

export interface AnnualLeaveResult {
  days: number;
  label: string;
  yearsOfService: number;
}

/**
 * 特休天數計算（勞基法第 38 條）
 */
export function calculateAnnualLeave(
  startDate: Date,
  endDate: Date = new Date()
): AnnualLeaveResult {
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30.44; // 平均月天數
  const diffYears = diffDays / 365.25;

  if (diffMonths < 6) {
    return { days: 0, label: "未滿 6 個月", yearsOfService: diffYears };
  }

  const rules = LABOR_CONSTANTS.annualLeave;

  // 6 個月 ~ 未滿 1 年
  if (diffMonths >= 6 && diffYears < 1) {
    return { days: rules[0].days, label: "滿 6 個月未滿 1 年", yearsOfService: diffYears };
  }

  // 1 年以上
  const fullYears = Math.floor(diffYears);

  for (const rule of rules) {
    if ("minYears" in rule && "maxYears" in rule) {
      if (fullYears >= rule.minYears && fullYears < rule.maxYears) {
        if ("daysBase" in rule) {
          // 10 年以上：15 天 + 每多 1 年加 1 天，最多 30 天
          const extra = (fullYears - rule.minYears) * rule.extraPerYear;
          const days = Math.min(rule.daysBase + extra, rule.maxDays);
          return {
            days,
            label: `滿 ${fullYears} 年`,
            yearsOfService: diffYears,
          };
        }
        return {
          days: rule.days,
          label: `滿 ${fullYears} 年`,
          yearsOfService: diffYears,
        };
      }
    }
  }

  return { days: 0, label: "無法計算", yearsOfService: diffYears };
}
