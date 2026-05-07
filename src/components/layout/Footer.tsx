import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-100 pb-24 md:pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <svg className="w-6 h-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>勞工權益站</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              台灣勞工的免費權益計算工具與勞動法規知識，幫你算清楚每一筆錢。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-slate-100">計算工具</h3>
            <ul className="columns-2 gap-x-6 space-y-2 text-sm text-slate-400">
              <li><Link href="/tools/salary" className="hover:text-slate-100">薪資明細</Link></li>
              <li><Link href="/tools/overtime" className="hover:text-slate-100">加班費</Link></li>
              <li><Link href="/tools/severance" className="hover:text-slate-100">資遣費</Link></li>
              <li><Link href="/tools/annual-leave" className="hover:text-slate-100">特休天數</Link></li>
              <li><Link href="/tools/insurance-premium" className="hover:text-slate-100">勞健保費</Link></li>
              <li><Link href="/tools/pension" className="hover:text-slate-100">退休金試算</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-slate-100">關於</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-slate-100">關於我們</Link></li>
              <li><Link href="/sources" className="hover:text-slate-100">資料來源與更新紀錄</Link></li>
              <li><Link href="/contact" className="hover:text-slate-100">聯絡與回饋</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-100">隱私權政策</Link></li>
              <li><Link href="/terms" className="hover:text-slate-100">服務條款</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-slate-100">成長入口</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/articles" className="hover:text-slate-100">權益文章</Link></li>
              <li><Link href="/guides" className="hover:text-slate-100">六大指南</Link></li>
              <li><Link href="/checklists" className="hover:text-slate-100">權益檢查表</Link></li>
              <li><Link href="/newsletter" className="hover:text-slate-100">更新提醒</Link></li>
              <li><Link href="/growth-dashboard" className="hover:text-slate-100">成效追蹤說明</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-700 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} 勞工權益站 · 本站內容僅供參考，不構成法律建議
          </p>
          <div className="flex gap-4">
            <a href="mailto:sterio068@gmail.com" className="hover:text-slate-100">聯絡我們</a>
            <Link href="/privacy" className="hover:text-slate-100">隱私權政策</Link>
            <Link href="/terms" className="hover:text-slate-100">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
