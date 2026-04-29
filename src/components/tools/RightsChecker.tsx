"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LABOR_CONSTANTS } from "@/data/constants";
import { formatMoney } from "@/lib/format";

interface Question {
  id: number;
  text: string;
  law: string;
  action: string;
  toolLink?: { label: string; href: string };
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: `月薪是否低於 $${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)}？`,
    law: `勞基法第 21 條：工資不得低於基本工資。${LABOR_CONSTANTS.year} 年基本工資為 $${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)}。`,
    action: "向勞工局檢舉，雇主可處 2-100 萬元罰鍰。",
    toolLink: { label: "薪資計算機", href: "/tools/salary" },
  },
  {
    id: 2,
    text: "是否有加班但沒拿到加班費？",
    law: "勞基法第 24 條：延長工時應依倍率給付加班費。",
    action: "保留出勤紀錄（打卡、email 時間），向勞工局申訴。",
    toolLink: { label: "加班費計算機", href: "/tools/overtime" },
  },
  {
    id: 3,
    text: "到職超過 6 個月但沒有特休假？",
    law: "勞基法第 38 條：滿 6 個月應有 3 天特休，滿 1 年有 7 天。",
    action: "要求雇主補給特休。未休日數應折算工資。",
    toolLink: { label: "特休計算機", href: "/tools/annual-leave" },
  },
  {
    id: 4,
    text: "雇主是否沒有幫你投保勞保？",
    law: "勞工保險條例第 6 條：僱用 5 人以上事業單位應強制投保。",
    action: "向勞保局檢舉。雇主可處 4 倍罰鍰，且需賠償勞工損失。",
    toolLink: { label: "勞健保計算機", href: "/tools/insurance-premium" },
  },
  {
    id: 5,
    text: "雇主是否沒有幫你投保健保？",
    law: "全民健康保險法第 15 條：雇主應於勞工到職 3 日內辦理投保。",
    action: "向健保署檢舉。雇主需補繳保費並處罰鍰。",
    toolLink: { label: "勞健保計算機", href: "/tools/insurance-premium" },
  },
  {
    id: 6,
    text: "薪資是否低報投保？（投保級距低於實際月薪）",
    law: "勞工保險條例第 14 條：投保薪資應按實際月薪申報。",
    action: "向勞保局申訴要求更正。低報影響未來給付與退休金。",
    toolLink: { label: "投保級距查詢", href: "/tools/insurance-bracket" },
  },
  {
    id: 7,
    text: "是否被要求簽自願離職但實際是被資遣？",
    law: "勞基法第 11、16、17 條：資遣應給預告期與資遣費，不得偽裝為自願離職。",
    action: "不要簽！保留對話紀錄，申請勞資調解，主張非自願離職以領取失業給付。",
    toolLink: { label: "資遣費計算機", href: "/tools/severance" },
  },
  {
    id: 8,
    text: "是否被扣薪但沒有法律依據？",
    law: "勞基法第 22 條：工資應全額給付。雇主不得任意扣薪。",
    action: "除勞工同意的勞健保自付額與所得稅外，雇主不得扣薪。違法扣薪可向勞工局申訴。",
  },
];

export function RightsChecker() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (id: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null);
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(QUESTIONS.map((q) => [q.id, null])));
    setSubmitted(false);
  };

  const violations = QUESTIONS.filter((q) => answers[q.id] === true);
  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null);

  return (
    <div className="space-y-6">
      {!submitted && (
        <>
          <Card>
            <p className="text-sm text-slate-500 mb-6">
              請根據你的實際狀況回答以下 8 個問題，我們將為你檢查勞動條件是否合法。
            </p>
            <div className="space-y-5">
              {QUESTIONS.map((q, index) => (
                <div
                  key={q.id}
                  className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-b-0"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-50 text-brand-600 text-sm font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-medium text-slate-900 mb-3">
                      {q.text}
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, true)}
                        className={`px-5 py-2 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
                          answers[q.id] === true
                            ? "bg-danger-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        是
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, false)}
                        className={`px-5 py-2 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
                          answers[q.id] === false
                            ? "bg-accent-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        否
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full md:w-auto"
                disabled={!allAnswered}
              >
                查看健檢結果
              </Button>
            </div>
          </Card>
        </>
      )}

      {submitted && violations.length === 0 && (
        <Card>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              恭喜，你的勞動條件基本合法
            </h2>
            <p className="text-slate-500 mb-6">
              根據你的回答，目前沒有發現明顯的勞動法規違反情形。但如果未來遇到任何問題，隨時可以再次使用本工具檢查，或撥打 1955 勞工諮詢專線。
            </p>
            <Button onClick={handleReset} variant="ghost">
              重新檢查
            </Button>
          </div>
        </Card>
      )}

      {submitted && violations.length > 0 && (
        <>
          <Card>
            <div className="text-center pb-6 mb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-danger-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-danger-600 mb-2">
                發現 {violations.length} 項可能違法情形
              </h2>
              <p className="text-slate-500">
                以下項目可能違反勞動法規，建議儘速處理。
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            {violations.map((v) => (
              <Card key={v.id}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-danger-100 text-danger-600 text-xs font-bold flex items-center justify-center mt-0.5">
                    !
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {v.text}
                    </h3>
                    <div className="bg-slate-50 rounded-[10px] p-4 mb-3">
                      <p className="text-sm text-slate-500 mb-1 font-semibold">違反法條</p>
                      <p className="text-sm text-slate-700">{v.law}</p>
                    </div>
                    <div className="bg-warning-50 rounded-[10px] p-4 mb-3">
                      <p className="text-sm text-warning-700 mb-1 font-semibold">建議行動</p>
                      <p className="text-sm text-warning-800">{v.action}</p>
                    </div>
                    {v.toolLink && (
                      <a
                        href={v.toolLink.href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        {v.toolLink.label}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">需要進一步協助？</p>
                <p className="text-sm text-slate-500">
                  撥打 <span className="font-bold text-brand-600">1955</span> 勞工諮詢專線（免費）
                </p>
              </div>
              <Button onClick={handleReset} variant="ghost">
                重新檢查
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
