import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { SeveranceCalculator } from "@/components/tools/SeveranceCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "資遣費計算機 — 新制舊制一次算清楚",
  description:
    "輸入年資與平均月薪，立即計算新制或舊制資遣費。依據勞基法第 17 條與勞工退休金條例第 12 條。",
  keywords: ["資遣費計算", "資遣費多少", "新制資遣費", "舊制資遣費", "被資遣"],
  path: "/tools/severance",
});

export default function SeverancePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "資遣費計算機",
          description: "計算新制或舊制資遣費",
          path: "/tools/severance",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "資遣費計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        資遣費計算機
      </h1>
      <p className="text-slate-500 mb-8">
        輸入適用制度、年資與平均月薪，立即計算你應得的資遣費。
      </p>

      <SeveranceCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">新制 vs 舊制資遣費</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          2005 年 7 月 1 日以後到職的勞工適用「新制」。之前就在職的勞工，94 年 7 月 1 日之前的年資適用舊制，之後的年資適用新制。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">新制資遣費</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          每滿 1 年發給 0.5 個月平均工資，未滿 1 年以比例計算。上限 6 個月平均工資。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">舊制資遣費</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          每滿 1 年發給 1 個月平均工資，不滿 1 年以比例計算。沒有上限。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">平均工資怎麼算？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          資遣費的「平均工資」是指離職前 6 個月的工資總額除以該期間的總日數，再乘以 30。
          包含本薪、加班費、獎金等經常性給與。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
