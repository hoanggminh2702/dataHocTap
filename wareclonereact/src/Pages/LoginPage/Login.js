import React from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import styles from "./Login.module.css";
const Login = () => {
  return (
    <div className="container-width">
      <header>
        <h1 className={styles.title}>Login to your account</h1>
      </header>
      <LoginComponent />
    </div>
  );
};

export default Login;
