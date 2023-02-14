import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
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
    component: CNavGroup,
    name: "System Users",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Users List",
        to: "/dashboard/users",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Companies",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "View All",
        to: "/dashboard/companies",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Quizes",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "active Quizes",
        to: "/dashboard/activequizes",
      },
      {
        component: CNavItem,
        name: "Past Quizes",
        to: "/dashboard/pastquizes",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Transactions",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "View All",
        to: "/dashboard/transactions",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Ads",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Manage ads",
        to: "/dashboard/ads",
      },
      {
        component: CNavItem,
        name: "Add New Ad",
        to: "/dashboard/addnewad",
      },
    ],
  },
];

export default _nav;
