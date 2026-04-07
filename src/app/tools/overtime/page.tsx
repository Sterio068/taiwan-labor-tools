import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { OvertimeCalculator } from "@/components/tools/OvertimeCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "加班費計算機 — 2026 最新勞基法",
  description:
    "輸入月薪和加班時數，立即算出平日、休息日、國定假日加班費。依據勞基法第 24 條。",
  keywords: ["加班費計算", "加班費怎麼算", "平日加班", "休息日加班費", "國定假日加班"],
  path: "/tools/overtime",
});

export default function OvertimePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "加班費計算機",
          description: "計算平日、休息日、國定假日加班費",
          path: "/tools/overtime",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "加班費計算機" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        加班費計算機
      </h1>
      <p className="text-slate-500 mb-8">
        輸入月薪和加班時數，依勞基法第 24 條計算平日、休息日及國定假日加班費。
      </p>

      <OvertimeCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">加班費怎麼算？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          月薪制勞工的加班費時薪基數 = 月薪 ÷ 30 ÷ 8。
          依據勞基法第 24 條，不同加班類型有不同的倍率。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">平日加班</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          前 2 小時：時薪基數 × 1⅓ 倍。第 3-4 小時：時薪基數 × 1⅔ 倍。每日加班上限 4 小時。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">休息日加班</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          倍率與平日相同，但工時計算不同：前 2 小時以 4 小時計，超過 4 小時以 8 小時計，超過 8 小時以 12 小時計。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">國定假日 / 例假日加班</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          國定假日加班，雇主除了當日工資照給外，需另外加倍發給（等於拿 2 倍日薪）。
          例假日原則上不得加班，如遇天災、事變始得加班。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
