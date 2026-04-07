export type EmploymentType = "full-time" | "part-time" | "contract" | "dispatch";
export type InsuranceSystem = "new" | "old";
export type PayType = "monthly" | "hourly";

export interface SalaryInput {
  payType: PayType;
  monthlySalary?: number;
  hourlySalary?: number;
  hoursPerDay?: number;
  daysPerWeek?: number;
}

export interface OvertimeInput {
  baseMonthlySalary: number;
  overtimeHours: number;
  overtimeType: "weekday" | "rest-day" | "holiday" | "national-holiday";
}

export interface SeveranceInput {
  system: InsuranceSystem;
  avgMonthlySalary: number;
  yearsOfService: number;
  monthsOfService: number;
}

export interface InsurancePremiumResult {
  bracket: number;
  laborInsurance: {
    total: number;
    workerShare: number;
    employerShare: number;
    govShare: number;
  };
  nhi: {
    total: number;
    workerShare: number;
    employerShare: number;
    govShare: number;
    dependents: number;
  };
  pension: {
    employerContribution: number;
    workerVoluntary: number;
    taxBenefit: number;
  };
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
}

export type ArticleCategory =
  | "salary"
  | "overtime"
  | "leave"
  | "insurance"
  | "pension"
  | "severance"
  | "rights"
  | "injury"
  | "freelance"
  | "hr";

export interface ToolInfo {
  name: string;
  description: string;
  href: string;
  icon: string;
  keywords: string[];
}
