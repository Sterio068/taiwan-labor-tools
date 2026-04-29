"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface DisputeCategory {
  id: string;
  label: string;
  articles: { name: string; content: string }[];
  employerDuty: string[];
  workerActions: string[];
}

const CATEGORIES: DisputeCategory[] = [
  {
    id: "salary",
    label: "薪資問題（欠薪、扣薪、低於基本工資）",
    articles: [
      {
        name: "勞基法第 21 條",
        content: "工資由勞雇雙方議定之，但不得低於基本工資。",
      },
      {
        name: "勞基法第 22 條",
        content: "工資應全額直接給付勞工。除法令另有規定或勞雇雙方另有約定外，雇主不得預扣勞工工資作為違約金或賠償費用。",
      },
      {
        name: "勞基法第 26 條",
        content: "雇主不得預扣勞工工資作為違約金或賠償費用。",
      },
    ],
    employerDuty: [
      "按時全額給付工資，不得低於基本工資 $29,500（2026 年）",
      "不得以任何名義任意扣薪",
      "工資應於約定日期給付，最遲不得超過 15 日",
      "應提供薪資明細（勞基法第 23 條）",
    ],
    workerActions: [
      "保留薪資單、銀行轉帳紀錄、勞動契約等證據",
      "向各縣市勞工局（處）申訴",
      "申請勞資爭議調解（免費）",
      "向勞動檢查機構申請勞動檢查",
    ],
  },
  {
    id: "overtime",
    label: "加班問題（沒加班費、強制加班、責任制）",
    articles: [
      {
        name: "勞基法第 24 條",
        content: "雇主延長勞工工時，應依規定加成給付加班費。",
      },
      {
        name: "勞基法第 32 條",
        content: "延長工時需經工會或勞資會議同意。每月加班上限 46 小時。",
      },
      {
        name: "勞基法第 84-1 條",
        content: "責任制須經中央主管機關核定公告之工作者，並須報當地主管機關核備。",
      },
    ],
    employerDuty: [
      "加班須經勞工同意，不得強制加班",
      "依法給付加班費：平日前 2 小時 1.34 倍、後 2 小時 1.67 倍",
      "休息日加班另有加成計算",
      "責任制需經勞動部核定，非雇主片面宣告即可",
    ],
    workerActions: [
      "保留出勤紀錄、打卡記錄、通訊軟體加班對話截圖",
      "向勞工局檢舉未依法給付加班費",
      "申請勞資調解要求補發加班費",
      "可使用本站加班費計算機計算應得金額",
    ],
  },
  {
    id: "severance",
    label: "資遣問題（沒給資遣費、沒預告、偽裝自願離職）",
    articles: [
      {
        name: "勞基法第 11 條",
        content: "列舉雇主得預告勞工終止契約之情形（歇業、虧損、業務緊縮等）。",
      },
      {
        name: "勞基法第 16 條",
        content: "雇主應依年資給予 10-30 天預告期間。",
      },
      {
        name: "勞基法第 17 條",
        content: "雇主應依年資發給資遣費。",
      },
      {
        name: "就業保險法第 11 條",
        content: "非自願離職者得請領失業給付。",
      },
    ],
    employerDuty: [
      "依年資給予預告期間（3 個月以上：10 天；1 年以上：20 天；3 年以上：30 天）",
      "依法發給資遣費（新制：每年 0.5 個月，上限 6 個月）",
      "開立非自願離職證明",
      "不得以調職、減薪等手段逼迫勞工自行離職",
    ],
    workerActions: [
      "不要簽署任何「自願離職同意書」",
      "保留所有對話紀錄（錄音、訊息截圖）",
      "向勞工局申請勞資調解",
      "憑非自願離職證明向勞保局申請失業給付",
    ],
  },
  {
    id: "leave",
    label: "休假問題（不給特休、強制扣假、病假扣全薪）",
    articles: [
      {
        name: "勞基法第 38 條",
        content: "勞工在同一雇主工作滿一定期間，應給予特別休假。",
      },
      {
        name: "勞基法第 43 條",
        content: "勞工因病得請病假。",
      },
      {
        name: "勞工請假規則第 4 條",
        content: "普通傷病假一年不超過 30 日，工資折半發給。",
      },
    ],
    employerDuty: [
      "滿 6 個月：3 天特休；滿 1 年：7 天；滿 2 年：10 天（逐年遞增）",
      "特休未休完應折算工資",
      "不得強制勞工以特休抵扣其他假別",
      "病假 30 天內應給付半薪，不得扣全薪",
    ],
    workerActions: [
      "確認自己的到職日與應有特休天數",
      "向雇主書面申請特休並保留紀錄",
      "若遭拒絕，向勞工局檢舉",
      "可使用本站特休計算機確認應有天數",
    ],
  },
  {
    id: "insurance",
    label: "保險問題（沒投保、低報、不給職災補償）",
    articles: [
      {
        name: "勞工保險條例第 6 條",
        content: "僱用勞工 5 人以上之事業單位應為勞工投保。",
      },
      {
        name: "勞工保險條例第 14 條",
        content: "投保薪資應按實際月薪申報。",
      },
      {
        name: "勞基法第 59 條",
        content: "勞工因職業災害而致傷害或疾病，雇主應予補償。",
      },
      {
        name: "全民健康保險法第 15 條",
        content: "雇主應於勞工到職 3 日內辦理健保投保。",
      },
    ],
    employerDuty: [
      "到職即應投保勞保與健保（5 人以上強制）",
      "依實際薪資申報投保級距，不得低報",
      "發生職災時負醫療費用與原領工資補償",
      "按時繳納勞健保費用",
    ],
    workerActions: [
      "至勞保局 e 化服務系統查詢投保紀錄",
      "發現未投保或低報，向勞保局檢舉",
      "職災發生時保留所有就醫收據與診斷書",
      "可申請勞資調解要求雇主補正並賠償損失",
    ],
  },
];

export function DisputeChecker() {
  const [selectedId, setSelectedId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    if (!selectedId) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedId("");
    setShowResult(false);
  };

  const category = CATEGORIES.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      {!showResult && (
        <Card>
          <p className="text-sm text-slate-500 mb-6">
            選擇你遇到的勞資爭議類型，我們將提供相關法條、雇主義務與你可以採取的行動。
          </p>
          <Select
            label="爭議類型"
            options={[
              { value: "", label: "請選擇爭議類型..." },
              ...CATEGORIES.map((c) => ({
                value: c.id,
                label: c.label,
              })),
            ]}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          />
          <div className="mt-6">
            <Button
              onClick={handleCheck}
              size="lg"
              className="w-full md:w-auto"
              disabled={!selectedId}
            >
              查看處理指南
            </Button>
          </div>
        </Card>
      )}

      {showResult && category && (
        <>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {category.label}
              </h2>
              <Button onClick={handleReset} variant="ghost" size="sm">
                重新選擇
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  適用法條
                </h3>
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <div
                      key={article.name}
                      className="bg-slate-50 rounded-[10px] p-4"
                    >
                      <p className="text-sm font-semibold text-brand-600 mb-1">
                        {article.name}
                      </p>
                      <p className="text-sm text-slate-700">
                        {article.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent-50 text-accent-600 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  雇主應該怎麼做
                </h3>
                <div className="bg-accent-50 rounded-[10px] p-4">
                  <ul className="space-y-2">
                    {category.employerDuty.map((duty, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-accent-800"
                      >
                        <svg
                          className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {duty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-warning-50 text-warning-600 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  你可以怎麼做
                </h3>
                <div className="bg-warning-50 rounded-[10px] p-4">
                  <ul className="space-y-2">
                    {category.workerActions.map((action, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-warning-800"
                      >
                        <span className="w-5 h-5 rounded-full bg-warning-200 text-warning-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <p className="text-base font-bold text-slate-900 mb-1">
                  需要專人協助？
                </p>
                <p className="text-sm text-slate-500">
                  勞工諮詢專線提供免費的法律諮詢與申訴協助，服務時間為週一至週五 08:00-22:00、週六 09:00-17:00。
                </p>
              </div>
              <a
                href="tel:1955"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-bold rounded-[12px] hover:bg-brand-600 transition-colors shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                撥打 1955
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-2">市話或手機直撥 1955（免付費勞工諮詢專線）</p>
          </Card>
        </>
      )}
    </div>
  );
}
