import { INSURANCE_EXPLAINERS } from "./insurance";
import { RIGHTS_EXPLAINERS } from "./rights";
import { SEPARATION_EXPLAINERS } from "./separation";
import type { ToolExplainerContent } from "./types";
import { WORK_TIME_EXPLAINERS } from "./work-time";

export type { ToolExplainerContent } from "./types";

const TOOL_EXPLAINERS: Record<string, ToolExplainerContent> = {
  ...WORK_TIME_EXPLAINERS,
  ...SEPARATION_EXPLAINERS,
  ...INSURANCE_EXPLAINERS,
  ...RIGHTS_EXPLAINERS,
};

export function getToolExplainer(slug: string): ToolExplainerContent | undefined {
  return TOOL_EXPLAINERS[slug];
}

export const TOOL_EXPLAINER_SLUGS = Object.keys(TOOL_EXPLAINERS);
