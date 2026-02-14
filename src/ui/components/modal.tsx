import React, { useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { pushBackHandler } from "../../tv/back-handler";
import { logFocusableDebugTable } from "../focus/debug";

function ModalCloseButton({ onClose }: { onClose: () => void }) {
  const {
    ref,
    focused,
    focusKey,
  } = useFocusable({ onEnterPress: onClose });

  useEffect(() => {
    if (!focused) return;
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    logFocusableDebugTable(el, focusKey);
  }, [focused, focusKey, ref]);

  return (
    <div
      ref={ref as any}
      role="button"
      tabIndex={-1}
      onClick={onClose}
      data-focusable-item="true"
      data-focus-key={focusKey}
      className={[
        "rounded-[10px] bg-neutral-800 px-3 py-2 text-tv-body transition duration-150",
        focused
          ? "scale-[1.03] outline-4 outline-white"
          : "outline-4 outline-transparent",
      ].join(" ")}
    >
      Close
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const {
    ref,
    focusSelf,
    focusKey,
    focused,
  } = useFocusable({
    focusKey: "MODAL_ROOT",
    isFocusBoundary: true,
  });

  useEffect(() => {
    // Focus modal when it appears
    focusSelf();
  }, [focusSelf]);

  useEffect(() => {
    // BACK closes modal and consumes the event
    return pushBackHandler(() => {
      onClose();
      return true;
    });
  }, [onClose]);

  useEffect(() => {
    if (!focused) return;
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    logFocusableDebugTable(el, focusKey);
  }, [focused, focusKey, ref]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65">
      <div
        ref={ref as any}
        data-focusable-item="true"
        data-focus-key={focusKey}
        className="w-[70vw] max-w-[900px] rounded-[18px] bg-neutral-950 p-6 outline-4 outline-white/20"
      >
        <div className="mb-4 flex justify-between">
          <h2 className="m-0 text-tv-title">{title}</h2>
          <ModalCloseButton onClose={onClose} />
        </div>

        {children}
      </div>
    </div>
  );
}
