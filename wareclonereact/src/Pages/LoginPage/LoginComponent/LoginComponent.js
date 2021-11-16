/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from "clsx";
import { passwordCheck, usernameCheck } from "../../../utils/validate";
import React, { useState } from "react";
import styles from "./LoginComponent.module.css";

const LoginComponent = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    username: "",
    password: "",
  });

  const showValidateMessage = (e) => {
    switch (e.target.name) {
      case "username":
        if (!usernameCheck(e.target.value)) {
          setMessage((prev) => {
            return {
              ...prev,
              [e.target.name]: `${e.target.name} không hợp lệ`,
            };
          });
        } else {
          setMessage((prev) => {
            return {
              ...prev,
              [e.target.name]: "",
            };
          });
        }
        break;
      case "password":
        if (!passwordCheck(e.target.value)) {
          setMessage((prev) => {
            return {
              ...prev,
              [e.target.name]: `${e.target.name} không hợp lệ`,
            };
          });
        } else {
          setMessage((prev) => {
            return {
              ...prev,
              [e.target.name]: "",
            };
          });
        }
        break;
      default:
    }
  };

  const handleOnchange = (e) => {
    if (message[e.target.name] !== "") {
      console.log(e);
      setMessage({ ...message, [e.target.name]: "" });
    }
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnBlur = (e) => {
    showValidateMessage(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameCheck(user.username) && passwordCheck(user.password)) {
      alert("Login Thành Công");
    } else {
      showValidateMessage(e);
    }
  };

  return (
    <div className={clsx(styles["form-container"])}>
      <form
        className={clsx(styles.form)}
        onSubmit={handleSubmit}
        onBlur={handleOnBlur}
      >
        <div className={clsx(styles["form-group"])}>
          <label htmlFor="username" className={clsx(styles.label)}>
            Username
          </label>
          <input
            className={clsx(styles.input, styles["input-focus"])}
            value={user.username}
            type="text"
            name="username"
            onChange={handleOnchange}
          />
        </div>
        <p className={clsx(styles.message)}>{message.username}</p>
        <div className={clsx(styles["form-group"])}>
          <label htmlFor="password" className={clsx(styles.label)}>
            Password
          </label>
          <input
            className={clsx(styles.input, styles["input-focus"])}
            value={user.password}
            type="password"
            name="password"
            onChange={handleOnchange}
          />
        </div>
        <p className={clsx(styles.message)}>{message.password}</p>
        <button className={clsx(styles.btn)}>
          <span>Sign in</span>
        </button>
      </form>
      <div className={clsx(styles["create-link-container"])}>
        <a href="#" className={clsx(styles["create-link"])}>
          No account? Create one here
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
