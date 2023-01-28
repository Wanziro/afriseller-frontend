import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer } from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "src/constants/colors";
import "../../scss/header.scss";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="cmpHeader">
      <CContainer>
        <div className="header-contents">
          <div className="logo-container" onClick={() => navigate("/")}>
            <img src={require("../../assets/logo.png")} />
            <h1>Afriseller</h1>
          </div>
          <div className="header-menu">
            <ul>
              <li>Home</li>
              <li>Pricing</li>
              <li>About</li>
              <li>Contact us</li>
              <li onClick={() => navigate("/login")}>Login</li>
              <li>
                <button onClick={() => navigate("/register")}>
                  Get Started
                </button>
              </li>
              <li>
                <CIcon icon={cilSearch} color={APP_COLORS.WHITE} size="lg" />
              </li>
            </ul>
          </div>
        </div>
      </CContainer>
    </div>
  );
}

export default Header;
