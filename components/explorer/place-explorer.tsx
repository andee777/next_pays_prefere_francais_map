"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PlaceMap } from "@/components/place-map/place-map";
import type { MapInsets, PlaceMapApi } from "@/components/place-map/types";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import {
  isInMetropolitanFrance,
  placeId,
  type MappablePlace,
  type PlaceId,
} from "@/lib/place";

import { MapControls } from "./map-controls";
import { PlaceSidebar } from "./place-sidebar";
import { SidebarOpenButton } from "./sidebar-open-button";
import { usePlaceFilters } from "./use-place-filters";

const PLACE_PARAM = "place";
/** Height the floating "Places" pill takes at the top of the map (px). */
const PILL_CLEARANCE = 56;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type PlaceExplorerProps = { places: readonly MappablePlace[] };

/** The whole page: a floating place sidebar over a full-screen map. */
export function PlaceExplorer({ places }: PlaceExplorerProps) {
  return (
    <SidebarProvider
      // Fluid: narrow on tablets so the map keeps room, capped at 24rem.
      style={{ "--sidebar-width": "clamp(18rem, 30vw, 24rem)" }}
      className="h-dvh min-h-0 overflow-hidden"
    >
      <Explorer places={places} />
    </SidebarProvider>
  );
}

function Explorer({ places }: PlaceExplorerProps) {
  const { open, setOpen, isMobile, setOpenMobile } = useSidebar();
  const {
    filters,
    patch,
    reset,
    sort,
    setSort,
    results,
    groups,
    filtersKey,
    isFiltered,
  } = usePlaceFilters(places);

  const [selected, setSelected] = useState<PlaceId | null>(null);
  const [hovered, setHovered] = useState<PlaceId | null>(null);
  const [api, setApi] = useState<PlaceMapApi | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const deepLinkHandled = useRef(false);

  // Which part of the map the floating UI currently covers, in px: the open
  // sidebar on the left, or the "Places" pill at the top when the sidebar is
  // collapsed (or on mobile). Kept in a ref so the callback stays stable.
  const sidebarState = useRef({ open, isMobile });
  useEffect(() => {
    sidebarState.current = { open, isMobile };
  }, [open, isMobile]);
  const getInsets = useCallback((): MapInsets => {
    const { open: isOpen, isMobile: mobile } = sidebarState.current;
    if (mobile || !isOpen) return { left: 0, top: PILL_CLEARANCE };
    const panel = document.querySelector("[data-slot=sidebar-inner]");
    return {
      left: panel ? Math.max(0, panel.getBoundingClientRect().right) : 0,
      top: 0,
    };
  }, []);

  // --- Selection -----------------------------------------------------------

  const selectFromList = useCallback(
    (id: PlaceId) => {
      setSelected(id);
      api?.focusPlace(id);
      if (isMobile) setOpenMobile(false);
    },
    [api, isMobile, setOpenMobile],
  );

  const handlePopupClose = useCallback(
    (id: PlaceId) =>
      setSelected((current) => (current === id ? null : current)),
    [],
  );

  // Read through a ref so `handleMapReady` stays stable: the map re-registers
  // its API whenever this callback changes.
  const placesRef = useRef(places);
  useEffect(() => {
    placesRef.current = places;
  });

  const handleMapReady = useCallback((mapApi: PlaceMapApi) => {
    setApi(mapApi);
    if (deepLinkHandled.current) return;
    deepLinkHandled.current = true;

    // Deep link: /?place=<video id> opens that place's popup.
    const all = placesRef.current;
    const requested = new URLSearchParams(window.location.search).get(
      PLACE_PARAM,
    );
    if (
      requested !== null &&
      all.some((place) => placeId(place) === requested)
    ) {
      setSelected(requested);
      mapApi.focusPlace(requested);
    } else {
      // Otherwise frame metropolitan France, whatever the screen size. The
      // overseas places would zoom the map out to the whole world.
      const home = all.filter(isInMetropolitanFrance);
      mapApi.fitPlaces(home.length > 0 ? home : all, { animate: false });
    }
  }, []);

  // Reflect the open place in the URL so any view can be shared.
  useEffect(() => {
    if (!deepLinkHandled.current) return;
    const url = new URL(window.location.href);
    if (selected === null) url.searchParams.delete(PLACE_PARAM);
    else url.searchParams.set(PLACE_PARAM, selected);
    window.history.replaceState(window.history.state, "", url);
  }, [selected]);

  // Keep the selected place visible in the list when it is picked on the map.
  useEffect(() => {
    if (selected === null) return;
    document.getElementById(`place-row-${selected}`)?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [selected]);

  // --- Map framing ---------------------------------------------------------

  const resultsRef = useRef(results);
  useEffect(() => {
    resultsRef.current = results;
  });

  // Re-frame the map when the user changes a filter (not on every keystroke).
  const framedFor = useRef(filtersKey);
  useEffect(() => {
    if (!api || framedFor.current === filtersKey) return;
    framedFor.current = filtersKey;
    const timer = window.setTimeout(() => {
      const list = resultsRef.current;
      if (list.length > 0) api.fitPlaces(list);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [api, filtersKey]);

  const fitToResults = useCallback(
    () => api?.fitPlaces(results.length > 0 ? results : places),
    [api, results, places],
  );

  // --- Actions -------------------------------------------------------------

  // A random place from the current results, other than the open one.
  const surprise = useCallback(() => {
    const candidates = results.filter((place) => placeId(place) !== selected);
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    if (pick) selectFromList(placeId(pick));
  }, [results, selected, selectFromList]);

  // "/" focuses the search field, opening the sidebar first if needed.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const { target } = event;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      if (isMobile) setOpenMobile(true);
      else setOpen(true);
      window.setTimeout(() => searchRef.current?.focus(), 80);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, setOpen, setOpenMobile]);

  return (
    <>
      <PlaceSidebar
        totalCount={places.length}
        resultCount={results.length}
        groups={groups}
        filters={filters}
        onFiltersChange={patch}
        onFiltersReset={reset}
        isFiltered={isFiltered}
        sort={sort}
        onSortChange={setSort}
        selectedPlace={selected}
        onSelectPlace={selectFromList}
        onHoverPlace={setHovered}
        onSurprise={surprise}
        searchRef={searchRef}
      />

      <main className="fixed inset-0" aria-label="Place map">
        <PlaceMap
          places={results}
          selectedPlace={selected}
          hoveredPlace={hovered}
          onSelectPlace={setSelected}
          onPopupClose={handlePopupClose}
          onReady={handleMapReady}
          getInsets={getInsets}
        />
      </main>

      <MapControls
        api={api}
        onFit={fitToResults}
        popupOpen={selected !== null}
      />
      <SidebarOpenButton count={results.length} />
    </>
  );
}
