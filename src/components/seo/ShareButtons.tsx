"use client";

import { useState } from "react";

interface Props {
  title: string;
  /** 相對路徑，例如 /tools/salary */
  path: string;
}

const SITE_URL = "https://twlabor.org";

export function ShareButtons({ title, path }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-500 mr-1">分享：</span>

      {/* LINE */}
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#06C755] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        aria-label="分享到 LINE"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.365 9.89c.50 0 .91.41.91.91 0 .5-.41.909-.91.909h-2.543v1.634h2.543c.5 0 .91.41.91.909 0 .5-.41.91-.91.91h-3.452a.91.91 0 01-.909-.91v-7.09c0-.5.41-.91.91-.91h3.452c.499 0 .909.41.909.91 0 .5-.41.909-.91.909h-2.542V9.89h2.542zm-5.452 4.362c0 .39-.25.737-.623.861a.935.935 0 01-.288.047.886.886 0 01-.736-.367l-3.535-4.81v4.272c0 .5-.408.91-.91.91-.5 0-.909-.41-.909-.91v-7.09c0-.39.25-.737.621-.86.092-.033.19-.048.287-.048.283 0 .561.139.736.366l3.536 4.812V7.184c0-.5.41-.91.91-.91.499 0 .91.41.91.91v7.068zm-8.005 0c0 .5-.41.91-.91.91-.499 0-.909-.41-.909-.91v-7.09c0-.5.41-.91.91-.91.5 0 .909.41.909.91v7.09zm-2.72 0c0 .5-.41.91-.91.91H-.728a.913.913 0 01-.909-.91v-7.09c0-.5.41-.91.91-.91.499 0 .909.41.909.91v6.182h2.089c.5 0 .91.41.91.909M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
        LINE
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        aria-label="分享到 Facebook"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-900 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        aria-label="分享到 X"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
        aria-label="複製連結"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-accent-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            已複製
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            複製連結
          </>
        )}
      </button>
    </div>
  );
}
