import React from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import styles from "./Login.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const Login = () => {
  const user = useSelector((state) => state.user);

  return user.username ? (
    <Navigate to="/" />
  ) : (
    <div className="container-width">
      <header>
        <h1 className={styles.title}>Login to your account</h1>
      </header>
      <LoginComponent />
    </div>
  );
};

export default Login;
