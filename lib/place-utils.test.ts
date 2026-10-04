import { describe, expect, it } from "vitest";

import type { Territory } from "./departments";
import type { Place } from "./place";
import {
  DEFAULT_FILTERS,
  filterPlaces,
  groupByRegion,
  hasActiveFilters,
  highlightRanges,
  isSortOrder,
  matchesQuery,
  normalize,
  sortPlaces,
  tokenize,
} from "./place-utils";

type Fields = Partial<
  Pick<Place, "title" | "link" | "type" | "description" | "coordinates">
>;

/** A complete place. The département and region come as a pair: see `Territory`. */
function make(
  overrides: Fields = {},
  territory: Territory = { department: "", region: "" },
): Place {
  return {
    title: "Lieu",
    link: "https://www.youtube.com/watch?v=aaaaaaaaaaa",
    type: "",
    description: "",
    ...overrides,
    ...territory,
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

  it("finds a place by its département or its region", () => {
    const located = make(
      { title: "Albi" },
      { department: "Tarn", region: "Occitanie" },
    );
    for (const query of ["tarn", "occitanie", "TARN occitanie", "albi tarn"]) {
      expect(matchesQuery(located, query), query).toBe(true);
    }
    expect(matchesQuery(located, "bretagne")).toBe(false);
  });

  it("matches accented names without accents", () => {
    const place = make(
      {},
      { department: "Drôme", region: "Auvergne-Rhône-Alpes" },
    );
    expect(matchesQuery(place, "drome")).toBe(true);
    const paris = make({}, { department: "", region: "Île-de-France" });
    expect(matchesQuery(paris, "ile de france")).toBe(true);
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

describe("groupByRegion", () => {
  const albi = make(
    { title: "Albi" },
    { department: "Tarn", region: "Occitanie" },
  );
  const carcassonne = make(
    { title: "Carcassonne" },
    { department: "Aude", region: "Occitanie" },
  );
  const quimper = make(
    { title: "Quimper" },
    { department: "Finistère", region: "Bretagne" },
  );
  const sainteChapelle = make(
    { title: "Sainte-Chapelle" },
    { department: "Paris", region: "Île-de-France" },
  );
  const hellBourg = make(
    { title: "Hell-Bourg" },
    { department: "La Réunion", region: "La Réunion" },
  );
  const lost = make({ title: "Nulle part" });

  const summary = (groups: ReturnType<typeof groupByRegion>) =>
    groups.map((group) => [group.region, titles(group.places)]);

  it("puts all the places of a region together, even when not adjacent", () => {
    expect(summary(groupByRegion([albi, quimper, carcassonne], "az"))).toEqual([
      ["Bretagne", ["Quimper"]],
      ["Occitanie", ["Albi", "Carcassonne"]],
    ]);
  });

  it("keeps the input order inside a region", () => {
    const groups = groupByRegion([carcassonne, quimper, albi], "az");
    expect(titles(groups[1]?.places ?? [])).toEqual(["Carcassonne", "Albi"]);
  });

  it("orders regions alphabetically, ignoring accents, and reverses for Z to A", () => {
    const all = [albi, hellBourg, sainteChapelle, quimper];
    expect(groupByRegion(all, "az").map((g) => g.region)).toEqual([
      "Bretagne",
      "Île-de-France",
      "La Réunion",
      "Occitanie",
    ]);
    expect(groupByRegion(all, "za").map((g) => g.region)).toEqual([
      "Occitanie",
      "La Réunion",
      "Île-de-France",
      "Bretagne",
    ]);
  });

  it("puts places with an unknown region last, in either direction", () => {
    for (const order of ["az", "za"] as const) {
      const groups = groupByRegion([lost, albi, quimper], order);
      expect(groups.at(-1)?.region, order).toBe("");
      expect(titles(groups.at(-1)?.places ?? []), order).toEqual([
        "Nulle part",
      ]);
    }
  });

  it("returns nothing for no places", () => {
    expect(groupByRegion([], "az")).toEqual([]);
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
