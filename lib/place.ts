/** `[latitude, longitude]`, latitude first. */
export type Coordinates = readonly [lat: number, lng: number];

/**
 * A YouTube watch URL. It may carry extra query parameters, such as a start
 * time (`&t=2034s`).
 */
export type YouTubeLink = `https://www.youtube.com/watch?v=${string}`;

/**
 * One place featured in a video. Unknown text is an empty string, never omitted.
 * Names are not unique (several videos can share a title), so use `placeId`
 * to tell places apart.
 */
export type Place = Readonly<{
  /** Name of the place, as titled on the video. */
  title: string;
  link: YouTubeLink;
  /** The series, region or department the video belongs to. Free text, `""` if unknown. */
  type: string;
  /** Short tagline. `""` if there is none. */
  description: string;
  /** Absent while the place has not been located; such places stay off the map. */
  coordinates?: Coordinates;
}>;

/** A place that can be put on the map. */
export type MappablePlace = Place & Readonly<{ coordinates: Coordinates }>;

/** The YouTube video id: unique per place, stable, and safe in a URL. */
export type PlaceId = string;

export function hasCoordinates(place: Place): place is MappablePlace {
  return place.coordinates !== undefined;
}

const VIDEO_ID = /[?&]v=([\w-]{11})/;
const ids = new WeakMap<Place, PlaceId>();

/** The video id taken from the place's link (`""` if the link is malformed). */
export function placeId(place: Place): PlaceId {
  let id = ids.get(place);
  if (id === undefined) {
    id = VIDEO_ID.exec(place.link)?.[1] ?? "";
    ids.set(place, id);
  }
  return id;
}

/** YouTube's own thumbnail for the place's video, `""` if there is no video id. */
export function placeThumbnail(place: Place): string {
  const id = placeId(place);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

/**
 * Roughly metropolitan France, Corsica included. The map opens framed on the
 * places inside it, because overseas places would otherwise zoom it out to the
 * whole world.
 */
const METROPOLITAN_FRANCE = {
  south: 41,
  north: 51.5,
  west: -5.5,
  east: 10,
} as const;

export function isInMetropolitanFrance({
  coordinates,
}: MappablePlace): boolean {
  const [lat, lng] = coordinates;
  return (
    lat >= METROPOLITAN_FRANCE.south &&
    lat <= METROPOLITAN_FRANCE.north &&
    lng >= METROPOLITAN_FRANCE.west &&
    lng <= METROPOLITAN_FRANCE.east
  );
}
