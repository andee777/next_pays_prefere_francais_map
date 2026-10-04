import { icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { StaticImageData } from "next/image";

import selectedMarkerIcon from "./marker-icon-red.png";

// Turbopack resolves an image imported from node_modules (Leaflet's own marker
// images) to a plain URL string, but a project image to a StaticImageData
// object. Accept both so the icons work whichever way the bundler resolves them.
const assetUrl = (asset: string | StaticImageData) =>
  typeof asset === "string" ? asset : asset.src;

// Leaflet's built-in icon URL detection breaks under bundlers, so icons are
// built explicitly from the imported image assets.
const createIcon = (iconAsset: string | StaticImageData) =>
  icon({
    iconUrl: assetUrl(iconAsset),
    shadowUrl: assetUrl(markerShadow),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

export const defaultIcon = createIcon(markerIcon);
export const selectedIcon = createIcon(selectedMarkerIcon);
