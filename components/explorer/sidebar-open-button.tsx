"use client";

import { PanelLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

/** Floating pill that brings the sidebar back once it is collapsed (or on mobile). */
export function SidebarOpenButton({ count }: { count: number }) {
  const { state, isMobile, toggleSidebar } = useSidebar();
  if (!isMobile && state === "expanded") return null;

  return (
    <Button
      variant="outline"
      onClick={toggleSidebar}
      aria-label="Open place list"
      // The delay lets the sidebar finish sliding out before the pill fades in.
      className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-10 h-10 animate-in gap-2 rounded-full bg-background pr-3 pl-3.5 shadow-lg delay-150 duration-200 fade-in-0 fill-mode-backwards dark:bg-background! dark:hover:bg-muted! pointer-coarse:h-11"
    >
      <PanelLeft />
      Places
      <Badge variant="secondary" className="tabular-nums">
        {count}
      </Badge>
    </Button>
  );
}
