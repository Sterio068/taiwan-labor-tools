import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { InsurancePremiumCalculator } from "@/components/tools/InsurancePremiumCalculator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "勞健保保費計算機：2026 最新費率",
  description:
    "輸入月薪與眷屬人數，依 2026 年勞保 11.5% 加就保 1%、健保 5.17% 計算勞工自付額、雇主負擔與政府補助，附級距規則與勞保局、健保署來源。",
  keywords: ["勞保自付額", "健保費計算", "勞保費率", "健保費率", "投保級距"],
  path: "/tools/insurance-premium",
});

export default function InsurancePremiumPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "勞健保保費計算機",
          description: "查詢投保級距，計算勞保與健保自付額",
          path: "/tools/insurance-premium",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["insurance-premium"])} />
      <JsonLd data={howToSchema({
        name: "如何計算勞健保保費自付額",
        description: "依 2026 年費率計算勞保與健保每月自付額",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪", text: "填入每月薪資，系統自動對應勞保、健保、勞退各自的投保級距" },
          { name: "選擇健保眷屬人數", text: "設定健保眷屬加保口數（最多 3 口），每增加 1 口眷屬，健保自付額等比增加" },
          { name: "查看三大費用明細", text: "系統顯示勞保自付額、健保自付額（含眷屬）、勞退雇主提繳，以及雇主負擔金額" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
          { name: "勞健保保費計算", url: `${SITE_URL}/tools/insurance-premium` },
        ])} />
      <ToolPageShell
        title="勞健保保費計算機"
        eyebrow="Insurance premium calculator"
        description="輸入月薪與眷屬人數，查投保級距、勞保自付額、健保自付額、雇主負擔與勞退提繳。"
        breadcrumbLabel="勞健保保費計算"
        facts={[
          { label: "勞保費率", value: "12.5%" },
          { label: "健保費率", value: "5.17%" },
          { label: "雇主勞退", value: "6%" },
        ]}
        nextSteps={[
          {
            label: "查投保級距",
            href: "/tools/insurance-bracket",
            description: "核對公司申報級距是否低報或高報。",
          },
          {
            label: "閱讀保險指南",
            href: "/guides/insurance",
            description: "理解勞保、健保、勞退與眷屬加保差異。",
          },
          {
            label: "檢查薪資明細",
            href: "/tools/salary",
            description: "把保費扣款放回實領薪資一起看。",
          },
        ]}
        faqItems={TOOL_FAQS["insurance-premium"]}
        relatedArticles={TOOL_RELATED_ARTICLES["insurance-premium"]}
        relatedTools={TOOL_RELATED_TOOLS["insurance-premium"]}
        shareTitle="勞健保保費計算機"
        sharePath="/tools/insurance-premium"
        article={<ToolExplainer slug="insurance-premium" />}
      >
        <InsurancePremiumCalculator />
      </ToolPageShell>
    </>
  );
}
