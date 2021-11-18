/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import styles from "./Login.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Login = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  });
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
