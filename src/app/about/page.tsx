import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getIndexableArticles } from "@/lib/articles";
import { TOOLS } from "@/data/constants";
import { DATA_UPDATE_LOG } from "@/data/official-sources";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "關於勞工權益站：誰在整理、內容怎麼查核",
  description:
    "勞工權益站由 SterioCheng 個人整理維護，依法規條文與勞動部、勞保局、健保署公告製作薪資、加班費、資遣費、特休與勞健保的計算工具和說明文章。這裡說明內容怎麼查核、怎麼更新，以及本站不是什麼。",
  keywords: ["勞工權益站", "關於我們", "SterioCheng", "編輯政策", "勞基法"],
  path: "/about",
});

const CHECK_STEPS = [
  {
    title: "從法條與公告開始",
    text: "每個數字都要找到出處：全國法規資料庫的條文、勞動部的公告與問答、勞保局與健保署的分級表。找不到官方出處的說法，不寫進文章。",
  },
  {
    title: "用官方範例驗算工具",
    text: "計算工具的公式寫成程式後，會拿主管機關公布的算例做測試，例如臺中市勞工局休息日加班的範例（時薪 150 元出勤 1、6、10 小時分別加給 200、1,400、2,700 元），結果不一致就不上線。",
  },
  {
    title: "文章裡的金額由工具產生",
    text: "文章中的金額對照表與試算範例，用與計算工具相同的算法產生並互相核對，避免文章和工具算出不同答案。",
  },
  {
    title: "標出查核日期與來源",
    text: "每篇文章列出發布日期、最後查核日期與參考的法條或公告；費率、級距或最低工資調整時，先更新工具，再更新受影響的文章。",
  },
];

export default function AboutPage() {
  const articleCount = getIndexableArticles().length;
  const recentUpdates = DATA_UPDATE_LOG.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "關於" }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">關於勞工權益站</h1>

      <section className="mb-10 space-y-4 text-slate-700 leading-relaxed">
        <p>
          勞工權益站是一個免費的台灣勞工權益工具站，目前有 {TOOLS.length} 個計算工具與 {articleCount}{" "}
          篇說明文章，主題涵蓋薪資與實領、加班費、特休與請假、資遣與離職、勞健保、勞退，以及勞資爭議的處理流程。
        </p>
        <p>
          很多勞動問題卡在「規定看得懂，但不知道自己的情況該怎麼算」。所以這裡的做法是：每個主題都配一個能輸入自己數字的工具，再用一篇文章把法條、算法、例外情況和下一步寫清楚。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">誰在整理這個網站</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            本站由 <strong className="text-slate-900">SterioCheng</strong> 個人整理與維護。SterioCheng
            是獨立開發者，網站的程式、計算工具和文章都由他撰寫與維護。
          </p>
          <p>
            SterioCheng 不是律師，也沒有勞動法相關的專業證照。本站的價值不在於提供法律意見，而在於把散在法規資料庫、勞動部問答和各種分級表裡的規則整理成可以直接核對的工具與說明，並清楚標出每一項的出處，讓你可以自己回到原始資料確認。
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">內容怎麼查核</h2>
        <ol className="space-y-3">
          {CHECK_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3 rounded-[12px] border border-slate-200 bg-surface p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-slate-700 leading-relaxed">
          完整的查核原則、勘誤處理與廣告揭露寫在
          <Link href="/editorial-policy" className="mx-1 font-semibold text-brand-600 underline underline-offset-2">
            編輯政策
          </Link>
          ，所有官方來源與查核日期列在
          <Link href="/sources" className="mx-1 font-semibold text-brand-600 underline underline-offset-2">
            資料來源與更新紀錄
          </Link>
          。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">最近的修正</h2>
        <p className="mb-4 text-slate-700 leading-relaxed">
          發現錯誤就公開修正。以下是最近幾次的更新，完整紀錄在資料來源頁：
        </p>
        <ul className="space-y-3">
          {recentUpdates.map((record) => (
            <li key={record.date} className="rounded-[12px] border border-slate-200 bg-surface p-4">
              <p className="text-sm font-semibold text-slate-900">
                <time dateTime={record.date}>{record.date.replaceAll("-", "/")}</time>　{record.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{record.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">本站不是官方機關</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            本站不隸屬勞動部、勞保局、健保署、地方勞工局或任何政府機關，內容不代表主管機關的正式見解。
          </p>
          <p>
            正在處理資遣、欠薪、職災、職場霸凌、競業禁止等具體爭議時，請把本站當成整理問題、準備資料的起點；實際主張權利前，建議向地方勞工局、勞動部 1955 專線、法律扶助基金會、工會或律師確認你的情況。
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">廣告</h2>
        <p className="text-slate-700 leading-relaxed">
          本站可能顯示 Google AdSense 廣告。廣告與工具按鈕、表單保持距離，不影響任何計算結果，也不會引導或鼓勵你與廣告互動。
        </p>
      </section>

      <section className="mb-10 rounded-[12px] border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">免責聲明</h2>
        <p className="text-amber-800 leading-relaxed">
          本站的計算工具與文章僅供參考，不構成法律、稅務或財務建議。每個人的勞動契約、公司規章與實際情況不同，權利義務仍以法規、主管機關最新公告與個案事實為準。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">聯絡與勘誤</h2>
        <p className="text-slate-700 leading-relaxed">
          發現數字過期、計算有誤或說明不清楚，請到
          <Link href="/contact" className="mx-1 font-semibold text-brand-600 underline underline-offset-2">
            聯絡與回饋頁
          </Link>
          或來信{" "}
          <a href="mailto:sterio068@gmail.com" className="font-semibold text-brand-600 underline underline-offset-2">
            sterio068@gmail.com
          </a>
          ，附上頁面網址和你看到的官方資料，會優先處理影響金額判斷的問題。
        </p>
      </section>

      <div className="mt-10 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center rounded-[12px] bg-brand-500 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-brand-600"
        >
          開始使用計算工具
        </Link>
      </div>
    </div>
  );
}
