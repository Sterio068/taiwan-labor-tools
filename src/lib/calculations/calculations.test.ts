import { describe, expect, it } from "vitest";

import { LABOR_CONSTANTS } from "@/data/constants";
import { calculateOvertime } from "./overtime";
import { calculateSalaryBreakdown } from "./salary-breakdown";
import { calculateSeverance } from "./severance";

describe("labor calculation regressions", () => {
  it("uses the 2026 minimum monthly wage and brackets for salary breakdown", () => {
    expect(LABOR_CONSTANTS.year).toBe(2026);
    expect(LABOR_CONSTANTS.minimumMonthlyWage).toBe(29_500);
    expect(LABOR_CONSTANTS.minimumHourlyWage).toBe(196);

    const result = calculateSalaryBreakdown(29_500, 1, 0.06);

    expect(result).toMatchObject({
      grossSalary: 29_500,
      laborInsuranceBracket: 29_500,
      laborInsurance: 738,
      nhiBracket: 29_500,
      nhi: 916,
      nhiDependents: 1,
      pensionBracket: 29_500,
      pensionEmployer: 1_770,
      pensionWorker: 1_770,
      totalDeductions: 3_424,
      netSalary: 26_076,
      employerCost: 35_279,
    });
  });

  it("calculates weekday overtime with first-two-hour and after-two-hour rates", () => {
    const result = calculateOvertime(29_500, 3, "weekday");

    expect(result.hourlyBase).toBeCloseTo(29_500 / 240, 5);
    expect(result.billedHours).toBe(3);
    expect(result.overtimePay).toBe(533);
    expect(result.breakdown).toEqual([
      {
        hours: 2,
        billedHours: 2,
        rate: 4 / 3,
        pay: 328,
        label: "前 2 小時",
      },
      {
        hours: 1,
        billedHours: 1,
        rate: 5 / 3,
        pay: 205,
        label: "第 3 小時起",
      },
    ]);
  });

  it("applies rest-day minimum billed hours and holiday double pay", () => {
    const restDay = calculateOvertime(29_500, 1, "rest-day");

    expect(restDay.billedHours).toBe(4);
    expect(restDay.overtimePay).toBe(738);
    expect(restDay.note).toContain("依法以 4 小時計算工資");

    const holiday = calculateOvertime(29_500, 2, "holiday");

    expect(holiday.billedHours).toBe(2);
    expect(holiday.overtimePay).toBe(492);
    expect(holiday.breakdown[0]).toMatchObject({
      rate: 2,
      label: "國定假日加班",
    });
  });

  it("caps new-system severance at six months and preserves old-system accrual", () => {
    expect(calculateSeverance("new", 60_000, 13, 0)).toMatchObject({
      system: "new",
      months: 6,
      amount: 360_000,
      avgSalary: 60_000,
      yearsOfService: 13,
    });

    expect(calculateSeverance("new", 50_000, 3, 6)).toMatchObject({
      system: "new",
      months: 1.75,
      amount: 87_500,
      yearsOfService: 3.5,
    });

    expect(calculateSeverance("old", 50_000, 3, 6)).toMatchObject({
      system: "old",
      months: 3.5,
      amount: 175_000,
      yearsOfService: 3.5,
    });
  });
});
