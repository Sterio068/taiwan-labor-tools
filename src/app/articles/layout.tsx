import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益文章 — 白話解讀勞基法",
  description:
    "白話解讀勞基法與勞工權益，搭配免費計算工具，搞懂薪資、加班、資遣、假別等常見問題。",
  keywords: ["勞基法", "勞工權益", "勞動法規", "薪資", "加班費", "資遣費"],
  path: "/articles",
});

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
