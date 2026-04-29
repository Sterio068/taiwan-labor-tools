"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculatePension, projectPension } from "@/lib/calculations/pension";
import { formatMoney } from "@/lib/format";

export function PensionCalculator() {
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [retireAge, setRetireAge] = useState("65");
  const [voluntaryRate, setVoluntaryRate] = useState("0");
  const [returnRate, setReturnRate] = useState("3");
  const [result, setResult] = useState<{
    monthly: ReturnType<typeof calculatePension>;
    projection: ReturnType<typeof projectPension>;
  } | null>(null);

  const handleCalculate = () => {
    const s = parseInt(salary);
    const a = parseInt(age);
    const r = parseInt(retireAge);
    if (!s || !a || !r || s < 0 || a < 18 || a >= r) return;
    const vr = parseInt(voluntaryRate) / 100;
    const rr = parseInt(returnRate) / 100;
    setResult({
      monthly: calculatePension(s, vr),
      projection: projectPension(s, a, r, rr, vr),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="每月薪資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Input
            label="目前年齡"
            type="number"
            placeholder="例：30"
            suffix="歲"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            max="65"
          />
          <Input
            label="預計退休年齡"
            type="number"
            placeholder="65"
            suffix="歲"
            value={retireAge}
            onChange={(e) => setRetireAge(e.target.value)}
            min="50"
            max="70"
          />
          <Select
            label="自願提繳比例"
            options={[
              { value: "0", label: "不自提" },
              { value: "1", label: "1%" },
              { value: "2", label: "2%" },
              { value: "3", label: "3%" },
              { value: "4", label: "4%" },
              { value: "5", label: "5%" },
              { value: "6", label: "6%" },
            ]}
            value={voluntaryRate}
            onChange={(e) => setVoluntaryRate(e.target.value)}
          />
          <Select
            label="預估年化報酬率"
            options={[
              { value: "2", label: "2%（保守）" },
              { value: "3", label: "3%（一般）" },
              { value: "4", label: "4%（樂觀）" },
              { value: "5", label: "5%（積極）" },
            ]}
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
            試算退休金
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <Card>
            <div className="text-center mb-8 pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-500 mb-1">預估每月退休金</p>
              <p className="text-4xl md:text-5xl font-extrabold text-brand-600">
                ${formatMoney(result.projection.monthlyPension)}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                以平均餘命 24 年（288 個月）概估，實際依退休時勞保局公告之平均餘命計算
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">提繳年數</span>
                <span className="font-semibold text-slate-900">{result.projection.years} 年</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">提繳級距</span>
                <span className="font-semibold text-slate-900">
                  ${formatMoney(result.monthly.bracket)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">雇主每月提繳（6%）</span>
                <span className="font-semibold text-slate-900">
                  ${formatMoney(result.monthly.employerContribution)}
                </span>
              </div>
              {result.monthly.workerVoluntary > 0 && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">
                    自願提繳（{result.monthly.workerVoluntaryRate * 100}%）
                  </span>
                  <span className="font-semibold text-slate-900">
                    ${formatMoney(result.monthly.workerVoluntary)}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">提繳總額（不含投資報酬）</span>
                <span className="font-semibold text-slate-900">
                  ${formatMoney(result.projection.totalContribution)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-slate-900">退休時帳戶預估金額</span>
                <span className="font-extrabold text-accent-600 text-lg">
                  ${formatMoney(result.projection.estimatedBalance)}
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-[10px] text-xs text-slate-500">
              此為概估，實際報酬率依勞退基金運作狀況而定。歷年最低保證收益率不低於兩年期定存利率。
            </div>
          </Card>

          {result.monthly.workerVoluntary > 0 && (
            <Card className="bg-accent-50 border border-accent-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-accent-700 font-medium">自提節稅效果（年）</p>
                  <p className="text-xs text-accent-600 mt-0.5">以 5% 稅率估算，實際依所得級距而定</p>
                </div>
                <p className="text-2xl font-extrabold text-accent-700">
                  省 ${formatMoney(result.monthly.taxBenefit)}
                </p>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
