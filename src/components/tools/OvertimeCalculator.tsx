"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResultActions } from "@/components/tools/ResultActions";
import { calculateOvertime, type OvertimeResult } from "@/lib/calculations/overtime";
import { trackEvent } from "@/lib/analytics";
import { formatMoney, formatMoneyDecimal } from "@/lib/format";

const VALID_OT_TYPES = ["weekday", "rest-day", "holiday", "national-holiday"] as const;
type OtType = typeof VALID_OT_TYPES[number];

const OVERTIME_TYPE_LABEL: Record<OtType, string> = {
  weekday: "平日加班",
  "rest-day": "休息日加班",
  holiday: "國定假日加班",
  "national-holiday": "例假日加班",
};

const OVERTIME_PRESETS = [
  { id: "weekday_1h", label: "平日 1 小時", salary: "45000", hours: "1", type: "weekday" as OtType },
  { id: "weekday_3h", label: "平日 3 小時", salary: "45000", hours: "3", type: "weekday" as OtType },
  { id: "holiday_8h", label: "國定假日 8 小時", salary: "45000", hours: "8", type: "holiday" as OtType },
  { id: "rest_day_4h", label: "休息日 4 小時", salary: "45000", hours: "4", type: "rest-day" as OtType },
];

function parseInitialParams(params: URLSearchParams): {
  salary: string;
  hours: string;
  type: OtType;
} {
  const wRaw = params.get("w");
  const hRaw = params.get("h");
  const otRaw = params.get("ot");

  const w = wRaw ? parseInt(wRaw, 10) : NaN;
  const h = hRaw ? parseFloat(hRaw) : NaN;
  const ot = VALID_OT_TYPES.includes(otRaw as OtType) ? (otRaw as OtType) : "weekday";

  return {
    salary: !isNaN(w) && w > 0 ? String(w) : "",
    hours: !isNaN(h) && h > 0 && h <= 24 ? String(h) : "",
    type: ot,
  };
}

function OvertimeCalculatorInner() {
  const searchParams = useSearchParams();
  const initial = parseInitialParams(searchParams);

  const [salary, setSalary] = useState(initial.salary);
  const [hours, setHours] = useState(initial.hours);
  const [type, setType] = useState<OtType>(initial.type);
  const [result, setResult] = useState<OvertimeResult | null>(null);

  // 若 URL 帶有有效的初始值，自動觸發一次計算
  useEffect(() => {
    if (initial.salary && initial.hours) {
      const s = parseInt(initial.salary, 10);
      const h = parseFloat(initial.hours);
      if (s > 0 && h > 0) {
        setResult(calculateOvertime(s, h, initial.type));
      }
    }
  // 只在 mount 時跑一次
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    const s = parseInt(salary);
    const h = parseFloat(hours);
    if (!s || !h || s <= 0 || h <= 0) return;
    trackEvent("tool_started", { tool_id: "overtime" });
    setResult(calculateOvertime(s, h, type));
    trackEvent("tool_completed", {
      tool_id: "overtime",
      overtime_type: type,
    });
  };

  const applyPreset = (preset: typeof OVERTIME_PRESETS[number]) => {
    setSalary(salary || preset.salary);
    setHours(preset.hours);
    setType(preset.type);
    setResult(null);
    trackEvent("tool_preset_applied", {
      tool_id: "overtime",
      preset_id: preset.id,
    });
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
            onChange={(e) => setType(e.target.value as "weekday" | "rest-day" | "holiday" | "national-holiday")}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-bold text-slate-600">常用情境</span>
          {OVERTIME_PRESETS.map((preset) => (
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
            計算加班費
          </Button>
        </div>
      </Card>

      {result && type === "national-holiday" && (
        <div className="mb-4 p-3 bg-danger-50 border border-danger-500/30 rounded-[10px] text-sm text-danger-600">
          例假日原則上不得加班。僅在天災、事變或突發事件時，雇主始得要求勞工於例假日出勤，且事後應給予補假。
        </div>
      )}

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

          {result.note && (
            <div className="mb-4 p-3 bg-warning-50 border border-warning-500/30 rounded-[10px] text-sm text-warning-600">
              {result.note}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">時段</th>
                  <th className="text-right py-2 text-slate-500 font-medium">計薪時數</th>
                  <th className="text-right py-2 text-slate-500 font-medium">倍率</th>
                  <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.breakdown.map((row, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-slate-700">{row.label}</td>
                    <td className="py-2.5 text-right text-slate-700">{row.billedHours} 小時</td>
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
          <ResultActions
            toolId="overtime"
            shareTitle="加班費試算摘要"
            summary={[
              "加班費試算",
              `加班類型: ${OVERTIME_TYPE_LABEL[type]}`,
              `加班時數: ${hours} 小時`,
              `時薪基數: $${formatMoneyDecimal(result.hourlyBase)}`,
              `應領加班費: $${formatMoney(result.overtimePay)}`,
            ].join("\n")}
          />
        </Card>
      )}
    </div>
  );
}

export function OvertimeCalculator() {
  return (
    <Suspense>
      <OvertimeCalculatorInner />
    </Suspense>
  );
}
