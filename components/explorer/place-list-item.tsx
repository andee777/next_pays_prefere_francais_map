"use client";

import { MapPin } from "lucide-react";
import { memo } from "react";

import { PlaceThumbnail } from "@/components/place-thumbnail";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { placeId, placeThumbnail, type Place, type PlaceId } from "@/lib/place";
import { highlightRanges } from "@/lib/place-utils";
import { cn } from "@/lib/utils";

/** Renders `text` with the parts matching the search query marked. */
function Highlight({ text, query }: { text: string; query: string }) {
  const ranges = highlightRanges(text, query);
  if (ranges.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([start, end]) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark
        key={start}
        className="rounded-[3px] bg-primary/15 px-px text-foreground"
      >
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

type PlaceListItemProps = {
  place: Place;
  query: string;
  selected: boolean;
  onSelect: (id: PlaceId) => void;
  onHover: (id: PlaceId | null) => void;
};

// Memoized: the list has hundreds of rows, and the explorer re-renders every
// time the pointer enters or leaves one. With stable props, only the rows whose
// `selected` or `query` changed re-render.
export const PlaceListItem = memo(function PlaceListItem({
  place,
  query,
  selected,
  onSelect,
  onHover,
}: PlaceListItemProps) {
  const id = placeId(place);
  const thumbnail = placeThumbnail(place);
  // The region is the heading of the section the row sits in, so the row only
  // adds the département (an overseas département is its own region: skip it).
  const department = place.department === place.region ? "" : place.department;

  return (
    <SidebarMenuItem
      id={`place-row-${id}`}
      // Rows far from the viewport skip layout and paint. The size is only an
      // estimate until a row has been rendered once.
      className="[contain-intrinsic-size:auto_4.5rem] [content-visibility:auto]"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      <SidebarMenuButton
        size="lg"
        isActive={selected}
        aria-current={selected ? "true" : undefined}
        onClick={() => onSelect(id)}
        // The selected row is the loudest thing in the list: a tinted fill, a
        // 2px ring in the primary color, a bolder title and a pin on its thumbnail.
        // The ring is inset because rows use `content-visibility: auto`, whose
        // paint containment would clip anything drawn outside the row.
        className={cn(
          "h-auto items-start gap-3 rounded-lg py-2",
          selected && "bg-primary/10! ring-2 ring-primary! ring-inset",
        )}
      >
        <span className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-muted">
          {thumbnail ? (
            // Unoptimized on purpose: there are hundreds of these, and YouTube's
            // own 480px thumbnail is already small. Routing them all through the
            // image optimizer would burn its quota for no visible gain.
            <PlaceThumbnail src={thumbnail} alt="" sizes="80px" unoptimized />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-muted-foreground">
              <MapPin aria-hidden />
            </span>
          )}
          {selected && (
            <span className="absolute right-1 bottom-1 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <MapPin className="size-3!" aria-hidden />
            </span>
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          {/* Titles can be long; two lines rather than cutting them off. */}
          <span
            className={cn(
              "line-clamp-2 text-sm leading-snug whitespace-normal",
              selected ? "font-semibold" : "font-medium",
            )}
          >
            <Highlight text={place.title} query={query} />
          </span>
          {department && (
            <span className="truncate text-xs text-sidebar-foreground/80">
              <Highlight text={department} query={query} />
            </span>
          )}
          {place.type && (
            <span className="truncate text-xs text-muted-foreground">
              <Highlight text={place.type} query={query} />
            </span>
          )}
          {place.description && (
            <span className="line-clamp-2 text-xs leading-snug whitespace-normal text-muted-foreground">
              <Highlight text={place.description} query={query} />
            </span>
          )}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
