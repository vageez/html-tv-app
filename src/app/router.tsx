import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import type { SystemApi } from "../system/types";
import { AppLayout } from "./layout";

// lazy screens (keeps startup smaller)
const HomeScreen = React.lazy(() => import("../screens/home"));
const DetailsScreen = React.lazy(() => import("../screens/detail"));
export function AppRouter({ system }: { system: SystemApi }) {
  const routes = [
    {
      path: "/",
      element: <AppLayout system={system} />,
      children: [
        { index: true, element: <HomeScreen /> },
        { path: "details/:id", element: <DetailsScreen /> },
      ],
    },
  ];

  // Hosted web: real URLs. Packaged TV: hash URLs (more reliable).
  const router = React.useMemo(
    () =>
      system.platform === "browser"
        ? createBrowserRouter(routes)
        : createHashRouter(routes),
    [system.platform],
  );

  return <RouterProvider router={router} />;
}
