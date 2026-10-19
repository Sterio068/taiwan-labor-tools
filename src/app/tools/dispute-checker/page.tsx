import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { DisputeChecker } from "@/components/tools/DisputeChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞資爭議檢查器 — 遇到勞資糾紛怎麼辦？",
  description:
    "選擇勞資爭議類型，立即查看適用法條、雇主義務與勞工可採取的行動。涵蓋薪資、加班、資遣、休假、保險五大類。",
  keywords: [
    "勞資爭議",
    "勞資糾紛",
    "勞動檢查",
    "勞工申訴",
    "勞資調解",
    "1955",
    "欠薪",
    "資遣",
  ],
  path: "/tools/dispute-checker",
});

export default function DisputeCheckerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "勞資爭議檢查器",
          description: "查詢勞資爭議適用法條與處理方式",
          path: "/tools/dispute-checker",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["dispute-checker"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何使用勞資爭議檢查器",
        totalTime: "PT3M",
        steps: [
          { name: "選擇爭議類型", text: "從欠薪、資遣、加班費未付、違法解僱等類型中選擇" },
          { name: "填入爭議相關資訊", text: "說明具體情況，例如金額、時間、事件經過" },
          { name: "查看申訴流程與法律依據", text: "系統說明適用法條、申訴管道（勞動局/法院）與注意時效" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "勞資爭議檢查器", url: `${SITE_URL}/tools/dispute-checker` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "勞資爭議檢查器" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        勞資爭議檢查器
      </h1>
      <p className="text-slate-500 mb-8">
        選擇你遇到的勞資爭議類型，查看相關法條與建議行動。
      </p>

      <DisputeChecker />

      <AdBanner slot="tool-result" />

      <article className="mt-12 longform max-w-none">
        <ToolExplainer slug="dispute-checker" />
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="勞資爭議檢查器" path="/tools/dispute-checker" /></div>
      <FaqSection items={TOOL_FAQS["dispute-checker"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["dispute-checker"]}
        tools={TOOL_RELATED_TOOLS["dispute-checker"]}
      />
    </div>
  );
}
