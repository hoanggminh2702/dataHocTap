import React from "react";
import ProductInCart from "./ProductInCart/ProductInCart";
import styles from "./OrderComponent.module.css";
import clsx from "clsx";

const OrderComponent = () => {
  return (
    <div className={clsx(styles.container)}>
      <ProductInCart />
    </div>
  );
};

export default OrderComponent;
