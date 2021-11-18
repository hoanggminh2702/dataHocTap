import clsx from "clsx";
import React from "react";
import styles from "./ProductComponent.module.css";

const ProductComponent = (props) => {
  return (
    <div
      className={clsx(styles.product, styles["product-hover"])}
      style={{ width: props.width }}
    >
      <img src={props.imgSrc} alt="" className={styles["product-img"]} />

      <div className={styles["product-details"]}>
        <span
          className={clsx(
            styles["product-details-info"],
            styles["product-name"]
          )}
        >
          Tên
        </span>
        <span
          className={clsx(
            styles["product-details-info"],
            styles["product-desc"]
          )}
        >
          Mô tả
        </span>
      </div>
      <div className={clsx(styles["btn-container"])}>
        <button
          className={clsx(styles.btn, styles["btn-hover"], styles["btn-buy"])}
        >
          Buy
        </button>
        <button
          className={clsx(
            styles.btn,
            styles["btn-hover"],
            styles["btn-details"]
          )}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductComponent;
