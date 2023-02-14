import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppHeaderDropdown } from "./header/index";
import { setShowSideBar } from "src/actions/app";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.app);
  const { role } = useSelector((state) => state.user);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setShowSideBar(!sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={require("../assets/logo.png")} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {role === "admin" ? (
            <span>
              <strong>KITMESSAGE MAIN ADMIN </strong>
            </span>
          ) : (
            <>
              <CNavItem>
                <CNavLink to="/dashboard" component={NavLink}>
                  Dashboard
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Settings</CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
