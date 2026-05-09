"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResultActions } from "@/components/tools/ResultActions";
import { ResultNextSteps } from "@/components/tools/ResultNextSteps";
import { calculateSalaryBreakdown, type SalaryBreakdownResult } from "@/lib/calculations/salary-breakdown";
import { trackEvent } from "@/lib/analytics";
import { formatMoney } from "@/lib/format";

const SALARY_PRESETS = [
  { id: "minimum_wage", label: "基本工資", salary: "29500", dependents: "0", pensionRate: "0" },
  { id: "monthly_35000", label: "月薪 35000", salary: "35000", dependents: "0", pensionRate: "0" },
  { id: "monthly_50000", label: "月薪 50000", salary: "50000", dependents: "0", pensionRate: "0" },
  { id: "voluntary_pension_6", label: "自提 6%", salary: "45000", dependents: "0", pensionRate: "6" },
];

function parseInitialParams(params: URLSearchParams): {
  salary: string;
  dependents: string;
  pensionRate: string;
} {
  const mRaw = params.get("m");
  const dRaw = params.get("d");
  const sRaw = params.get("s");

  const m = mRaw ? parseInt(mRaw, 10) : NaN;
  const d = dRaw ? parseInt(dRaw, 10) : NaN;
  const s = sRaw ? parseInt(sRaw, 10) : NaN;

  return {
    salary: !isNaN(m) && m > 0 ? String(m) : "",
    dependents: !isNaN(d) && d >= 0 && d <= 3 ? String(d) : "0",
    pensionRate: !isNaN(s) && s >= 0 && s <= 6 ? String(s) : "0",
  };
}

function SalaryCalculatorInner() {
  const searchParams = useSearchParams();
  const initial = parseInitialParams(searchParams);

  const [salary, setSalary] = useState(initial.salary);
  const [dependents, setDependents] = useState(initial.dependents);
  const [pensionRate, setPensionRate] = useState(initial.pensionRate);
  const [result, setResult] = useState<SalaryBreakdownResult | null>(null);

  // 若 URL 帶有有效的初始值，自動觸發一次計算
  useEffect(() => {
    if (initial.salary) {
      const s = parseInt(initial.salary, 10);
      if (s > 0) {
        setResult(
          calculateSalaryBreakdown(
            s,
            parseInt(initial.dependents, 10),
            parseFloat(initial.pensionRate) / 100
          )
        );
      }
    }
  // 只在 mount 時跑一次
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    const s = parseInt(salary);
    if (!s || s <= 0) return;
    trackEvent("tool_started", { tool_id: "salary" });
    const nextResult = calculateSalaryBreakdown(s, parseInt(dependents), parseFloat(pensionRate) / 100);
    setResult(nextResult);
    trackEvent("tool_completed", {
      tool_id: "salary",
      has_dependents: dependents !== "0",
      has_voluntary_pension: pensionRate !== "0",
    });
  };

  const applyPreset = (preset: typeof SALARY_PRESETS[number]) => {
    setSalary(preset.salary);
    setDependents(preset.dependents);
    setPensionRate(preset.pensionRate);
    setResult(null);
    trackEvent("tool_preset_applied", {
      tool_id: "salary",
      preset_id: preset.id,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="每月薪資（稅前）"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Select
            label="健保眷屬人數"
            options={[
              { value: "0", label: "0 人" },
              { value: "1", label: "1 人" },
              { value: "2", label: "2 人" },
              { value: "3", label: "3 人" },
            ]}
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
          <Select
            label="勞退自提比例"
            options={[
              { value: "0", label: "不自提" },
              { value: "1", label: "1%" },
              { value: "2", label: "2%" },
              { value: "3", label: "3%" },
              { value: "4", label: "4%" },
              { value: "5", label: "5%" },
              { value: "6", label: "6%" },
            ]}
            value={pensionRate}
            onChange={(e) => setPensionRate(e.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-bold text-slate-600">常用情境</span>
          {SALARY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className="min-h-9 rounded-full border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算薪資明細
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          {/* 大數字：實領薪資 */}
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">每月實領</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              ${formatMoney(result.netSalary)}
            </p>
          </div>

          {/* 明細表 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">項目</th>
                  <th className="text-right py-2 text-slate-500 font-medium">投保級距</th>
                  <th className="text-right py-2 text-slate-500 font-medium">自付額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 text-slate-700">月薪（稅前）</td>
                  <td className="py-2.5 text-right text-slate-500">—</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    ${formatMoney(result.grossSalary)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">勞保自付</td>
                  <td className="py-2.5 text-right text-slate-500">
                    ${formatMoney(result.laborInsuranceBracket)}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-danger-600">
                    -${formatMoney(result.laborInsurance)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">
                    健保自付{result.nhiDependents > 0 ? `（含 ${result.nhiDependents} 眷屬）` : ""}
                  </td>
                  <td className="py-2.5 text-right text-slate-500">
                    ${formatMoney(result.nhiBracket)}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-danger-600">
                    -${formatMoney(result.nhi)}
                  </td>
                </tr>
                {result.pensionWorker > 0 && (
                  <tr>
                    <td className="py-2.5 text-slate-700">勞退自提</td>
                    <td className="py-2.5 text-right text-slate-500">
                      ${formatMoney(result.pensionBracket)}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-danger-600">
                      -${formatMoney(result.pensionWorker)}
                    </td>
                  </tr>
                )}
                <tr className="border-t-2 border-slate-200">
                  <td className="py-2.5 font-bold text-slate-900">每月實領</td>
                  <td className="py-2.5 text-right text-slate-500">—</td>
                  <td className="py-2.5 text-right font-extrabold text-brand-600 text-lg">
                    ${formatMoney(result.netSalary)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 雇主成本 */}
          <div className="mt-6 p-4 bg-slate-50 rounded-[12px]">
            <p className="text-sm text-slate-500 mb-2">雇主每月總成本</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                ${formatMoney(result.employerCost)}
              </span>
              <span className="text-sm text-slate-500">
                （含勞保雇主 + 健保雇主 + 勞退 6% 提繳 ${formatMoney(result.pensionEmployer)}）
              </span>
            </div>
          </div>

          <ResultNextSteps
            toolId="salary"
            steps={[
              {
                label: "核對薪資單檢查表",
                href: "/checklists#salary-slip",
                description: "對照勞保、健保、勞退自提與加班費欄位，避免錯扣或低報。",
              },
              {
                label: "查投保級距",
                href: "/tools/insurance-bracket",
                description: "把稅前月薪與勞健保級距比對，確認薪資單扣款合理。",
              },
              {
                label: "了解勞退 6%",
                href: "/articles/labor-pension-6-percent",
                description: "雇主提繳 6% 不得從薪水扣除，自提才會影響實領。",
              },
            ]}
          />

          <ResultActions
            toolId="salary"
            shareTitle="薪資明細試算摘要"
            summary={[
              "薪資明細試算",
              `月薪: $${formatMoney(result.grossSalary)}`,
              `勞保: -$${formatMoney(result.laborInsurance)}`,
              `健保: -$${formatMoney(result.nhi)}`,
              `實領: $${formatMoney(result.netSalary)}`,
              `雇主成本: $${formatMoney(result.employerCost)}`,
            ].join("\n")}
          />
        </Card>
      )}
    </div>
  );
}

export function SalaryCalculator() {
  return (
    <Suspense>
      <SalaryCalculatorInner />
    </Suspense>
  );
}
