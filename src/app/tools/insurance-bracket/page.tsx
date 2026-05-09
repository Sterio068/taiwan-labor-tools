import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema, faqSchema, howToSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { InsuranceBracketLookup } from "@/components/tools/InsuranceBracketLookup";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { TOOL_RELATED_ARTICLES, TOOL_RELATED_TOOLS } from "@/data/tool-related";

export const metadata: Metadata = buildPageMetadata({
  title: "投保級距查詢 — 2026 勞保/健保/勞退級距表",
  description:
    "輸入月薪，一次查出勞保投保級距、健保投保級距與勞退提繳級距。附完整級距對照表，2026 最新資料。",
  keywords: ["勞保級距表", "投保級距", "健保級距", "勞退級距", "投保薪資分級表"],
  path: "/tools/insurance-bracket",
});

export default function InsuranceBracketPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: "投保級距查詢",
          description: "輸入月薪，查出勞保、健保與勞退投保級距",
          path: "/tools/insurance-bracket",
        })}
      />
      <JsonLd data={faqSchema(TOOL_FAQS["insurance-bracket"])} />
      <JsonLd data={howToSchema({
        description: "",
        name: "如何查詢勞健保投保薪資級距",
        totalTime: "PT1M",
        steps: [
          { name: "輸入月薪", text: "填入你的月薪（底薪加各項固定津貼）" },
          { name: "查看投保薪資級距", text: "系統自動找到對應的勞保、健保、勞退投保薪資級距" },
          { name: "對照實際扣款金額", text: "顯示三種保險的級距金額與對應的勞工自付保費" },
        ],
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "首頁", url: SITE_URL },
        { name: "計算工具", url: `${SITE_URL}/tools` },
        { name: "投保薪資級距查詢", url: `${SITE_URL}/tools/insurance-bracket` },
      ])} />
      <Breadcrumb jsonLd={false}
        items={[
          { label: "首頁", href: "/" },
          { label: "計算工具", href: "/tools" },
          { label: "投保級距查詢" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        投保級距查詢
      </h1>
      <p className="text-slate-500 mb-8">
        輸入每月薪資，一次查出勞保、健保、勞退三種投保級距，並提供完整級距對照表。2026 年最新資料。
      </p>

      <InsuranceBracketLookup />

      <AdBanner slot="tool-result" />

      {/* SEO 長文 */}
      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">投保級距是什麼？為什麼和月薪不同？</h2>
        <p className="text-slate-700 leading-relaxed my-4">
          在台灣，勞保、健保和勞退的保費計算並非直接以你的實際月薪為基礎，
          而是依照政府公布的「投保薪資分級表」，找到大於或等於你月薪的最近一級。
          這個級距金額就是計算保費的基礎。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">三種級距表有什麼不同？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞保投保薪資級距目前分為 11 級，最低為基本工資 $29,500，最高為 $45,800。
          健保投保金額級距則有 45 級，最高可達 $219,500。
          勞退月提繳分級表最為細緻，共有 61 級，最低 $1,500，最高 $150,000。
          三張表各自獨立，適用的級距金額可能不同。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">雇主低報投保級距怎麼辦？</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          依法，雇主應以員工實際月薪資總額（含底薪、獎金、津貼等經常性給與）申報投保級距。
          如果雇主以低於實際薪資的金額投保，除了影響你的勞保給付（傷病、生育、失業給付等），
          也會減少勞退帳戶的雇主提繳金額，長期下來會嚴重影響退休保障。
          勞工可向勞保局檢舉，雇主將被處以罰鍰並追繳差額。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">投保級距對勞保給付的影響</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          勞保各項給付（如老年給付、失能給付、傷病給付）都是依投保薪資來計算。
          投保級距越高，未來能請領的給付金額也越高。
          這也是為什麼確認雇主有按實際薪資申報投保，對勞工權益非常重要。
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">2026 年級距表更新重點</h3>
        <p className="text-slate-700 leading-relaxed my-4">
          隨著基本工資調整為 $29,500，投保級距表的最低一級也同步調高。
          所有受僱勞工的投保薪資不得低於基本工資。
          如果你的月薪剛好等於或略高於某一級距，差一塊錢就可能跳到下一級，保費也會隨之增加。
        </p>
      </article>

      <AdBanner slot="tool-bottom" />

      <div className="mt-8"><ShareButtons title="投保級距查詢" path="/tools/insurance-bracket" /></div>
      <FaqSection items={TOOL_FAQS["insurance-bracket"]} />
      <RelatedLinks
        articles={TOOL_RELATED_ARTICLES["insurance-bracket"]}
        tools={TOOL_RELATED_TOOLS["insurance-bracket"]}
      />
    </div>
  );
}
