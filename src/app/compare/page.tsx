import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益比較頁 — 月薪 vs 時薪、勞退新舊制、被資遣 vs 辭職",
  description:
    "用對照表快速搞懂職場常見的兩難選擇：月薪制 vs 時薪制、新制 vs 舊制勞退、被資遣 vs 自願離職、勞保 vs 國保。每個比較都附工具與建議。",
  keywords: ["月薪時薪比較", "新舊制勞退", "被資遣自願離職", "勞保國保比較", "勞工比較"],
  path: "/compare",
});

const COMPARES = [
  {
    title: "月薪制 vs 時薪制",
    desc: "哪個保障比較好？打工族該怎麼選？",
    href: "/compare/monthly-vs-hourly",
    tag: "薪資",
    points: ["加班費計算方式不同", "特休天數的差異", "勞健保投保規定", "實際月收入試算"],
  },
  {
    title: "新制 vs 舊制勞退",
    desc: "差別在哪？換工作的年資怎麼算？",
    href: "/compare/new-vs-old-pension",
    tag: "退休",
    points: ["年資可攜 vs 歸零", "計算公式完全不同", "適用對象與時間", "哪個比較划算"],
  },
  {
    title: "被資遣 vs 自願離職",
    desc: "影響失業給付、資遣費的關鍵差異",
    href: "/compare/fired-vs-quit",
    tag: "離職",
    points: ["資遣費有無的差異", "失業給付資格", "非自願離職證明", "離職前的策略考量"],
  },
  {
    title: "勞保 vs 國民年金",
    desc: "沒有工作該保哪個？保障範圍比較",
    href: "/compare/labor-vs-national-insurance",
    tag: "保險",
    points: ["適用對象不同", "費率與級距比較", "給付項目差異", "同時投保的情況"],
  },
];

export default function CompareIndexPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "熱門比較" },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          職場常見兩難比較
        </h1>
        <p className="text-slate-500 text-lg">
          用對照表快速搞懂常見問題，每個比較都附計算工具與建議，幫你做出最有利的選擇。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {COMPARES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group block bg-white rounded-[16px] border border-slate-200 p-6 hover:shadow-md hover:border-brand-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                VS
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                {c.tag}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              {c.title}
            </h2>
            <p className="text-slate-500 text-sm mb-4">{c.desc}</p>
            <ul className="space-y-1">
              {c.points.map((point) => (
                <li key={point} className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-brand-600 text-sm font-semibold group-hover:underline">
              查看完整比較 →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-4">
        <Link
          href="/guides"
          className="block p-5 bg-slate-50 rounded-[14px] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all text-center"
        >
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-bold text-slate-900 mb-1">深度指南</h3>
          <p className="text-sm text-slate-500">4 大主題完整攻略</p>
        </Link>
        <Link
          href="/tools"
          className="block p-5 bg-slate-50 rounded-[14px] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all text-center"
        >
          <div className="text-2xl mb-2">🧮</div>
          <h3 className="font-bold text-slate-900 mb-1">計算工具</h3>
          <p className="text-sm text-slate-500">16+ 個免費工具</p>
        </Link>
        <Link
          href="/articles"
          className="block p-5 bg-slate-50 rounded-[14px] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all text-center"
        >
          <div className="text-2xl mb-2">📰</div>
          <h3 className="font-bold text-slate-900 mb-1">權益文章</h3>
          <p className="text-sm text-slate-500">持續更新的知識庫</p>
        </Link>
      </div>
    </div>
  );
}
