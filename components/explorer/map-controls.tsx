"use client";

import { Maximize2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PlaceMapApi } from "@/components/place-map/types";
import { cn } from "@/lib/utils";

function ControlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            // Solid in both themes: the outline variant is translucent in dark mode,
            // and `!` is needed to win over its `dark:bg-input/30`.
            className="bg-background shadow-md hover:bg-muted dark:bg-background! dark:hover:bg-muted! pointer-coarse:size-11"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}

type MapControlsProps = {
  api: PlaceMapApi | null;
  onFit: () => void;
  /**
   * A place popup is open. On compact screens there is no room for the
   * popup and these buttons together (and touch users pinch to zoom), so the
   * controls fade out while it is open.
   */
  popupOpen: boolean;
};

/** Zoom and re-frame controls, replacing Leaflet's default zoom buttons. */
export function MapControls({ api, onFit, popupOpen }: MapControlsProps) {
  const disabled = api === null;

  return (
    <div
      // Offsets include the safe-area insets so nothing hides under a notch or home indicator.
      className={cn(
        "fixed right-[max(0.75rem,env(safe-area-inset-right))] bottom-[calc(2.25rem+env(safe-area-inset-bottom))] z-10 flex flex-col gap-2 transition-opacity md:right-[max(1rem,env(safe-area-inset-right))]",
        popupOpen && "compact:pointer-events-none compact:opacity-0",
      )}
    >
      <ButtonGroup orientation="vertical" aria-label="Zoom">
        <ControlButton
          label="Zoom in"
          disabled={disabled}
          onClick={() => api?.zoomIn()}
        >
          <Plus />
        </ControlButton>
        <ControlButton
          label="Zoom out"
          disabled={disabled}
          onClick={() => api?.zoomOut()}
        >
          <Minus />
        </ControlButton>
      </ButtonGroup>
      <ControlButton label="Fit all places" disabled={disabled} onClick={onFit}>
        <Maximize2 />
      </ControlButton>
    </div>
  );
}
