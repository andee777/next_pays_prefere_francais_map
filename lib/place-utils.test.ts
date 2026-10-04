import { describe, expect, it } from "vitest";

import type { Place } from "./place";
import {
  DEFAULT_FILTERS,
  filterPlaces,
  groupByLetter,
  hasActiveFilters,
  highlightRanges,
  isSortOrder,
  matchesQuery,
  normalize,
  placeLetter,
  sortPlaces,
  tokenize,
} from "./place-utils";

function make(overrides: Partial<Place> = {}): Place {
  return {
    title: "Lieu",
    link: "https://www.youtube.com/watch?v=aaaaaaaaaaa",
    type: "",
    description: "",
    ...overrides,
  };
}

const titles = (places: readonly Place[]) => places.map((place) => place.title);

describe("normalize / tokenize", () => {
  it("strips diacritics, lowercases and collapses whitespace", () => {
    expect(normalize("  Île   de RÉ  ")).toBe("ile de re");
  });

  it("splits a query into normalized tokens", () => {
    expect(tokenize("Côte  d'Opale")).toEqual(["cote", "d'opale"]);
    expect(tokenize("   ")).toEqual([]);
  });
});

describe("matchesQuery", () => {
  const place = make({
    title: "Pont-Aven",
    type: "Région Bretagne",
    description: "Le village des peintres",
  });

  it("matches everything for an empty query", () => {
    expect(matchesQuery(place, "")).toBe(true);
    expect(matchesQuery(place, "   ")).toBe(true);
  });

  it("looks in the title, the series or region, and the description", () => {
    for (const query of ["pont-aven", "bretagne", "peintres"]) {
      expect(matchesQuery(place, query), query).toBe(true);
    }
  });

  it("ignores case and accents in both directions", () => {
    expect(matchesQuery(place, "REGION")).toBe(true);
    expect(matchesQuery(make({ title: "Île de Ré" }), "ile de re")).toBe(true);
    expect(matchesQuery(make({ title: "Ile de Re" }), "Île")).toBe(true);
  });

  it("requires every word to match, in any order", () => {
    expect(matchesQuery(place, "bretagne peintres")).toBe(true);
    expect(matchesQuery(place, "bretagne alsace")).toBe(false);
  });
});

describe("filterPlaces / hasActiveFilters", () => {
  const data = [
    make({ title: "Colmar", type: "Région Alsace" }),
    make({ title: "Quimper", type: "Région Bretagne" }),
    make({ title: "Strasbourg", type: "Région Alsace" }),
  ];

  it("returns everything with default filters", () => {
    expect(filterPlaces(data, DEFAULT_FILTERS)).toHaveLength(3);
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
  });

  it("filters by the search query and reports it as active", () => {
    const filters = { query: "alsace" };
    expect(titles(filterPlaces(data, filters))).toEqual([
      "Colmar",
      "Strasbourg",
    ]);
    expect(hasActiveFilters(filters)).toBe(true);
  });

  it("treats a blank query as no filter", () => {
    expect(hasActiveFilters({ query: "  " })).toBe(false);
  });
});

describe("sortPlaces", () => {
  const data = [
    make({ title: "Strasbourg" }),
    make({ title: "écrins" }),
    make({ title: "Albi" }),
    make({ title: "Étretat" }),
    make({ title: "Zonza" }),
  ];

  it("sorts A to Z, ignoring case and accents, without mutating the input", () => {
    expect(titles(sortPlaces(data, "az"))).toEqual([
      "Albi",
      "écrins",
      "Étretat",
      "Strasbourg",
      "Zonza",
    ]);
    expect(titles(data)[0]).toBe("Strasbourg");
  });

  it("sorts Z to A", () => {
    expect(titles(sortPlaces(data, "za"))).toEqual([
      "Zonza",
      "Strasbourg",
      "Étretat",
      "écrins",
      "Albi",
    ]);
  });

  it("puts numbers in numeric order", () => {
    const numbered = [make({ title: "Étape 10" }), make({ title: "Étape 2" })];
    expect(titles(sortPlaces(numbered, "az"))).toEqual(["Étape 2", "Étape 10"]);
  });

  it("keeps places with equal titles in their original order", () => {
    const first = make({ title: "Berry", description: "premier" });
    const second = make({ title: "Berry", description: "second" });
    expect(sortPlaces([first, second], "az")).toEqual([first, second]);
  });
});

describe("placeLetter / groupByLetter", () => {
  it("uses the first letter, ignoring accents and case", () => {
    expect(placeLetter(make({ title: "Écrins" }))).toBe("E");
    expect(placeLetter(make({ title: "île d'Yeu" }))).toBe("I");
  });

  it("files titles that do not start with a letter under #", () => {
    expect(placeLetter(make({ title: "1000 pays en un" }))).toBe("#");
    expect(placeLetter(make({ title: "🇫🇷 Discover France" }))).toBe("#");
    expect(placeLetter(make({ title: "" }))).toBe("#");
  });

  it("groups consecutive places by letter in the given order", () => {
    const groups = groupByLetter(
      sortPlaces(
        [
          make({ title: "Bayonne" }),
          make({ title: "Albi" }),
          make({ title: "Arles" }),
          make({ title: "1000 pays" }),
        ],
        "az",
      ),
    );
    expect(groups.map((g) => [g.letter, titles(g.places)])).toEqual([
      ["#", ["1000 pays"]],
      ["A", ["Albi", "Arles"]],
      ["B", ["Bayonne"]],
    ]);
  });
});

describe("isSortOrder", () => {
  it("accepts only the known sort orders", () => {
    expect(isSortOrder("az")).toBe(true);
    expect(isSortOrder("za")).toBe(true);
    for (const value of ["", "AZ", "newest", null, undefined, 1]) {
      expect(isSortOrder(value), String(value)).toBe(false);
    }
  });
});

describe("highlightRanges", () => {
  it("finds accent-insensitive matches and merges overlaps", () => {
    expect(highlightRanges("Éthiopie", "ethio")).toEqual([[0, 5]]);
    expect(highlightRanges("Mongolie Mongole", "mong")).toEqual([
      [0, 4],
      [9, 13],
    ]);
    expect(highlightRanges("abcdef", "abc cde")).toEqual([[0, 5]]);
  });

  it("returns nothing for an empty query or no match", () => {
    expect(highlightRanges("Mongolie", "")).toEqual([]);
    expect(highlightRanges("Mongolie", "xyz")).toEqual([]);
  });
});
