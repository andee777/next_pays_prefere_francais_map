import { describe, expect, it } from "vitest";

import { regionOf } from "@/lib/departments";
import { groupByLetter, sortPlaces } from "@/lib/place-utils";
import { hasCoordinates, isInMetropolitanFrance, placeId } from "@/lib/place";

import { places } from "./places";

/** What a geocoder returns when it finds nothing: roughly the centre of France. */
const PLACEHOLDER = "46,2";

/** Places that are really in Belgium: no French département or region. */
const OUTSIDE_FRANCE = [
  "Arrivée en Belgique",
  "En route pour les grottes de Han",
];

describe("places data", () => {
  it("is not empty", () => {
    expect(places.length).toBeGreaterThan(0);
  });

  it("gives every place a title, with no stray whitespace in any text", () => {
    for (const place of places) {
      const label = `"${place.title}"`;
      expect(place.title, label).not.toBe("");
      for (const text of [place.title, place.type, place.description]) {
        expect(text, label).toBe(text.trim());
      }
    }
  });

  it("uses YouTube watch URLs for links, optionally with a start time", () => {
    for (const { title, link } of places) {
      expect(link, title).toMatch(
        /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}(&t=\d+s)?$/,
      );
    }
  });

  it("features each video once, so a video id identifies a place", () => {
    const ids = places.map(placeId);
    expect(ids.every((id) => id.length === 11)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has coordinates that are numbers, ordered [lat, lng], within French territory", () => {
    for (const place of places.filter(hasCoordinates)) {
      const [lat, lng] = place.coordinates;
      const label = `"${place.title}" (${lat}, ${lng})`;
      // From Réunion to the north of France, and from Guyane to Réunion.
      expect(lat, label).toBeGreaterThanOrEqual(-22);
      expect(lat, label).toBeLessThanOrEqual(52);
      expect(lng, label).toBeGreaterThanOrEqual(-62);
      expect(lng, label).toBeLessThanOrEqual(56);
    }
  });

  it("is mostly metropolitan, which also catches swapped coordinates", () => {
    const located = places.filter(hasCoordinates);
    const metropolitan = located.filter(isInMetropolitanFrance);
    expect(metropolitan.length / located.length).toBeGreaterThan(0.95);
  });

  it("has enough located places for a useful map", () => {
    expect(places.filter(hasCoordinates).length).toBeGreaterThan(500);
  });

  it("files the located places into unique alphabetical sections, either way", () => {
    const located = places.filter(hasCoordinates);
    for (const order of ["az", "za"] as const) {
      const letters = groupByLetter(sortPlaces(located, order)).map(
        (group) => group.letter,
      );
      expect(new Set(letters).size, order).toBe(letters.length);
    }
  });
});

describe("places data: département and region", () => {
  const credible = places
    .filter(hasCoordinates)
    .filter((place) => place.coordinates.join(",") !== PLACEHOLDER)
    .filter((place) => !OUTSIDE_FRANCE.includes(place.title));

  it("pairs every département with its own region", () => {
    // The compiler checks this too; this guards data that gets cast or generated.
    for (const place of places) {
      if (place.department) {
        expect(place.region, place.title).toBe(regionOf(place.department));
      }
    }
  });

  it("knows the region of every place with a credible position", () => {
    for (const place of credible)
      expect(place.region, place.title).not.toBe("");
  });

  it("knows the département of nearly every place with a credible position", () => {
    // A few are region-only on purpose: their marker sits in the wrong region.
    const known = credible.filter((place) => place.department !== "");
    expect(known.length / credible.length).toBeGreaterThan(0.98);
  });

  it.each([
    ["Albi", "Tarn", "Occitanie"],
    ["Mont Saint-Michel", "Manche", "Normandie"],
    ["Cargèse", "Corse-du-Sud", "Corse"],
    ["Ile de Sein", "Finistère", "Bretagne"],
    ["Houat Island", "Morbihan", "Bretagne"],
    ["Étretat", "Seine-Maritime", "Normandie"],
    ["Gruissan", "Aude", "Occitanie"],
    ["Rocamadour", "Lot", "Occitanie"],
    [
      "Moustiers Sainte-Marie",
      "Alpes-de-Haute-Provence",
      "Provence-Alpes-Côte d'Azur",
    ],
    ["Candes-Saint-Martin", "Indre-et-Loire", "Centre-Val de Loire"],
    ["Mussy-sur-Seine", "Aube", "Grand Est"],
    ["Hell-Bourg", "La Réunion", "La Réunion"],
    // Formerly pinned at the centre of France.
    ["Le viaduc de Gabarit", "Cantal", "Auvergne-Rhône-Alpes"],
    ["Le jardin des Songes", "Haut-Rhin", "Grand Est"],
    ["Les jardins de la Boirie", "Charente-Maritime", "Nouvelle-Aquitaine"],
    ["Les jardins du couvent Saint-François", "Haute-Corse", "Corse"],
    [
      "La Bergerie, graine et Ficelle",
      "Alpes-Maritimes",
      "Provence-Alpes-Côte d'Azur",
    ],
  ] as const)("puts %s in %s (%s)", (title, department, region) => {
    const matches = places.filter((place) => place.title === title);
    expect(matches.length, title).toBeGreaterThan(0);
    for (const place of matches) {
      expect(place.department).toBe(department);
      expect(place.region).toBe(region);
    }
  });

  it("gives places outside France neither a département nor a region", () => {
    for (const title of OUTSIDE_FRANCE) {
      const place = places.find((candidate) => candidate.title === title);
      expect(place, title).toBeDefined();
      expect(place?.department, title).toBe("");
      expect(place?.region, title).toBe("");
    }
  });

  it("does not add places pinned at the placeholder position", () => {
    // 40 places still sit at [46, 2], the centre of France: their position was
    // never found and their videos name no place (23 of the videos are gone).
    // Don't add more; fix their coordinates and lower this number.
    const pinned = places.filter(
      (place) => place.coordinates?.join(",") === PLACEHOLDER,
    );
    expect(pinned.length).toBeLessThanOrEqual(40);
  });
});
