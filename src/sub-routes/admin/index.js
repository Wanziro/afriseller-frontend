import React from "react";

const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const Users = React.lazy(() => import("../../views/admin/users"));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/dashboard/users", name: "Theme", element: Users, exact: true },
];

export default routes;
