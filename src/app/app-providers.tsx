import { init as initSpatialNav } from "@noriginmedia/norigin-spatial-navigation";
import type { ReactNode } from "react";
import type { SystemApi } from "../system/types";

initSpatialNav({
  debug: false,
  visualDebug: false,
  nativeMode: false,
});

type Props = {
  system: SystemApi;
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <>{children}</>;
}
