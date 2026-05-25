import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "聯絡與回饋｜資料勘誤、工具建議與合作洽詢",
  description:
    "聯絡勞工權益站，回報資料勘誤、工具計算問題、文章更新建議或合作需求。",
  keywords: ["聯絡我們", "勘誤回報", "工具建議", "勞工權益站"],
  path: "/contact",
});

export default function ContactPage() {
  const subject = encodeURIComponent("勞工權益站回饋");
  const body = encodeURIComponent("頁面網址：\n問題描述：\n參考來源：\n");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "聯絡與回饋" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
        聯絡與回饋
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        歡迎回報資料勘誤、工具計算問題、文章更新建議或合作需求。為了保護隱私，請避免在信件中提供完整身分證字號、公司內部機密或未遮蔽的薪資單。
      </p>

      <section className="rounded-[16px] border border-slate-200 bg-white p-5 md:p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">回報時請附上</h2>
        <ul className="space-y-2 text-slate-700">
          <li>• 相關頁面網址或工具名稱</li>
          <li>• 你看到的錯誤內容、計算差異或建議修改方向</li>
          <li>• 官方來源連結或可查證資料</li>
          <li>• 使用裝置與瀏覽器（若是工具錯誤）</li>
        </ul>
      </section>

      <section className="rounded-[16px] border border-slate-200 bg-white p-5 md:p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          我們會如何處理
        </h2>
        <div className="space-y-3 text-slate-700 leading-relaxed">
          <p>
            若回報涉及薪資、加班費、資遣費、勞健保、勞退或最低工資等核心工具，我們會優先核對
            <Link
              href="/sources"
              className="mx-1 font-semibold text-brand-700 underline underline-offset-2"
            >
              資料來源與更新紀錄
            </Link>
            中列出的官方資料，再檢查工具公式與頁面說明是否需要同步修正。
          </p>
          <p>
            若回報屬於個案諮詢，例如雇主是否違法、調解策略、契約條款效力或訴訟風險，本站無法代替律師或主管機關判斷。
            我們會盡量回覆可查證的公開資料方向，並提醒你向地方勞工局、法律扶助或專業律師確認。
          </p>
          <p>
            若是廣告版位、外部連結或頁面可用性問題，也歡迎附上截圖。本站不會要求使用者點擊廣告，也會避免廣告遮蔽工具、表單或重要導覽。
          </p>
        </div>
      </section>

      <section className="rounded-[16px] border border-amber-200 bg-amber-50 p-5 md:p-6 mb-8">
        <h2 className="text-xl font-bold text-amber-950 mb-3">
          回信與資料保護
        </h2>
        <p className="text-amber-900 leading-relaxed">
          來信只會用於處理你的回報或合作洽詢。請不要寄送完整身分證字號、完整薪資單、醫療資料、公司內部文件或任何未遮蔽個資。
          若需要說明案例，建議移除姓名、公司名稱、員工編號與可識別個人的資訊。
        </p>
      </section>

      <a
        href={`mailto:sterio068@gmail.com?subject=${subject}&body=${body}`}
        data-track="contact_email_clicked"
        data-track-label="聯絡信箱"
        className="inline-flex items-center justify-center rounded-[12px] bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600 transition-colors"
      >
        寄信給勞工權益站
      </a>
    </div>
  );
}
