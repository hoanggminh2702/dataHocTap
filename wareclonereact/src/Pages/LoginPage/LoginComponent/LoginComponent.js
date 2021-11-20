/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import {
  passwordCheck,
  usernameCheck,
  showValidateMessage,
} from "../../../utils/validate";
import React, { useState } from "react";
import styles from "./LoginComponent.module.css";
import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";
import { setUser as setUserr } from "../../../features/userSlice";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const dispatch = useDispatch();
  console.log("login component rerender");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    username: "",
    password: "",
  });

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
    showValidateMessage(e.target, setMessage);
  };

  // Đoạn này target là btn do đó không trỏ vào các ô input nên phải làm thêm 1 bước nữa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameCheck(user.username) && passwordCheck(user.password)) {
      try {
        const resUser = await userApi.login({
          username: user.username.toLowerCase(),
          password: user.password,
        });
        const action = setUserr(resUser);
        dispatch(action);

        alert("Đăng nhập thành công");
      } catch (err) {
        alert("Đăng nhập thất bại");
      }
    } else {
      Array.from(e.target.querySelectorAll("input")).forEach((input) => {
        showValidateMessage(input, setMessage);
      });
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
        <Link to="/register" className={clsx(styles["create-link"])}>
          No account? Create one here
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
