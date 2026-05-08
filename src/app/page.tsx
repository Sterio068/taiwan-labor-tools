import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/constants";
import { GUIDE_HUBS } from "@/data/guide-hubs";
import { ARTICLES } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";

export const metadata: Metadata = buildPageMetadata({
  title: "台灣勞工權益工具站 — 薪資、加班費、資遣費免費計算",
  description:
    "免費勞工權益計算工具：薪資明細、加班費、資遣費、特休天數、勞健保保費、勞退退休金。依據最新勞基法，幫你算清楚每一筆錢。",
  keywords: [
    "勞工權益",
    "薪資計算",
    "加班費計算",
    "資遣費",
    "特休天數",
    "勞保費",
    "健保費",
    "勞退",
    "退休金試算",
  ],
  path: "/",
});

const TOOL_ICONS: Record<string, string> = {
  calculator: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "piggy-bank": "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
};

// 最熱門的 6 個工具（人工挑選，基於常見搜尋意圖）
const POPULAR_TOOLS = TOOLS.slice(0, 6);

const GUIDES = GUIDE_HUBS.map((hub) => ({
  title: hub.shortTitle,
  desc: hub.description,
  href: `/guides/${hub.slug}`,
  emoji: hub.emoji,
}));

const COMPARE_PAGES = [
  { title: "月薪 vs 時薪", desc: "哪個比較划算？", href: "/compare/monthly-vs-hourly" },
  { title: "新制 vs 舊制勞退", desc: "差在哪？怎麼選？", href: "/compare/new-vs-old-pension" },
  { title: "被資遣 vs 自願離職", desc: "差別與影響比較", href: "/compare/fired-vs-quit" },
  { title: "勞保 vs 國保", desc: "哪個保障比較好？", href: "/compare/labor-vs-national-insurance" },
];

// 熱門問題（目標 featured snippets）
const POPULAR_QUESTIONS = [
  { q: "月薪 45000 實領多少？", href: "/articles/salary-45000-take-home" },
  { q: "加班 2 小時多少錢？", href: "/articles/overtime-2hours-calculation" },
  { q: "工作 3 年被資遣有多少錢？", href: "/articles/severance-3years" },
  { q: "滿 6 個月有幾天特休？", href: "/articles/annual-leave-after-6months" },
  { q: "勞退自提 6% 划算嗎？", href: "/articles/pension-voluntary" },
  { q: "時薪 196 元合理嗎？", href: "/articles/minimum-wage-hourly-2026" },
];

export default function HomePage() {
  // 最新 5 篇文章
  const latestArticles = [...ARTICLES]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-600 to-brand-700 text-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            算清楚你的每一筆錢
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto mb-8">
            免費勞工權益計算工具，依據 2026 最新勞基法。
            <br className="hidden md:block" />
            薪資明細、加班費、資遣費、特休、勞健保、退休金 — 一次算清楚。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              data-track="home_primary_cta_clicked"
              data-track-label="開始計算"
              data-track-target="/tools"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-600 font-bold rounded-[12px] hover:bg-brand-50 transition-colors shadow-lg text-lg"
            >
              開始計算
            </Link>
            <Link
              href="/guides"
              data-track="home_secondary_cta_clicked"
              data-track-label="瀏覽指南"
              data-track-target="/guides"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-800/40 text-white font-bold rounded-[12px] hover:bg-brand-800/60 transition-colors border border-white/30 text-lg"
            >
              瀏覽指南
            </Link>
          </div>
        </div>
      </section>

      {/* 熱門問題 — Quick Answer 區塊 */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-4 text-center">
            🔥 熱門問題
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {POPULAR_QUESTIONS.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                data-track="home_question_clicked"
                data-track-label={q.q}
                data-track-target={q.href}
                className="inline-flex items-center px-4 py-2 bg-white text-slate-700 rounded-full border border-slate-200 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-colors text-sm"
              >
                {q.q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                免費計算工具
              </h2>
              <p className="text-slate-500 mt-1">16 個工具，涵蓋薪資、加班、資遣、退休</p>
            </div>
            <Link
              href="/tools"
              data-track="home_tools_index_clicked"
              data-track-target="/tools"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                data-track="home_tool_clicked"
                data-track-label={tool.name}
                data-track-target={tool.href}
                className="group bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.1)] transition-all"
              >
                <div className="w-12 h-12 rounded-[12px] bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={TOOL_ICONS[tool.icon] || TOOL_ICONS.calculator}/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 指南 Hub 區塊 */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            完整指南
          </h2>
          <p className="text-center text-slate-500 mb-10">
            按主題整理的深度內容中樞，工具與文章一次看完
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                data-track="home_guide_clicked"
                data-track-label={g.title}
                data-track-target={g.href}
                className="block p-6 bg-slate-50 rounded-[16px] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all"
              >
                <div className="text-3xl mb-3">{g.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-1">{g.title}</h3>
                <p className="text-sm text-slate-500">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 比較頁區塊 */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            一次看懂：熱門比較
          </h2>
          <p className="text-center text-slate-500 mb-10">
            職場常見的兩難選擇，用對照表快速搞懂
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPARE_PAGES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block p-5 bg-white rounded-[14px] border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded mb-3">VS</div>
                <h3 className="font-bold text-slate-900 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                最新文章
              </h2>
              <p className="text-slate-500 mt-1">持續更新的勞工權益知識</p>
            </div>
            <Link
              href="/articles"
              data-track="home_articles_index_clicked"
              data-track-target="/articles"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm"
            >
              全部文章 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                data-track="home_article_clicked"
                data-track-label={article.title}
                data-track-target={`/articles/${article.slug}`}
                className="block p-5 bg-slate-50 rounded-[14px] hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 transition-all"
              >
                <div className="text-xs text-slate-400 mb-2">
                  {article.publishedAt} · {article.readingMinutes} 分鐘閱讀
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Law Reference */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">2026</div>
              <p className="text-slate-700 font-medium">最新法規數據</p>
              <p className="text-sm text-slate-500 mt-1">基本工資 $29,500 適用</p>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">16+</div>
              <p className="text-slate-700 font-medium">免費計算工具</p>
              <p className="text-sm text-slate-500 mt-1">薪資、加班、資遣、特休...</p>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-600 mb-2">100%</div>
              <p className="text-slate-700 font-medium">官方來源對照</p>
              <p className="text-sm text-slate-500 mt-1">
                <Link href="/sources" className="text-brand-600 hover:text-brand-700 font-semibold">
                  查看資料來源與更新紀錄
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            不確定自己的權益？
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            輸入你的月薪，馬上看到勞健保扣了多少、實領多少、雇主幫你提繳了多少退休金。
          </p>
          <Link
            href="/tools/salary"
            data-track="home_bottom_cta_clicked"
            data-track-label="試算薪資明細"
            data-track-target="/tools/salary"
            className="inline-flex items-center px-8 py-3.5 bg-brand-500 text-white font-bold rounded-[12px] hover:bg-brand-600 transition-colors shadow-md text-lg"
          >
            試算薪資明細
          </Link>
        </div>
      </section>
    </>
  );
}
