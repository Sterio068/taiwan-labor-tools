import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { NoticePeriodCalculator } from "@/components/tools/NoticePeriodCalculator";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "離職預告期計算 — 提前幾天告知才合法？",
  description:
    "輸入到職日，自動計算離職預告期間天數與建議最晚離職日。依據勞基法第 16 條。",
  keywords: ["離職預告", "離職提前幾天", "預告期", "離職預告期間", "勞基法預告期"],
  path: "/tools/notice-period",
});

export default function NoticePeriodPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "離職預告期計算",
          description: "輸入到職日，計算離職預告期間天數",
          path: "/tools/notice-period",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["notice-period"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何計算離職預告期天數",
        totalTime: "PT1M",
        steps: [
          { name: "選擇預告方", text: "選擇是雇主預告資遣，或是勞工提出辭職" },
          { name: "輸入年資", text: "填入在現職的年資（年/月），系統自動對應法定預告天數" },
          { name: "查看預告天數與應注意事項", text: "顯示法定預告天數、是否可以用代通知金代替，以及例外狀況說明" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "離職預告期計算機", url: `${SITE_URL}/tools/notice-period` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "離職預告期計算" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        離職預告期計算
      </h1>
      <p className="text-slate-500 mb-8">
        輸入到職日期，自動計算年資與離職預告期間天數，附預告期間對照表。依據勞基法第 16 條。
      </p>

      <NoticePeriodCalculator />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">離職預告期間完全解析</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          勞基法第 16 條規定，雇主終止勞動契約時，依年資長短必須提前預告。
          雖然法條是規範雇主解僱員工的預告義務，但實務上勞工自願離職時，
          也會比照相同天數提前告知雇主，這是職場慣例也是對雙方的保障。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">預告期間怎麼算？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          預告天數依年資分為四個級距：
          到職未滿三個月，不需要預告期間，可以隨時離職。
          到職滿三個月但未滿一年，預告期間為十天。
          到職滿一年但未滿三年，預告期間為二十天。
          到職滿三年以上，預告期間為三十天。
          預告期間的起算是從你提出離職的隔日開始計算，而非提出當天。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">不遵守預告期會怎樣？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          如果雇主未依規定預告就解僱員工，必須額外給付「預告期間工資」作為補償。
          至於勞工自請離職未遵守預告期的情況，法律並沒有明確的罰則。
          但如果因此造成雇主損害，雇主理論上可以請求損害賠償，不過實務上較少發生。
          儘管如此，遵守預告期間仍是維持職場信譽的良好做法。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">預告期間可以請假嗎？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞基法第 16 條第 2 項規定，勞工在被雇主預告解僱的預告期間內，
          每週可以請兩天「謀職假」外出找工作，而且這段期間雇主照常給薪。
          但要注意的是，謀職假只適用於被雇主解僱的情況。
          如果是勞工自行辭職，則不能主張謀職假的權利。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">試用期離職需要預告嗎？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          台灣勞基法並未明文規定「試用期」，但不影響預告期間的適用。
          即使在所謂的試用期內，只要到職超過三個月，依法就需要十天的預告期間。
          未滿三個月者則不需預告，雙方都可以隨時終止勞動契約。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="離職預告期計算" path="/tools/notice-period" /></div>
      <FaqSection items={TOOL_FAQS["notice-period"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["notice-period"]}
        tools={TOOL_RELATED_TOOLS["notice-period"]}
      />
    </div>
  );
}
