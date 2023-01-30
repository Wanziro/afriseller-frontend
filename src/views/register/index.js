import { cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CRow, CSpinner } from "@coreui/react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_COLORS } from "src/constants/colors";
import { toastMessage } from "src/helpers";
import "../../scss/register.scss";

const initialState = {
  names: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
};
function Register() {
  const [state, setState] = useState(initialState);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password.length < 4) {
      toastMessage("error", "Password minimun characters must be 4.");
    } else if (state.password !== state.passwordConfirm) {
      toastMessage("error", "Passwords do not match.");
    }
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
              <img
                src={require("../../assets/get-started.png")}
                alt=""
                style={{ width: "100%", borderRadius: 10 }}
              />
            </div>
          </CCol>
          <CCol md={6} className="form-main-container shadow">
            <h3>Sign up</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label>Names</label>
                <input
                  className="form-control"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  type="text"
                  name="names"
                  value={state.names}
                  required
                  onChange={(e) => changeHandler(e)}
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
                  value={state.email}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  type="text"
                  name="phone"
                  value={state.phone}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={state.password}
                  disabled={isSubmitting}
                  name="password"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={state.passwordConfirm}
                  disabled={isSubmitting}
                  name="passwordConfirm"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              {isSubmitting ? (
                <button type="button" disabled={true}>
                  <CSpinner size="sm" />
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
