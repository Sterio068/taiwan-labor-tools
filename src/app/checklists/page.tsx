import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PrintButton } from "@/components/print/PrintButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, collectionPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "勞工權益檢查表｜離職、資遣、加班與薪資單 PDF 摘要",
  description:
    "可列印或另存 PDF 的勞工權益檢查表，包含薪資單檢查、加班自保、資遣自保與離職文件清單。",
  keywords: ["離職檢查表", "資遣自保清單", "薪資單檢查表", "加班自保", "PDF"],
  path: "/checklists",
});

const CHECKLISTS = [
  {
    id: "salary-slip",
    title: "薪資單檢查表",
    intro: "每月領薪後先核對總額、扣款、加班費與勞退提繳，避免低報或錯扣長期累積。",
    items: ["稅前總額是否等於底薪、津貼、加班費與獎金加總", "勞保、健保級距是否不低於實際月薪對應級距", "雇主 6% 勞退提繳沒有從薪水扣除", "加班費有列明時數、倍率與金額", "保存薪資單、轉帳紀錄與出勤紀錄"],
    toolHref: "/tools/salary",
  },
  {
    id: "overtime",
    title: "加班自保清單",
    intro: "加班爭議常卡在證據，請先保存出勤與指揮監督紀錄，再核對倍率。",
    items: ["保留打卡、排班、任務指派與主管訊息", "確認加班日屬於平日、休息日、國定假日或例假", "用月薪除以 30 再除以 8 換算時薪基數", "休息日加班套用 4/8/12 小時計薪規則", "責任制須確認是否有主管機關核備"],
    toolHref: "/tools/overtime",
  },
  {
    id: "severance",
    title: "資遣自保清單",
    intro: "收到資遣通知時，先確認終止理由、金額與文件，再決定是否簽署協議。",
    items: ["確認雇主終止理由是否屬勞基法法定事由", "以離職前 6 個月平均工資估算資遣費", "另行核對預告工資與未休特休折現", "索取非自願離職證明與服務證明", "保留資遣通知、協議書、薪資單與投保紀錄"],
    toolHref: "/tools/severance",
  },
  {
    id: "resignation",
    title: "離職檢查表",
    intro: "自願離職前，先確認預告期、交接、保險退保日與特休折現，降低後續爭議。",
    items: ["確認依法或契約約定的離職預告期間", "以書面或可保存方式提出離職日期", "要求結清薪資、加班費、獎金與未休特休", "索取離職證明或服務證明", "確認勞健保退保日與轉出安排"],
    toolHref: "/tools/notice-period",
  },
];

export default function ChecklistsPage() {
  const collectionSchema = collectionPageSchema({
    name: "勞工權益檢查表",
    description:
      "可列印或另存 PDF 的勞工權益檢查表，包含薪資單檢查、加班自保、資遣自保與離職文件清單。",
    path: "/checklists",
    items: CHECKLISTS.map((checklist) => ({
      name: checklist.title,
      description: checklist.intro,
      url: `${SITE_URL}/checklists#${checklist.id}`,
    })),
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={collectionSchema} />
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "權益檢查表" }]} />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            勞工權益檢查表
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            可直接列印，或用瀏覽器「另存為 PDF」。內容僅供自我檢查，實際爭議仍建議諮詢勞工局或律師。
          </p>
        </div>
        <PrintButton label="列印 / 另存 PDF" />
      </div>

      <div className="space-y-8">
        {CHECKLISTS.map((checklist) => (
          <section key={checklist.id} id={checklist.id} className="scroll-mt-24 rounded-[16px] border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{checklist.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{checklist.intro}</p>
            <ul className="space-y-3">
              {checklist.items.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-slate-300 text-xs text-slate-400">
                    □
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={checklist.toolHref}
              data-track="checklist_tool_clicked"
              data-track-label={checklist.title}
              data-track-target={checklist.toolHref}
              className="mt-5 inline-flex items-center rounded-[10px] bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              搭配工具試算
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
