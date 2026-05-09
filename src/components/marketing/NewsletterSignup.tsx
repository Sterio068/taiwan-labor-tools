"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  compact?: boolean;
}

export function NewsletterSignup({ compact = false }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subject = encodeURIComponent("訂閱勞工權益站更新");
  const body = encodeURIComponent(
    `我想訂閱 twlabor.org 的勞工權益更新。\n\n訂閱信箱：${email || "請填入你的 Email"}`
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("newsletter_intent_submitted", {
      method: "mailto",
      has_email: email.includes("@"),
    });
    setSent(true);
    window.location.href = `mailto:sterio068@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className={compact ? "" : "rounded-[22px] border border-brand-100 bg-brand-50 p-6"}>
      <div className={compact ? "space-y-3" : "grid gap-5 md:grid-cols-[1fr_auto] md:items-center"}>
        <div>
          <p className="text-sm font-semibold text-brand-700">回訪入口</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            訂閱勞權更新與年度費率提醒
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            每次最低工資、勞健保級距或重要工具更新時，整理成一封短信提醒。
            目前採 mailto 訂閱雛形，不會在網站端儲存你的 Email。
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="min-h-11 rounded-[10px] border border-slate-300 bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            data-track="newsletter_cta_clicked"
            className="min-h-11 rounded-[10px] bg-brand-600 px-4 text-sm font-bold text-surface transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          >
            開啟訂閱信
          </button>
        </form>
      </div>
      {sent && (
        <p className="mt-3 text-xs text-brand-700">
          已開啟郵件草稿；送出後才算完成訂閱。網站不會保存你輸入的 Email。
        </p>
      )}
    </section>
  );
}
