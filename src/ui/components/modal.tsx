import React, { useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { pushBackHandler } from "../../tv/back-handler";

function ModalCloseButton({ onClose }: { onClose: () => void }) {
  const { ref, focused } = useFocusable({ onEnterPress: onClose });

  return (
    <div
      ref={ref as any}
      role="button"
      tabIndex={-1}
      onClick={onClose}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        fontSize: 18,
        background: "#222",
        outline: focused ? "4px solid white" : "4px solid transparent",
      }}
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
  const { ref, focusSelf } = useFocusable({
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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        ref={ref as any}
        style={{
          width: "70vw",
          maxWidth: 900,
          background: "#111",
          borderRadius: 18,
          padding: 24,
          outline: "4px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
          <ModalCloseButton onClose={onClose} />
        </div>

        {children}
      </div>
    </div>
  );
}
