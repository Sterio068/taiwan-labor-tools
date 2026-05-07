"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateAnnualLeave, type AnnualLeaveResult } from "@/lib/calculations/annual-leave";
import { LABOR_CONSTANTS } from "@/data/constants";
import { trackEvent } from "@/lib/analytics";

export function AnnualLeaveCalculator() {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<AnnualLeaveResult | null>(null);

  const handleCalculate = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    if (isNaN(date.getTime())) return;
    trackEvent("tool_started", { tool_id: "annual-leave" });
    setResult(calculateAnnualLeave(date));
    trackEvent("tool_completed", { tool_id: "annual-leave" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="max-w-sm">
          <Input
            label="到職日期"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算特休天數
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">今年特休天數</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              {result.days} <span className="text-2xl">天</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">{result.label}</p>
          </div>

          {/* 完整年資對照表 */}
          <h3 className="text-lg font-bold text-slate-900 mb-4">特休天數年資對照表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">年資</th>
                  <th className="text-right py-2 text-slate-500 font-medium">特休天數</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LABOR_CONSTANTS.annualLeave.map((rule, i) => {
                  let label: string;
                  let days: string;
                  if ("minMonths" in rule) {
                    label = `${rule.minMonths} 個月 ~ 未滿 1 年`;
                    days = `${rule.days} 天`;
                  } else if ("daysBase" in rule) {
                    label = `${rule.minYears} 年以上`;
                    days = `${rule.daysBase} 天起，每年 +1，最多 ${rule.maxDays} 天`;
                  } else {
                    label = `${rule.minYears} 年 ~ 未滿 ${rule.maxYears} 年`;
                    days = `${rule.days} 天`;
                  }
                  const isActive =
                    result.yearsOfService >= (("minYears" in rule ? rule.minYears : 0)) &&
                    result.yearsOfService < (("maxYears" in rule ? rule.maxYears : Infinity));
                  return (
                    <tr key={i} className={isActive ? "bg-brand-50" : ""}>
                      <td className={`py-2.5 ${isActive ? "font-semibold text-brand-700" : "text-slate-700"}`}>
                        {label}
                      </td>
                      <td className={`py-2.5 text-right ${isActive ? "font-bold text-brand-700" : "text-slate-700"}`}>
                        {days}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">特休天數依勞基法第 38 條計算，實際起算日依公司採用之週年制或曆年制而定。</p>
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`特休天數試算\n今年特休: ${result.days} 天\n${result.label}`);
                trackEvent("tool_result_copied", { tool_id: "annual-leave" });
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
                trackEvent("tool_result_printed", { tool_id: "annual-leave" });
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
