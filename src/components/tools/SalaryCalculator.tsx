"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateSalaryBreakdown, type SalaryBreakdownResult } from "@/lib/calculations/salary-breakdown";
import { formatMoney } from "@/lib/format";

export function SalaryCalculator() {
  const [salary, setSalary] = useState("");
  const [dependents, setDependents] = useState("0");
  const [pensionRate, setPensionRate] = useState("0");
  const [result, setResult] = useState<SalaryBreakdownResult | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    if (!s || s < 0) return;
    setResult(
      calculateSalaryBreakdown(s, parseInt(dependents), parseFloat(pensionRate) / 100)
    );
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
        </Card>
      )}
    </div>
  );
}
