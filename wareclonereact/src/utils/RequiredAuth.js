import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const RequiredAuth = ({ children }) => {
  const user = useSelector((state) => state?.user?.role);
  return user ? children : <Navigate to="/" />;
};

export default RequiredAuth;
