import React, { useEffect } from "react";
import {
  FocusContext,
  doesFocusableExist,
  setFocus,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

type FocusScopeProps = {
  focusKey: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  trackChildren?: boolean;
  preferredChildFocusKey?: string;
  initialFocusKey?: string;
  maxFocusAttempts?: number;
};

export function FocusScope({
  focusKey,
  children,
  className,
  style,
  trackChildren = true,
  preferredChildFocusKey,
  initialFocusKey,
  maxFocusAttempts = 10,
}: FocusScopeProps) {
  const { ref, focusKey: scopeFocusKey, focusSelf } = useFocusable({
    focusKey,
    trackChildren,
    preferredChildFocusKey,
  });

  useEffect(() => {
    focusSelf();

    if (!initialFocusKey) return;

    let frame = 0;
    let attempts = 0;

    const applyInitialFocus = () => {
      if (doesFocusableExist(initialFocusKey)) {
        setFocus(initialFocusKey);
        return;
      }

      if (attempts < maxFocusAttempts) {
        attempts += 1;
        frame = window.requestAnimationFrame(applyInitialFocus);
      }
    };

    frame = window.requestAnimationFrame(applyInitialFocus);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [focusSelf, initialFocusKey, maxFocusAttempts]);

  return (
    <FocusContext.Provider value={scopeFocusKey}>
      <div ref={ref as any} className={className} style={style}>
        {children}
      </div>
    </FocusContext.Provider>
  );
}
