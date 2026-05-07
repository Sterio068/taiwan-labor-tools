"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateSeverance, type SeveranceResult } from "@/lib/calculations/severance";
import { trackEvent } from "@/lib/analytics";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";

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
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`資遣費試算\n制度: ${result.system === "new" ? "新制" : "舊制"}\n資遣費: $${formatMoney(result.amount)}`);
                trackEvent("tool_result_copied", { tool_id: "severance" });
              }}
              className="text-sm text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              複製結果
            </button>
            <button
              type="button"
              onClick={() => {
                window.print();
                trackEvent("tool_result_printed", { tool_id: "severance" });
              }}
              className="text-sm text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
              列印摘要
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
