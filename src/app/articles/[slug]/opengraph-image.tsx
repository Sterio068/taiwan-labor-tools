import { ImageResponse } from "next/og";
import { getArticleBySlug, CATEGORY_LABELS } from "@/lib/articles";

export const runtime = "nodejs";

export const alt = "勞工權益站";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? "勞工權益站";
  const category = article ? CATEGORY_LABELS[article.category] : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8FAFC",
          fontFamily: "sans-serif",
          padding: "70px 80px",
        }}
      >
        {/* 頂部 header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 32,
            color: "#2563EB",
            fontWeight: 700,
          }}
        >
          🛡️ 勞工權益站
        </div>

        {/* 中間主標 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {category && (
            <div
              style={{
                fontSize: 28,
                color: "#2563EB",
                background: "#DBEAFE",
                padding: "10px 24px",
                borderRadius: 12,
                alignSelf: "flex-start",
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.15,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* 底部 footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#64748B",
          }}
        >
          <div>twlabor.org</div>
          <div>免費勞工權益工具</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
