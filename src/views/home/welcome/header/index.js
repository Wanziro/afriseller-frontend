import { Container } from "@mui/material";
import React from "react";

function Header() {
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
              <li>Login</li>
              <li>
                <button>Get Started</button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
