import { useSyncExternalStore } from "react";

/**
 * Responsive thresholds shared by JavaScript and CSS.
 *
 * Keep in sync with the `compact` and `short` custom variants in
 * `app/globals.css`, which are written in terms of the same numbers.
 */

/** Matches Tailwind's `md` breakpoint: below it the sidebar becomes a sheet. */
export const MOBILE_MAX_WIDTH = 767;
/** At or below this height (landscape phones) the UI switches to compact layouts. */
export const SHORT_MAX_HEIGHT = 560;

/** The sidebar is a sheet and its content is condensed. */
export const COMPACT_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px), (max-height: ${SHORT_MAX_HEIGHT}px)`;

export const POPUP_WIDTH = 288;
export const POPUP_WIDE_WIDTH = 480;
const POPUP_MIN_WIDTH = 240;
const POPUP_EDGE_GAP = 16;
/** A horizontal popup needs room for a thumbnail beside the text. */
const HORIZONTAL_POPUP_MIN_VIEWPORT_WIDTH = 520;

export type PopupLayout = {
  /** Thumbnail beside the text instead of above it (short, wide viewports). */
  horizontal: boolean;
  /** Popup width in px, never wider than the viewport allows. */
  width: number;
};

/** Chooses the place popup's layout and width for a viewport size. */
export function popupLayout(
  viewportWidth: number,
  viewportHeight: number,
): PopupLayout {
  const horizontal =
    viewportHeight <= SHORT_MAX_HEIGHT &&
    viewportWidth >= HORIZONTAL_POPUP_MIN_VIEWPORT_WIDTH;
  const preferred = horizontal ? POPUP_WIDE_WIDTH : POPUP_WIDTH;
  const available = viewportWidth - POPUP_EDGE_GAP * 2;
  return {
    horizontal,
    width: Math.max(POPUP_MIN_WIDTH, Math.min(preferred, available)),
  };
}

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  window.addEventListener("orientationchange", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    window.removeEventListener("orientationchange", onChange);
  };
}

/** The window's inner size, kept in sync on resize and rotation. */
export function useViewportSize() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 1280,
  );
  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 720,
  );
  return { width, height };
}
