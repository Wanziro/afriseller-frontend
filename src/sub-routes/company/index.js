import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));
const Quizes = lazy(() => import("../../views/company-dashboard/quizes"));
const AddQuize = lazy(() => import("../../views/company-dashboard/add-quize"));
const Questionbanks = lazy(() =>
  import("../../views/company-dashboard/questionbanks")
);
const CompanyServices = lazy(() =>
  import("../../views/company-dashboard/company-services")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/dashboard/quizes", name: "Quizes", element: Quizes },
  { path: "/dashboard/addquize", name: "AddQuize", element: AddQuize },
  {
    path: "/dashboard/questionbanks",
    name: "QuestionBanks",
    element: Questionbanks,
  },
  {
    path: "/dashboard/services",
    name: "CompanyServices",
    element: CompanyServices,
  },
];

export default routes;
