import { useCallback, useMemo, useState } from "react";

import type { Place } from "@/lib/place";
import {
  DEFAULT_FILTERS,
  filterPlaces,
  groupByLetter,
  hasActiveFilters,
  normalize,
  sortPlaces,
  type PlaceFilters,
  type SortOrder,
} from "@/lib/place-utils";

/** Search and sort state, plus the derived results the UI renders. */
export function usePlaceFilters<T extends Place>(places: readonly T[]) {
  const [filters, setFilters] = useState<PlaceFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOrder>("az");

  const patch = useCallback(
    (changes: Partial<PlaceFilters>) =>
      setFilters((current) => ({ ...current, ...changes })),
    [],
  );
  const reset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const results = useMemo(
    () => sortPlaces(filterPlaces(places, filters), sort),
    [places, filters, sort],
  );
  const groups = useMemo(() => groupByLetter(results), [results]);

  // Changes only when the user edits a filter (not the sort order), so the
  // map is only re-framed on deliberate filtering.
  const filtersKey = useMemo(() => normalize(filters.query), [filters]);

  return {
    filters,
    patch,
    reset,
    sort,
    setSort,
    results,
    groups,
    filtersKey,
    isFiltered: hasActiveFilters(filters),
  };
}
