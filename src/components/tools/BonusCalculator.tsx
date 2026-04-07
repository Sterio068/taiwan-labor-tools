"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";

interface BonusResult {
  monthlySalary: number;
  bonusMonths: number;
  workMonths: number;
  fullYearBonus: number;
  proRatedBonus: number;
  isProRated: boolean;
}

function calculateBonus(
  monthlySalary: number,
  bonusMonths: number,
  workMonths: number
): BonusResult {
  const fullYearBonus = monthlySalary * bonusMonths;
  const proRatedBonus = Math.round(monthlySalary * bonusMonths * (workMonths / 12));
  return {
    monthlySalary,
    bonusMonths,
    workMonths,
    fullYearBonus,
    proRatedBonus,
    isProRated: workMonths < 12,
  };
}

export function BonusCalculator() {
  const [salary, setSalary] = useState("");
  const [bonusMonths, setBonusMonths] = useState("1");
  const [workMonths, setWorkMonths] = useState("12");
  const [result, setResult] = useState<BonusResult | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    if (!s || s < 0) return;
    setResult(calculateBonus(s, parseFloat(bonusMonths), parseInt(workMonths)));
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="每月薪資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Select
            label="年終月數"
            options={[
              { value: "0.5", label: "0.5 個月" },
              { value: "1", label: "1 個月" },
              { value: "1.5", label: "1.5 個月" },
              { value: "2", label: "2 個月" },
              { value: "2.5", label: "2.5 個月" },
              { value: "3", label: "3 個月" },
              { value: "4", label: "4 個月" },
              { value: "6", label: "6 個月" },
            ]}
            value={bonusMonths}
            onChange={(e) => setBonusMonths(e.target.value)}
          />
          <Select
            label="今年在職月數"
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1),
              label: `${i + 1} 個月`,
            }))}
            value={workMonths}
            onChange={(e) => setWorkMonths(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算年終獎金
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          {/* 大數字：實領年終 */}
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">
              {result.isProRated ? "按比例年終獎金" : "年終獎金"}
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              ${formatMoney(result.proRatedBonus)}
            </p>
            {result.isProRated && (
              <p className="text-sm text-slate-500 mt-2">
                滿年可領 ${formatMoney(result.fullYearBonus)}
              </p>
            )}
          </div>

          {/* 計算明細 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">項目</th>
                  <th className="text-right py-2 text-slate-500 font-medium">金額 / 數值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 text-slate-700">每月薪資</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    ${formatMoney(result.monthlySalary)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">年終月數</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    {result.bonusMonths} 個月
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">整年年終</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    ${formatMoney(result.fullYearBonus)}
                  </td>
                </tr>
                {result.isProRated && (
                  <>
                    <tr>
                      <td className="py-2.5 text-slate-700">在職月數</td>
                      <td className="py-2.5 text-right font-semibold text-slate-900">
                        {result.workMonths} / 12 個月
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-700">按比例計算</td>
                      <td className="py-2.5 text-right text-slate-500">
                        ${formatMoney(result.monthlySalary)} x {result.bonusMonths} x ({result.workMonths}/12)
                      </td>
                    </tr>
                  </>
                )}
                <tr className="border-t-2 border-slate-200">
                  <td className="py-2.5 font-bold text-slate-900">實際年終獎金</td>
                  <td className="py-2.5 text-right font-extrabold text-brand-600 text-lg">
                    ${formatMoney(result.proRatedBonus)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 公式說明 */}
          <div className="mt-6 p-4 bg-slate-50 rounded-[12px]">
            <p className="text-sm text-slate-500 mb-1">計算公式</p>
            <p className="text-sm font-mono text-slate-700">
              年終獎金 = 月薪 x 年終月數 x (在職月數 / 12)
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
