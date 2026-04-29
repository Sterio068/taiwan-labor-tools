import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "計算工具 — 勞工權益站";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 44, opacity: 0.9, marginBottom: 24 }}>
          🧮 計算工具
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          16 個免費勞工計算工具
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 32,
            opacity: 0.85,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          依據 2026 勞基法最新費率
          <br />
          薪資、加班費、資遣費一秒算清楚
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 50,
            opacity: 0.7,
          }}
        >
          twlabor.org
        </div>
      </div>
    ),
    { ...size }
  );
}
