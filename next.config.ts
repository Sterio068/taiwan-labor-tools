import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  trailingSlash: false,
  async redirects() {
    return [
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
