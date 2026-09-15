"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { isMonetizablePath } from "@/lib/content-policy";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function AdSenseLoader() {
  const pathname = usePathname();
  if (!ADSENSE_ID || !isMonetizablePath(pathname)) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
