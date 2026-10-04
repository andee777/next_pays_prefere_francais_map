import { describe, expect, it } from "vitest";

import {
  hasCoordinates,
  isInMetropolitanFrance,
  placeId,
  placeThumbnail,
  type MappablePlace,
  type Place,
} from "./place";

function make(overrides: Partial<Place> = {}): Place {
  return {
    title: "Lieu",
    link: "https://www.youtube.com/watch?v=aIpaeTkgR_0",
    type: "",
    description: "",
    ...overrides,
  };
}

function mappable(lat: number, lng: number): MappablePlace {
  return { ...make(), coordinates: [lat, lng] };
}

describe("placeId / placeThumbnail", () => {
  it("takes the video id from the link", () => {
    expect(placeId(make())).toBe("aIpaeTkgR_0");
    expect(
      placeId(make({ link: "https://www.youtube.com/watch?v=-CdNQIv5Tso" })),
    ).toBe("-CdNQIv5Tso");
  });

  it("ignores a start-time parameter", () => {
    const place = make({
      link: "https://www.youtube.com/watch?v=nHX7NMzEEM4&t=2034s",
    });
    expect(placeId(place)).toBe("nHX7NMzEEM4");
  });

  it("is empty for a malformed link", () => {
    expect(
      placeId(make({ link: "https://www.youtube.com/watch?v=short" })),
    ).toBe("");
    expect(
      placeThumbnail(make({ link: "https://www.youtube.com/watch?v=short" })),
    ).toBe("");
  });

  it("builds YouTube's thumbnail URL from the id", () => {
    expect(placeThumbnail(make())).toBe(
      "https://i.ytimg.com/vi/aIpaeTkgR_0/hqdefault.jpg",
    );
  });
});

describe("hasCoordinates", () => {
  it("tells located places from unlocated ones", () => {
    expect(hasCoordinates(make())).toBe(false);
    expect(hasCoordinates(make({ coordinates: [48.85, 2.35] }))).toBe(true);
  });

  it("keeps a place at the equator or the prime meridian", () => {
    expect(hasCoordinates(make({ coordinates: [0, 0] }))).toBe(true);
  });
});

describe("isInMetropolitanFrance", () => {
  it("includes the mainland and Corsica", () => {
    expect(isInMetropolitanFrance(mappable(48.8566, 2.3522))).toBe(true); // Paris
    expect(isInMetropolitanFrance(mappable(42.15, 9.1))).toBe(true); // Corsica
    expect(isInMetropolitanFrance(mappable(48.4, -4.5))).toBe(true); // Brittany
    expect(isInMetropolitanFrance(mappable(43.3, 5.4))).toBe(true); // Marseille
  });

  it("excludes the overseas territories", () => {
    expect(isInMetropolitanFrance(mappable(-21.1151, 55.5364))).toBe(false); // La Réunion
    expect(isInMetropolitanFrance(mappable(16.265, -61.551))).toBe(false); // Guadeloupe
    expect(isInMetropolitanFrance(mappable(3.617, -53.2))).toBe(false); // Guyane
  });
});
