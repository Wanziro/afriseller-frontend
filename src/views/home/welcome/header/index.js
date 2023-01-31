import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { token, hasACompany } = useSelector((state) => state.user);
  return (
    <div className="app-header">
      <Container>
        <div className="main-container">
          <div className="logo-container">
            <img src={require("../../../../assets/logo.png")} />
            <h1>Afriseller</h1>
          </div>
          <div className="header-menu">
            <ul>
              <li>Home</li>
              <li>Pricing</li>
              <li>About</li>
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
                <li onClick={() => navigate("/dashboard")}>Dashboard</li>
              ) : (
                <li>
                  <button onClick={() => navigate("/registercompany")}>
                    Register Company
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
