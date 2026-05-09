"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 90];

function getContentGroup(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/tools/")) return "tool";
  if (pathname.startsWith("/articles/")) return "article";
  if (pathname.startsWith("/guides/")) return "guide";
  if (pathname.startsWith("/checklists/")) return "checklist";
  return "site";
}

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const sent = new Set<number>();
    const contentGroup = getContentGroup(pathname);

    trackEvent("page_context_viewed", {
      path: pathname,
      content_group: contentGroup,
    });

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const mark of SCROLL_MARKS) {
        if (percent >= mark && !sent.has(mark)) {
          sent.add(mark);
          trackEvent("content_scroll_depth_reached", {
            path: pathname,
            content_group: contentGroup,
            percent,
            scroll_mark: mark,
          });
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-track]");
      if (!tracked) return;

      trackEvent(tracked.dataset.track || "cta_clicked", {
        path: pathname,
        content_group: contentGroup,
        label: tracked.dataset.trackLabel,
        target: tracked.dataset.trackTarget,
      });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.dataset.track) return;

      const queryField = form.dataset.trackQueryField;
      const params: Record<string, string | number | boolean | undefined> = {
        path: pathname,
        content_group: contentGroup,
        label: form.dataset.trackLabel,
        target: form.dataset.trackTarget,
      };

      if (queryField) {
        const formData = new FormData(form);
        const query = String(formData.get(queryField) ?? "").trim();
        params.has_query = query.length > 0;
        params.query_length = Math.min(query.length, 60);
      }

      trackEvent(form.dataset.track, params);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, [pathname]);

  return null;
}
