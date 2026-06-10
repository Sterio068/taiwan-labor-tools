import type { Metadata } from "next";

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://twlabor.org").replace(
    /\/+$/,
    ""
  );
export const SITE_NAME = "台灣勞工權益工具站";
export const SITE_SHORT_NAME = "勞工權益站";

export interface PageMetaInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const openGraphBase = {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: "zh_TW",
  };

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph:
      type === "article"
        ? {
            ...openGraphBase,
            type: "article",
            publishedTime,
            modifiedTime,
            section,
            authors: [SITE_NAME],
            tags: keywords,
          }
        : {
            ...openGraphBase,
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
  dateModified?: string;
}) {
  const url = `${SITE_URL}${tool.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TWD",
    },
    inLanguage: "zh-TW",
    isAccessibleForFree: true,
    mainEntityOfPage: url,
    ...(tool.dateModified ? { dateModified: tool.dateModified } : {}),
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

export interface StructuredListItem {
  name: string;
  url: string;
  description?: string;
}

export function itemListSchema(items: StructuredListItem[]) {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}

export function collectionPageSchema(page: {
  name: string;
  description: string;
  path: string;
  items: StructuredListItem[];
  type?: "CollectionPage" | "SearchResultsPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": page.type ?? "CollectionPage",
    name: page.name,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    inLanguage: "zh-TW",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: itemListSchema(page.items),
  };
}

export function definedTermSetSchema(set: {
  name: string;
  description: string;
  path: string;
  terms: { name: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: set.name,
    description: set.description,
    url: `${SITE_URL}${set.path}`,
    inLanguage: "zh-TW",
    hasDefinedTerm: set.terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
      inDefinedTermSet: `${SITE_URL}${set.path}`,
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
  keywords?: string[];
  category?: string;
  sources?: { label: string; url: string }[];
}) {
  const url = `${SITE_URL}/articles/${article.slug}`;
  const sourceWorks = article.sources?.map((source) => ({
    "@type": "CreativeWork",
    name: source.label,
    url: source.url,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    ...(article.keywords?.length
      ? { keywords: article.keywords.join(", ") }
      : {}),
    ...(article.category ? { articleSection: article.category } : {}),
    ...(sourceWorks?.length
      ? {
          citation: article.sources?.map((source) => source.url),
          isBasedOn: sourceWorks,
        }
      : {}),
    inLanguage: "zh-TW",
    isAccessibleForFree: true,
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
    image: `${url}/opengraph-image`,
  };
}
