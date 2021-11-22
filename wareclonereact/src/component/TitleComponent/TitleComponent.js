import React from "react";
import styles from "./TitleComponent.module.css";

const TitleComponent = ({ title, ...props }) => {
  return (
    <h1 className={styles.header} style={{ ...props }}>
      {title}
    </h1>
  );
};

export default TitleComponent;
