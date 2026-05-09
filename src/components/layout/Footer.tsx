import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-100 pb-24 text-slate-700 md:pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 rounded-[22px] border border-slate-200 bg-surface p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            Compliance
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            本站提供勞工權益工具與資料整理，內容僅供參考，不構成法律建議。廣告不影響工具計算，也不會要求或暗示使用者點擊廣告。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xl font-extrabold text-slate-950">
              <svg className="h-6 w-6 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>勞工權益站</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              台灣勞工的免費權益計算工具與勞動法規知識，幫你算清楚每一筆錢。
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-slate-950">計算工具</h3>
            <ul className="columns-2 gap-x-6 space-y-2 text-sm text-slate-600">
              <li><Link href="/tools/salary" className="hover:text-brand-700">薪資明細</Link></li>
              <li><Link href="/tools/overtime" className="hover:text-brand-700">加班費</Link></li>
              <li><Link href="/tools/severance" className="hover:text-brand-700">資遣費</Link></li>
              <li><Link href="/tools/annual-leave" className="hover:text-brand-700">特休天數</Link></li>
              <li><Link href="/tools/insurance-premium" className="hover:text-brand-700">勞健保費</Link></li>
              <li><Link href="/tools/pension" className="hover:text-brand-700">退休金試算</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-slate-950">關於</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-brand-700">關於我們</Link></li>
              <li><Link href="/sources" className="hover:text-brand-700">資料來源與更新紀錄</Link></li>
              <li><Link href="/contact" className="hover:text-brand-700">聯絡與回饋</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-700">隱私權政策</Link></li>
              <li><Link href="/terms" className="hover:text-brand-700">服務條款</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-slate-950">成長入口</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/articles" className="hover:text-brand-700">權益文章</Link></li>
              <li><Link href="/guides" className="hover:text-brand-700">六大指南</Link></li>
              <li><Link href="/checklists" className="hover:text-brand-700">權益檢查表</Link></li>
              <li><Link href="/newsletter" className="hover:text-brand-700">更新提醒</Link></li>
              <li><Link href="/growth-dashboard" className="hover:text-brand-700">成效追蹤說明</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} 勞工權益站 · 本站內容僅供參考，不構成法律建議
          </p>
          <div className="flex gap-4">
            <a href="mailto:sterio068@gmail.com" className="hover:text-brand-700">聯絡我們</a>
            <Link href="/privacy" className="hover:text-brand-700">隱私權政策</Link>
            <Link href="/terms" className="hover:text-brand-700">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
