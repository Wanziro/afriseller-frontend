import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  const { token, role, hasACompany } = useSelector((state) => state.user);
  return !token || token.trim() === "" ? (
    children
  ) : role === "admin" || hasACompany ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/" />
  );
};

export default UnProtectedRoute;
