import { cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CRow } from "@coreui/react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_COLORS } from "src/constants/colors";
import "../../scss/register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register-main-container">
      <div className="contents-container">
        <CRow>
          <CCol md={6} className="shadow">
            <div className="description-container">
              <Link to="/">
                <div className="logo-container shadow">
                  <img
                    src={require("../../assets/logo.png")}
                    alt="logo"
                    style={{ width: 50 }}
                  />
                </div>
              </Link>
              <h1 className="text-white">Afriseller</h1>
              <p className="text-white text-center">
                Create a free user account to get started with our services
              </p>
            </div>
          </CCol>
          <CCol md={6} className="form-main-container shadow">
            <h3>Sign up</h3>
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label>Names</label>
                <input
                  className="form-control"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  type="text"
                  name="names"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  type="email"
                  name="email"
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="error">{emailErrorMessage}</span>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  type="text"
                  name="phone"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="error">{emailErrorMessage}</span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  ref={passwordRef}
                  disabled={isSubmitting}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="error">{passwordErrorMessage}</span>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  disabled={isSubmitting}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="error">{passwordErrorMessage}</span>
              </div>
              {isSubmitting ? (
                <button type="button" disabled={true}>
                  <div className="sk-spinner sk-spinner-pulse"></div>
                  &nbsp; Sign up...
                </button>
              ) : (
                <button type="submit">Sign up</button>
              )}
              <hr />
              <div className="text-center">
                <span>Already have an account?</span>
                <Link
                  style={{ color: APP_COLORS.DARK_GREEN, paddingLeft: 5 }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
              <div className="text-center mt-2">
                <Link to="/" style={{ color: APP_COLORS.DARK_GREEN }}>
                  <CIcon icon={cilHome} /> Go Back To Home
                </Link>
              </div>
            </form>
          </CCol>
        </CRow>
      </div>
    </div>
  );
}

export default Register;
