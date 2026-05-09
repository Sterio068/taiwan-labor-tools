import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益比較頁：月薪 vs 時薪、勞退新舊制、被資遣 vs 辭職",
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
  const collectionSchema = collectionPageSchema({
    name: "職場常見兩難比較",
    description:
      "用對照表快速搞懂職場常見的兩難選擇：月薪制 vs 時薪制、新制 vs 舊制勞退、被資遣 vs 自願離職、勞保 vs 國保。",
    path: "/compare",
    items: COMPARES.map((comparison) => ({
      name: comparison.title,
      description: comparison.desc,
      url: `${SITE_URL}${comparison.href}`,
    })),
  });

  return (
    <div className="bg-slate-50">
      <JsonLd data={collectionSchema} />
      <div className="container-page py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "熱門比較" },
          ]}
        />

        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-bold text-brand-700">
            決策前先對照
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            職場常見兩難比較
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
            用對照表快速看懂制度差異，再接到計算工具與建議步驟，幫你做出更有利的選擇。
          </p>
        </div>
      </div>

      <div className="container-page pb-16">
        <SectionHeader
          eyebrow="Compare"
          title="四個最容易做錯判斷的情境"
          description="比較頁保留正反差異、適用情境與下一步，適合轉職、離職或保險選擇前快速掃描。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {COMPARES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-track="compare_index_card_clicked"
              data-track-label={item.title}
              data-track-target={item.href}
              className="group flex h-full flex-col rounded-[20px] border border-slate-200 bg-surface p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-[background-color,border-color,box-shadow] hover:border-brand-300 hover:shadow-[0_10px_25px_rgba(15,23,42,0.09)]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-[10px] bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700">
                  VS
                </span>
                <span className="rounded-[10px] bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {item.tag}
                </span>
              </div>
              <h2 className="text-xl font-extrabold leading-snug text-slate-950 group-hover:text-brand-700">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              <ul className="mt-5 grid gap-2">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-5 text-sm font-bold text-brand-700">
                查看完整比較
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { href: "/guides", title: "深度指南", desc: "六大主題完整攻略" },
            { href: "/tools", title: "計算工具", desc: "16+ 個免費工具" },
            { href: "/articles", title: "權益文章", desc: "持續更新的知識庫" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-track="compare_bottom_cta_clicked"
              data-track-label={item.title}
              data-track-target={item.href}
              className="rounded-[18px] border border-slate-200 bg-surface p-5 text-center transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <h3 className="font-extrabold text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
