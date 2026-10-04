import { describe, expect, it } from "vitest";

import { DEPARTMENTS, regionOf } from "./departments";

describe("DEPARTMENTS", () => {
  it("lists France's 101 départements: 96 in the metropole and 5 overseas", () => {
    expect(DEPARTMENTS).toHaveLength(101);
    expect(DEPARTMENTS.filter((d) => d.code.length === 3)).toHaveLength(5);
  });

  it("has unique codes and unique names", () => {
    expect(new Set(DEPARTMENTS.map((d) => d.code)).size).toBe(
      DEPARTMENTS.length,
    );
    expect(new Set(DEPARTMENTS.map((d) => d.name)).size).toBe(
      DEPARTMENTS.length,
    );
  });

  it("splits the metropole into the 13 regions with their known sizes", () => {
    const sizes = new Map<string, number>();
    for (const { code, region } of DEPARTMENTS) {
      if (code.length === 3) continue;
      sizes.set(region, (sizes.get(region) ?? 0) + 1);
    }
    expect(Object.fromEntries(sizes)).toEqual({
      "Auvergne-Rhône-Alpes": 12,
      "Bourgogne-Franche-Comté": 8,
      Bretagne: 4,
      "Centre-Val de Loire": 6,
      Corse: 2,
      "Grand Est": 10,
      "Hauts-de-France": 5,
      "Île-de-France": 8,
      Normandie: 5,
      "Nouvelle-Aquitaine": 12,
      Occitanie: 13,
      "Pays de la Loire": 5,
      "Provence-Alpes-Côte d'Azur": 6,
    });
  });

  it("makes each overseas département its own region", () => {
    for (const { code, name, region } of DEPARTMENTS) {
      if (code.length === 3) expect(region, name).toBe(name);
    }
  });
});

describe("regionOf", () => {
  it("finds the region of a département", () => {
    expect(regionOf("Tarn")).toBe("Occitanie");
    expect(regionOf("Finistère")).toBe("Bretagne");
    expect(regionOf("Corse-du-Sud")).toBe("Corse");
    expect(regionOf("La Réunion")).toBe("La Réunion");
  });
});
