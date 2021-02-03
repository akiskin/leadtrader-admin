import { lazy } from "react";

import publicRoutes from "./public";

const routes = [
  ...publicRoutes,

  {
    path: "/",
    exact: true,
    main: lazy(() => import("pages/Dashboard")),
  },
  {
    path: "/products",
    exact: true,
    main: lazy(() => import("pages/Products")),
  },
];

export default routes;
