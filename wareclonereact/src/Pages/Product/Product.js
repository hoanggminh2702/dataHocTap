import React from "react";
import ProductComponent from "./ProductComponent/ProductComponent";
import styles from "./Product.module.css";
import clsx from "clsx";

const Product = (props) => {
  console.log(styles);

  return (
    <div className={clsx(styles["product-container"])}>
      <ProductComponent {...props} />
    </div>
  );
};

export default Product;
