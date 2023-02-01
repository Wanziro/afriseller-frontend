import { cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "src/constants/app";
import { APP_COLORS } from "src/constants/colors";
import { errorHandler, toastMessage } from "src/helpers";
import "../../scss/login.scss";
import {
  setUserEmail,
  setUserHasACompany,
  setUserId,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "src/actions/user";

const initialState = { emailOrPhone: "", password: "" };
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(BACKEND_URL + "/users/login/", state)
      .then((res) => {
        setIsSubmitting(false);
        const { userId, email, role, phone, hasACompany, names, token } =
          res.data;
        dispatch(setUserId(userId));
        dispatch(setUserEmail(email));
        dispatch(setUserRole(role));
        dispatch(setUserPhone(phone));
        dispatch(setUserHasACompany(hasACompany));
        dispatch(setUserNames(names));
        dispatch(setUserToken(token));
        toastMessage("success", "Logged in successful");
        if (hasACompany || role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  return (
    <div className="login-main-container">
      <div className="login-background-container">
        <div></div>
        <div></div>
      </div>
      <div className="form-main-container">
        <Link to="/">
          <img
            src={require("../../assets/logo.png")}
            alt="logo"
            style={{ width: 50 }}
          />
        </Link>

        <div className="form-container">
          <h2>Welcome to KITMESSAGE</h2>
          <p>Login to continue</p>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Email Or Phone</label>
              <input
                className="form-control"
                placeholder="Enter your email or phone number"
                disabled={isSubmitting}
                type="text"
                name="email"
                value={state.emailOrPhone}
                onChange={(e) =>
                  setState({ ...state, emailOrPhone: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                required
              />
            </div>
            {isSubmitting ? (
              <button type="button" disabled={true}>
                <CSpinner size="sm" />
                &nbsp; Logging in...
              </button>
            ) : (
              <button type="submit">Login</button>
            )}
          </form>
          <div className="forget-password-container">
            <Link to="#">Forget password?</Link>
          </div>
          <hr />
          <div className="form-footer2">
            <span>New?</span>
            <Link to="/register">CREATE ACCOUNT</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/" style={{ color: APP_COLORS.DARK_GREEN }}>
              <CIcon icon={cilHome} /> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
