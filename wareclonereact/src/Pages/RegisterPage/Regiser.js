import React from "react";
import RegisterComponent from "./RegisterComponent/RegisterComponent";
import styles from "../LoginPage/Login.module.css";

const Regiser = () => {
  return (
    <div className="container-width">
      <header>
        <h1 className={styles.title}>Register Your Account</h1>
      </header>
      <RegisterComponent />
    </div>
  );
};

export default Regiser;
