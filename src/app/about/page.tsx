import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "關於勞工權益站",
  description:
    "勞工權益站致力於幫助台灣勞工了解自己的權益，提供免費計算工具與法規解讀文章。",
  keywords: ["勞工權益站", "關於我們", "台灣勞工", "勞基法"],
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "關於" }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        關於勞工權益站
      </h1>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          我們的使命
        </h2>
        <p className="text-slate-700 leading-relaxed">
          勞工權益站的目標很簡單：幫助每一位台灣勞工了解自己的權益。
          太多人不清楚薪資單上每一項扣款的意義、不知道加班費該怎麼算、被資遣時不確定自己能拿到多少錢。
          我們希望透過免費的線上工具與白話文章，讓每個人都能輕鬆搞懂這些事。
        </p>
      </section>

      {/* What we provide */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          我們提供什麼
        </h2>
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <span>
              <strong className="text-slate-900">免費計算工具</strong> —
              薪資明細、加班費、資遣費、特休天數、勞健保保費、退休金試算等，依據最新法規即時計算。
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <span>
              <strong className="text-slate-900">權益解讀文章</strong> —
              白話解釋勞基法條文，搭配實際案例與計算範例，讓法規不再艱澀難懂。
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold">
              3
            </span>
            <span>
              <strong className="text-slate-900">即時更新</strong> —
              每年追蹤基本工資調整、費率變動等法規異動，確保工具與文章的數據正確。
            </span>
          </li>
        </ul>
      </section>

      {/* Data sources */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          資料來源
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          本站所有計算工具與文章內容均依據以下官方法規與資料：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>勞動基準法及其施行細則</li>
          <li>勞工保險條例</li>
          <li>全民健康保險法</li>
          <li>勞工退休金條例</li>
          <li>就業保險法</li>
          <li>勞動部及勞動部勞工保險局公告之費率與級距表</li>
          <li>衛生福利部中央健康保險署公告之保費費率</li>
        </ul>
      </section>

      {/* Editorial standards */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          編輯與更新原則
        </h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            勞工權益站的文章與工具以官方法規、主管機關公告及公開資料為主要依據。
            內容撰寫時會優先核對全國法規資料庫、勞動部、勞工保險局與健保署等來源，
            並在文章頁面列出相關參考資料，方便讀者自行查證。
          </p>
          <p>
            遇到基本工資、勞健保費率、投保級距或勞退規定調整時，我們會更新相關工具與文章。
            若讀者發現資料過期、計算異常或文字說明不清楚，歡迎來信提供頁面網址與問題描述。
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">
          免責聲明
        </h2>
        <p className="text-amber-800 leading-relaxed">
          本站提供的計算工具與文章內容僅供參考，不構成法律建議。
          每個人的勞動條件與契約內容不同，實際權益可能因個案而異。
          如有具體法律問題，建議諮詢專業律師或向各縣市勞動局洽詢。
        </p>
      </section>

      {/* Contact */}
      <section className="mt-10 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">聯絡我們</h2>
        <p className="text-slate-700 leading-relaxed">
          如有任何建議、勘誤回報或合作需求，歡迎來信{" "}
          <a href="mailto:sterio068@gmail.com" className="text-brand-600 font-semibold underline underline-offset-2">
            sterio068@gmail.com
          </a>
          。
        </p>
      </section>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center px-6 py-3 bg-brand-500 text-white font-bold rounded-[12px] hover:bg-brand-600 transition-colors shadow-md"
        >
          開始使用計算工具
        </Link>
      </div>
    </div>
  );
}
