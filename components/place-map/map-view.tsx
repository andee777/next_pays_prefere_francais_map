"use client";

import { latLng, latLngBounds } from "leaflet";
import type {
  FitBoundsOptions,
  LatLngTuple,
  Marker as LeafletMarker,
  MarkerClusterGroup as LeafletClusterGroup,
  Popup as LeafletPopup,
  PopupEvent,
} from "leaflet";
// Type-only: loads the typings that add MarkerClusterGroup to Leaflet. TypeScript 6
// no longer includes every @types package automatically. Erased at build time.
import type {} from "leaflet.markercluster";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { placeId, type MappablePlace, type PlaceId } from "@/lib/place";

import { PlacePopup } from "./place-popup";
import { defaultIcon, selectedIcon } from "./marker-icons";
import type { PlaceMapApi, PlaceMapProps, MapInsets } from "./types";

type MarkerRegistry = Map<PlaceId, LeafletMarker>;

/** Zoom level that frames a single place without leaving it clustered. */
const FOCUS_ZOOM = 6;
const VIEW_MARGIN = 16;
/** Padding around a framed set of places (px). */
const FRAME_PADDING = 32;
/** How long a new popup is watched for size changes while it settles (ms). */
const POPUP_SETTLE_MS = 1500;
/** Extra, fixed-time checks while a popup settles (ms after it opens). */
const POPUP_CHECK_DELAYS_MS = [0, 120, 350, 800];
/** Wait for a resize or rotation to finish before re-framing (ms). */
const RESIZE_DEBOUNCE_MS = 150;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type PlaceMarkerProps = {
  place: MappablePlace;
  selected: boolean;
  registry: MarkerRegistry;
  onSelect: (id: PlaceId) => void;
  onPopupClose: (id: PlaceId) => void;
};

// Memoized: there are hundreds of markers, and the map re-renders whenever the
// list row under the pointer changes. Every prop is stable, so a hover re-renders
// no marker at all.
const PlaceMarker = memo(function PlaceMarker({
  place,
  selected,
  registry,
  onSelect,
  onPopupClose,
}: PlaceMarkerProps) {
  const id = placeId(place);

  // react-leaflet compares `position` by identity and calls `setLatLng` when it
  // changes. That makes the cluster group remove and re-add the marker, which
  // closes its open popup. Place objects could be re-created on a re-render (for
  // example after the URL changes), so key the position on the values instead.
  const [lat, lng] = place.coordinates;
  const position = useMemo<LatLngTuple>(() => [lat, lng], [lat, lng]);

  // Stable reference: react-leaflet re-binds handlers whenever this changes.
  const eventHandlers = useMemo(
    () => ({
      click: () => onSelect(id),
      popupclose: () => onPopupClose(id),
    }),
    [id, onSelect, onPopupClose],
  );

  const register = useCallback(
    (marker: LeafletMarker | null) => {
      if (marker) registry.set(id, marker);
      else registry.delete(id);
    },
    [registry, id],
  );

  return (
    <Marker
      ref={register}
      position={position}
      icon={selected ? selectedIcon : defaultIcon}
      zIndexOffset={selected ? 1000 : 0}
      title={place.title}
      alt={place.title}
      eventHandlers={eventHandlers}
    >
      <PlacePopup place={place} />
    </Marker>
  );
});

type MapBridgeProps = {
  registry: MarkerRegistry;
  clusterRef: RefObject<LeafletClusterGroup | null>;
  onReady: (api: PlaceMapApi) => void;
  getInsets: () => MapInsets;
};

/** Lives inside `MapContainer` to expose an imperative API to the explorer. */
function MapBridge({
  registry,
  clusterRef,
  onReady,
  getInsets,
}: MapBridgeProps) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    // The places last framed with `fitPlaces`, re-framed when the window is
    // resized or rotated. Cleared as soon as the user moves the map themselves,
    // so we never fight their camera.
    let lastFit: readonly MappablePlace[] | null = null;
    const releaseCamera = () => {
      lastFit = null;
    };

    const frame = (list: readonly MappablePlace[], animate: boolean) => {
      map.invalidateSize({ animate: false });
      const insets = getInsets();
      const bounds = latLngBounds(
        list.map(({ coordinates: [lat, lng] }) => latLng(lat, lng)),
      );
      const options: FitBoundsOptions = {
        paddingTopLeft: [
          insets.left + FRAME_PADDING,
          insets.top + FRAME_PADDING,
        ],
        paddingBottomRight: [FRAME_PADDING, FRAME_PADDING],
        maxZoom: FOCUS_ZOOM,
      };
      if (!animate || prefersReducedMotion())
        map.fitBounds(bounds, { ...options, animate: false });
      else map.flyToBounds(bounds, { ...options, duration: 1 });
    };

    // Pan so a popup is fully visible and clear of the sidebar and pill.
    // Leaflet's own auto-pan is disabled on popups because it ignores overlays.
    const adjustPopup = (element: HTMLElement) => {
      const insets = getInsets();
      const popup = element.getBoundingClientRect();
      const view = container.getBoundingClientRect();
      const safe = {
        left: view.left + insets.left + VIEW_MARGIN,
        top: view.top + insets.top + VIEW_MARGIN,
        right: view.right - VIEW_MARGIN,
        bottom: view.bottom - VIEW_MARGIN,
      };

      let dx = 0;
      let dy = 0;
      if (popup.left < safe.left) dx = popup.left - safe.left;
      else if (popup.right > safe.right) dx = popup.right - safe.right;
      if (popup.top < safe.top) dy = popup.top - safe.top;
      else if (popup.bottom > safe.bottom) dy = popup.bottom - safe.bottom;

      if (dx !== 0 || dy !== 0) {
        map.panBy([dx, dy], {
          animate: !prefersReducedMotion(),
          duration: 0.35,
        });
      }
    };

    const api: PlaceMapApi = {
      focusPlace(id) {
        const marker = registry.get(id);
        if (!marker) return;
        releaseCamera();

        // Leaflet caches the container size, so re-measure before computing.
        map.invalidateSize({ animate: false });
        const size = map.getSize();
        const insets = getInsets();

        const zoom = Math.max(map.getZoom(), FOCUS_ZOOM);
        // Aim at the middle of the free space, not of the whole viewport.
        const aim = map.unproject(
          map
            .project(marker.getLatLng(), zoom)
            .subtract([insets.left / 2, insets.top / 2]),
          zoom,
        );

        let opened = false;
        const open = () => {
          if (opened) return;
          opened = true;
          const group = clusterRef.current;
          if (group) group.zoomToShowLayer(marker, () => marker.openPopup());
          else marker.openPopup();
        };

        // Never crash the page over a camera move: without a measurable map,
        // just open the popup where the marker already is.
        if (
          size.x === 0 ||
          size.y === 0 ||
          !Number.isFinite(aim.lat) ||
          !Number.isFinite(aim.lng)
        ) {
          open();
          return;
        }
        if (prefersReducedMotion()) {
          map.setView(aim, zoom, { animate: false });
          open();
          return;
        }
        map.once("moveend", open);
        map.flyTo(aim, zoom, { duration: 1.1 });
        window.setTimeout(open, 2500); // safety net if no move event fires
      },

      fitPlaces(list, { animate = true } = {}) {
        if (list.length === 0) return;
        lastFit = list;
        frame(list, animate);
      },

      zoomIn: () => map.zoomIn(),
      zoomOut: () => map.zoomOut(),
    };

    // --- Popups ------------------------------------------------------------

    let openPopup: LeafletPopup | null = null;
    let stopSettling: (() => void) | null = null;

    const onPopupOpen = (event: PopupEvent) => {
      stopSettling?.();
      openPopup = event.popup;
      const element = event.popup.getElement();
      if (!element) return;

      // The card mounts into the popup just after the event, so the popup grows
      // (upward, above its marker) after the first measurement. Re-check on every
      // size change for a short settling window, then stop so the user's own
      // panning is never fought.
      //
      // Plain timers back up the ResizeObserver on purpose: observer callbacks
      // and animation frames only run when the browser paints, so a throttled or
      // background tab would otherwise never adjust. Measuring with
      // getBoundingClientRect works without a paint.
      const timers: number[] = [];
      const check = () => adjustPopup(element);
      for (const delay of POPUP_CHECK_DELAYS_MS) {
        timers.push(window.setTimeout(check, delay));
      }
      const observer = new ResizeObserver(() => {
        timers.push(window.setTimeout(check, 0));
      });
      observer.observe(element);
      timers.push(window.setTimeout(() => stopSettling?.(), POPUP_SETTLE_MS));

      stopSettling = () => {
        observer.disconnect();
        for (const timer of timers) window.clearTimeout(timer);
        stopSettling = null;
      };
    };

    const onPopupClose = (event: PopupEvent) => {
      if (event.popup !== openPopup) return;
      openPopup = null;
      stopSettling?.();
    };

    // --- Resize and rotation -----------------------------------------------

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const element = openPopup?.getElement();
        if (element) adjustPopup(element);
        else if (lastFit) frame(lastFit, false);
      }, RESIZE_DEBOUNCE_MS);
    };

    map.on("popupopen", onPopupOpen);
    map.on("popupclose", onPopupClose);
    map.on("resize", onResize);
    container.addEventListener("pointerdown", releaseCamera);
    container.addEventListener("wheel", releaseCamera, { passive: true });
    container.addEventListener("keydown", releaseCamera);

    // Hand the API out only once the map can be measured. Leaflet's flyTo divides
    // by the map's pixel size, so framing a place deep-linked on first load
    // (when the container may still be 0px) would otherwise produce NaN.
    const isMeasurable = () =>
      container.clientWidth > 0 && container.clientHeight > 0;
    const announce = () => {
      map.invalidateSize({ animate: false });
      onReady(api);
    };

    let readyObserver: ResizeObserver | undefined;
    if (isMeasurable()) {
      announce();
    } else {
      readyObserver = new ResizeObserver(() => {
        if (!isMeasurable()) return;
        readyObserver?.disconnect();
        announce();
      });
      readyObserver.observe(container);
    }

    return () => {
      readyObserver?.disconnect();
      stopSettling?.();
      window.clearTimeout(resizeTimer);
      map.off("popupopen", onPopupOpen);
      map.off("popupclose", onPopupClose);
      map.off("resize", onResize);
      container.removeEventListener("pointerdown", releaseCamera);
      container.removeEventListener("wheel", releaseCamera);
      container.removeEventListener("keydown", releaseCamera);
    };
  }, [map, registry, clusterRef, onReady, getInsets]);

  return null;
}

export default function MapView({
  places,
  selectedPlace,
  hoveredPlace,
  onSelectPlace,
  onPopupClose,
  onReady,
  getInsets,
}: PlaceMapProps) {
  const [registry] = useState<MarkerRegistry>(() => new Map());
  const clusterRef = useRef<LeafletClusterGroup | null>(null);

  // Glow the hovered place's marker, or the cluster currently hiding it.
  useEffect(() => {
    if (hoveredPlace === null) return;
    const marker = registry.get(hoveredPlace);
    if (!marker) return;
    const target = clusterRef.current?.getVisibleParent(marker) ?? marker;
    const element = target.getElement();
    if (!element) return;

    element.classList.add("place-marker-hover");
    target.setZIndexOffset(1000);
    return () => {
      element.classList.remove("place-marker-hover");
      target.setZIndexOffset(0);
    };
  }, [hoveredPlace, registry]);

  return (
    <MapContainer
      // Placeholder view: the explorer frames the places as soon as the map
      // is ready, which suits any screen size and the open sidebar.
      center={[46.5, 2.5]}
      zoom={5}
      zoomControl={false}
      worldCopyJump
      // `isolate` keeps Leaflet's high z-indexes below the floating UI.
      className="isolate z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <MapBridge
        registry={registry}
        clusterRef={clusterRef}
        onReady={onReady}
        getInsets={getInsets}
      />
      <MarkerClusterGroup
        ref={clusterRef}
        chunkedLoading
        showCoverageOnHover={false}
      >
        {places.map((place) => (
          <PlaceMarker
            key={placeId(place)}
            place={place}
            selected={placeId(place) === selectedPlace}
            registry={registry}
            onSelect={onSelectPlace}
            onPopupClose={onPopupClose}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
