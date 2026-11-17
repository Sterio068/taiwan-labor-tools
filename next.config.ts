import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { ARTICLE_REDIRECTS } from "./src/lib/article-redirects";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  trailingSlash: false,
  async redirects() {
    return [
      // 2026-11 內容整併：合併的文章轉到主題文章
      ...Object.entries(ARTICLE_REDIRECTS).map(([slug, destination]) => ({
        source: `/articles/${slug}`,
        destination,
        permanent: true,
      })),
      // www → 非 www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.twlabor.org" }],
        destination: "https://twlabor.org/:path*",
        permanent: true,
      },
      // Vercel 預設域名 → 自訂域名
      {
        source: "/:path*",
        has: [{ type: "host", value: "taiwan-labor-tools.vercel.app" }],
        destination: "https://twlabor.org/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
