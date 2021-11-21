import React from "react";
import ProductComponent from "./ProductComponent/ProductComponent";
import styles from "./Product.module.css";
import clsx from "clsx";

const Product = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.productInfo.id)}
      className={clsx(styles["product-container"])}
      style={{ zIndex: "1" }}
    >
      <ProductComponent {...props} />
    </div>
  );
};

export default Product;
