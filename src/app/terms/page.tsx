import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "服務條款",
  description: "勞工權益站服務條款，說明使用本站的相關規定與免責聲明。",
  keywords: ["服務條款", "使用條款", "免責聲明"],
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[{ label: "首頁", href: "/" }, { label: "服務條款" }]}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        服務條款
      </h1>
      <p className="text-sm text-slate-400 mb-8">最後更新：2026 年 4 月 7 日</p>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            一、內容免責聲明
          </h2>
          <p>
            本站提供的計算工具與文章內容僅供一般資訊參考用途，
            <strong className="text-slate-900">不構成法律建議、稅務建議或任何專業諮詢</strong>。
          </p>
          <p className="mt-3">
            雖然我們盡力確保內容的正確性，但勞動法規的解釋可能因個案情境、勞動契約內容、司法判決而有所不同。
            如您面臨具體的勞資爭議或法律問題，強烈建議諮詢專業律師或向各縣市勞動局尋求協助。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            二、資料正確性
          </h2>
          <p>
            本站的計算工具依據現行勞動基準法、勞工保險條例、全民健康保險法、勞工退休金條例等法規設計，
            並參照勞動部、勞保局、健保署公告之最新費率與級距表。
          </p>
          <p className="mt-3">
            然而，法規可能隨時修正，費率可能調整，我們無法保證所有資料在任何時間點都是完全正確且最新的。
            計算結果可能與實際金額有些微差異，僅供參考估算。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            三、使用條款
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              本站所有工具與文章均供個人非商業用途免費使用。
            </li>
            <li>
              您不得複製、修改、散布本站的原創內容用於商業目的，除非獲得書面授權。
            </li>
            <li>
              您不得利用自動化程式大量擷取本站內容或干擾網站正常運作。
            </li>
            <li>
              您透過本站計算工具所輸入的資料僅在您的瀏覽器本地端處理，本站不會收集或儲存您的個人薪資等敏感資料。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            四、責任限制
          </h2>
          <p>
            在法律允許的最大範圍內，本站及其營運者不對因使用或無法使用本站服務所導致的任何直接、間接、附帶、特殊或衍生性損害負責，
            包括但不限於因計算錯誤、資料過期或法規解釋差異所造成的損失。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            五、外部連結
          </h2>
          <p>
            本站可能包含指向其他網站的連結（如政府機關官網、法規資料庫等），
            這些外部網站的內容不在本站控制範圍內，我們不對其內容的正確性或可用性負責。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            六、條款修改
          </h2>
          <p>
            本站保留隨時修改本服務條款的權利。修改後的條款將於本頁公布，
            您繼續使用本站即表示同意修改後的條款。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            七、適用法律
          </h2>
          <p>
            本服務條款受中華民國法律管轄，如有爭議應以台灣台北地方法院為第一審管轄法院。
          </p>
        </section>
      </div>
    </div>
  );
}
