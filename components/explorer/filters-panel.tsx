"use client";

import { ArrowDownUp, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import {
  isSortOrder,
  SORT_ORDERS,
  type PlaceFilters,
  type SortOrder,
} from "@/lib/place-utils";

type FiltersPanelProps = {
  filters: PlaceFilters;
  onChange: (changes: Partial<PlaceFilters>) => void;
  onReset: () => void;
  isFiltered: boolean;
  sort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  resultCount: number;
  totalCount: number;
  searchRef: React.Ref<HTMLInputElement>;
  /** Called when the user presses ArrowDown in the search field. */
  onArrowDown: () => void;
};

// `Record<SortOrder, …>` makes adding a sort order a compile error until labelled.
const SORT_LABELS: Record<SortOrder, { short: string; full: string }> = {
  az: { short: "A–Z", full: "A to Z" },
  za: { short: "Z–A", full: "Z to A" },
};

export function FiltersPanel({
  filters,
  onChange,
  onReset,
  isFiltered,
  sort,
  onSortChange,
  resultCount,
  totalCount,
  searchRef,
  onArrowDown,
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-2.5" role="search">
      <InputGroup className="h-9 bg-background pointer-coarse:h-11">
        <InputGroupAddon>
          <Search aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          ref={searchRef}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search places…"
          aria-label="Search places"
          className="pointer-coarse:h-11"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              if (filters.query) onChange({ query: "" });
              else event.currentTarget.blur();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              onArrowDown();
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          {filters.query ? (
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear search"
              className="pointer-coarse:size-8"
              onClick={() => onChange({ query: "" })}
            >
              <X />
            </InputGroupButton>
          ) : (
            <Kbd aria-hidden className="pointer-coarse:hidden">
              /
            </Kbd>
          )}
        </InputGroupAddon>
      </InputGroup>

      <div className="flex min-h-6 items-center justify-between gap-2 text-xs whitespace-nowrap text-muted-foreground">
        <p aria-live="polite" aria-atomic="true">
          {isFiltered
            ? `${resultCount} of ${totalCount} places`
            : `${totalCount} places`}
        </p>
        <div className="flex items-center gap-1">
          {isFiltered && (
            <Button
              variant="link"
              size="xs"
              className="h-6 px-1 pointer-coarse:h-9 pointer-coarse:px-2"
              onClick={onReset}
            >
              Clear
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="xs"
                  className="text-muted-foreground pointer-coarse:h-10 pointer-coarse:px-2.5"
                  aria-label={`Sort: ${SORT_LABELS[sort].full}`}
                />
              }
            >
              <ArrowDownUp />
              {SORT_LABELS[sort].short}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => {
                  if (isSortOrder(value)) onSortChange(value);
                }}
              >
                {SORT_ORDERS.map((order) => (
                  <DropdownMenuRadioItem key={order} value={order}>
                    {SORT_LABELS[order].full}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
