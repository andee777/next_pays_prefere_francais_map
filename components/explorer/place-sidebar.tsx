"use client";

import { Compass, Dices, SearchX } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { placeId, type PlaceId } from "@/lib/place";
import type { LetterGroup, PlaceFilters, SortOrder } from "@/lib/place-utils";

import { PlaceListItem } from "./place-list-item";
import { FiltersPanel } from "./filters-panel";
import { ThemeToggle } from "./theme-toggle";

type PlaceSidebarProps = {
  totalCount: number;
  resultCount: number;
  groups: readonly LetterGroup[];
  filters: PlaceFilters;
  onFiltersChange: (changes: Partial<PlaceFilters>) => void;
  onFiltersReset: () => void;
  isFiltered: boolean;
  sort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  selectedPlace: PlaceId | null;
  onSelectPlace: (id: PlaceId) => void;
  onHoverPlace: (id: PlaceId | null) => void;
  onSurprise: () => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
};

const ITEM_SELECTOR = "[data-sidebar=menu-button]";

export function PlaceSidebar({
  totalCount,
  resultCount,
  groups,
  filters,
  onFiltersChange,
  onFiltersReset,
  isFiltered,
  sort,
  onSortChange,
  selectedPlace,
  onSelectPlace,
  onHoverPlace,
  onSurprise,
  searchRef,
}: PlaceSidebarProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const items = () =>
    Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    );

  // Arrow keys move through the list; ArrowUp on the first row returns to search.
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const all = items();
    const index = all.findIndex((item) => item === document.activeElement);
    if (index === -1) return;
    event.preventDefault();
    if (event.key === "ArrowUp" && index === 0) searchRef.current?.focus();
    else all[index + (event.key === "ArrowDown" ? 1 : -1)]?.focus();
  };

  return (
    <Sidebar
      variant="floating"
      collapsible="offcanvas"
      className="p-3 [&_[data-slot=sidebar-inner]]:rounded-2xl! [&_[data-slot=sidebar-inner]]:bg-sidebar/90! [&_[data-slot=sidebar-inner]]:shadow-2xl! [&_[data-slot=sidebar-inner]]:backdrop-blur-xl!"
    >
      {/*
        One wrapper so that on short screens (a phone held sideways) the header,
        list and footer scroll together instead of squeezing the list to nothing.
        On taller screens the header and footer stay put and only the list scrolls.
      */}
      <div className="flex min-h-0 flex-1 flex-col short:[scrollbar-width:thin] short:[scrollbar-color:var(--border)_transparent] short:overflow-y-auto">
        <SidebarHeader className="gap-3 p-4 pb-3 compact:gap-2.5 compact:p-3 compact:pt-[max(0.75rem,env(safe-area-inset-top))] compact:pb-2">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Compass className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-[15px] leading-tight font-semibold tracking-tight text-balance">
                Pays préféré des Français
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground short:hidden">
                Video map · {totalCount} places
              </p>
            </div>
            <SidebarTrigger className="pointer-coarse:size-10" />
          </div>

          <FiltersPanel
            filters={filters}
            onChange={onFiltersChange}
            onReset={onFiltersReset}
            isFiltered={isFiltered}
            sort={sort}
            onSortChange={onSortChange}
            resultCount={resultCount}
            totalCount={totalCount}
            searchRef={searchRef}
            onArrowDown={() => items()[0]?.focus()}
          />
        </SidebarHeader>

        <SidebarSeparator className="mx-0" />

        <SidebarContent
          ref={listRef}
          onKeyDown={handleListKeyDown}
          aria-label="Places"
          className="[scrollbar-width:thin]! [scrollbar-color:var(--border)_transparent] short:flex-none short:overflow-visible"
        >
          {groups.length === 0 ? (
            <Empty className="m-4 border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchX />
                </EmptyMedia>
                <EmptyTitle>No places found</EmptyTitle>
                <EmptyDescription>
                  Try another name, region or series.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm" onClick={onFiltersReset}>
                  Clear search
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            groups.map((group) => (
              <SidebarGroup key={group.letter} className="p-0">
                <SidebarGroupLabel className="sticky top-0 z-10 h-8 rounded-none bg-sidebar/80 px-4 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur-md">
                  {group.letter}
                  <span className="ml-auto font-normal tabular-nums">
                    {group.places.length}
                  </span>
                </SidebarGroupLabel>
                <SidebarGroupContent className="px-2 pb-1">
                  <SidebarMenu>
                    {group.places.map((place) => {
                      const id = placeId(place);
                      return (
                        <PlaceListItem
                          key={id}
                          place={place}
                          query={filters.query}
                          selected={id === selectedPlace}
                          onSelect={onSelectPlace}
                          onHover={onHoverPlace}
                        />
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          )}
        </SidebarContent>

        <SidebarSeparator className="mx-0" />

        <SidebarFooter className="gap-2.5 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] short:sticky short:bottom-0 short:z-10 short:bg-sidebar/95 short:backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Button
              className="flex-1 pointer-coarse:h-11"
              onClick={onSurprise}
              disabled={resultCount === 0}
            >
              <Dices />
              Surprise me
            </Button>
            <ThemeToggle />
          </div>
          {/* Keyboard hints: only useful with a keyboard, and no room for them on small screens. */}
          <p className="hidden items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground md:flex md:flex-wrap pointer-coarse:hidden! compact:hidden">
            <span className="flex items-center gap-1">
              <Kbd>/</Kbd> search
            </span>
            <span className="flex items-center gap-1">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              browse
            </span>
            <span className="flex items-center gap-1">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>B</Kbd>
              </KbdGroup>
              sidebar
            </span>
          </p>
        </SidebarFooter>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
