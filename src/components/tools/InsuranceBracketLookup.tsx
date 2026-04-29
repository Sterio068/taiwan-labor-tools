"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  findLaborInsuranceBracket,
  findNhiBracket,
  findPensionBracket,
} from "@/lib/calculations/bracket-lookup";
import { LABOR_CONSTANTS } from "@/data/constants";
import { formatMoney } from "@/lib/format";

interface BracketResult {
  laborInsurance: number;
  nhi: number;
  pension: number;
}

export function InsuranceBracketLookup() {
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState<BracketResult | null>(null);

  const handleLookup = () => {
    const s = parseInt(salary);
    if (!s || s < 0) return;
    setResult({
      laborInsurance: findLaborInsuranceBracket(s),
      nhi: findNhiBracket(s),
      pension: findPensionBracket(s),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="max-w-sm">
          <Input
            label="每月薪資"
            type="number"
            placeholder="例：45000"
            suffix="元"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleLookup} size="lg" className="w-full md:w-auto">
            查詢投保級距
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <div className="p-4 bg-brand-50 border border-brand-200 rounded-[12px] text-sm text-brand-700 mb-6">
            <p className="font-semibold mb-1">為什麼三個級距不同？</p>
            <p>勞保、健保、勞退各有獨立的投保級距表。你的月薪會分別對照三張表格，找到大於等於你月薪的最近一級。級距不同是因為三個制度的上下限不同：勞保上限 $45,800、健保上限 $219,500、勞退上限 $150,000。</p>
          </div>

          {parseInt(salary) > 45800 && (
            <p className="text-xs text-warning-600 mt-2">你的月薪超過勞保投保上限 $45,800，勞保以最高級距計算。</p>
          )}

          {/* 三張結果卡 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-brand-50 border border-brand-200">
              <p className="text-sm text-brand-600 font-medium mb-1">勞保投保級距</p>
              <p className="text-3xl font-extrabold text-brand-700">
                ${formatMoney(result.laborInsurance)}
              </p>
            </Card>
            <Card className="bg-accent-50 border border-accent-200">
              <p className="text-sm text-accent-600 font-medium mb-1">健保投保級距</p>
              <p className="text-3xl font-extrabold text-accent-700">
                ${formatMoney(result.nhi)}
              </p>
            </Card>
            <Card className="bg-warning-50 border border-warning-200">
              <p className="text-sm text-warning-600 font-medium mb-1">勞退提繳級距</p>
              <p className="text-3xl font-extrabold text-warning-700">
                ${formatMoney(result.pension)}
              </p>
            </Card>
          </div>

          {/* 勞保級距表 */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-4">勞保投保薪資級距表</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">等級</th>
                    <th className="text-right py-2 text-slate-500 font-medium">投保薪資</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LABOR_CONSTANTS.laborInsuranceBrackets.map((bracket, i) => {
                    const isActive = bracket === result.laborInsurance;
                    return (
                      <tr key={i} className={isActive ? "bg-brand-50" : ""}>
                        <td className={`py-2.5 ${isActive ? "font-semibold text-brand-700" : "text-slate-700"}`}>
                          第 {i + 1} 級
                        </td>
                        <td className={`py-2.5 text-right ${isActive ? "font-bold text-brand-700" : "text-slate-700"}`}>
                          ${formatMoney(bracket)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 健保級距表 */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-4">健保投保金額級距表</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">等級</th>
                    <th className="text-right py-2 text-slate-500 font-medium">投保金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LABOR_CONSTANTS.nhiBrackets.map((bracket, i) => {
                    const isActive = bracket === result.nhi;
                    return (
                      <tr key={i} className={isActive ? "bg-accent-50" : ""}>
                        <td className={`py-2.5 ${isActive ? "font-semibold text-accent-700" : "text-slate-700"}`}>
                          第 {i + 1} 級
                        </td>
                        <td className={`py-2.5 text-right ${isActive ? "font-bold text-accent-700" : "text-slate-700"}`}>
                          ${formatMoney(bracket)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 勞退提繳級距表 */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-4">勞退月提繳分級表</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">等級</th>
                    <th className="text-right py-2 text-slate-500 font-medium">月提繳工資</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LABOR_CONSTANTS.pensionBrackets.map((bracket, i) => {
                    const isActive = bracket === result.pension;
                    return (
                      <tr key={i} className={isActive ? "bg-warning-50" : ""}>
                        <td className={`py-2.5 ${isActive ? "font-semibold text-warning-700" : "text-slate-700"}`}>
                          第 {i + 1} 級
                        </td>
                        <td className={`py-2.5 text-right ${isActive ? "font-bold text-warning-700" : "text-slate-700"}`}>
                          ${formatMoney(bracket)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
