import { describe, expect, it } from "vitest";

import {
  COMPACT_QUERY,
  MOBILE_MAX_WIDTH,
  POPUP_WIDE_WIDTH,
  POPUP_WIDTH,
  SHORT_MAX_HEIGHT,
  popupLayout,
} from "./viewport";

describe("popupLayout", () => {
  it("uses the regular width on a desktop", () => {
    expect(popupLayout(1440, 900)).toEqual({
      horizontal: false,
      width: POPUP_WIDTH,
    });
  });

  it("shrinks to fit narrow phones, leaving a gap on both sides", () => {
    expect(popupLayout(320, 568).width).toBe(288);
    expect(popupLayout(300, 600).width).toBe(268);
  });

  it("never gets narrower than a usable minimum", () => {
    expect(popupLayout(240, 600).width).toBe(240);
  });

  it("goes horizontal and wider on short, wide viewports (landscape phones)", () => {
    expect(popupLayout(844, 390)).toEqual({
      horizontal: true,
      width: POPUP_WIDE_WIDTH,
    });
    expect(popupLayout(667, 375).horizontal).toBe(true);
  });

  it("always fits inside the viewport, with a gap on both sides", () => {
    for (const [w, h] of [
      [320, 568],
      [375, 667],
      [520, 400],
      [667, 375],
      [844, 390],
      [1024, 768],
      [2560, 1080],
    ] as const) {
      const { width } = popupLayout(w, h);
      expect(width, `${w}x${h}`).toBeLessThanOrEqual(w - 32);
    }
  });

  it("stays vertical when short but too narrow for a side-by-side layout", () => {
    expect(popupLayout(480, 400).horizontal).toBe(false);
  });

  it("treats the boundary height as short", () => {
    expect(popupLayout(900, SHORT_MAX_HEIGHT).horizontal).toBe(true);
    expect(popupLayout(900, SHORT_MAX_HEIGHT + 1).horizontal).toBe(false);
  });
});

describe("COMPACT_QUERY", () => {
  it("is built from the shared thresholds", () => {
    expect(COMPACT_QUERY).toContain(`max-width: ${MOBILE_MAX_WIDTH}px`);
    expect(COMPACT_QUERY).toContain(`max-height: ${SHORT_MAX_HEIGHT}px`);
  });
});
