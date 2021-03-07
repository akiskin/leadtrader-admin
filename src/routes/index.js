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
  {
    path: "/leads",
    exact: true,
    main: lazy(() => import("pages/Leads")),
  },
  {
    path: "/leads/:id",
    main: lazy(() => import("pages/Lead")),
  },
  {
    path: "/clients",
    exact: true,
    main: lazy(() => import("pages/Clients")),
  },
  {
    path: "/clients/:id",
    main: lazy(() => import("pages/Client")),
  },
  {
    path: "/tools",
    exact: true,
    main: lazy(() => import("pages/Tools")),
  },
];

export default routes;
