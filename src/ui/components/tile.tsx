import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

type TileProps = {
  label: string;
  onPress?: () => void;
  focusKey?: string;
};

export function Tile({ label, onPress, focusKey }: TileProps) {
  const { ref, focused } = useFocusable({ onEnterPress: onPress, focusKey });

  return (
    <div
      ref={ref as any}
      onClick={onPress}
      className={[
        "flex h-[120px] w-[220px] items-center justify-center rounded-[14px] text-tv-body-lg text-white transition duration-150",
        onPress ? "cursor-pointer" : "cursor-default",
        focused
          ? "scale-[1.04] bg-neutral-600 font-bold outline-4 outline-white shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_12px_24px_rgba(0,0,0,0.45)]"
          : "bg-neutral-700 font-medium outline-4 outline-transparent",
      ].join(" ")}
    >
      {label}
    </div>
  );
}
