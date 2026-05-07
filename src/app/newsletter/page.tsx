import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益更新提醒｜每月回訪入口",
  description:
    "訂閱勞工權益站更新提醒，掌握基本工資、勞健保費率、特休、資遣與勞資爭議工具更新。",
  keywords: ["勞工權益更新", "newsletter", "勞基法更新", "基本工資"],
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "更新提醒" }]} />
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          勞工權益更新提醒
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          掌握基本工資、勞健保費率、勞退、特休與熱門工具更新。本站目前以信件開啟訂閱意願，不在網站伺服器儲存你的 email。
        </p>
      </header>
      <NewsletterSignup />
      <section className="mt-10 rounded-[16px] border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">也可以先收藏這些入口</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/sources" className="rounded-[12px] bg-slate-50 px-4 py-3 font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
            更新紀錄
          </Link>
          <Link href="/checklists" className="rounded-[12px] bg-slate-50 px-4 py-3 font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
            權益檢查表
          </Link>
          <Link href="/guides" className="rounded-[12px] bg-slate-50 px-4 py-3 font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
            六大指南
          </Link>
        </div>
      </section>
    </div>
  );
}
