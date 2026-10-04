import { describe, expect, it } from "vitest";

import type { Territory } from "./departments";
import {
  hasCoordinates,
  isInMetropolitanFrance,
  placeId,
  placeLocation,
  placeThumbnail,
  type MappablePlace,
  type Place,
} from "./place";

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
    link: "https://www.youtube.com/watch?v=aIpaeTkgR_0",
    type: "",
    description: "",
    ...overrides,
    ...territory,
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

describe("placeLocation", () => {
  it("shows the département and its region", () => {
    expect(
      placeLocation(make({}, { department: "Tarn", region: "Occitanie" })),
    ).toBe("Tarn · Occitanie");
  });

  it("shows just the region when the département is unknown", () => {
    expect(
      placeLocation(make({}, { department: "", region: "Bretagne" })),
    ).toBe("Bretagne");
  });

  it("shows an overseas département once, since it is its own region", () => {
    expect(
      placeLocation(
        make({}, { department: "La Réunion", region: "La Réunion" }),
      ),
    ).toBe("La Réunion");
  });

  it("is empty when nothing is known", () => {
    expect(placeLocation(make())).toBe("");
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
