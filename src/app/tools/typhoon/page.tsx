import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { TyphoonCalculator } from "@/components/tools/TyphoonCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "颱風假薪資計算機 — 颱風出勤加倍怎麼算？",
  description:
    "颱風假出勤雙倍工資怎麼算？輸入月薪或時薪，一秒計算颱風出勤應得補償。依據「天然災害發生事業單位勞工出勤管理及工資給付要點」。",
  keywords: ["颱風假薪資", "颱風出勤加倍", "颱風假不能扣薪", "颱風假計算機", "天然災害薪資"],
  path: "/tools/typhoon",
});

export default function TyphoonPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "颱風假薪資計算機",
          description: "颱風出勤雙倍工資與不出勤薪資照給的計算工具",
          path: "/tools/typhoon",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["typhoon"])} />
      <JsonLd data={howToSchema({
        name: "如何計算颱風假薪資與出勤補償",
        description: "依據「天然災害發生事業單位勞工出勤管理及工資給付要點」，計算颱風出勤雙倍工資與薪資照給保障",
        totalTime: "PT1M",
        steps: [
          { name: "選擇薪資類型", text: "選擇月薪制或時薪制，填入你的薪資" },
          { name: "確認颱風假宣告狀態", text: "確認所在地政府是否宣告颱風假放假" },
          { name: "查看出勤補償金額", text: "系統顯示颱風出勤應得的雙倍工資，以及不出勤薪資照給的保障" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "颱風假薪資計算機", url: `${SITE_URL}/tools/typhoon` },
      ])} />

      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "颱風假薪資計算機" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        颱風假薪資計算機
      </h1>
      <p className="text-slate-500 mb-8">
        颱風假出勤應得雙倍工資；政府宣告颱風假未出勤，薪資照給不得扣。輸入薪資即時試算。
      </p>

      <TyphoonCalculator />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">颱風假薪資規定的法律依據</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣颱風假的薪資規定，主要依據勞動部頒布的「天然災害發生事業單位勞工出勤管理及工資給付要點」。
          雖然這份要點並非勞動基準法條文，而是行政機關的行政命令，但仍具法律效力，
          雇主違反者將面臨勞動局裁罰。其核心精神是：颱風等天然災害屬於不可歸責於勞工的原因，
          勞工不應因此受到薪資損失。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">宣告颱風假後出勤的雙倍工資計算</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          政府宣告颱風假後，若雇主要求勞工出勤，必須給付雙倍工資作為補償。
          月薪制計算方式：當日工資 = 月薪 ÷ 30 × 2。例如月薪 40,000 元的勞工，
          颱風日出勤的當日工資為 40,000 ÷ 30 × 2 ≈ 2,667 元。
          時薪制計算方式：當日工資 = 時薪 × 2 × 出勤小時數。
          例如時薪 200 元出勤 8 小時，當日工資為 200 × 2 × 8 = 3,200 元。
          此雙倍工資是基本補償，若超出正常工時，仍需依勞基法另計加班費。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">未宣告颱風假時勞工的處境</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          若所在工作地點的縣市政府未宣告颱風假，勞工自行認為有危險而不出勤，
          法律上無明確保障。雇主可依勞動契約要求補班，或視為曠職扣薪。
          颱風假宣告以「實際工作地點」所在縣市為準，而非居住地或公司登記地，
          兩地不同縣市時，以工作地點的宣告為準。建議勞工在颱風季前事先與雇主溝通，
          釐清公司的颱風假政策，避免爭議。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">如果老闆強迫颱風天出勤怎麼辦</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          在政府已宣告颱風假的前提下，雇主雖可要求勞工出勤，但必須給付雙倍工資。
          若雇主不願給付，勞工可向當地勞動局（勞工局）申訴，要求調查處理。
          此外，雇主對於勞工的人身安全有保護義務，若強迫勞工在明顯危險的環境中工作，
          可能涉及職業安全衛生法的責任。如遭強迫出勤且未得雙倍工資，
          建議保留相關訊息記錄，向主管機關申訴。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="颱風假薪資計算機" path="/tools/typhoon" /></div>
      <FaqSection items={TOOL_FAQS["typhoon"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["typhoon"]}
        tools={TOOL_RELATED_TOOLS["typhoon"]}
      />
    </div>
  );
}
