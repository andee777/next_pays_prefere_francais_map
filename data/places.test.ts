import { describe, expect, it } from "vitest";

import { groupByLetter, sortPlaces } from "@/lib/place-utils";
import { hasCoordinates, isInMetropolitanFrance, placeId } from "@/lib/place";

import { places } from "./places";

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
