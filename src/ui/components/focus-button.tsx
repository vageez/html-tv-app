import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { logFocusableDebugTable } from "../focus/debug";

type FocusButtonProps = {
  label: string;
  onPress: () => void;
  focusKey?: string;
};

export function FocusButton({ label, onPress, focusKey }: FocusButtonProps) {
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
      role="button"
      tabIndex={-1}
      onClick={onPress}
      data-focusable-item="true"
      data-focus-key={resolvedFocusKey}
      className={[
        "inline-flex cursor-pointer items-center justify-center rounded-xl px-3.5 py-2.5 text-tv-body text-neutral-900 transition duration-150",
        focused
          ? "scale-[1.03] bg-neutral-100 font-bold outline-4 outline-white shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_10px_20px_rgba(0,0,0,0.35)]"
          : "bg-neutral-300 font-semibold outline-4 outline-transparent",
      ].join(" ")}
    >
      {label}
    </div>
  );
}
