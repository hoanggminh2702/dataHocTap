import clsx from "clsx";
import { useDispatch } from "react-redux";

import styles from "./Menu.module.css";
import logout, { logOut, setUser } from "../../../../features/userSlice";

const Menu = ({ isDisplay, onClick }) => {
  const dispatch = useDispatch();
  console.log(logout);
  return (
    <div className={styles.container}>
      {isDisplay && <div className={styles.overlay} onClick={onClick}></div>}
      <div
        className={clsx(styles["menu-container"], {
          [styles.slideIn]: isDisplay,
        })}
      >
        <ul className={clsx(styles["menu-list"])}>
          <li className={clsx(styles["menu-item"])}>Home</li>
          <li className={clsx(styles["menu-item"])}>Categories</li>
          <li className={clsx(styles["menu-item"])}>Login</li>
          <li
            className={clsx(styles["menu-item"])}
            onClick={() => {
              dispatch(logOut());
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
