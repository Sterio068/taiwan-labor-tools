import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/constants";
import { GUIDE_HUBS } from "@/data/guide-hubs";
import { ARTICLES } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolCard } from "@/components/tools/ToolCard";

export const metadata: Metadata = buildPageMetadata({
  title: "台灣勞工權益工具站：薪資、加班費、資遣費免費計算",
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

const POPULAR_TOOLS = TOOLS.slice(0, 6);

const WORKBENCH_ACTIONS = [
  {
    title: "先算實領薪水",
    description: "月薪、勞健保、勞退與雇主成本",
    href: "/tools/salary",
    badge: "薪資",
  },
  {
    title: "確認加班費",
    description: "平日、休息日、國定假日倍率",
    href: "/tools/overtime",
    badge: "工時",
  },
  {
    title: "被資遣先估金額",
    description: "資遣費、預告期與下一步",
    href: "/tools/severance",
    badge: "離職",
  },
  {
    title: "查勞健保級距",
    description: "檢查薪資單扣款是否合理",
    href: "/tools/insurance-premium",
    badge: "保險",
  },
];

const POPULAR_QUESTIONS = [
  { q: "月薪 40000 實領多少？", href: "/articles/salary-40000-take-home" },
  { q: "月薪 45000 實領多少？", href: "/articles/salary-45000-take-home" },
  { q: "月薪 50000 實領多少？", href: "/articles/salary-50000-take-home" },
  { q: "加班 3 小時多少錢？", href: "/articles/overtime-3hours-calculation" },
  { q: "工作 2 年被資遣有多少錢？", href: "/articles/severance-2years" },
  { q: "工作 3 年被資遣有多少錢？", href: "/articles/severance-3years" },
  { q: "滿 6 個月有幾天特休？", href: "/articles/annual-leave-after-6months" },
];

const COMPARE_PAGES = [
  { title: "月薪 vs 時薪", desc: "換工作或接案前，先比較實際待遇", href: "/compare/monthly-vs-hourly" },
  { title: "新制 vs 舊制勞退", desc: "看懂退休金制度與適用差異", href: "/compare/new-vs-old-pension" },
  { title: "被資遣 vs 自願離職", desc: "失業給付、證明與權益一次對照", href: "/compare/fired-vs-quit" },
  { title: "勞保 vs 國保", desc: "保障範圍、保費與給付差在哪", href: "/compare/labor-vs-national-insurance" },
];

export default function HomePage() {
  const latestArticles = [...ARTICLES]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
                2026 台灣勞工權益搜尋入口
              </p>
              <h1 className="text-[2.55rem] font-extrabold leading-[1.12] tracking-normal text-slate-950 md:text-6xl">
                <span className="block">先確認權益，</span>
                <span className="block">再決定下一步</span>
              </h1>
              <p className="mt-5 max-w-[22rem] text-lg leading-8 text-slate-700 sm:max-w-2xl">
                從薪資、加班、資遣、特休到勞健保，把常見勞權問題變成可計算、可查來源、可帶走的下一步。
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/tools"
                  data-track="home_primary_cta_clicked"
                  data-track-label="進入計算工具"
                  data-track-target="/tools"
                  className="inline-flex min-h-12 items-center justify-center rounded-[12px] bg-brand-500 px-6 text-base font-bold text-surface shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                >
                  進入計算工具
                </Link>
                <Link
                  href="/guides"
                  data-track="home_secondary_cta_clicked"
                  data-track-label="按情境找指南"
                  data-track-target="/guides"
                  className="inline-flex min-h-12 items-center justify-center rounded-[12px] border border-slate-300 bg-surface px-6 text-base font-bold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                >
                  按情境找指南
                </Link>
              </div>
              <dl className="mt-9 grid gap-3 rounded-[20px] border border-slate-200 bg-surface p-3 shadow-[0_1px_3px_rgba(15,23,42,0.05)] sm:max-w-2xl sm:grid-cols-3">
                <div className="rounded-[14px] bg-slate-50 p-4">
                  <dt className="text-xs font-bold text-slate-500">基本工資</dt>
                  <dd className="mt-1 text-xl font-extrabold text-slate-950">$29,500</dd>
                </div>
                <div className="rounded-[14px] bg-slate-50 p-4">
                  <dt className="text-xs font-bold text-slate-500">時薪下限</dt>
                  <dd className="mt-1 text-xl font-extrabold text-slate-950">$196</dd>
                </div>
                <div className="rounded-[14px] bg-slate-50 p-4">
                  <dt className="text-xs font-bold text-slate-500">免費工具</dt>
                  <dd className="mt-1 text-xl font-extrabold text-slate-950">16+</dd>
                </div>
              </dl>
            </div>

            <aside className="rounded-[24px] border border-slate-200 bg-surface p-4 shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                    Workbench
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                    今天要處理什麼？
                  </h2>
                </div>
                <Link
                  href="/sources"
                  className="rounded-[10px] bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100"
                >
                  官方來源
                </Link>
              </div>
              <div className="space-y-3">
                {WORKBENCH_ACTIONS.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    data-track="home_workbench_action_clicked"
                    data-track-label={action.title}
                    data-track-target={action.href}
                    className="group grid grid-cols-[auto_1fr] gap-3 rounded-[16px] border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                  >
                    <span className="rounded-[10px] bg-surface px-2.5 py-1 text-xs font-bold text-brand-700">
                      {action.badge}
                    </span>
                    <span>
                      <span className="block font-bold text-slate-950 group-hover:text-brand-700">
                        {action.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {action.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-surface py-10">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="shrink-0">
              <p className="text-sm font-extrabold text-slate-900">熱門快速答案</p>
              <p className="text-sm text-slate-500">高搜尋意圖問題，直接進文章或工具</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_QUESTIONS.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  data-track="home_question_clicked"
                  data-track-label={q.q}
                  data-track-target={q.href}
                  className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {q.q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeader
            eyebrow="Calculators"
            title="先用工具把金額算清楚"
            description="把最常見的薪資、工時、離職與投保問題放在前面；結果頁再接到公式、官方來源與下一步。"
            actionHref="/tools"
            actionLabel="全部工具"
          />
          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
            <ToolCard
              tool={POPULAR_TOOLS[0]}
              priority
              trackingSource="home_featured_tool_clicked"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {POPULAR_TOOLS.slice(1).map((tool) => (
                <ToolCard
                  key={tool.href}
                  tool={tool}
                  compact
                  trackingSource="home_tool_clicked"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 md:py-20">
        <div className="container-page">
          <SectionHeader
            eyebrow="Guides"
            title="按情境走，不用自己翻法條"
            description="六大主題把工具、文章、FAQ 與官方依據接在一起，讓使用者從問題一路走到可執行的下一步。"
            actionHref="/guides"
            actionLabel="完整指南"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {GUIDE_HUBS.map((hub, index) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                data-track="home_guide_clicked"
                data-track-label={hub.shortTitle}
                data-track-target={`/guides/${hub.slug}`}
                className="group grid gap-4 rounded-[18px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200 sm:grid-cols-[64px_1fr]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-surface text-sm font-extrabold text-brand-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-lg font-extrabold text-slate-950 group-hover:text-brand-700">
                    {hub.shortTitle}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {hub.description}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-2">
                    {hub.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool.href}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-slate-600"
                      >
                        {tool.title}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeader
                eyebrow="Compare"
                title="用比較表做決定"
                description="適合離職、轉職、保險與退休制度選擇前快速掃描。"
                actionHref="/compare"
                actionLabel="熱門比較"
              />
              <div className="space-y-3">
                {COMPARE_PAGES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-[16px] border border-slate-200 bg-surface p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="rounded-[10px] bg-brand-50 px-2.5 py-1 text-xs font-extrabold text-brand-700">
                      VS
                    </span>
                    <span>
                      <span className="block font-bold text-slate-950 group-hover:text-brand-700">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {item.desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Articles"
                title="最新勞權文章"
                description="每篇文章都要回答一個明確問題，並連回工具、FAQ 與官方來源。"
                actionHref="/articles"
                actionLabel="全部文章"
              />
              <div className="rounded-[20px] border border-slate-200 bg-surface p-3 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
                {latestArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    data-track="home_article_clicked"
                    data-track-label={article.title}
                    data-track-target={`/articles/${article.slug}`}
                    className="group block rounded-[14px] p-4 transition-colors hover:bg-brand-50"
                  >
                    <div className="text-xs font-semibold text-slate-500">
                      {article.publishedAt} · {article.readingMinutes} 分鐘閱讀
                    </div>
                    <h3 className="mt-1 font-extrabold leading-snug text-slate-950 group-hover:text-brand-700">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                Trust
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                公式、來源、更新紀錄要看得到
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                這個站的設計重點不是把廣告放大，而是讓內容可信、工具好用、來源可查。廣告只保守放在不干擾閱讀的位置。
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/sources"
                  className="rounded-full bg-surface px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50"
                >
                  資料來源與更新紀錄
                </Link>
                <Link
                  href="/privacy"
                  className="rounded-full bg-surface px-4 py-2 text-sm font-bold text-slate-700 hover:bg-brand-50"
                >
                  隱私權政策
                </Link>
                <Link
                  href="/about"
                  className="rounded-full bg-surface px-4 py-2 text-sm font-bold text-slate-700 hover:bg-brand-50"
                >
                  關於本站
                </Link>
              </div>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
