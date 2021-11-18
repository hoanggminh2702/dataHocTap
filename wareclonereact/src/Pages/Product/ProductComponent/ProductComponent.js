import clsx from "clsx";
import React from "react";
import ButtonComponent from "./ButtonComponent/ButtonComponent";
import styles from "./ProductComponent.module.css";

const ProductComponent = (props) => {
  return (
    <div className={clsx(styles.product, styles["product-hover"])}>
      <img
        src={props.productInfo.productImg}
        alt=""
        className={styles["product-img"]}
      />

      <div className={clsx(styles["product-details"])}>
        <div className={styles["product-details-left"]}>
          <span
            className={clsx(
              styles["product-details-info"],
              styles["product-name"]
            )}
          >
            {props.productInfo.type}
          </span>
          <span
            className={clsx(
              styles["product-details-info"],
              styles["product-desc"]
            )}
          >
            {props.productInfo.name}
          </span>
        </div>
        <div className={clsx(styles["product-details-right"])}>
          <span className={clsx(styles["product-price"])}>1999$</span>
        </div>
      </div>
      <div className={clsx(styles["btn-container"])}>
        {props.btns.map((btn, index) => (
          <ButtonComponent key={index} btnOnClick={btn.onClick}>
            {btn.title}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
