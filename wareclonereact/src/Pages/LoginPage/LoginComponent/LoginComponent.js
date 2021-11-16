/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from "clsx";
import React, { useState } from "react";
import Input from "../../../component/Input/Input";
import styles from "./LoginComponent.module.css";

const LoginComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="form-container">
      <form action="">
        <div className="form-group">
          <label htmlFor="Email" className="email-label">
            Email
          </label>
          <Input
            type="text"
            rule="email"
            name="input"
            onChange={handleOnChange}
            required
            className={{
              input: clsx(styles["email-input"]),
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password" className="password-label">
            Password
          </label>
          <Input
            type="password"
            rule="password"
            name="password"
            onChange={handleOnChange}
            required
            className={{
              input: clsx(styles["email-input"]),
            }}
          />
        </div>
        <button className="login-btn">Sign in</button>
      </form>
      <div className="create-link-container">
        <a href="#" className="create-link">
          No account? Create one here
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
