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
      <p className="text-sm text-slate-400 mb-8">最後更新：2026 年 4 月 7 日</p>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            一、資料收集
          </h2>
          <p>
            本站使用 Google Analytics 4 (GA4)
            收集匿名的網站使用統計數據，包括瀏覽頁面、停留時間、裝置類型等，用以改善網站內容與使用者體驗。
          </p>
          <p className="mt-3">
            本站的計算工具在您的瀏覽器本地端執行，所有輸入的薪資、年資等資料不會傳送至伺服器，也不會被儲存。
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
              用於顯示相關廣告內容
            </li>
          </ul>
          <p className="mt-3">
            您可以透過瀏覽器設定停用 Cookies，但部分功能可能受到影響。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            三、第三方服務
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
            四、使用者權利
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
            五、政策更新
          </h2>
          <p>
            本隱私權政策可能不定期更新，更新後將於本頁公布最新版本。
            建議您定期查閱本頁以了解最新政策。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            六、聯繫方式
          </h2>
          <p>
            如對本站隱私權政策有任何疑問，歡迎透過網站提供的聯繫管道與我們聯繫。
          </p>
        </section>
      </div>
    </div>
  );
}
