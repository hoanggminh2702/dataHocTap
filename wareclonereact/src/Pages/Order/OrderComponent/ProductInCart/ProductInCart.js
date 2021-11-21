import clsx from "clsx";
import React from "react";
import styles from "./ProductInCart.module.css";
const ProductInCart = (props) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.stt)}>1</div>
      <div className={clsx(styles["img-container"])}>
        <img
          className={clsx(styles["img"])}
          src="https://phucanhcdn.com/media/product/38475_aspire_a315_56_ha1.jpg"
          alt=""
        />
      </div>
      <div className={clsx(styles["info-container"])}>
        <p className={clsx(styles["product-name"])}>Tên</p>
        <span className={clsx(styles["product-type"])}>Loại</span>
      </div>
      <div className={clsx(styles["quantity-container"])}>
        <input value="1" className={clsx(styles["product-quantity"])} />
        <div className={clsx(styles["btn-container"])}>
          <button className={clsx(styles["btn"])}>Tăng</button>
          <button className={clsx(styles["btn"])}> Giảm</button>
        </div>
      </div>
      <div className={clsx(styles["price-container"])}>
        <span className={clsx(styles["product-price"])}>Price</span>
      </div>
    </div>
  );
};

export default ProductInCart;
