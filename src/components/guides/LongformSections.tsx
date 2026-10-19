import type { GuideLongform } from "@/data/guide-sections";

interface LongformSectionsProps {
  content: GuideLongform;
  sourcesHeading?: string;
}

/** 指南與入口頁的長文說明區：小節、條列與法源連結。 */
export function LongformSections({ content, sourcesHeading = "法源連結" }: LongformSectionsProps) {
  return (
    <article className="mt-12 max-w-3xl rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] md:p-8">
      <div className="longform max-w-none">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <h2>{sourcesHeading}</h2>
        <ul>
          {content.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-slate-500">法規最後查核：{content.checkedAt}。</p>
      </div>
    </article>
  );
}
