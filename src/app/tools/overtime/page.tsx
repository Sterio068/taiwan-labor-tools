import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { OvertimeCalculator } from "@/components/tools/OvertimeCalculator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "加班費計算機：2026 最新勞基法",
  description:
    "輸入月薪和加班時數，立即算出平日、休息日、國定假日加班費。依據勞基法第 24 條。",
  keywords: ["加班費計算", "加班費怎麼算", "平日加班", "休息日加班費", "國定假日加班"],
  path: "/tools/overtime",
});

export default function OvertimePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "加班費計算機",
          description: "計算平日、休息日、國定假日加班費",
          path: "/tools/overtime",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["overtime"])} />
      <JsonLd data={howToSchema({
        name: "如何計算加班費（平日/休息日/國定假日）",
        description: "依勞基法第 24 條計算各類型加班費",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪或時薪", text: "填入你的月薪（月薪制）或時薪（時薪制），計算機自動換算時薪基準" },
          { name: "選擇加班類型", text: "選擇平日加班、休息日加班或國定假日/例假日加班，各類型倍率不同" },
          { name: "輸入加班時數", text: "填入本次加班的實際時數（休息日以 4/8/12 小時級距計算）" },
          { name: "查看加班費金額", text: "系統顯示加班費金額與計算明細，可複製或分享" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
          { name: "加班費計算機", url: `${SITE_URL}/tools/overtime` },
        ])} />
      <ToolPageShell
        title="加班費計算機"
        eyebrow="Overtime calculator"
        description="輸入月薪、加班時數與出勤類型，先算應領加班費，再核對倍率、上限與例假日限制。"
        breadcrumbLabel="加班費計算機"
        facts={[
          { label: "主要依據", value: "勞基法第 24 條" },
          { label: "平日前 2 小時", value: "1.34 倍" },
          { label: "平日第 3 至 4 小時", value: "1.67 倍" },
        ]}
        nextSteps={[
          {
            label: "看加班費圖解",
            href: "/articles/overtime-pay-guide",
            description: "用案例理解平日、休息日、國定假日差異。",
          },
          {
            label: "查特休與工時",
            href: "/tools/annual-leave",
            description: "把加班、休假與年資一起核對。",
          },
          {
            label: "閱讀加班指南",
            href: "/guides/overtime",
            description: "整理工時限制、補休與常見爭議。",
          },
        ]}
        faqItems={TOOL_FAQS["overtime"]}
        relatedArticles={TOOL_RELATED_ARTICLES["overtime"]}
        relatedTools={TOOL_RELATED_TOOLS["overtime"]}
        shareTitle="加班費計算機"
        sharePath="/tools/overtime"
        article={
          <>
            <h2>加班費怎麼算？</h2>
            <p>
              月薪制勞工的加班費時薪基數 = 月薪 ÷ 30 ÷ 8。
              依據勞基法第 24 條，不同加班類型有不同的倍率。
            </p>
            <h3>平日加班</h3>
            <p>
              前 2 小時：時薪基數 × 1⅓ 倍。第 3 至 4 小時：時薪基數 × 1⅔ 倍。每日加班上限 4 小時。
            </p>
            <h3>休息日加班</h3>
            <p>
              倍率與平日相同，但工時計算不同：前 2 小時以 4 小時計，超過 4 小時以 8 小時計，超過 8 小時以 12 小時計。
            </p>
            <h3>國定假日 / 例假日加班</h3>
            <p>
              國定假日加班，雇主除了當日工資照給外，需另外加倍發給（等於拿 2 倍日薪）。
              例假日原則上不得加班，如遇天災、事變始得加班。
            </p>
          </>
        }
      >
        <OvertimeCalculator />
      </ToolPageShell>
    </>
  );
}
