import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { PensionCalculator } from "@/components/tools/PensionCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "勞退退休金試算 — 算出你的退休帳戶",
  description:
    "輸入月薪、年齡與自提比例，試算勞退新制退休帳戶累積金額與每月退休金。含自提節稅效果。",
  keywords: ["勞退試算", "退休金多少", "勞退自提", "退休金計算", "勞退新制"],
  path: "/tools/pension",
});

export default function PensionPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞退退休金試算",
          description: "試算勞退新制退休帳戶累積金額與每月退休金",
          path: "/tools/pension",
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞退退休金試算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞退退休金試算
      </h1>
      <p className="text-slate-500 mb-8">
        輸入月薪、年齡與自提比例，試算你的勞退帳戶在退休時能累積多少錢。
      </p>

      <PensionCalculator />

      <AdBanner slot="tool-result" />

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">勞退新制怎麼運作？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          勞退新制（勞工退休金條例）自 2005 年 7 月起實施。雇主每月提繳薪資 6% 到勞工個人退休金帳戶，
          帳戶跟著人走，換工作也不會歸零。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">自願提繳值得嗎？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞工可以自願提繳最多 6%。最大好處是「節稅」：自提金額可以從當年度所得中扣除。
          如果你的所得稅率是 12%，自提 6% 等於每年省下不少稅金。
          缺點是這筆錢要等到 60 歲才能領回。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">退休怎麼領？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          年滿 60 歲時，如果提繳年資滿 15 年，可以選擇月領或一次領。
          未滿 15 年只能一次領。月領金額 = 帳戶餘額 ÷ 平均餘命月數。
        </p>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">投資報酬率</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞退基金由政府統一操作投資，歷年平均報酬率約 3-4%。
          法律保障最低收益率不得低於兩年期定存利率。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />
    </div>
  );
}
