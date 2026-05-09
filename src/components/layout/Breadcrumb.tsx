import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  jsonLd?: boolean;
}

export function Breadcrumb({ items, jsonLd = true }: Props) {
  const schemaItems = items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.label,
    ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  };

  return (
    <>
      {jsonLd && <JsonLd data={schema} />}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
        <ol className="flex min-w-0 flex-wrap items-center gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li
                key={idx}
                className={`flex min-w-0 items-center gap-1.5 ${
                  isLast ? "max-w-full flex-1" : "shrink-0"
                }`}
              >
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="block max-w-[16rem] truncate text-slate-700 sm:max-w-[38rem]">
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-slate-300">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
