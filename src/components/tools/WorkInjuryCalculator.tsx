"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateWorkInjury, type WorkInjuryResult } from "@/lib/calculations/work-injury";
import { formatMoney } from "@/lib/format";

type InjuryType = "wage-loss" | "disability" | "death" | "medical";

export function WorkInjuryCalculator() {
  const [injuryType, setInjuryType] = useState<InjuryType>("wage-loss");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [insuredSalary, setInsuredSalary] = useState("");
  const [lostDays, setLostDays] = useState("");
  const [disabilityLevel, setDisabilityLevel] = useState("1");
  const [result, setResult] = useState<WorkInjuryResult | null>(null);

  const handleCalculate = () => {
    const ms = parseInt(monthlySalary);
    const is = parseInt(insuredSalary);
    if (!ms || ms < 0) return;
    setResult(
      calculateWorkInjury(
        ms,
        is || ms,
        injuryType,
        parseInt(lostDays) || 0,
        parseInt(disabilityLevel) || 1
      )
    );
  };

  const typeLabel: Record<InjuryType, string> = {
    "wage-loss": "不能工作（工資補償）",
    disability: "失能給付",
    death: "死亡給付",
    medical: "醫療費用",
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="職災類型"
            options={[
              { value: "wage-loss", label: "不能工作（工資補償）" },
              { value: "disability", label: "失能給付" },
              { value: "death", label: "死亡給付" },
              { value: "medical", label: "醫療費用" },
            ]}
            value={injuryType}
            onChange={(e) => {
              setInjuryType(e.target.value as InjuryType);
              setResult(null);
            }}
          />
          <Input
            label="每月薪資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
          />
          <Input
            label="勞保投保薪資"
            type="number"
            placeholder="例：45800"
            suffix="元"
            value={insuredSalary}
            onChange={(e) => setInsuredSalary(e.target.value)}
            hint="用於計算勞保給付，不確定可留空"
          />
          {injuryType === "wage-loss" && (
            <Input
              label="不能工作天數"
              type="number"
              placeholder="例：30"
              suffix="天"
              value={lostDays}
              onChange={(e) => setLostDays(e.target.value)}
              min="1"
            />
          )}
          {injuryType === "disability" && (
            <Select
              label="失能等級"
              options={Array.from({ length: 15 }, (_, i) => ({
                value: String(i + 1),
                label: `第 ${i + 1} 等級`,
              }))}
              value={disabilityLevel}
              onChange={(e) => setDisabilityLevel(e.target.value)}
            />
          )}
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算職災給付
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">{typeLabel[injuryType]}</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              {result.totalEstimate > 0
                ? `$${formatMoney(result.totalEstimate)}`
                : "依實際支出"}
            </p>
          </div>

          {/* 補償明細表 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">項目</th>
                  <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.compensations.map((row, i) => (
                  <tr key={i}>
                    <td className="py-2.5">
                      <p className="text-slate-700">{row.item}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>
                    </td>
                    <td className="py-2.5 text-right font-semibold text-slate-900 whitespace-nowrap">
                      {row.amount > 0 ? `$${formatMoney(row.amount)}` : "依實際支出"}
                    </td>
                  </tr>
                ))}
                {result.compensations.length > 1 && (
                  <tr className="border-t-2 border-slate-200">
                    <td className="py-2.5 font-bold text-slate-900">合計</td>
                    <td className="py-2.5 text-right font-extrabold text-brand-600 text-lg">
                      ${formatMoney(result.totalEstimate)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 注意事項 */}
          <div className="mt-6 p-4 bg-slate-50 rounded-[12px]">
            <p className="text-sm font-semibold text-slate-700 mb-1">注意事項</p>
            <ul className="text-sm text-slate-500 space-y-1 list-disc list-inside">
              <li>此為概估金額，實際給付依勞保局審核為準</li>
              <li>雇主補償金額與勞保給付可互相抵充</li>
              <li>如雇主未依法補償，勞工可向勞工局申訴</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}
