import { ARTICLES, CATEGORY_LABELS } from "@/lib/articles";
import { TOOLS } from "@/data/constants";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "tool" | "article" | "page";
  typeLabel: string;
  keywords: string[];
}

export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Tools
  for (const tool of TOOLS) {
    items.push({
      title: tool.name,
      description: tool.description,
      href: tool.href,
      type: "tool",
      typeLabel: "工具",
      keywords: tool.keywords,
    });
  }

  // Articles
  for (const article of ARTICLES) {
    items.push({
      title: article.title,
      description: article.description,
      href: `/articles/${article.slug}`,
      type: "article",
      typeLabel: CATEGORY_LABELS[article.category] || "文章",
      keywords: article.keywords,
    });
  }

  // Static pages
  items.push({
    title: "關於我們",
    description: "勞工權益站的使命與資料來源",
    href: "/about",
    type: "page",
    typeLabel: "頁面",
    keywords: ["關於", "關於我們"],
  });

  return items;
}

export function searchItems(query: string, index: SearchItem[]): SearchItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const scored = index
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      const keywords = item.keywords.map((k) => k.toLowerCase());

      if (title.includes(q)) score += 10;
      if (desc.includes(q)) score += 5;
      for (const kw of keywords) {
        if (kw.includes(q) || q.includes(kw)) score += 8;
      }
      // Partial character match
      for (const char of q) {
        if (title.includes(char)) score += 1;
        if (keywords.some((kw) => kw.includes(char))) score += 1;
      }

      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 10).map((s) => s.item);
}
