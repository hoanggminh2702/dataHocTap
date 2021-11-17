import clsx from "clsx";

import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeUser } from "../../../../slice/accountSlice.js";
import { useSelector } from "react-redux";

const Menu = ({ isDisplay, onClick }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    if (user?.username) {
      const action = removeUser();
      dispatch(action);
    }
    onClick();
  };
  return (
    <div className={styles.container}>
      {isDisplay && <div className={styles.overlay} onClick={onClick}></div>}
      <div
        className={clsx(styles["menu-container"], {
          [styles.slideIn]: isDisplay,
        })}
      >
        <ul className={clsx(styles["menu-list"])}>
          <li className={clsx(styles["menu-item"])}>
            <Link
              style={{
                display: "block",
                width: "260px",
                height: "50px",
                textDecoration: "none",
                color: "white",
              }}
              to="/"
              onClick={onClick}
            >
              <span className={clsx(styles["menu-item-text"])}>Home</span>
            </Link>
          </li>
          <li className={clsx(styles["menu-item"])}>
            <Link
              style={{
                display: "block",
                width: "260px",
                height: "50px",
                textDecoration: "none",
                color: "white",
              }}
              to="#"
            >
              <span className={clsx(styles["menu-item-text"])}>Categories</span>
            </Link>
          </li>
          <li
            className={clsx(styles["menu-item"])}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Link
              style={{
                display: "block",
                width: "260px",
                height: "50px",
                textDecoration: "none",
                color: "white",
              }}
              to="/login"
              onClick={onClick}
            >
              <span className={clsx(styles["menu-item-text"])}>
                {user?.username ? user.username : "Login"}
              </span>
            </Link>
          </li>
          <li className={clsx(styles["menu-item"])}>
            <Link
              style={{
                display: "block",
                width: "260px",
                height: "50px",
                textDecoration: "none",
                color: "white",
              }}
              onClick={handleLogOut}
              to={user?.username ? "/login" : ""}
            >
              <span className={clsx(styles["menu-item-text"])}>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
