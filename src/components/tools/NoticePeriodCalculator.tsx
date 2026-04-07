"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LABOR_CONSTANTS } from "@/data/constants";

function formatDate(date: Date): string {
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

interface NoticePeriodResult {
  startDate: Date;
  today: Date;
  yearsOfService: number;
  noticeDays: number;
  suggestedLastDay: Date;
  label: string;
}

function calculateNoticePeriod(startDate: Date): NoticePeriodResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - startDate.getTime();
  const yearsOfService = diffMs / (365.25 * 24 * 60 * 60 * 1000);

  let noticeDays = 0;
  let label = "";

  for (const rule of LABOR_CONSTANTS.noticePeriod) {
    const minYears = rule.minYears;
    const maxYears = rule.maxYears;
    if (yearsOfService >= minYears && yearsOfService < maxYears) {
      noticeDays = rule.days;
      if (noticeDays === 0) {
        label = "未滿 3 個月，無預告期間";
      } else if ("minMonths" in rule) {
        label = `${rule.minMonths} 個月以上未滿 1 年`;
      } else if (maxYears === Infinity) {
        label = `${minYears} 年以上`;
      } else {
        label = `${minYears} 年以上未滿 ${maxYears} 年`;
      }
      break;
    }
  }

  const suggestedLastDay = new Date(today);
  suggestedLastDay.setDate(suggestedLastDay.getDate() + noticeDays);

  return {
    startDate,
    today,
    yearsOfService,
    noticeDays,
    suggestedLastDay,
    label,
  };
}

export function NoticePeriodCalculator() {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<NoticePeriodResult | null>(null);

  const handleCalculate = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    if (isNaN(date.getTime())) return;
    date.setHours(0, 0, 0, 0);
    setResult(calculateNoticePeriod(date));
  };

  const yearsDisplay = (years: number): string => {
    const fullYears = Math.floor(years);
    const months = Math.floor((years - fullYears) * 12);
    if (fullYears === 0 && months === 0) return "不到 1 個月";
    if (fullYears === 0) return `${months} 個月`;
    if (months === 0) return `${fullYears} 年`;
    return `${fullYears} 年 ${months} 個月`;
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
            計算預告期間
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">預告期間</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              {result.noticeDays} <span className="text-2xl">天</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">{result.label}</p>
          </div>

          {/* 明細 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">項目</th>
                  <th className="text-right py-2 text-slate-500 font-medium">結果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 text-slate-700">到職日</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    {formatDate(result.startDate)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">年資</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    {yearsDisplay(result.yearsOfService)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">預告天數</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    {result.noticeDays} 天
                  </td>
                </tr>
                <tr className="border-t-2 border-slate-200">
                  <td className="py-2.5 font-bold text-slate-900">
                    {result.noticeDays > 0 ? "建議最晚離職日" : "可隨時離職"}
                  </td>
                  <td className="py-2.5 text-right font-extrabold text-brand-600 text-lg">
                    {result.noticeDays > 0
                      ? formatDate(result.suggestedLastDay)
                      : "今天即可"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 預告期間對照表 */}
          <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">預告期間年資對照表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">年資</th>
                  <th className="text-right py-2 text-slate-500 font-medium">預告天數</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LABOR_CONSTANTS.noticePeriod.map((rule, i) => {
                  let ruleLabel: string;
                  if (rule.days === 0) {
                    ruleLabel = "未滿 3 個月";
                  } else if ("minMonths" in rule) {
                    ruleLabel = `3 個月 ~ 未滿 1 年`;
                  } else if (rule.maxYears === Infinity) {
                    ruleLabel = `${rule.minYears} 年以上`;
                  } else {
                    ruleLabel = `${rule.minYears} 年 ~ 未滿 ${rule.maxYears} 年`;
                  }

                  const isActive =
                    result.yearsOfService >= rule.minYears &&
                    result.yearsOfService < rule.maxYears;

                  return (
                    <tr key={i} className={isActive ? "bg-brand-50" : ""}>
                      <td className={`py-2.5 ${isActive ? "font-semibold text-brand-700" : "text-slate-700"}`}>
                        {ruleLabel}
                      </td>
                      <td className={`py-2.5 text-right ${isActive ? "font-bold text-brand-700" : "text-slate-700"}`}>
                        {rule.days === 0 ? "免預告" : `${rule.days} 天`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
