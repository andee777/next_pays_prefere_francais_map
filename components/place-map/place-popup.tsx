"use client";

import type { Popup as LeafletPopup } from "leaflet";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Popup, useMap } from "react-leaflet";

import { PlaceThumbnail } from "@/components/place-thumbnail";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { placeThumbnail, type Place } from "@/lib/place";
import { cn } from "@/lib/utils";
import { popupLayout, useViewportSize } from "@/lib/viewport";

export function PlacePopup({ place }: { place: Place }) {
  const map = useMap();
  const viewport = useViewportSize();
  const { width, horizontal } = popupLayout(viewport.width, viewport.height);
  const popupRef = useRef<LeafletPopup | null>(null);

  // Leaflet takes the popup width from these options when it lays the popup
  // out. They are only read from props at creation, so when the viewport
  // changes (rotation, resize) update them and re-layout the open popup.
  useEffect(() => {
    const popup = popupRef.current;
    if (!popup) return;
    popup.options.minWidth = width;
    popup.options.maxWidth = width;
    popup.update();
  }, [width]);

  const thumbnailUrl = placeThumbnail(place);

  // `contain` letterboxes instead of cropping: in the side-by-side layout the
  // thumbnail's column is nearly square, and cropping would cut off its caption.
  const thumbnail = (fit: "cover" | "contain") => (
    <PlaceThumbnail
      src={thumbnailUrl}
      alt={`Thumbnail of the video: ${place.title}`}
      sizes={`${width}px`}
      fit={fit}
    />
  );

  const closeButton = (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Close"
      className="pointer-coarse:size-10"
      onClick={() => map.closePopup()}
    >
      <X />
    </Button>
  );

  // Most places have neither a series label nor a tagline, so both are optional.
  const details =
    place.type || place.description ? (
      <>
        {place.type && (
          <div className="flex">
            <Badge variant="secondary" className="max-w-full">
              <span className="truncate">{place.type}</span>
            </Badge>
          </div>
        )}
        {place.description && (
          <p className="text-muted-foreground">{place.description}</p>
        )}
      </>
    ) : null;

  const watchButton = (
    <Button
      className="w-full pointer-coarse:h-10"
      nativeButton={false}
      render={<a href={place.link} target="_blank" rel="noopener noreferrer" />}
    >
      Watch video
      <ExternalLink data-icon="inline-end" />
    </Button>
  );

  return (
    <Popup
      ref={popupRef}
      className="place-popup"
      closeButton={false}
      // Panning is handled by the map bridge, which knows about the sidebar.
      autoPan={false}
      minWidth={width}
      maxWidth={width}
    >
      {horizontal ? (
        // Short, wide viewports (a phone held sideways): thumbnail beside the text.
        <Card
          size="sm"
          className="max-h-[calc(100dvh-5rem)] flex-row gap-0! overflow-y-auto py-0! shadow-lg"
          style={{ width }}
        >
          {thumbnailUrl && (
            <div className="relative w-2/5 shrink-0 self-stretch bg-black">
              {thumbnail("contain")}
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 pt-3">
            <CardHeader>
              <CardTitle className="text-base">{place.title}</CardTitle>
              <CardAction>{closeButton}</CardAction>
            </CardHeader>
            {details && (
              <CardContent className="flex flex-col gap-2">
                {details}
              </CardContent>
            )}
            <CardFooter className="mt-auto">{watchButton}</CardFooter>
          </div>
        </Card>
      ) : (
        <Card
          size="sm"
          // Capped so the popup can never be taller than the screen.
          className={cn(
            "max-h-[calc(100dvh-7rem)] overflow-y-auto shadow-lg",
            thumbnailUrl && "pt-0",
          )}
          style={{ width }}
        >
          {thumbnailUrl && (
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {thumbnail("cover")}
            </AspectRatio>
          )}
          <CardHeader>
            <CardTitle className="text-lg">{place.title}</CardTitle>
            <CardAction>{closeButton}</CardAction>
          </CardHeader>
          {details && (
            <CardContent className="flex flex-col gap-3">{details}</CardContent>
          )}
          <CardFooter>{watchButton}</CardFooter>
        </Card>
      )}
    </Popup>
  );
}
