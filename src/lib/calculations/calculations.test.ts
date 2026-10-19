import { describe, expect, it } from "vitest";

import { LABOR_CONSTANTS } from "@/data/constants";
import { calculateAnnualLeave } from "./annual-leave";
import { calculateNhi } from "./nhi";
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
      employerCost: 35_280,
    });
  });

  it("matches the 115-year NHI employer share table", () => {
    // 健保 115.1.1 起負擔金額表：投保金額 29,500 元，個人 458 元、雇主 1,428 元
    expect(calculateNhi(29_500, 0)).toMatchObject({ workerShare: 458, employerShare: 1_428 });
    expect(calculateNhi(45_800, 0)).toMatchObject({ workerShare: 710, employerShare: 2_216 });
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

  it("bills rest-day overtime by actual hours (no 4/8/12 rule since 2018)", () => {
    // 臺中市政府勞工局問答：月薪 36,000、時薪 150，休息日 1 / 6 / 10 小時另再加給 200 / 1,400 / 2,700
    expect(calculateOvertime(36_000, 1, "rest-day").overtimePay).toBe(200);
    expect(calculateOvertime(36_000, 6, "rest-day").overtimePay).toBe(1_400);
    const tenHours = calculateOvertime(36_000, 10, "rest-day");
    expect(tenHours.overtimePay).toBe(2_700);
    expect(tenHours.billedHours).toBe(10);
    expect(tenHours.breakdown.map((row) => row.rate)).toEqual([4 / 3, 5 / 3, 8 / 3]);
  });

  it("pays one extra day's wage for national-holiday work within 8 hours", () => {
    // 勞動部：月薪 36,000，國定假日出勤 8 小時以內，月薪之外另加給 1 日工資 1,200 元
    expect(calculateOvertime(36_000, 2, "holiday").overtimePay).toBe(1_200);
    expect(calculateOvertime(36_000, 8, "holiday").overtimePay).toBe(1_200);
    // 第 9–10 小時依第 24 條第 1 項加給 1/3：150 × 4/3 × 2 = 400
    const tenHours = calculateOvertime(36_000, 10, "holiday");
    expect(tenHours.overtimePay).toBe(1_600);
    expect(tenHours.breakdown[0]).toMatchObject({ rate: 1, pay: 1_200, billedHours: 8 });
  });

  it("pays hours after eight on an Article 40 regular day off at double the hourly base", () => {
    // 月薪 36,000（時薪 150）：例假出勤 9 小時 = 1 日工資 1,200 + 150 × 2 × 1 = 1,500
    const nineHours = calculateOvertime(36_000, 9, "national-holiday");
    expect(nineHours.overtimePay).toBe(1_500);
    expect(calculateOvertime(36_000, 12, "national-holiday").overtimePay).toBe(2_400);
    expect(calculateOvertime(36_000, 6, "national-holiday").overtimePay).toBe(1_200);
  });

  it("caps weekday overtime at four hours per day", () => {
    const result = calculateOvertime(36_000, 6, "weekday");
    expect(result.billedHours).toBe(4);
    expect(result.overtimePay).toBe(900);
    expect(result.note).toContain("12 小時");
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

  it("adds one day per year from 10 years of service, capped at 30 days", () => {
    const start = new Date("2010-01-01T00:00:00+08:00");
    // 滿 10 年的週年當天就適用 16 天
    expect(calculateAnnualLeave(start, new Date("2020-01-01T00:00:00+08:00")).days).toBe(16);
    expect(calculateAnnualLeave(start, new Date("2019-12-31T00:00:00+08:00")).days).toBe(15);
    expect(calculateAnnualLeave(start, new Date("2015-01-02T00:00:00+08:00")).days).toBe(15);
    expect(calculateAnnualLeave(new Date("1990-01-01T00:00:00+08:00"), new Date("2026-01-02T00:00:00+08:00")).days).toBe(30);
    // 滿 6 個月當天取得 3 天
    expect(calculateAnnualLeave(new Date("2026-01-15T00:00:00+08:00"), new Date("2026-07-15T00:00:00+08:00")).days).toBe(3);
    expect(calculateAnnualLeave(new Date("2026-01-15T00:00:00+08:00"), new Date("2026-07-14T00:00:00+08:00")).days).toBe(0);
  });
});
