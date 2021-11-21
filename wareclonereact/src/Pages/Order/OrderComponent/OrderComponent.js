import React from "react";
import ProductInCart from "./ProductInCart/ProductInCart";
import styles from "./OrderComponent.module.css";
import clsx from "clsx";
import TitleComponent from "../../../component/TitleComponent/TitleComponent";

const OrderComponent = ({ orders, user }) => {
  return (
    <div className={clsx(styles.container)}>
      <TitleComponent title={"Giỏ hàng của bạn"} />
      <ProductInCart orders={orders} />
      <div className={styles["total-container"]}>
        <span className={styles["total-title"]}>Tổng tiền:</span>
        <span className={styles["total"]}>1302$</span>
      </div>
      <div className={styles["btn-container"]}>
        <button className={clsx(styles["btn"])}>Trở về trang chủ</button>
        <button className={clsx(styles["btn"])}>Thanh toán</button>
      </div>
    </div>
  );
};

export default OrderComponent;
