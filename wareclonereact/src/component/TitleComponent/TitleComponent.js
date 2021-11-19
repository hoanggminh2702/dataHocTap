import React from "react";
import styles from "./TitleComponent.module.css";

const TitleComponent = ({ title }) => {
  return <h1 className={styles.header}>{title}</h1>;
};

export default TitleComponent;
