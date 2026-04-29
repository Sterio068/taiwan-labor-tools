"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateMaternityLeave, type MaternityResult } from "@/lib/calculations/maternity";
import { formatMoney } from "@/lib/format";

export function MaternityCalculator() {
  const [leaveType, setLeaveType] = useState("maternity");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [insuredSalary, setInsuredSalary] = useState("");
  const [result, setResult] = useState<MaternityResult | null>(null);

  const handleCalculate = () => {
    const ms = parseInt(monthlySalary);
    const is = parseInt(insuredSalary);
    if (!ms || ms < 0) return;
    setResult(calculateMaternityLeave(leaveType, ms, is || ms));
  };

  const salaryLabel = (salary: MaternityResult["salary"]) => {
    switch (salary) {
      case "full":
        return "全薪";
      case "half":
        return "半薪";
      case "unpaid":
        return "無薪（留職停薪）";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="假別類型"
            options={[
              { value: "maternity", label: "產假（56 天）" },
              { value: "paternity", label: "陪產檢及陪產假（7 天）" },
              { value: "parental", label: "育嬰留職停薪（最長 2 年）" },
              { value: "miscarriage-3m", label: "流產假 — 未滿 3 個月（5 天）" },
              { value: "miscarriage-3m+", label: "流產假 — 3 個月以上（28 天）" },
            ]}
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
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
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算假期與給付
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-1">{result.type}</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
              {result.days} 天
            </p>
          </div>

          {/* 假期明細 */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">假別</span>
              <span className="font-semibold text-slate-900">{result.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">天數</span>
              <span className="font-semibold text-slate-900">{result.days} 天</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">請假期間薪資</span>
              <span className="font-semibold text-slate-900">
                {salaryLabel(result.salary)}
              </span>
            </div>
            <div className="py-2 border-b border-slate-100">
              <span className="text-slate-500">說明</span>
              <p className="font-semibold text-slate-900 mt-1">{result.salaryNote}</p>
            </div>
          </div>

          {/* 勞保給付 */}
          {result.benefit !== undefined && result.benefit > 0 && (
            <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-[12px]">
              <p className="text-sm font-semibold text-accent-700">
                勞保給付
              </p>
              <p className="text-2xl font-bold text-accent-700 mt-1">
                ${formatMoney(result.benefit)} 元
              </p>
              {result.benefitNote && (
                <p className="text-sm text-accent-600 mt-1">{result.benefitNote}</p>
              )}
            </div>
          )}

          {result.type === "育嬰留職停薪" && (
            <div className="mt-4 p-3 bg-brand-50 rounded-[10px] text-xs text-brand-700">
              <p className="font-semibold mb-1">育嬰留停重要須知</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>每位家長各可申請最長 2 年</li>
                <li>父母可同時申請，不需輪流</li>
                <li>津貼僅發放 6 個月（投保薪資 80%），非整個留停期間</li>
                <li>留停期間勞保可選擇繼續加保或退保</li>
              </ul>
            </div>
          )}

          {/* 薪資估算 */}
          {result.salary === "full" && parseInt(monthlySalary) > 0 && (
            <div className="mt-4 p-4 bg-slate-50 rounded-[12px]">
              <p className="text-sm text-slate-500 mb-2">請假期間薪資估算</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  ${formatMoney(Math.round((parseInt(monthlySalary) / 30) * result.days))}
                </span>
                <span className="text-sm text-slate-500">
                  （日薪 ${formatMoney(Math.round(parseInt(monthlySalary) / 30))} &times; {result.days} 天）
                </span>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
