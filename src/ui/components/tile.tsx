import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export function Tile({ label }: { label: string }) {
  const { ref, focused } = useFocusable();

  return (
    <div
      ref={ref as any}
      style={{
        padding: 16,
        borderRadius: 12,
        outline: focused ? "4px solid white" : "4px solid transparent",
      }}
    >
      {label}
    </div>
  );
}
