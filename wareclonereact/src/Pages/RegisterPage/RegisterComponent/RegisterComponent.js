/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import React from "react";
import { useState } from "react";
import {
  fullnameCheck,
  passwordCheck,
  showValidateMessage,
  usernameCheck,
} from "../../../utils/validate";

import userApi from "../../../api/userApi";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router";

import styles from "../../LoginPage/LoginComponent/LoginComponent.module.css";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    password: "",
    address: "",
  });

  const [message, setMessage] = useState({
    username: "",
    fullname: "",
    password: "",
  });

  const handleOnchange = (e) => {
    if (message[e.target.name] !== "" && e.target.name !== "fullname") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (
      usernameCheck(user.username) &&
      passwordCheck(user.password) &&
      fullnameCheck(user.fullname)
    ) {
      userApi
        .create({
          username: user.username.toLowerCase(),
          password: user.password.trim(),
          fullname: user.fullname.trim(),
          address: user.address,
        })
        .then((res) => {
          console.log(res.user);
          alert("Đăng ký thành công");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          alert("Đăng ký thất bại");
        });
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
        {/* username  */}
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
        {/* fullname */}
        <div className={clsx(styles["form-group"])}>
          <label htmlFor="fullname" className={clsx(styles.label)}>
            Full Name
          </label>
          <input
            className={clsx(styles.input, styles["input-focus"])}
            value={user.fullname}
            type="text"
            name="fullname"
            onChange={handleOnchange}
          />
        </div>
        <p className={clsx(styles.message)}>{message.fullname}</p>

        {/* password  */}
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

        {/* address  */}
        <div className={clsx(styles["form-group"])}>
          <label htmlFor="address" className={clsx(styles.label)}>
            Address
          </label>
          <input
            className={clsx(styles.input, styles["input-focus"])}
            value={user.address}
            type="text"
            name="address"
            onChange={handleOnchange}
          />
        </div>
        <p className={clsx(styles.message)}></p>
        <button className={clsx(styles.btn)}>
          <span>Sign in</span>
        </button>
      </form>
      <div className={clsx(styles["create-link-container"])}>
        <Link to="/login" className={clsx(styles["create-link"])}>
          Already have an account? Log in instead!
        </Link>
      </div>
    </div>
  );
};

export default RegisterComponent;
