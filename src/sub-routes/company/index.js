import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));
const Quizes = lazy(() => import("../../views/company-dashboard/quizes"));
const AddQuize = lazy(() => import("../../views/company-dashboard/add-quize"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/dashboard/quizes", name: "Dashboard", element: Quizes },
  { path: "/dashboard/addquize", name: "Dashboard", element: AddQuize },
];

export default routes;
