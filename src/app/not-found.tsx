import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-brand-500 mb-4">404</h1>
      <p className="text-xl text-slate-700 mb-8">找不到這個頁面</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-brand-500 text-white font-semibold rounded-[12px] hover:bg-brand-600 transition-colors"
      >
        回首頁
      </Link>
    </div>
  );
}
