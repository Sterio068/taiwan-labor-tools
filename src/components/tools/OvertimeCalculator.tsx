"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateOvertime, type OvertimeResult } from "@/lib/calculations/overtime";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";

export function OvertimeCalculator() {
  const [salary, setSalary] = useState("");
  const [hours, setHours] = useState("");
  const [type, setType] = useState("weekday");
  const [result, setResult] = useState<OvertimeResult | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    const h = parseFloat(hours);
    if (!s || !h || s < 0 || h < 0) return;
    setResult(
      calculateOvertime(s, h, type as "weekday" | "rest-day" | "holiday" | "national-holiday")
    );
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
          <Input
            label="加班時數"
            type="number"
            placeholder="例：2"
            suffix="小時"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="0"
            max="12"
            step="0.5"
          />
          <Select
            label="加班類型"
            options={[
              { value: "weekday", label: "平日加班" },
              { value: "rest-day", label: "休息日加班" },
              { value: "holiday", label: "國定假日加班" },
              { value: "national-holiday", label: "例假日加班" },
            ]}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算加班費
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">應領加班費</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              ${formatMoney(result.overtimePay)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-500">
              時薪基數 = {formatMoney(parseInt(salary))} ÷ 30 ÷ 8 = ${formatMoneyDecimal(result.hourlyBase)}/時
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">時段</th>
                  <th className="text-right py-2 text-slate-500 font-medium">時數</th>
                  <th className="text-right py-2 text-slate-500 font-medium">倍率</th>
                  <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.breakdown.map((row, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-slate-700">{row.label}</td>
                    <td className="py-2.5 text-right text-slate-700">{row.hours} 小時</td>
                    <td className="py-2.5 text-right text-slate-700">{formatMoneyDecimal(row.rate)}x</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">
                      ${formatMoney(row.pay)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200">
                  <td className="py-2.5 font-bold text-slate-900" colSpan={3}>加班費合計</td>
                  <td className="py-2.5 text-right font-extrabold text-brand-600 text-lg">
                    ${formatMoney(result.overtimePay)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
