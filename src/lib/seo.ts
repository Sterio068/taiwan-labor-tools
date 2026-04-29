import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://example.com";
export const SITE_NAME = "台灣勞工權益工具站";

export interface PageMetaInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function webApplicationSchema(tool: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TWD",
    },
    inLanguage: "zh-TW",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "台灣勞工的免費權益計算工具與勞動法規知識",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "zh-TW",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/articles?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ Schema — 觸發 Google 搜尋結果的 FAQ rich snippet */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** BreadcrumbList Schema — 麵包屑路徑 rich result */
export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

/** HowTo Schema — 觸發 Google 搜尋結果的步驟 rich snippet */
export function howToSchema(howTo: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    ...(howTo.totalTime ? { totalTime: howTo.totalTime } : {}),
    step: howTo.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** Article Schema — 針對文章頁面 */
export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    inLanguage: "zh-TW",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
