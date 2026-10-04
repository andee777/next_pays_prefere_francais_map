// Compile-time tests. `pnpm typecheck` fails if any of these stop holding.
// They never run: Vitest only executes `*.test.ts` files.
import { expectTypeOf } from "vitest";

import {
  hasCoordinates,
  type Coordinates,
  type MappablePlace,
  type Place,
  type YouTubeLink,
} from "./place";
import { filterPlaces, isSortOrder, type SortOrder } from "./place-utils";

declare const place: Place;

// @ts-expect-error -- places are immutable
place.title = "Colmar";

// @ts-expect-error -- so are their coordinates
place.coordinates = [0, 0];

// @ts-expect-error -- only YouTube watch URLs are accepted as links
export const notYouTube: YouTubeLink = "https://example.com/video";

// A start-time parameter is part of a valid link.
export const withStart: YouTubeLink =
  "https://www.youtube.com/watch?v=nHX7NMzEEM4&t=2034s";

expectTypeOf<Coordinates>().toEqualTypeOf<
  readonly [lat: number, lng: number]
>();

// Coordinates are optional on a Place, but required on a MappablePlace.
expectTypeOf<Place["coordinates"]>().toEqualTypeOf<Coordinates | undefined>();
expectTypeOf<MappablePlace["coordinates"]>().toEqualTypeOf<Coordinates>();

declare const all: readonly Place[];
const located = all.filter(hasCoordinates);
expectTypeOf(located).toEqualTypeOf<MappablePlace[]>();

// Filtering keeps the narrower type, so the map never sees an unlocated place.
expectTypeOf(filterPlaces(located, { query: "" })).toEqualTypeOf<
  MappablePlace[]
>();

// A place's département can only be paired with its own region.
const base = {
  title: "Albi",
  link: "https://www.youtube.com/watch?v=aaaaaaaaaaa",
  type: "",
  description: "",
} as const;

export const albi: Place = { ...base, department: "Tarn", region: "Occitanie" };

// @ts-expect-error -- Tarn is in Occitanie, not Bretagne
export const wrongRegion: Place = {
  ...base,
  department: "Tarn",
  region: "Bretagne",
};

export const notADepartment: Place = {
  ...base,
  // @ts-expect-error -- not a French département
  department: "Atlantis",
  region: "",
};

// @ts-expect-error -- a département needs its region
export const noRegion: Place = { ...base, department: "Tarn", region: "" };

// A region alone, or nothing at all, is allowed: some places have no reliable position.
export const regionOnly: Place = {
  ...base,
  department: "",
  region: "Bretagne",
};
export const unknown: Place = { ...base, department: "", region: "" };

// @ts-expect-error -- the fields themselves are required
export const forgotten: Place = { ...base };

declare const raw: string;
if (isSortOrder(raw)) expectTypeOf(raw).toEqualTypeOf<SortOrder>();
