import clsx from "clsx";
import React from "react";
import styles from "../ProductComponent.module.css";
const ButtonComponent = ({ children, btnOnClick, ...props }) => {
  return (
    <button
      className={clsx(styles.btn, styles["btn-hover"])}
      {...props}
      onClick={btnOnClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
