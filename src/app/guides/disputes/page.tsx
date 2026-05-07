import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideHubPage } from "@/components/guides/GuideHubPage";
import { getGuideHub } from "@/data/guide-hubs";
import { buildPageMetadata } from "@/lib/seo";

const hub = getGuideHub("disputes");

export const metadata: Metadata = buildPageMetadata({
  title: "勞資爭議與申訴指南 2026｜欠薪、勞資調解與勞動檢查",
  description:
    "整理欠薪、違法加班、未投保、霸凌騷擾、勞資調解與勞動檢查流程，協助勞工保全證據並找到下一步。",
  keywords: ["勞資爭議", "勞工申訴", "勞資調解", "欠薪", "勞動檢查", "勞工局"],
  path: "/guides/disputes",
});

export default function DisputesGuidePage() {
  if (!hub) notFound();
  return <GuideHubPage hub={hub} />;
}
