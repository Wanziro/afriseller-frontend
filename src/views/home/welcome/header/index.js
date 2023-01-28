import { Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
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
              <li onClick={() => navigate("/login")}>Login</li>
              <li>
                <button onClick={() => navigate("/register")}>
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
