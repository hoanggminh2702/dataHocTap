import clsx from "clsx";

import styles from "./Menu.module.css";

const Menu = ({ isDisplay, onClick }) => {
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
          <li className={clsx(styles["menu-item"])}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
