import {
  init as initSpatialNav,
  setKeyMap as setSpatialNavKeyMap,
} from "@noriginmedia/norigin-spatial-navigation";
import type { ReactNode } from "react";
import type { SystemApi } from "../system/types";
import { SPATIAL_NAV_KEY_MAP } from "../nav/keys";

initSpatialNav({
  debug: false,
  visualDebug: false,
  nativeMode: false,
});
setSpatialNavKeyMap(SPATIAL_NAV_KEY_MAP);

type Props = {
  system: SystemApi;
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <>{children}</>;
}
