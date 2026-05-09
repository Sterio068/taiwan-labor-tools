"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResultActions } from "@/components/tools/ResultActions";
import { calculateSeverance, type SeveranceResult } from "@/lib/calculations/severance";
import { trackEvent } from "@/lib/analytics";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";

const SEVERANCE_PRESETS = [
  { id: "new_1y", label: "新制 1 年", system: "new", salary: "45000", years: "1", months: "0" },
  { id: "new_2y", label: "新制 2 年", system: "new", salary: "45000", years: "2", months: "0" },
  { id: "new_5y", label: "新制 5 年", system: "new", salary: "45000", years: "5", months: "0" },
  { id: "new_2y_6m", label: "新制 2 年 6 個月", system: "new", salary: "45000", years: "2", months: "6" },
];

export function SeveranceCalculator() {
  const [system, setSystem] = useState("new");
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("0");
  const [result, setResult] = useState<SeveranceResult | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    if (!s || s <= 0) return;
    trackEvent("tool_started", { tool_id: "severance" });
    setResult(calculateSeverance(system as "new" | "old", s, y, m));
    trackEvent("tool_completed", {
      tool_id: "severance",
      severance_system: system,
    });
  };

  const applyPreset = (preset: typeof SEVERANCE_PRESETS[number]) => {
    setSystem(preset.system);
    setSalary(salary || preset.salary);
    setYears(preset.years);
    setMonths(preset.months);
    setResult(null);
    trackEvent("tool_preset_applied", {
      tool_id: "severance",
      preset_id: preset.id,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="適用制度"
            options={[
              { value: "new", label: "新制（2005/7/1 後到職）" },
              { value: "old", label: "舊制（2005/7/1 前到職）" },
            ]}
            value={system}
            onChange={(e) => setSystem(e.target.value)}
          />
          <Input
            label="離職前 6 個月平均工資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Input
            label="年資（年）"
            type="number"
            placeholder="例：3"
            suffix="年"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="0"
          />
          <Select
            label="年資（月）"
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i),
              label: `${i} 個月`,
            }))}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-bold text-slate-600">常用情境</span>
          {SEVERANCE_PRESETS.map((preset) => (
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
            計算資遣費
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">應領資遣費</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              ${formatMoney(result.amount)}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">適用制度</span>
              <span className="font-semibold text-slate-900">
                {result.system === "new" ? "勞退新制" : "勞退舊制"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">年資</span>
              <span className="font-semibold text-slate-900">
                {(() => {
                  const y = Math.floor(result.yearsOfService);
                  const m = Math.round((result.yearsOfService - y) * 12);
                  if (y === 0) return `${m} 個月`;
                  if (m === 0) return `${y} 年`;
                  return `${y} 年 ${m} 個月`;
                })()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">平均月薪</span>
              <span className="font-semibold text-slate-900">
                ${formatMoney(result.avgSalary)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">
                {result.system === "new" ? "基數（每年 0.5 個月，上限 6 個月）" : "基數（每年 1 個月）"}
              </span>
              <span className="font-semibold text-slate-900">
                {formatMoneyDecimal(result.months, 2)} 個月
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-bold text-slate-900">資遣費</span>
              <span className="font-extrabold text-brand-600 text-lg">
                ${formatMoney(result.amount)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">資遣費以離職前 6 個月平均工資為基準，含加班費與經常性給與。</p>
          <ResultActions
            toolId="severance"
            shareTitle="資遣費試算摘要"
            summary={[
              "資遣費試算",
              `制度: ${result.system === "new" ? "新制" : "舊制"}`,
              `平均月薪: $${formatMoney(result.avgSalary)}`,
              `年資基數: ${formatMoneyDecimal(result.months, 2)} 個月`,
              `資遣費: $${formatMoney(result.amount)}`,
            ].join("\n")}
          />
        </Card>
      )}
    </div>
  );
}
