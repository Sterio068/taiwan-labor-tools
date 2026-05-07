"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 90];

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const sent = new Set<number>();

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const mark of SCROLL_MARKS) {
        if (percent >= mark && !sent.has(mark)) {
          sent.add(mark);
          trackEvent("article_scroll_depth", {
            path: pathname,
            percent,
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
        label: tracked.dataset.trackLabel,
        target: tracked.dataset.trackTarget,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
