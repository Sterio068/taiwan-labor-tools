import Link from "next/link";
import type { ReactNode } from "react";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import type { RelatedLink } from "@/data/tool-related";
import type { FaqItem } from "@/lib/seo";

interface ToolFact {
  label: string;
  value: string;
}

interface ToolNextStep {
  label: string;
  href: string;
  description: string;
}

interface ToolPageShellProps {
  title: string;
  eyebrow: string;
  description: string;
  breadcrumbLabel: string;
  facts: ToolFact[];
  nextSteps: ToolNextStep[];
  faqItems: FaqItem[];
  relatedArticles?: RelatedLink[];
  relatedTools?: RelatedLink[];
  shareTitle: string;
  sharePath: string;
  children: ReactNode;
  article: ReactNode;
}

export function ToolPageShell({
  title,
  eyebrow,
  description,
  breadcrumbLabel,
  facts,
  nextSteps,
  faqItems,
  relatedArticles = [],
  relatedTools = [],
  shareTitle,
  sharePath,
  children,
  article,
}: ToolPageShellProps) {
  return (
    <div className="bg-slate-50">
      <div className="container-page py-8 md:py-12">
        <Breadcrumb
          jsonLd={false}
          items={[
            { label: "首頁", href: "/" },
            { label: "計算工具", href: "/tools" },
            { label: breadcrumbLabel },
          ]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <header className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {eyebrow}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {description}
            </p>
          </header>

          <aside
            className="rounded-[16px] border border-slate-200 bg-surface p-4 shadow-[var(--shadow-card)]"
            aria-label="使用前重點"
          >
            <p className="mb-3 text-sm font-bold text-slate-900">使用前先確認</p>
            <dl className="grid gap-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="text-sm text-slate-500">{fact.label}</dt>
                  <dd className="text-right text-sm font-bold text-slate-900">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      <section className="border-y border-slate-200 bg-surface">
        <div className="container-page py-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>{children}</div>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-[16px] border border-brand-100 bg-brand-50 p-5">
                <p className="mb-4 text-sm font-bold text-brand-700">算完下一步</p>
                <div className="grid gap-3">
                  {nextSteps.map((step, index) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      data-track="tool_next_step_clicked"
                      data-track-label={step.label}
                      data-track-target={step.href}
                      className="group flex gap-3 rounded-[12px] border border-brand-100 bg-surface p-3 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900 group-hover:text-brand-700">
                          {step.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {step.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-900">隱私與廣告</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  計算在瀏覽器本機完成，不會把薪資、日期或年資輸入送到第三方。廣告區塊與操作按鈕保持距離，避免誤點。
                </p>
                <Link
                  href="/privacy"
                  data-track="privacy_link_clicked"
                  data-track-label="工具頁隱私政策"
                  data-track-target="/privacy"
                  className="mt-4 inline-flex text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
                >
                  查看隱私政策
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <main className="container-page pb-16 pt-10">
        <AdBanner slot="tool-result" />

        <article className="max-w-3xl rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] md:p-8">
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:leading-8">
            {article}
          </div>
        </article>

        <AdBanner slot="tool-bottom" />

        <div className="max-w-3xl">
          <div className="mt-8">
            <ShareButtons title={shareTitle} path={sharePath} />
          </div>
          <FaqSection items={faqItems} />
          <RelatedLinks articles={relatedArticles} tools={relatedTools} />
        </div>
      </main>
    </div>
  );
}
