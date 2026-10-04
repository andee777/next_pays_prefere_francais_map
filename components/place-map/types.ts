import type { MappablePlace, PlaceId } from "@/lib/place";

/** Imperative handle the explorer uses to drive the Leaflet map. */
export type PlaceMapApi = {
  /** Flies to the place (un-clustering it if needed) and opens its popup. */
  focusPlace: (id: PlaceId) => void;
  /**
   * Frames every given place in the free space not covered by the UI, and
   * keeps them framed if the window is resized or rotated (until the user
   * moves the map). Pass `{ animate: false }` for the initial framing.
   */
  fitPlaces: (
    places: readonly MappablePlace[],
    options?: { animate?: boolean },
  ) => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

/** Pixels at the left and top of the map currently covered by floating UI. */
export type MapInsets = { left: number; top: number };

export type PlaceMapProps = {
  places: readonly MappablePlace[];
  /** Place whose popup is open. */
  selectedPlace: PlaceId | null;
  /** Place hovered in the list; its marker (or cluster) is highlighted. */
  hoveredPlace: PlaceId | null;
  onSelectPlace: (id: PlaceId) => void;
  onPopupClose: (id: PlaceId) => void;
  /** Called once the map is mounted and ready to be driven. */
  onReady: (api: PlaceMapApi) => void;
  /** The area the map should treat as covered, e.g. by the sidebar. */
  getInsets: () => MapInsets;
};
