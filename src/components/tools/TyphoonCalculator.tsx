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
                placeholder="例：196"
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
                    ${formatMoney(result.dailyWage)}
                  </p>
                  <p className="text-xs text-brand-500 mt-2">當日工資照給；勞動部建議雇主另外加給</p>
                </div>
                {/* 不出勤 */}
                <div className="bg-slate-50 rounded-[12px] p-5 text-center border border-slate-200">
                  <p className="text-sm font-medium text-slate-600 mb-1">【已宣告】颱風日不出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-slate-700">
                    ${formatMoney(result.typhoonStayWage)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">勞動部要點：雇主宜不扣發；不得記曠職或扣全勤</p>
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
                      <td className="py-2.5 text-slate-700">若公司比照加倍發給（參考，非法定義務）</td>
                      <td className="py-2.5 text-right font-semibold text-brand-600">
                        ${formatMoney(result.typhoonOutWage)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-slate-200">
                      <td className="py-2.5 font-bold text-slate-900">未出勤：雇主宜不扣發的當日工資</td>
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
                    當日工資 = 月薪 ÷ 30；比照加倍時另加 1 日工資
                  </p>
                ) : (
                  <p className="text-sm font-mono text-slate-700">
                    當日工資 = 時薪 × 出勤小時數；比照加倍時再乘 2
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                依據勞動部「天然災害發生事業單位勞工出勤管理及工資給付要點」：出勤者當日工資照給，雇主「宜」再加給並提供交通協助，屬勸導性規定。颱風日若同時是休息日或國定假日，仍依勞基法加班規定計算；超過 8 小時另計延長工時工資。
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
                  <p className="text-xs text-slate-500 mt-2">正常工資</p>
                </div>
                {/* 不出勤 */}
                <div className="bg-amber-50 rounded-[12px] p-5 text-center border border-amber-200">
                  <p className="text-sm font-medium text-amber-700 mb-1">【未宣告】颱風日不出勤</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-amber-600">先確認</p>
                  <p className="text-xs text-amber-600 mt-2">居住地或通勤途中是否已宣布停班</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-[12px] border border-amber-200">
                <p className="text-sm font-semibold text-amber-800 mb-2">注意事項</p>
                <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                  <li>工作地、居住地或上班必經途中任一轄區宣布停止上班，都適用要點的保護</li>
                  <li>三地都未停班但因災害交通阻斷而無法到班，同樣不得視為曠職</li>
                  <li>若都不符合，自行不出勤可能被要求以假別處理，請事先與主管溝通並留存紀錄</li>
                  <li>勞工安全優先；公司另有約定時，以較有利勞工的約定為準</li>
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
