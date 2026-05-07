import type { Metadata } from "next";
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
