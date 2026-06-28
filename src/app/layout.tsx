import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { AnalyticsEvents } from "@/components/analytics/AnalyticsEvents";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  SITE_SHORT_NAME,
  SITE_URL,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "台灣勞工權益工具站 — 薪資、加班費、資遣費免費計算",
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description:
    "免費勞工權益計算工具：薪資明細、加班費、資遣費、特休天數、勞健保保費、勞退退休金。依據最新勞基法，幫你算清楚每一筆錢。",
  keywords: [
    "勞工權益",
    "薪資計算",
    "加班費計算",
    "資遣費",
    "特休天數",
    "勞保費",
    "健保費",
    "勞退",
    "退休金試算",
  ],
  authors: [{ name: "勞工權益站" }],
  verification: {
    google: "e58910d0ffcea7b8",
  },
  other: ADSENSE_ID
    ? {
        "google-adsense-account": ADSENSE_ID,
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    siteName: SITE_SHORT_NAME,
    title: "台灣勞工權益工具站 — 薪資、加班費、資遣費免費計算",
    description:
      "免費勞工權益計算工具：薪資明細、加班費、資遣費、特休天數、勞健保保費、勞退退休金。",
  },
  twitter: {
    card: "summary_large_image",
    title: "勞工權益站",
    description: "台灣勞工的免費權益計算工具",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${inter.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}',{page_location:window.location.origin+window.location.pathname,page_path:window.location.pathname,page_title:document.title});`}
            </Script>
          </>
        )}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <AnalyticsEvents />
        {GA_ID && <WebVitalsReporter />}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
