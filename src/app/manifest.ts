import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "台灣勞工權益工具站",
    short_name: "勞工權益站",
    description: "免費勞工權益計算工具：薪資、加班費、資遣費、特休、勞健保、退休金",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#2563EB",
  };
}
