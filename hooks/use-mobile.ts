import * as React from "react";

import { COMPACT_QUERY } from "@/lib/viewport";

/**
 * Customized from the shadcn original (it only checked the width). Short
 * viewports, such as a phone held sideways, also count as "mobile": the sidebar
 * becomes a sheet there, because a 360px-wide panel would leave no room for the
 * place list. `shadcn add --overwrite` would replace this file.
 */
function subscribe(onChange: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(COMPACT_QUERY).matches,
    () => false,
  );
}
