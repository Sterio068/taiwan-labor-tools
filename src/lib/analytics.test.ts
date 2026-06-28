import { afterEach, describe, expect, it, vi } from "vitest";
import { trackEvent, trackWebVital } from "./analytics";

function stubWindow() {
  const events: Array<{ name: string; params: Record<string, unknown> }> = [];
  const dataLayer: unknown[] = [];
  vi.stubGlobal("window", {
    dataLayer,
    gtag: (_command: string, name: string, params: Record<string, unknown>) => {
      events.push({ name, params });
    },
    location: { origin: "https://twlabor.test", pathname: "/tools/salary" },
  });
  vi.stubGlobal("document", { title: "薪資計算" });
  return { events, dataLayer };
}

describe("analytics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("emits a web_vital event with stable rounded params", () => {
    const { events } = stubWindow();

    trackWebVital({
      id: "v3-1",
      name: "LCP",
      value: 2468.4567,
      rating: "needs-improvement",
    });

    const vital = events.find((e) => e.name === "web_vital");
    expect(vital).toBeDefined();
    expect(vital?.params).toMatchObject({
      name: "LCP",
      value: 2468.457,
      rating: "needs-improvement",
      id: "v3-1",
    });
  });

  it("ignores malformed web vitals", () => {
    const { events } = stubWindow();

    trackWebVital({ id: "", name: "LCP", value: 1 });
    trackWebVital({ id: "x", name: "CLS", value: Number.NaN });

    expect(events.some((e) => e.name === "web_vital")).toBe(false);
  });

  it("emits standardized tool_result alias alongside tool_completed", () => {
    const { events } = stubWindow();

    trackEvent("tool_completed", { tool_id: "salary" });

    const names = events.map((e) => e.name);
    expect(names).toContain("tool_completed");
    expect(names).toContain("tool_result");
    const result = events.find((e) => e.name === "tool_result");
    expect(result?.params).toMatchObject({ tool_id: "salary" });
  });

  it("maps card click events to the standardized tool_card_click alias", () => {
    const { events } = stubWindow();

    trackEvent("tools_index_card_clicked", { label: "薪資計算", target: "/tools/salary" });

    const names = events.map((e) => e.name);
    expect(names).toContain("tools_index_card_clicked");
    expect(names).toContain("tool_card_click");
  });

  it("does not duplicate non-aliased events", () => {
    const { events } = stubWindow();

    trackEvent("tool_started", { tool_id: "salary" });

    expect(events.filter((e) => e.name === "tool_started")).toHaveLength(1);
  });
});
