import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "隱私權政策",
  description: "勞工權益站隱私權政策，說明本站如何收集、使用與保護您的個人資料。",
  keywords: ["隱私權政策", "隱私權", "個資保護"],
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[{ label: "首頁", href: "/" }, { label: "隱私權政策" }]}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        隱私權政策
      </h1>
      <p className="text-sm text-slate-400 mb-8">最後更新：2026 年 5 月 7 日</p>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            一、資料收集
          </h2>
          <p>
            本站使用 Google Analytics 4 (GA4)
            收集匿名的網站使用統計數據，包括瀏覽頁面、裝置類型、文章閱讀深度、工具開始/完成、分享與 CTA 點擊等事件，用以改善內容品質與使用者體驗。
          </p>
          <p className="mt-3">
            本站的計算工具在您的瀏覽器本地端執行，所有輸入的薪資、年資、到職日等敏感資料不會傳送至本站伺服器，也不會作為 GA4 事件參數送出。
            工具事件只記錄工具名稱、是否完成與互動類型。
          </p>
          <p className="mt-3">
            本站沒有會員系統，也不要求登入。若您透過 email 回報問題，信件中提供的頁面網址、問題描述與聯絡資訊只會用於處理該次回報。
            請避免寄送完整身分證字號、未遮蔽薪資單、醫療資料或公司內部機密。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            二、Cookies 使用
          </h2>
          <p>本站可能使用以下類型的 Cookies：</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>分析用 Cookies</strong> — Google Analytics
              用於收集匿名使用統計
            </li>
            <li>
              <strong>廣告用 Cookies</strong> — Google AdSense
              用於顯示相關廣告內容；本站不會要求或鼓勵使用者點擊廣告
            </li>
          </ul>
          <p className="mt-3">
            您可以透過瀏覽器設定停用 Cookies，但部分功能可能受到影響。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            三、本機資料與工具輸入
          </h2>
          <p>
            薪資、年資、工時、眷屬數、假別與離職日期等計算輸入，預設只在您的瀏覽器中處理。
            本站不會建立可識別個人的薪資資料庫，也不會把這些輸入作為廣告投放條件。
          </p>
          <p className="mt-3">
            若瀏覽器為了改善體驗暫存部分設定，例如最後使用的工具狀態，這些資料也會留在您的裝置端。
            您可以透過清除瀏覽器網站資料來移除本機暫存。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            四、第三方服務
          </h2>
          <p>本站使用以下第三方服務：</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Google Analytics 4</strong> — 網站流量分析（
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline underline-offset-2"
              >
                Google 隱私權政策
              </a>
              ）
            </li>
            <li>
              <strong>Google AdSense</strong> — 廣告服務（
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline underline-offset-2"
              >
                Google 廣告政策
              </a>
              ）
            </li>
          </ul>
          <p className="mt-3">
            這些第三方服務可能會透過 Cookies
            或類似技術收集資料，其隱私權政策請參閱上述連結。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            五、使用者權利
          </h2>
          <p>您享有以下權利：</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>透過瀏覽器設定控制或停用 Cookies</li>
            <li>
              使用{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline underline-offset-2"
              >
                Google Analytics 停用擴充功能
              </a>{" "}
              退出分析追蹤
            </li>
            <li>
              透過{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline underline-offset-2"
              >
                Google 廣告設定
              </a>{" "}
              管理個人化廣告偏好
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            六、資料保存與安全
          </h2>
          <p>
            本站會盡量以最少資料原則維護服務，只收集維持網站品質、分析使用情況與處理回報所必要的資料。
            若資料已不再需要，會以第三方服務提供的設定或一般信件管理方式保留、刪除或封存。
          </p>
          <p className="mt-3">
            網站透過 HTTPS 提供服務，並避免在前端程式碼、公開頁面或分析事件中放入個人敏感資訊。
            但網際網路傳輸仍無法保證絕對安全，請不要在回報表單或 email 中提供不必要的個資。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            七、政策更新
          </h2>
          <p>
            本隱私權政策可能不定期更新，更新後將於本頁公布最新版本。
            建議您定期查閱本頁以了解最新政策。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            八、聯繫方式
          </h2>
          <p>
            如對本站隱私權政策有任何疑問，歡迎來信{" "}
            <a href="mailto:sterio068@gmail.com" className="text-brand-600 underline underline-offset-2">
              sterio068@gmail.com
            </a>
            。
          </p>
        </section>
      </div>
    </div>
  );
}
