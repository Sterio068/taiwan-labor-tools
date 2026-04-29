"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  calculateSalaryBreakdown,
  type SalaryBreakdownResult,
} from "@/lib/calculations/salary-breakdown";
import { formatMoney } from "@/lib/format";

interface OfferInput {
  label: string;
  salary: string;
  bonusMonths: string;
  allowances: string;
  dependents: string;
}

interface OfferResult {
  input: OfferInput;
  breakdown: SalaryBreakdownResult;
  annualGross: number;
  annualNet: number;
  monthlyNet: number;
  employerCost: number;
}

const DEFAULT_OFFER: OfferInput = {
  label: "",
  salary: "",
  bonusMonths: "0",
  allowances: "0",
  dependents: "0",
};

export function SalaryComparer() {
  const [offerA, setOfferA] = useState<OfferInput>({
    ...DEFAULT_OFFER,
    label: "方案 A",
  });
  const [offerB, setOfferB] = useState<OfferInput>({
    ...DEFAULT_OFFER,
    label: "方案 B",
  });
  const [results, setResults] = useState<[OfferResult, OfferResult] | null>(
    null
  );

  const computeOffer = (input: OfferInput): OfferResult | null => {
    const salary = parseInt(input.salary);
    if (!salary || salary <= 0) return null;
    const bonusMonths = parseFloat(input.bonusMonths) || 0;
    const allowances = parseInt(input.allowances) || 0;
    const dependents = parseInt(input.dependents) || 0;

    const breakdown = calculateSalaryBreakdown(salary, dependents, 0);
    const bonusTotal = salary * bonusMonths;
    const annualGross = salary * 12 + bonusTotal + allowances * 12;
    const monthlyNet = breakdown.netSalary + allowances;
    // 年度淨收入 = 12 個月實領 + 年終獎金（年終通常不另扣勞健保，但需扣補充保費）
    const annualNet = monthlyNet * 12 + bonusTotal;
    const employerCost = breakdown.employerCost + allowances;

    return { input, breakdown, annualGross, annualNet, monthlyNet, employerCost };
  };

  const handleCompare = () => {
    const a = computeOffer(offerA);
    const b = computeOffer(offerB);
    if (!a || !b) return;
    setResults([a, b]);
  };

  const handleReset = () => {
    setOfferA({ ...DEFAULT_OFFER, label: "方案 A" });
    setOfferB({ ...DEFAULT_OFFER, label: "方案 B" });
    setResults(null);
  };

  const betterClass = (aVal: number, bVal: number, idx: 0 | 1) => {
    if (aVal === bVal) return "text-slate-900";
    if (idx === 0) return aVal > bVal ? "text-accent-600 font-extrabold" : "text-slate-900";
    return bVal > aVal ? "text-accent-600 font-extrabold" : "text-slate-900";
  };

  const lowerClass = (aVal: number, bVal: number, idx: 0 | 1) => {
    if (aVal === bVal) return "text-slate-900";
    if (idx === 0) return aVal < bVal ? "text-accent-600 font-extrabold" : "text-slate-900";
    return bVal < aVal ? "text-accent-600 font-extrabold" : "text-slate-900";
  };

  const renderOfferForm = (
    offer: OfferInput,
    setOffer: (o: OfferInput) => void
  ) => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900">{offer.label}</h3>
      <Input
        label="每月薪資"
        type="number"
        placeholder="例：45000"
        suffix="元"
        value={offer.salary}
        onChange={(e) => setOffer({ ...offer, salary: e.target.value })}
      />
      <Input
        label="年終獎金（月數）"
        type="number"
        placeholder="例：2"
        suffix="個月"
        value={offer.bonusMonths}
        onChange={(e) => setOffer({ ...offer, bonusMonths: e.target.value })}
        min="0"
        step="0.5"
      />
      <Input
        label="每月津貼（通勤/餐費等）"
        type="number"
        placeholder="例：2400"
        suffix="元"
        value={offer.allowances}
        onChange={(e) => setOffer({ ...offer, allowances: e.target.value })}
        min="0"
      />
      <Input
        label="健保眷屬人數"
        type="number"
        placeholder="例：0"
        suffix="人"
        value={offer.dependents}
        onChange={(e) => setOffer({ ...offer, dependents: e.target.value })}
        min="0"
        max="10"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderOfferForm(offerA, setOfferA)}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100" />
          {renderOfferForm(offerB, setOfferB)}
        </div>
        <div className="mt-8 flex gap-3">
          <Button onClick={handleCompare} size="lg" className="w-full md:w-auto">
            比較薪資
          </Button>
          {results && (
            <Button onClick={handleReset} variant="ghost" size="lg">
              重新比較
            </Button>
          )}
        </div>
      </Card>

      {results && (
        <Card>
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            比較結果
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-500 font-medium">
                    項目
                  </th>
                  <th className="text-right py-3 text-slate-500 font-medium">
                    方案 A
                  </th>
                  <th className="text-right py-3 text-slate-500 font-medium">
                    方案 B
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 text-slate-700">每月薪資</td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].breakdown.grossSalary, results[1].breakdown.grossSalary, 0)}`}>
                    ${formatMoney(results[0].breakdown.grossSalary)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].breakdown.grossSalary, results[1].breakdown.grossSalary, 1)}`}>
                    ${formatMoney(results[1].breakdown.grossSalary)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700">年度總收入</td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].annualGross, results[1].annualGross, 0)}`}>
                    ${formatMoney(results[0].annualGross)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].annualGross, results[1].annualGross, 1)}`}>
                    ${formatMoney(results[1].annualGross)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700">勞保自付額</td>
                  <td className={`py-3 text-right font-semibold ${lowerClass(results[0].breakdown.laborInsurance, results[1].breakdown.laborInsurance, 0)}`}>
                    ${formatMoney(results[0].breakdown.laborInsurance)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${lowerClass(results[0].breakdown.laborInsurance, results[1].breakdown.laborInsurance, 1)}`}>
                    ${formatMoney(results[1].breakdown.laborInsurance)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700">健保自付額</td>
                  <td className={`py-3 text-right font-semibold ${lowerClass(results[0].breakdown.nhi, results[1].breakdown.nhi, 0)}`}>
                    ${formatMoney(results[0].breakdown.nhi)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${lowerClass(results[0].breakdown.nhi, results[1].breakdown.nhi, 1)}`}>
                    ${formatMoney(results[1].breakdown.nhi)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700">每月實領</td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].monthlyNet, results[1].monthlyNet, 0)}`}>
                    ${formatMoney(results[0].monthlyNet)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].monthlyNet, results[1].monthlyNet, 1)}`}>
                    ${formatMoney(results[1].monthlyNet)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700">年度淨收入</td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].annualNet, results[1].annualNet, 0)}`}>
                    ${formatMoney(results[0].annualNet)}
                  </td>
                  <td className={`py-3 text-right font-semibold ${betterClass(results[0].annualNet, results[1].annualNet, 1)}`}>
                    ${formatMoney(results[1].annualNet)}
                  </td>
                </tr>
                <tr className="border-t-2 border-slate-200">
                  <td className="py-3 text-slate-700">雇主每月成本</td>
                  <td className="py-3 text-right font-semibold text-slate-500">
                    ${formatMoney(results[0].employerCost)}
                  </td>
                  <td className="py-3 text-right font-semibold text-slate-500">
                    ${formatMoney(results[1].employerCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {results[0].annualNet !== results[1].annualNet && (
            <div className="mt-6 p-4 bg-accent-50 rounded-[10px]">
              <p className="text-sm font-semibold text-accent-700">
                {results[0].annualNet > results[1].annualNet
                  ? `方案 A 年度淨收入高出 $${formatMoney(results[0].annualNet - results[1].annualNet)}`
                  : `方案 B 年度淨收入高出 $${formatMoney(results[1].annualNet - results[0].annualNet)}`}
              </p>
              <p className="text-xs text-accent-600 mt-1">
                每月差距約 $
                {formatMoney(
                  Math.abs(results[0].annualNet - results[1].annualNet) / 12
                )}
              </p>
              <p className="text-xs text-accent-600 mt-0.5">
                差距約 {((Math.abs(results[0].annualNet - results[1].annualNet) / Math.min(results[0].annualNet, results[1].annualNet)) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
