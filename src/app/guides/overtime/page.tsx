import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideHubPage } from "@/components/guides/GuideHubPage";
import { getGuideHub } from "@/data/guide-hubs";
import { buildPageMetadata } from "@/lib/seo";

const hub = getGuideHub("overtime");

export const metadata: Metadata = buildPageMetadata({
  title: "加班費與工時指南 2026｜平日、休息日、責任制與違法加班",
  description:
    "整理平日加班、休息日加班、國定假日出勤、責任制與工時上限，搭配加班費計算機、常見案例與官方法規來源。",
  keywords: ["加班費指南", "工時", "休息日加班", "責任制", "違法加班", "勞基法第24條"],
  path: "/guides/overtime",
});

export default function OvertimeGuidePage() {
  if (!hub) notFound();
  return <GuideHubPage hub={hub} />;
}
