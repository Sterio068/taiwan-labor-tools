import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "成效追蹤 Dashboard 說明｜Search Console、GA4、AdSense 指標",
  description:
    "說明勞工權益站如何用 Search Console、GA4 與 AdSense 指標追蹤內容品質、搜尋流量、工具使用率與合法廣告曝光。",
  keywords: ["Search Console", "GA4", "AdSense", "成效追蹤", "SEO dashboard"],
  path: "/growth-dashboard",
});

const METRICS = [
  { area: "Search Console", metric: "曝光、點擊、CTR、平均排名", use: "判斷文章與指南是否被搜尋者看見，優先優化高曝光低 CTR 的標題與摘要。" },
  { area: "Search Console", metric: "sitemap 狀態、索引涵蓋範圍", use: "部署後確認 sitemap 成功讀取，並優先要求核心工具與新增長尾文章建立索引。" },
  { area: "GA4", metric: "工具開始、完成計算、套用預設、分享、CTA 與結果下一步點擊", use: "確認使用者是否真的完成試算與進入下一步，不收集薪資與年資等敏感輸入。" },
  { area: "GA4", metric: "文章與指南 25/50/75/90% 閱讀深度、站內搜尋結果數、content_group", use: "找出使用者停留、流失與找不到內容的位置，補強直接答案、表格、FAQ 與內部連結。" },
  { area: "GA4", metric: "熱門問題與情境入口點擊", use: "檢查問題頁、情境頁是否把搜尋訪客導向文章、工具與下一步清單。" },
  { area: "AdSense", metric: "頁面 RPM、曝光、可見率、政策中心", use: "通過後只看合法曝光品質與政策狀態，不以誘導點擊作為優化方向。" },
];

const INDEXING_QUEUE = [
  "/tools/salary",
  "/tools/overtime",
  "/tools/severance",
  "/questions",
  "/scenarios",
  "/guides/salary",
  "/guides/overtime",
  "/guides/severance",
  "/articles/salary-35000-take-home",
  "/articles/salary-38000-take-home",
  "/articles/salary-42000-take-home",
  "/articles/labor-insurance-bracket-2026",
  "/articles/health-insurance-bracket-2026",
  "/articles/labor-pension-6-percent",
  "/articles/unused-annual-leave-wage",
  "/articles/involuntary-separation-certificate",
  "/articles/salary-55000-take-home",
  "/articles/overtime-2-5hours-calculation",
  "/articles/overtime-evidence-checklist",
  "/articles/severance-6months",
  "/articles/severance-18months",
  "/articles/labor-insurance-underreporting-complaint",
  "/articles/salary-60000-take-home",
  "/articles/overtime-4hours-calculation",
  "/articles/severance-1year",
  "/articles/severance-5years",
];

export default function GrowthDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "成效追蹤" }]} />
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          成效追蹤 Dashboard 說明
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          本站以內容品質、搜尋流量、工具使用率、回訪與合法廣告曝光作為成長指標，不追蹤個資，也不以鼓勵廣告點擊為目標。
        </p>
      </header>

      <section className="mb-10 overflow-hidden rounded-[16px] border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left py-3 px-4 font-semibold text-slate-600">工具</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">核心指標</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">判讀方式</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {METRICS.map((row) => (
              <tr key={`${row.area}-${row.metric}`}>
                <td className="py-3 px-4 font-semibold text-slate-900">{row.area}</td>
                <td className="py-3 px-4 text-slate-700">{row.metric}</td>
                <td className="py-3 px-4 text-slate-600 leading-relaxed">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[16px] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3">每週檢查</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• sitemap 是否成功讀取、是否有索引錯誤</li>
            <li>• 六大指南是否有曝光與長尾關鍵字</li>
            <li>• 工具完成率是否低於文章 CTA 點擊率</li>
            <li>• AdSense 政策中心是否有警示</li>
          </ul>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900 mb-3">優化順序</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• 高曝光低 CTR：改標題、描述與結構化資料</li>
            <li>• 高流量低完成：改善工具表單與預設情境</li>
            <li>• 高完成低回訪：加強 checklist、newsletter 與延伸閱讀</li>
            <li>• 廣告影響閱讀：降低投放密度或移到文章底部</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-[16px] border border-brand-100 bg-brand-50 p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">追蹤事件命名</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          GA4 事件包含 page_context_viewed、tool_started、tool_completed、tool_preset_applied、tool_result_shared、content_shared、content_scroll_depth_reached、site_search_performed、site_search_result_clicked、question_article_clicked、scenario_primary_tool_clicked、cta_clicked、tool_next_step_clicked、tool_result_next_step_clicked、newsletter_intent_submitted 與 checklist_print_clicked。
          事件參數只描述頁面、工具名稱與互動類型，不上傳薪資、年資、到職日等敏感輸入。
        </p>
        <Link href="/privacy" className="font-semibold text-brand-700 hover:text-brand-800">
          查看隱私權政策
        </Link>
      </section>

      <section className="mt-8 rounded-[16px] border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">部署後索引佇列</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Search Console 驗證後，優先用網址審查提交以下核心入口。這些頁面是薪資、加班與資遣三個 topic cluster 的主幹。
        </p>
        <div className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {INDEXING_QUEUE.map((path) => (
            <Link
              key={path}
              href={path}
              className="rounded-[10px] border border-slate-200 px-3 py-2 font-medium transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {path}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
