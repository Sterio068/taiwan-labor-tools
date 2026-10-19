import Link from "next/link";
import { getToolExplainer } from "@/data/tool-explainers";

interface ToolExplainerProps {
  slug: string;
}

/**
 * 工具頁的說明內容：算什麼、法源、試算範例、常見錯誤與使用前準備。
 * 所有範例數字由站內計算函式產生，法源連到全國法規資料庫或主管機關頁面。
 */
export function ToolExplainer({ slug }: ToolExplainerProps) {
  const explainer = getToolExplainer(slug);
  if (!explainer) return null;

  return (
    <>
      <h2>{explainer.heading}</h2>
      {explainer.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h2>法源依據</h2>
      <ul>
        {explainer.legalBasis.map((basis) => (
          <li key={basis.label}>
            <a href={basis.url} target="_blank" rel="noopener noreferrer">
              {basis.label}
            </a>
            ：{basis.text}
          </li>
        ))}
      </ul>

      {explainer.examples.map((example) => (
        <section key={example.title}>
          <h2>{example.title}</h2>
          <p>{example.scenario}</p>
          <ol>
            {example.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            <strong>{example.result}</strong>
          </p>
        </section>
      ))}

      <h2>常見錯誤與爭議</h2>
      {explainer.mistakes.map((mistake) => (
        <section key={mistake.title}>
          <h3>{mistake.title}</h3>
          <p>{mistake.body}</p>
        </section>
      ))}

      {explainer.prepare.length > 0 && (
        <>
          <h2>使用前先準備</h2>
          <ul>
            {explainer.prepare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {explainer.readNext.length > 0 && (
        <>
          <h2>延伸閱讀</h2>
          <ul>
            {explainer.readNext.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-sm text-slate-500">
        本頁法規與數字最後查核：{explainer.checkedAt}。試算結果僅供參考，個案仍以主管機關認定、勞動契約與實際出勤紀錄為準；
        官方來源整理見<Link href="/sources">資料來源與更新紀錄</Link>。
      </p>
    </>
  );
}
