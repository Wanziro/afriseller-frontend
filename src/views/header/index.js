import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "src/constants/colors";
import "../../scss/header.scss";

function Header() {
  const { token, hasACompany } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="cmpHeader">
      <CContainer>
        <div className="header-contents">
          <div className="logo-container" onClick={() => navigate("/")}>
            <img src={require("../../assets/logo.png")} />
            <h1>KITMESSAGE</h1>
          </div>
          <div className="header-menu">
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li>Contact us</li>
              {token.trim() === "" ? (
                <>
                  <li onClick={() => navigate("/login")}>Login</li>
                  <li>
                    <button onClick={() => navigate("/register")}>
                      Get Started
                    </button>
                  </li>
                </>
              ) : hasACompany ? (
                <>
                  <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                  <li onClick={() => navigate("/logout")}>Logout</li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={() => navigate("/registercompany")}>
                      Register Company
                    </button>
                  </li>
                  <li onClick={() => navigate("/profile")}>My Profile</li>
                  <li onClick={() => navigate("/logout")}>Logout</li>
                </>
              )}
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
