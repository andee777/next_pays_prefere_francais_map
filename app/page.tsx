import { PlaceExplorer } from "@/components/explorer/place-explorer";
import { places } from "@/data/places";
import { hasCoordinates } from "@/lib/place";

// A place without coordinates can't be shown on the map, so the app leaves it out.
const mappablePlaces = places.filter(hasCoordinates);

export default function Home() {
  return <PlaceExplorer places={mappablePlaces} />;
}
