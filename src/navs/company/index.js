import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAppsSettings,
  cilBell,
  cilGraph,
  cilNewspaper,
  cilPencil,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Our Services",
    to: "/dashboard/services",
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Subscriptions",
    to: "/dashboard/subscriptions",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Quizes",
    to: "/dashboard/quizes",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Quizes",
        to: "/dashboard/quizes",
      },
      {
        component: CNavItem,
        name: "Question Banks(QB)",
        to: "/dashboard/questionbanks",
      },
      {
        component: CNavItem,
        name: "QB Answers",
        to: "/dashboard/qbanswers",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Quize Results",
    to: "/dashboard/quizes",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Results",
        to: "/dashboard/quizeresults",
      },
    ],
  },
];

export default _nav;
