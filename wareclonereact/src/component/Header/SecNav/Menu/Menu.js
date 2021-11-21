import clsx from "clsx";
import { useDispatch } from "react-redux";

import styles from "./Menu.module.css";
import { logOut } from "../../../../features/userSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { remove } from "../../../../features/ordersSlice";

const Menu = ({ isDisplay, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state?.user?.username);

  return (
    <div className={styles.container}>
      {isDisplay && <div className={styles.overlay} onClick={onClick}></div>}
      <div
        className={clsx(styles["menu-container"], {
          [styles.slideIn]: isDisplay,
        })}
      >
        <ul className={clsx(styles["menu-list"])}>
          <li
            className={clsx(styles["menu-item"])}
            onClick={() => {
              onClick();
              navigate("/");
            }}
          >
            Home
          </li>
          <li className={clsx(styles["menu-item"])}>Categories</li>
          <li
            className={clsx(styles["menu-item"])}
            onClick={
              !username
                ? () => {
                    onClick();
                    navigate("/login");
                  }
                : () => {}
            }
          >
            {username || "Login"}
          </li>
          <li
            className={clsx(styles["menu-item"])}
            onClick={() => {
              dispatch(logOut());
              dispatch(remove());
              onClick();
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
