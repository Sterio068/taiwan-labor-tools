import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { DisputeChecker } from "@/components/tools/DisputeChecker";

export const metadata: Metadata = buildPageMetadata({
  title: "勞資爭議檢查器 — 遇到勞資糾紛怎麼辦？",
  description:
    "選擇勞資爭議類型，立即查看適用法條、雇主義務與勞工可採取的行動。涵蓋薪資、加班、資遣、休假、保險五大類。",
  keywords: [
    "勞資爭議",
    "勞資糾紛",
    "勞動檢查",
    "勞工申訴",
    "勞資調解",
    "1955",
    "欠薪",
    "資遣",
  ],
  path: "/tools/dispute-checker",
});

export default function DisputeCheckerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞資爭議檢查器",
          description: "查詢勞資爭議適用法條與處理方式",
          path: "/tools/dispute-checker",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞資爭議檢查器" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞資爭議檢查器
      </h1>
      <p className="text-slate-500 mb-8">
        選擇你遇到的勞資爭議類型，查看相關法條與建議行動。
      </p>

      <DisputeChecker />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          遇到勞資爭議怎麼辦？完整處理指南
        </h2>
        <p className="text-slate-700 leading-relaxed my-4">
          勞資爭議是勞工與雇主之間因勞動條件而產生的糾紛。根據勞動部統計，台灣每年有數萬件勞資爭議調解案件，最常見的爭議類型包括工資給付、資遣費、加班費以及勞健保問題。本工具幫助你快速了解自身權益與可採取的行動。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          勞資爭議的三大處理管道
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          第一步是向各縣市勞工局（處）申訴，勞工局會介入調查並可對違法雇主開罰。第二步是申請勞資爭議調解，由各地勞資爭議調解委員會主持，過程免費，調解成立的結果具有法律效力。第三步是向勞動檢查機構申請勞動檢查，檢查員會實地訪查雇主是否違反勞動法令。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          證據蒐集是關鍵
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          無論哪種爭議類型，保留證據都是最重要的一步。薪資單、銀行轉帳紀錄、勞動契約、出勤打卡紀錄、與雇主的通訊軟體對話截圖等都是有力的證據。建議平時就養成保留這些資料的習慣，遇到爭議時才能有效主張自身權益。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          1955 勞工諮詢專線
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞動部設有 1955 勞工諮詢專線，提供勞動法令諮詢、勞資爭議協處、申訴受理等服務，且完全免費。服務時間為週一至週五 08:00-22:00、週六 09:00-17:00。如果你不確定自己的狀況是否違法，或不知道該如何處理，撥打 1955 是最簡單的第一步。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          申請勞資調解的流程
        </h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞資調解是最常用的爭議解決方式。向工作所在地的縣市勞工局提出調解申請後，通常在 20 天內會安排調解會議。雙方在調解委員的協助下進行協商，調解成立後具有與法院判決同等的效力。若調解不成立，勞工仍可進一步提起民事訴訟。整個調解過程不需要律師費，是勞工維權最經濟有效的管道。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
