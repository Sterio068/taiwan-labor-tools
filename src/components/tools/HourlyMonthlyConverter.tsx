"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import {
  monthlyToHourly,
  hourlyToMonthly,
  isBelowMinimumWage,
  type HourlyConvertResult,
} from "@/lib/calculations/hourly-convert";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";
import { LABOR_CONSTANTS } from "@/data/constants";

type Mode = "monthly-to-hourly" | "hourly-to-monthly";

export function HourlyMonthlyConverter() {
  const [mode, setMode] = useState<Mode>("monthly-to-hourly");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerMonth, setDaysPerMonth] = useState("22");
  const [result, setResult] = useState<HourlyConvertResult | null>(null);

  const handleCalculate = () => {
    if (mode === "monthly-to-hourly") {
      const s = parseInt(monthlySalary);
      if (!s || s < 0) return;
      setResult(monthlyToHourly(s));
    } else {
      const h = parseFloat(hourlyRate);
      if (!h || h < 0) return;
      setResult(
        hourlyToMonthly(h, parseFloat(hoursPerDay) || 8, parseFloat(daysPerMonth) || 22)
      );
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setResult(null);
  };

  const belowMinimum = result ? isBelowMinimumWage(result.hourlySalary) : false;

  return (
    <div className="space-y-6">
      <Card>
        {/* 模式切換 */}
        <div className="flex gap-2 mb-6">
          <Tag
            label="月薪 → 時薪"
            selected={mode === "monthly-to-hourly"}
            onClick={() => handleModeChange("monthly-to-hourly")}
          />
          <Tag
            label="時薪 → 月薪"
            selected={mode === "hourly-to-monthly"}
            onClick={() => handleModeChange("hourly-to-monthly")}
          />
        </div>

        {mode === "monthly-to-hourly" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="每月薪資"
              type="number"
              placeholder="例：35000"
              suffix="元"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="時薪"
              type="number"
              placeholder="例：200"
              suffix="元"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
            <Input
              label="每日工時"
              type="number"
              placeholder="8"
              suffix="小時"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              min="1"
              max="12"
            />
            <Input
              label="每月工作天數"
              type="number"
              placeholder="22"
              suffix="天"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(e.target.value)}
              min="1"
              max="31"
            />
          </div>
        )}

        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            開始換算
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">
              {mode === "monthly-to-hourly" ? "換算時薪" : "估算月薪"}
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              ${mode === "monthly-to-hourly"
                ? formatMoneyDecimal(result.hourlySalary)
                : formatMoney(result.monthlySalary)}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {mode === "monthly-to-hourly" ? "元 / 小時" : "元 / 月"}
            </p>
          </div>

          {/* 明細 */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">月薪</span>
              <span className="font-semibold text-slate-900">
                ${formatMoney(result.monthlySalary)} 元
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">日薪</span>
              <span className="font-semibold text-slate-900">
                ${formatMoneyDecimal(result.dailySalary)} 元
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">時薪</span>
              <span className="font-semibold text-slate-900">
                ${formatMoneyDecimal(result.hourlySalary)} 元
              </span>
            </div>
            {mode === "monthly-to-hourly" && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">計算公式</span>
                <span className="font-semibold text-slate-900">
                  月薪 &divide; 30 &divide; 8
                </span>
              </div>
            )}
            {mode === "hourly-to-monthly" && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">計算方式</span>
                <span className="font-semibold text-slate-900">
                  時薪 &times; {result.hoursPerDay} 時 &times; {result.daysPerMonth} 天
                </span>
              </div>
            )}
          </div>

          {/* 基本工資警告 */}
          {belowMinimum && (
            <div className="mt-6 p-4 bg-danger-50 border border-danger-200 rounded-[12px]">
              <p className="text-sm font-semibold text-danger-700">
                低於基本工資
              </p>
              <p className="text-sm text-danger-600 mt-1">
                2026 年基本工資為月薪 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元、時薪 {LABOR_CONSTANTS.minimumHourlyWage} 元。
                目前換算時薪 ${formatMoneyDecimal(result.hourlySalary)} 元低於法定最低時薪，雇主可能違反勞基法第 21 條。
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
