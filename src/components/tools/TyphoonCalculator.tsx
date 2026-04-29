"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";

type WageType = "monthly" | "hourly";
type TyphoonStatus = "declared" | "not_declared";

interface TyphoonResult {
  wageType: WageType;
  typhoonStatus: TyphoonStatus;
  dailyWage: number;
  typhoonOutWage: number;
  typhoonStayWage: number;
  hourlyRate: number;
  workHours: number;
}

function calculateTyphoon(
  wageType: WageType,
  monthlySalary: number,
  hourlyRate: number,
  workHours: number,
  typhoonStatus: TyphoonStatus
): TyphoonResult {
  let dailyWage = 0;
  let typhoonOutWage = 0;
  let typhoonStayWage = 0;

  if (wageType === "monthly") {
    dailyWage = Math.round(monthlySalary / 30);
    typhoonOutWage = dailyWage * 2;
    typhoonStayWage = dailyWage;
  } else {
    dailyWage = Math.round(hourlyRate * workHours);
    typhoonOutWage = hourlyRate * 2 * workHours;
    typhoonStayWage = dailyWage;
  }

  return {
    wageType,
    typhoonStatus,
    dailyWage,
    typhoonOutWage: Math.round(typhoonOutWage),
    typhoonStayWage: Math.round(typhoonStayWage),
    hourlyRate,
    workHours,
  };
}

export function TyphoonCalculator() {
  const [wageType, setWageType] = useState<WageType>("monthly");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [workHours, setWorkHours] = useState("8");
  const [typhoonStatus, setTyphoonStatus] = useState<TyphoonStatus>("declared");
  const [result, setResult] = useState<TyphoonResult | null>(null);

  const handleCalculate = () => {
    if (wageType === "monthly") {
      const s = parseInt(monthlySalary);
      if (!s || s <= 0) return;
      setResult(calculateTyphoon("monthly", s, 0, 0, typhoonStatus));
    } else {
      const h = parseFloat(hourlyRate);
      const hours = parseFloat(workHours);
      if (!h || h <= 0 || !hours || hours <= 0) return;
      setResult(calculateTyphoon("hourly", 0, h, hours, typhoonStatus));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-5">
          {/* 薪資類型 */}
          <Select
            label="薪資類型"
            options={[
              { value: "monthly", label: "月薪制" },
              { value: "hourly", label: "時薪制" },
            ]}
            value={wageType}
            onChange={(e) => {
              setWageType(e.target.value as WageType);
              setResult(null);
            }}
          />

          {/* 薪資輸入 */}
          {wageType === "monthly" ? (
            <Input
              label="月薪"
              type="number"
              placeholder="例：40000"
              suffix="元"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="時薪"
                type="number"
                placeholder="例：190"
                suffix="元"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
              <Select
                label="颱風日出勤小時數"
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1),
                  label: `${i + 1} 小時`,
                }))}
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
              />
            </div>
          )}

          {/* 颱風假宣告狀態 */}
          <Select
            label="所在地政府颱風假宣告狀態"
            options={[
              { value: "declared", label: "已宣告颱風假（停班停課）" },
              { value: "not_declared", label: "未宣告颱風假（正常上班）" },
            ]}
            value={typhoonStatus}
            onChange={(e) => {
              setTyphoonStatus(e.target.value as TyphoonStatus);
              setResult(null);
            }}
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            計算颱風假薪資
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          {result.typhoonStatus === "declared" ? (
            <>
              {/* 已宣告：顯示出勤 vs 不出勤對比 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 出勤 */}
                <div className="bg-brand-50 rounded-[12px] p-5 text-center border border-brand-100">
                  <p className="text-sm font-medium text-brand-700 mb-1">【已宣告】颱風日出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-brand-600">
                    ${formatMoney(result.typhoonOutWage)}
                  </p>
                  <p className="text-xs text-brand-500 mt-2">雙倍工資，應得補償</p>
                </div>
                {/* 不出勤 */}
                <div className="bg-slate-50 rounded-[12px] p-5 text-center border border-slate-200">
                  <p className="text-sm font-medium text-slate-600 mb-1">【已宣告】颱風日不出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-slate-700">
                    ${formatMoney(result.typhoonStayWage)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">薪資照給，不得扣薪</p>
                </div>
              </div>

              {/* 明細表 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-500 font-medium">項目</th>
                      <th className="text-right py-2 text-slate-500 font-medium">金額</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.wageType === "monthly" ? (
                      <>
                        <tr>
                          <td className="py-2.5 text-slate-700">月薪基礎</td>
                          <td className="py-2.5 text-right font-semibold text-slate-900">
                            ${formatMoney(result.dailyWage * 30)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-700">每日工資（月薪 ÷ 30）</td>
                          <td className="py-2.5 text-right font-semibold text-slate-900">
                            ${formatMoney(result.dailyWage)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="py-2.5 text-slate-700">時薪</td>
                          <td className="py-2.5 text-right font-semibold text-slate-900">
                            ${formatMoney(result.hourlyRate)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-700">出勤小時數</td>
                          <td className="py-2.5 text-right font-semibold text-slate-900">
                            {result.workHours} 小時
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-700">正常工資</td>
                          <td className="py-2.5 text-right font-semibold text-slate-900">
                            ${formatMoney(result.dailyWage)}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="py-2.5 text-slate-700">出勤加倍工資（× 2）</td>
                      <td className="py-2.5 text-right font-semibold text-brand-600">
                        ${formatMoney(result.typhoonOutWage)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-slate-200">
                      <td className="py-2.5 font-bold text-slate-900">不出勤薪資照給</td>
                      <td className="py-2.5 text-right font-extrabold text-slate-700">
                        ${formatMoney(result.typhoonStayWage)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 公式說明 */}
              <div className="mt-6 p-4 bg-slate-50 rounded-[12px] space-y-2">
                <p className="text-sm text-slate-500 mb-1">計算公式</p>
                {result.wageType === "monthly" ? (
                  <p className="text-sm font-mono text-slate-700">
                    出勤雙倍工資 = 月薪 ÷ 30 × 2
                  </p>
                ) : (
                  <p className="text-sm font-mono text-slate-700">
                    出勤雙倍工資 = 時薪 × 2 × 出勤小時數
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                依據「天然災害發生事業單位勞工出勤管理及工資給付要點」。超過正常工時部分，另計加班費。
              </p>
            </>
          ) : (
            <>
              {/* 未宣告：顯示正常工資與風險提示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 出勤 */}
                <div className="bg-slate-50 rounded-[12px] p-5 text-center border border-slate-200">
                  <p className="text-sm font-medium text-slate-600 mb-1">【未宣告】颱風日出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-slate-700">
                    ${formatMoney(result.dailyWage)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">正常工資，無加倍補償</p>
                </div>
                {/* 不出勤 */}
                <div className="bg-amber-50 rounded-[12px] p-5 text-center border border-amber-200">
                  <p className="text-sm font-medium text-amber-700 mb-1">【未宣告】颱風日不出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-amber-600">無保障</p>
                  <p className="text-xs text-amber-600 mt-2">雇主可能扣薪或要求補班</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-[12px] border border-amber-200">
                <p className="text-sm font-semibold text-amber-800 mb-2">注意事項</p>
                <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                  <li>政府未宣告颱風假時，勞工自行判斷不出勤，法律無保障</li>
                  <li>雇主可視情況扣薪、要求補班，但仍應考量勞工人身安全</li>
                  <li>建議事先與雇主溝通，並留存相關往來記錄</li>
                  <li>颱風假宣告以「實際工作地點」所在縣市為準</li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                依據「天然災害發生事業單位勞工出勤管理及工資給付要點」。
              </p>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
