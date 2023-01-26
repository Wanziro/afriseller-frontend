import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../scss/login.scss";

function Login() {
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
          <h2>Welcome to Afriseller</h2>
          <p>Login to continue</p>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Enter your email"
                disabled={isSubmitting}
                type="text"
                name="email"
                ref={emailRef}
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
            {submissionError != "" && (
              <div className="alert alert-danger mt-2">{submissionError}</div>
            )}
            {isSubmitting ? (
              <button type="button" disabled={true}>
                <div className="sk-spinner sk-spinner-pulse"></div>
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
        </div>
      </div>
    </div>
  );
}

export default Login;
