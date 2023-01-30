import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
];

export default routes;
