import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "編輯政策｜資料查核、廣告揭露與內容更新原則",
  description:
    "說明勞工權益站如何查核官方來源、維護計算工具、處理勘誤回報、標示廣告，以及避免誤導性或低價值內容。",
  keywords: ["編輯政策", "資料查核", "廣告揭露", "AdSense", "勞工權益站"],
  path: "/editorial-policy",
});

const REVIEW_STEPS = [
  "先確認主題是否屬於薪資、工時、假別、資遣、勞健保、勞退或勞資爭議等勞工實務範圍。",
  "再回到官方法規、主管機關公告或公開說明頁核對數字、公式與適用條件。",
  "最後把計算限制、個案差異與下一步行動寫在頁面中，避免讓工具結果看起來像保證結論。",
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "首頁", url: SITE_URL },
          { name: "編輯政策", url: `${SITE_URL}/editorial-policy` },
        ])}
      />
      <Breadcrumb
        jsonLd={false}
        items={[{ label: "首頁", href: "/" }, { label: "編輯政策" }]}
      />

      <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
        Editorial Policy
      </p>
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
        編輯政策、資料查核與廣告揭露
      </h1>
      <p className="mb-8 text-sm text-slate-500">最後更新：2026 年 5 月 25 日</p>

      <div className="space-y-9 text-slate-700">
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-950">本站定位</h2>
          <p className="leading-8">
            勞工權益站是民間整理的免費勞工權益工具站，不代表勞動部、勞保局、健保署、地方勞工局或任何政府機關。
            本站的目標是把常見薪資、加班費、資遣費、特休、勞健保與勞退問題整理成可查證、可計算、可採取下一步的資訊。
          </p>
          <p className="mt-3 leading-8">
            內容以台灣勞工與一般上班族為主要讀者，盡量用白話說明規則、公式與例外情況。
            若使用者面臨具體勞資爭議、解僱、職災或契約問題，本站會提醒尋求地方主管機關、律師或專業顧問協助。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-950">查核流程</h2>
          <ol className="space-y-3">
            {REVIEW_STEPS.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                  {index + 1}
                </span>
                <span className="leading-8">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 leading-8">
            核心資料會集中列在
            <Link
              href="/sources"
              className="mx-1 font-semibold text-brand-700 underline underline-offset-2"
            >
              資料來源與更新紀錄
            </Link>
            ，包含最低工資、勞保投保薪資級距、健保投保金額級距、勞退月提繳工資級距與主要法規來源。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-950">工具與文章如何維護</h2>
          <div className="space-y-3 leading-8">
            <p>
              工具頁會盡量揭露公式、輸入限制、適用情境與資料版本。例如薪資工具會說明勞保、健保、勞退與所得稅估算的取值方式；
              加班費工具會標示平日、休息日、例假與國定假日的差異。
            </p>
            <p>
              文章頁會優先回答一個具體問題，並提供案例、下一步行動、相關工具與官方來源連結。
              我們避免只改寫法條或堆疊泛用文字，也不把未查證的社群說法當作事實。
            </p>
            <p>
              當法規、費率或官方表格更新時，會優先更新工具邏輯、資料來源頁、FAQ 與高流量文章。
              若某個頁面暫時無法即時更新，頁面內容仍會提醒使用者以主管機關最新公告為準。
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-950">廣告與商業揭露</h2>
          <div className="space-y-3 leading-8">
            <p>
              本站可能使用 Google AdSense 顯示廣告。廣告區塊會與主要工具按鈕、表單、導覽與下載操作保持距離，
              並避免讓使用者誤以為廣告是本站功能、官方服務或勞工補助入口。
            </p>
            <p>
              本站不會要求、暗示、交換、誘導或鼓勵任何人點擊廣告，也不會為了增加廣告曝光而故意把內容拆得過碎。
              廣告內容由第三方系統提供，不代表本站推薦該商品、服務或外部網站。
            </p>
            <p>
              若未來出現合作內容、聯盟連結或贊助內容，會在該頁面明確揭露，不與一般編輯內容混淆。
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-950">勘誤、申訴與更新請求</h2>
          <p className="leading-8">
            如果你發現工具計算不合理、文章描述過期、官方來源失效或廣告位置影響閱讀，請到
            <Link
              href="/contact"
              className="mx-1 font-semibold text-brand-700 underline underline-offset-2"
            >
              聯絡與回饋
            </Link>
            提供頁面網址、問題描述、你看到的官方來源或截圖資訊。我們會優先處理會影響薪資、加班費、資遣費、保費與勞退判斷的問題。
          </p>
        </section>

        <section className="rounded-[18px] border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-3 text-xl font-bold text-amber-950">重要提醒</h2>
          <p className="leading-8 text-amber-900">
            本站內容僅供一般資訊與自我檢查使用，不構成法律、稅務或財務建議。
            實際權利義務仍可能因勞動契約、公司規章、工時紀錄、地方主管機關見解與法院判決而不同。
          </p>
        </section>
      </div>
    </div>
  );
}
