import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LABOR_CONSTANTS } from "@/data/constants";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = buildPageMetadata({
  title: "薪資明細計算機：2026 實領薪水一秒算出",
  description:
    "輸入月薪，自動計算勞保、健保自付額、勞退提繳與實領金額。2026 最新費率，含雇主成本。",
  keywords: ["薪資計算", "實領薪水", "勞健保扣多少", "薪資明細", "薪水計算機"],
  path: "/tools/salary",
});

export default function SalaryPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "薪資明細計算機",
          description: "輸入月薪，自動計算勞保、健保自付額與實領金額",
          path: "/tools/salary",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["salary"])} />
      <JsonLd data={howToSchema({
        name: "如何計算每月實領薪資（勞健保扣款）",
        description: "依 2026 年費率，計算月薪扣除勞保、健保、勞退後的實領金額",
        totalTime: "PT2M",
        steps: [
          { name: "輸入月薪", text: "在計算機填入你的月薪（底薪加上各項固定津貼）" },
          { name: "選擇眷屬人數", text: "設定健保眷屬加保人數（配偶、直系親屬），影響健保自付額" },
          { name: "設定勞退自提比例", text: "若有自願提繳勞退，填入比例（0-6%）；不自提填 0" },
          { name: "查看扣款明細與實領金額", text: "系統自動顯示勞保自付額、健保自付額、勞退提繳及每月實領金額" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
          { name: "薪資明細計算機", url: `${SITE_URL}/tools/salary` },
        ])} />
      <ToolPageShell
        title="薪資明細計算機"
        eyebrow="Salary calculator"
        description="輸入每月薪資，先看實領金額，再核對勞保、健保、勞退與雇主成本。依 2026 年費率與投保級距估算。"
        breadcrumbLabel="薪資明細計算機"
        facts={[
          { label: "月薪基本工資", value: `$${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)}` },
          { label: "時薪基本工資", value: `$${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)}` },
          { label: "資料處理", value: "本機計算" },
        ]}
        nextSteps={[
          {
            label: "核對投保級距",
            href: "/tools/insurance-bracket",
            description: "確認薪資單上的勞保、健保級距是否合理。",
          },
          {
            label: "閱讀薪資指南",
            href: "/guides/salary",
            description: "看懂最低工資、扣款、薪資單與常見爭議。",
          },
          {
            label: "查官方來源",
            href: "/sources",
            description: "確認費率、級距與基本工資更新依據。",
          },
        ]}
        faqItems={TOOL_FAQS["salary"]}
        relatedArticles={TOOL_RELATED_ARTICLES["salary"]}
        relatedTools={TOOL_RELATED_TOOLS["salary"]}
        shareTitle="薪資明細計算機"
        sharePath="/tools/salary"
        article={
          <>
            <h2>薪資單上的扣款到底是什麼？</h2>
            <p>
              每月薪資單上通常會看到「勞保」「健保」「勞退」三筆扣款。這些不是公司多收你的錢，而是依法必須繳納的社會保險費用。
            </p>
            <h3>勞保自付額</h3>
            <p>
              勞保費率目前為 12.5%（含就業保險 1%），由勞工負擔 20%、雇主 70%、政府 10%。
              以投保薪資級距計算，不是直接用你的月薪乘以費率。
            </p>
            <h3>健保自付額</h3>
            <p>
              健保費率 5.17%，勞工負擔 30%、雇主 60%、政府 10%。
              如果有眷屬加保（最多計 3 口），你的自付額會隨眷屬人數等比增加。
            </p>
            <h3>勞退提繳</h3>
            <p>
              雇主每月必須提繳月薪 6% 到你的勞退個人帳戶，這筆錢不會從薪水扣除。
              你可以「自願提繳」最多 6%，自提部分可以從所得稅中扣除，具有節稅效果。
            </p>
            <h3>2026 年基本工資</h3>
            <p>
              2026 年起，月薪基本工資為 ${formatMoney(LABOR_CONSTANTS.minimumMonthlyWage)} 元，
              時薪基本工資為 ${formatMoney(LABOR_CONSTANTS.minimumHourlyWage)} 元。
            </p>
          </>
        }
      >
        <SalaryCalculator />
      </ToolPageShell>
    </>
  );
}
