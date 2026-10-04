"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

import type { PlaceMapProps } from "./types";

// Leaflet reads `window` when it is imported, so the map can only load in the
// browser. `ssr: false` is only allowed inside a Client Component.
const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <Skeleton
      role="status"
      aria-label="Loading map"
      className="h-full w-full rounded-none"
    />
  ),
});

export function PlaceMap(props: PlaceMapProps) {
  return <MapView {...props} />;
}
