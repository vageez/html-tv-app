import { useMemo } from "react";
import { AppProviders } from "./app/app-providers";
import type { SystemApi } from "./system/types";
import { AppRouter } from "./app/router";

const INITIAL_ROUTE = { name: "HOME" } as const;

export function App({ system }: { system: SystemApi }) {
  const initialRoute = useMemo(() => INITIAL_ROUTE, []);

  return (
    <AppProviders system={system}>
      <AppRouter system={system} />
    </AppProviders>
  );
}
