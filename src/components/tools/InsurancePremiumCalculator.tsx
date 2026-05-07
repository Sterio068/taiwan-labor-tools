"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateLaborInsurance } from "@/lib/calculations/labor-insurance";
import { calculateNhi } from "@/lib/calculations/nhi";
import { trackEvent } from "@/lib/analytics";
import { formatMoney } from "@/lib/format";

interface Result {
  li: ReturnType<typeof calculateLaborInsurance>;
  nhi: ReturnType<typeof calculateNhi>;
}

export function InsurancePremiumCalculator() {
  const [salary, setSalary] = useState("");
  const [dependents, setDependents] = useState("0");
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    if (!s || s <= 0) return;
    trackEvent("tool_started", { tool_id: "insurance-premium" });
    setResult({
      li: calculateLaborInsurance(s),
      nhi: calculateNhi(s, parseInt(dependents)),
    });
    trackEvent("tool_completed", {
      tool_id: "insurance-premium",
      has_dependents: dependents !== "0",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="每月薪資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Select
            label="健保眷屬人數"
            options={[
              { value: "0", label: "0 人（只有本人）" },
              { value: "1", label: "1 人" },
              { value: "2", label: "2 人" },
              { value: "3", label: "3 人（上限）" },
            ]}
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算保費
          </Button>
        </div>
      </Card>

      {result && (
        <>
          {/* 勞保 */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-1">勞工保險</h3>
            <p className="text-sm text-slate-500 mb-4">
              投保級距 ${formatMoney(result.li.bracket)} · 費率 12.5%
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">負擔者</th>
                    <th className="text-right py-2 text-slate-500 font-medium">比例</th>
                    <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-brand-50">
                    <td className="py-2.5 font-semibold text-brand-700">勞工自付</td>
                    <td className="py-2.5 text-right text-brand-600">20%</td>
                    <td className="py-2.5 text-right font-bold text-brand-700">
                      ${formatMoney(result.li.workerShare)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-700">雇主負擔</td>
                    <td className="py-2.5 text-right text-slate-500">70%</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">
                      ${formatMoney(result.li.employerShare)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-700">政府補助</td>
                    <td className="py-2.5 text-right text-slate-500">10%</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">
                      ${formatMoney(result.li.govShare)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* 健保 */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-1">全民健保</h3>
            <p className="text-sm text-slate-500 mb-4">
              投保級距 ${formatMoney(result.nhi.bracket)} · 費率 5.17%
              {result.nhi.dependents > 0 ? ` · 眷屬 ${result.nhi.dependents} 口` : ""}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">負擔者</th>
                    <th className="text-right py-2 text-slate-500 font-medium">比例</th>
                    <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-brand-50">
                    <td className="py-2.5 font-semibold text-brand-700">
                      勞工自付{result.nhi.dependents > 0 ? `（含 ${result.nhi.dependents} 眷屬）` : ""}
                    </td>
                    <td className="py-2.5 text-right text-brand-600">
                      30% × {1 + result.nhi.dependents}
                    </td>
                    <td className="py-2.5 text-right font-bold text-brand-700">
                      ${formatMoney(result.nhi.workerShareWithDependents)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-700">雇主負擔</td>
                    <td className="py-2.5 text-right text-slate-500">60% × 平均眷口 1.56</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">
                      ${formatMoney(result.nhi.employerShare)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-700">政府補助</td>
                    <td className="py-2.5 text-right text-slate-500">10%</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">
                      ${formatMoney(result.nhi.govShare)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* 合計 */}
          <Card className="bg-brand-50 border border-brand-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-600 font-medium">每月勞健保自付合計</p>
                <p className="text-xs text-brand-500 mt-0.5">勞保 + 健保（含眷屬）</p>
              </div>
              <p className="text-3xl font-extrabold text-brand-700">
                ${formatMoney(result.li.workerShare + result.nhi.workerShareWithDependents)}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-brand-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`勞健保保費試算\n勞保自付: $${formatMoney(result.li.workerShare)}\n健保自付: $${formatMoney(result.nhi.workerShareWithDependents)}\n合計: $${formatMoney(result.li.workerShare + result.nhi.workerShareWithDependents)}`);
                  trackEvent("tool_result_copied", { tool_id: "insurance-premium" });
                }}
                className="text-sm text-brand-700 hover:text-brand-800 transition-colors"
              >
                複製結果
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
