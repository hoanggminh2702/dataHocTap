import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { remove } from "../../features/ordersSlice";
import { logOut } from "../../features/userSlice";
import styles from "./User.module.css";

const User = ({ setIsDisplayLogOut, mount, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    setIsDisplayLogOut(false);
    dispatch(logOut());
    dispatch(remove());
    navigate("/login");
  };
  return (
    <div
      className={clsx(styles.container, styles[mount])}
      style={{ ...props }}
      onClick={handleLogOut}
    >
      <div className={styles.btn}>
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default User;
