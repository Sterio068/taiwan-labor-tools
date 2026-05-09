import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SCENARIO_ENTRIES } from "@/data/growth-entrypoints";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益情境入口｜月薪族、打工族、被資遣與加班爭議",
  description:
    "依照實際處境整理勞工權益下一步：月薪族、打工族、被資遣、離職前、加班爭議、勞健保低報檢查。",
  keywords: ["勞工權益情境", "被資遣怎麼辦", "加班爭議", "離職檢查", "勞健保低報", "月薪族"],
  path: "/scenarios",
});

export default function ScenariosPage() {
  const collectionSchema = collectionPageSchema({
    name: "勞工權益情境入口",
    description: "依勞工實際處境整理工具、文章、檢查步驟與下一步。",
    path: "/scenarios",
    items: SCENARIO_ENTRIES.map((scenario) => ({
      name: scenario.title,
      description: scenario.description,
      url: `${SITE_URL}/scenarios#${scenario.slug}`,
    })),
  });

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "情境入口" }]} />
        <header className="mt-6 max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
            Scenario Hub
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            按你的處境找到下一步
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
            不必先知道法條名稱。從「我現在遇到什麼」開始，直接連到工具、文章、檢查清單與官方來源。
          </p>
        </header>
      </div>

      <main className="container-page pb-16">
        <SectionHeader
          eyebrow="Scenarios"
          title="六種常見勞工處境"
          description="每個情境都包含第一個工具、三個步驟，以及延伸文章。"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {SCENARIO_ENTRIES.map((scenario, index) => (
            <section
              key={scenario.slug}
              id={scenario.slug}
              className="scroll-mt-24 rounded-[18px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-brand-50 text-sm font-extrabold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-extrabold leading-snug text-slate-950">
                    {scenario.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {scenario.description}
                  </p>
                </div>
              </div>

              <ol className="mt-5 grid gap-2">
                {scenario.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-3 rounded-[12px] bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="font-extrabold text-brand-700">{stepIndex + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={scenario.primaryHref}
                  data-track="scenario_primary_tool_clicked"
                  data-track-label={scenario.title}
                  data-track-target={scenario.primaryHref}
                  className="rounded-[10px] bg-brand-500 px-4 py-2 text-sm font-bold text-surface transition-colors hover:bg-brand-600"
                >
                  {scenario.primaryLabel}
                </Link>
                {scenario.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-track="scenario_related_clicked"
                    data-track-label={link.label}
                    data-track-target={link.href}
                    className="rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
