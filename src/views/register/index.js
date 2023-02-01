import { cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CRow, CSpinner } from "@coreui/react";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setUserEmail,
  setUserHasACompany,
  setUserId,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "src/actions/user";
import { BACKEND_URL } from "src/constants/app";
import { APP_COLORS } from "src/constants/colors";
import { errorHandler, toastMessage } from "src/helpers";
import "../../scss/register.scss";

const initialState = {
  names: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
};
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.password.length < 4) {
      toastMessage("error", "Password minimun characters must be 4.");
    } else if (state.password !== state.passwordConfirm) {
      toastMessage("error", "Passwords do not match.");
    } else {
      setIsSubmitting(true);
      axios
        .post(BACKEND_URL + "/users/register/", state)
        .then((res) => {
          setIsSubmitting(false);
          const { userId, email, role, phone, hasACompany, names, token } =
            res.data.user;
          dispatch(setUserId(userId));
          dispatch(setUserEmail(email));
          dispatch(setUserRole(role));
          dispatch(setUserPhone(phone));
          dispatch(setUserHasACompany(hasACompany));
          dispatch(setUserNames(names));
          dispatch(setUserToken(token));
          toastMessage("success", "User account created successfull");
          navigate("/");
        })
        .catch((error) => {
          setState({ ...state, password: "", passwordConfirm: "" });
          setIsSubmitting(false);
          errorHandler(error);
        });
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
              <h1 className="text-white">KITMESSAGE</h1>
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
            <form onSubmit={handleSubmit}>
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
                  required
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
                  required
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
                  required
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
                  required
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
