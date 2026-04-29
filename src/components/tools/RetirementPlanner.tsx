"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { projectPension } from "@/lib/calculations/pension";
import { findLaborInsuranceBracket } from "@/lib/calculations/bracket-lookup";
import { formatMoney } from "@/lib/format";

interface RetirementResult {
  laborInsuranceBracket: number;
  laborInsuranceYears: number;
  laborInsuranceAnnuity: number;
  laborInsuranceLumpSum: number;
  pensionMonthly: number;
  pensionBalance: number;
  pensionTotalContribution: number;
  combinedMonthly: number;
  replacementRate: number;
  retireAge: number;
}

export function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState("");
  const [salary, setSalary] = useState("");
  const [insuranceYears, setInsuranceYears] = useState("");
  const [voluntaryRate, setVoluntaryRate] = useState("0");
  const [retireAge, setRetireAge] = useState("65");
  const [result, setResult] = useState<RetirementResult | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const age = parseInt(currentAge);
    const sal = parseInt(salary);
    const rAge = parseInt(retireAge);

    if (!age || age < 18 || age > 70) {
      setError("年齡須介於 18 至 70 歲之間");
      return;
    }
    if (!sal || sal <= 0) {
      setError("月薪須大於 0");
      return;
    }
    if (!rAge || rAge <= age) {
      setError("退休年齡須大於目前年齡");
      return;
    }

    setError("");

    const defaultYears = Math.max(0, age - 25);
    const liYears = parseInt(insuranceYears) || defaultYears;
    const volRate = parseFloat(voluntaryRate) / 100;

    // 勞保投保級距
    const liBracket = findLaborInsuranceBracket(sal);

    // 勞保老年年金（投保薪資 x 年資 x 1.55%）
    const totalLiYears = liYears + (rAge - age);
    const laborInsuranceAnnuity = Math.round(
      liBracket * totalLiYears * 0.0155
    );

    // 勞保老年一次金（投保薪資 x 年資）
    const laborInsuranceLumpSum = liBracket * totalLiYears;

    // 勞退新制月退
    const pension = projectPension(sal, age, rAge, 0.03, volRate);

    // 合計每月退休收入
    const combinedMonthly = laborInsuranceAnnuity + pension.monthlyPension;

    // 所得替代率
    const replacementRate = sal > 0 ? (combinedMonthly / sal) * 100 : 0;

    setResult({
      laborInsuranceBracket: liBracket,
      laborInsuranceYears: totalLiYears,
      laborInsuranceAnnuity,
      laborInsuranceLumpSum,
      pensionMonthly: pension.monthlyPension,
      pensionBalance: pension.estimatedBalance,
      pensionTotalContribution: pension.totalContribution,
      combinedMonthly,
      replacementRate,
      retireAge: rAge,
    });
  };

  const getGapColor = (rate: number) => {
    if (rate >= 70) return "text-accent-600";
    if (rate >= 50) return "text-warning-600";
    return "text-danger-600";
  };

  const getGapLabel = (rate: number) => {
    if (rate >= 70) return "退休準備充足";
    if (rate >= 50) return "退休準備尚可，建議增加自提";
    return "退休準備不足，建議提高自提並規劃其他儲蓄";
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="目前年齡"
            type="number"
            placeholder="例：35"
            suffix="歲"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            min="20"
            max="70"
          />
          <Input
            label="目前月薪"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Input
            label="勞保投保年資"
            type="number"
            placeholder={
              currentAge
                ? `預設 ${Math.max(0, parseInt(currentAge) - 25)} 年`
                : "例：10"
            }
            suffix="年"
            value={insuranceYears}
            onChange={(e) => setInsuranceYears(e.target.value)}
            min="0"
            hint="留空則以（目前年齡 - 25）估算"
          />
          <Select
            label="勞退自提比例"
            options={[
              { value: "0", label: "0%（不自提）" },
              { value: "1", label: "1%" },
              { value: "2", label: "2%" },
              { value: "3", label: "3%" },
              { value: "4", label: "4%" },
              { value: "5", label: "5%" },
              { value: "6", label: "6%（上限）" },
            ]}
            value={voluntaryRate}
            onChange={(e) => setVoluntaryRate(e.target.value)}
          />
          <Select
            label="預計退休年齡"
            options={Array.from({ length: 11 }, (_, i) => ({
              value: String(60 + i),
              label: `${60 + i} 歲`,
            }))}
            value={retireAge}
            onChange={(e) => setRetireAge(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full md:w-auto"
          >
            試算退休收入
          </Button>
        </div>
      </Card>

      {error && (
        <div className="p-3 bg-danger-50 border border-danger-500/30 rounded-[10px] text-sm text-danger-600">{error}</div>
      )}

      {result && (
        <>
          <Card>
            <div className="text-center mb-8 pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-500 mb-1">
                預估每月退休收入（{result.retireAge} 歲退休）
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
                ${formatMoney(result.combinedMonthly)}
              </p>
              <p className={`mt-2 text-sm font-semibold ${getGapColor(result.replacementRate)}`}>
                所得替代率 {result.replacementRate.toFixed(1)}% &mdash;{" "}
                {getGapLabel(result.replacementRate)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-500" />
                  勞保老年給付
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">投保級距</span>
                    <span className="font-semibold text-slate-900">
                      ${formatMoney(result.laborInsuranceBracket)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">投保年資</span>
                    <span className="font-semibold text-slate-900">
                      {result.laborInsuranceYears} 年
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">
                      月領年金
                      <span className="text-xs text-slate-400 ml-1">
                        (級距 x 年資 x 1.55%)
                      </span>
                    </span>
                    <span className="font-extrabold text-brand-600">
                      ${formatMoney(result.laborInsuranceAnnuity)}/月
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">
                      一次領
                      <span className="text-xs text-slate-400 ml-1">
                        (級距 x 年資)
                      </span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      ${formatMoney(result.laborInsuranceLumpSum)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent-500" />
                  勞退新制月退
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">累積提繳</span>
                    <span className="font-semibold text-slate-900">
                      ${formatMoney(result.pensionTotalContribution)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">
                      帳戶預估餘額
                      <span className="text-xs text-slate-400 ml-1">
                        (年化報酬 3%)
                      </span>
                    </span>
                    <span className="font-semibold text-slate-900">
                      ${formatMoney(result.pensionBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">
                      月退休金
                      <span className="text-xs text-slate-400 ml-1">
                        (餘額 / 288 個月)
                      </span>
                    </span>
                    <span className="font-extrabold text-accent-600">
                      ${formatMoney(result.pensionMonthly)}/月
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-base font-bold text-slate-900 mb-4">
              所得替代率分析
            </h3>
            <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                  result.replacementRate >= 70
                    ? "bg-accent-500"
                    : result.replacementRate >= 50
                    ? "bg-warning-400"
                    : "bg-danger-400"
                }`}
                style={{
                  width: `${Math.min(100, result.replacementRate)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-4">
              <span>0%</span>
              <span className="text-danger-500 font-semibold">50% 基本</span>
              <span className="text-accent-500 font-semibold">70% 舒適</span>
              <span>100%</span>
            </div>
            <div className="bg-slate-50 rounded-[10px] p-4">
              <p className="text-sm text-slate-700">
                目前月薪 ${formatMoney(parseInt(salary))}，預估退休後每月收入 $
                {formatMoney(result.combinedMonthly)}，所得替代率為{" "}
                <span className={`font-bold ${getGapColor(result.replacementRate)}`}>
                  {result.replacementRate.toFixed(1)}%
                </span>
                。一般建議退休所得替代率至少達到 70% 以維持基本生活品質。
                {result.replacementRate < 70 && (
                  <span className="block mt-2">
                    每月缺口約 ${formatMoney(Math.round(parseInt(salary) * 0.7 - result.combinedMonthly))}
                    ，建議提高勞退自提比例或規劃其他退休儲蓄方案。
                  </span>
                )}
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
