"use client";

import { VideoOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type PlaceThumbnailProps = {
  src: string;
  alt: string;
  sizes: string;
  /** `contain` letterboxes the image instead of cropping it, and shows no skeleton. */
  fit?: "cover" | "contain";
  /** Skip the image optimizer. For the hundreds of small thumbnails in the list. */
  unoptimized?: boolean;
};

/** YouTube's real `hqdefault.jpg` is 480×360; its placeholder for a missing video is 120×90. */
const PLACEHOLDER_MAX_WIDTH = 120;

/**
 * A YouTube thumbnail that fills its (positioned) parent. While it loads, a
 * skeleton sits behind it. Videos that were removed or made private answer 404,
 * and for those a "video unavailable" icon replaces the image instead of leaving
 * the skeleton pulsing forever.
 *
 * Two signals mark a missing video. The image optimizer turns the upstream 404
 * into an error (`onError`). Fetched directly, YouTube sends the 404 with a grey
 * placeholder image as its body, which a browser displays as a successful load,
 * so a tiny image counts as missing too.
 */
export function PlaceThumbnail({
  src,
  alt,
  sizes,
  fit = "cover",
  unoptimized = false,
}: PlaceThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label="Video unavailable"
        className="absolute inset-0 grid place-items-center bg-muted text-muted-foreground"
      >
        <VideoOff aria-hidden />
      </span>
    );
  }

  return (
    <>
      {/* A letterboxed image leaves bare areas, so there the backdrop is the placeholder. */}
      {fit === "cover" && (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={unoptimized}
        className={fit === "cover" ? "object-cover" : "object-contain"}
        onError={() => setFailed(true)}
        onLoad={(event) => {
          if (event.currentTarget.naturalWidth <= PLACEHOLDER_MAX_WIDTH) {
            setFailed(true);
          }
        }}
      />
    </>
  );
}
