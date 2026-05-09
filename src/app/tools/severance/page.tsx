import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeveranceCalculator } from "@/components/tools/SeveranceCalculator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "資遣費計算機：新制舊制一次算清楚",
  description:
    "輸入年資與平均月薪，立即計算新制或舊制資遣費。依據勞基法第 17 條與勞工退休金條例第 12 條。",
  keywords: ["資遣費計算", "資遣費多少", "新制資遣費", "舊制資遣費", "被資遣"],
  path: "/tools/severance",
});

export default function SeverancePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "資遣費計算機",
          description: "計算新制或舊制資遣費",
          path: "/tools/severance",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["severance"])} />
      <JsonLd data={howToSchema({
        name: "如何計算資遣費（新制/舊制）",
        description: "依勞基法第 17 條計算勞工應得的資遣費",
        totalTime: "PT2M",
        steps: [
          { name: "選擇適用制度", text: "2005 年 7 月 1 日後到職者適用新制；之前到職且未選新制者適用舊制" },
          { name: "輸入年資", text: "填入服務年數與月份，計算機會依未滿 1 年比例估算" },
          { name: "輸入平均工資", text: "填入離職前 6 個月工資總額除以日數乘以 30 的月平均工資" },
          { name: "查看資遣費金額", text: "新制：每滿 1 年 0.5 個月，上限 6 個月；舊制：每滿 1 年 1 個月" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
          { name: "資遣費計算機", url: `${SITE_URL}/tools/severance` },
        ])} />
      <ToolPageShell
        title="資遣費計算機"
        eyebrow="Severance calculator"
        description="輸入適用制度、年資與平均工資，先算應領資遣費，再整理非自願離職、預告工資與失業給付下一步。"
        breadcrumbLabel="資遣費計算機"
        facts={[
          { label: "新制基數", value: "每年 0.5 月" },
          { label: "新制上限", value: "6 個月" },
          { label: "計算基準", value: "平均工資" },
        ]}
        nextSteps={[
          {
            label: "確認離職預告期",
            href: "/tools/notice-period",
            description: "檢查雇主是否還需給預告工資。",
          },
          {
            label: "閱讀被資遣流程",
            href: "/articles/fired-what-to-do",
            description: "整理非自願離職證明、交接與請領資料。",
          },
          {
            label: "查失業給付",
            href: "/articles/unemployment-benefits",
            description: "確認資格、金額、期限與申請文件。",
          },
        ]}
        faqItems={TOOL_FAQS["severance"]}
        relatedArticles={TOOL_RELATED_ARTICLES["severance"]}
        relatedTools={TOOL_RELATED_TOOLS["severance"]}
        shareTitle="資遣費計算機"
        sharePath="/tools/severance"
        article={
          <>
            <h2>新制 vs 舊制資遣費</h2>
            <p>
              2005 年 7 月 1 日以後到職的勞工適用「新制」。之前就在職的勞工，94 年 7 月 1 日之前的年資適用舊制，之後的年資適用新制。
            </p>
            <h3>新制資遣費</h3>
            <p>
              每滿 1 年發給 0.5 個月平均工資，未滿 1 年以比例計算。上限 6 個月平均工資。
            </p>
            <h3>舊制資遣費</h3>
            <p>
              每滿 1 年發給 1 個月平均工資，不滿 1 年以比例計算。沒有上限。
            </p>
            <h3>平均工資怎麼算？</h3>
            <p>
              資遣費的「平均工資」是指離職前 6 個月的工資總額除以該期間的總日數，再乘以 30。
              包含本薪、加班費、獎金等經常性給與。
            </p>
          </>
        }
      >
        <SeveranceCalculator />
      </ToolPageShell>
    </>
  );
}
