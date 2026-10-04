import type { Place } from "@/lib/place";

export const SORT_ORDERS = ["az", "za"] as const;
export type SortOrder = (typeof SORT_ORDERS)[number];

export function isSortOrder(value: unknown): value is SortOrder {
  return SORT_ORDERS.some((order) => order === value);
}

export type PlaceFilters = Readonly<{
  /** Free-text search across title, series label, description, département and region. */
  query: string;
}>;

export const DEFAULT_FILTERS: PlaceFilters = {
  query: "",
};

/** One alphabetical section of the list. */
export type LetterGroup = Readonly<{
  /** `A`–`Z`, or `#` for titles that do not start with a letter. */
  letter: string;
  places: readonly Place[];
}>;

/** Lowercases, strips diacritics and collapses whitespace, so "Île" matches "ile". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  const normalized = normalize(query);
  return normalized ? normalized.split(" ") : [];
}

const haystacks = new WeakMap<Place, string>();

function haystack(place: Place): string {
  let value = haystacks.get(place);
  if (value === undefined) {
    value = normalize(
      [
        place.title,
        place.type,
        place.description,
        place.department,
        place.region,
      ].join(" "),
    );
    haystacks.set(place, value);
  }
  return value;
}

/** Every whitespace-separated word of the query must appear somewhere in the place. */
export function matchesQuery(place: Place, query: string): boolean {
  const tokens = tokenize(query);
  if (tokens.length === 0) return true;
  const text = haystack(place);
  return tokens.every((token) => text.includes(token));
}

export function hasActiveFilters(filters: PlaceFilters): boolean {
  return tokenize(filters.query).length > 0;
}

export function filterPlaces<T extends Place>(
  places: readonly T[],
  filters: PlaceFilters,
): T[] {
  return places.filter((place) => matchesQuery(place, filters.query));
}

// French collation, ignoring case and accents, with numbers in numeric order.
const collator = new Intl.Collator("fr", {
  sensitivity: "base",
  numeric: true,
});

/** Alphabetical by title. The sort is stable, so equal titles keep their order. */
export function sortPlaces<T extends Place>(
  places: readonly T[],
  order: SortOrder,
): T[] {
  const direction = order === "az" ? 1 : -1;
  return [...places].sort(
    (a, b) => collator.compare(a.title, b.title) * direction,
  );
}

/** The section a place belongs to in the list: its title's first letter, or `#`. */
export function placeLetter(place: Place): string {
  const first = normalize(place.title).charAt(0).toUpperCase();
  return /^[A-Z]$/.test(first) ? first : "#";
}

/** Groups consecutive places by their letter, keeping the input order. */
export function groupByLetter(places: readonly Place[]): LetterGroup[] {
  const groups: { letter: string; places: Place[] }[] = [];
  for (const place of places) {
    const letter = placeLetter(place);
    const last = groups.at(-1);
    if (last?.letter === letter) last.places.push(place);
    else groups.push({ letter, places: [place] });
  }
  return groups;
}

/**
 * Character ranges of `text` matched by the query, for highlighting. Returns an
 * empty list when normalisation changes the string length, because offsets
 * would no longer line up with the original text.
 */
export function highlightRanges(
  text: string,
  query: string,
): [start: number, end: number][] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const normalized = text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  if (normalized.length !== text.length) return [];

  const ranges: [number, number][] = [];
  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const at = normalized.indexOf(token, from);
      if (at === -1) break;
      ranges.push([at, at + token.length]);
      from = at + token.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged.at(-1);
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
}
