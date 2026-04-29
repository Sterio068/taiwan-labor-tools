import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "台灣勞工權益工具站";
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
          background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 48, opacity: 0.9, marginBottom: 20 }}>
          🛡️ 勞工權益站
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          算清楚你的每一筆錢
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 32,
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          薪資 · 加班費 · 資遣費 · 特休 · 勞健保 · 退休金
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
