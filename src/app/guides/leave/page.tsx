import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideHubPage } from "@/components/guides/GuideHubPage";
import { getGuideHub } from "@/data/guide-hubs";
import { buildPageMetadata } from "@/lib/seo";

const hub = getGuideHub("leave");

export const metadata: Metadata = buildPageMetadata({
  title: "特休與請假指南 2026｜特休天數、病假、產假與未休折現",
  description:
    "整理特休天數、病假扣薪、產假陪產假、育嬰留停與未休特休折現，搭配特休計算工具與官方法規來源。",
  keywords: ["特休指南", "請假規定", "病假", "產假", "育嬰假", "未休折現"],
  path: "/guides/leave",
});

export default function LeaveGuidePage() {
  if (!hub) notFound();
  return <GuideHubPage hub={hub} />;
}
