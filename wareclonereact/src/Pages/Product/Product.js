import React from "react";
import ProductComponent from "./ProductComponent/ProductComponent";
import productImg from "../../assets/img/laptop.png";
import styles from "./Product.module.css";
import clsx from "clsx";

const Product = () => {
  console.log(styles);
  return (
    <div className={clsx(styles["product-container"])}>
      <ProductComponent width={"300px"} imgSrc={productImg} />
    </div>
  );
};

export default Product;
