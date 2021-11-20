/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import styles from "./Login.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const Login = () => {
  const user = useSelector((state) => state.user?.role);
  console.log("render");
  return (
    <>
      {user === "admin" ? (
        <Navigate to="/manageproduct" />
      ) : user === "staff" ? (
        <Navigate to="/" />
      ) : (
        <div className="container-width">
          <header>
            <h1 className={styles.title}>Login to your account</h1>
          </header>
          <LoginComponent />
        </div>
      )}
    </>
  );
};

export default Login;
