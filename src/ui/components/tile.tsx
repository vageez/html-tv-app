import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { logFocusableDebugTable } from "../focus/debug";

type TileProps = {
  label: string;
  onPress?: () => void;
  focusKey?: string;
};

export function Tile({ label, onPress, focusKey }: TileProps) {
  const {
    ref,
    focused,
    focusKey: resolvedFocusKey,
  } = useFocusable({ onEnterPress: onPress, focusKey });

  React.useEffect(() => {
    if (!focused) return;
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    logFocusableDebugTable(el, resolvedFocusKey);
  }, [focused, ref, resolvedFocusKey]);

  return (
    <div
      ref={ref as any}
      onClick={onPress}
      data-focusable-item="true"
      data-focus-key={resolvedFocusKey}
      className={[
        "mx-auto flex h-[120px] w-full max-w-[220px] items-center justify-center rounded-[14px] text-tv-body-lg text-white transition duration-150",
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
