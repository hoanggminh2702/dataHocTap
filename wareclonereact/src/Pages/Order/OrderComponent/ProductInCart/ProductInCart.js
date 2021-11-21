import clsx from "clsx";
import React from "react";
import styles from "./ProductInCart.module.css";
const ProductInCart = ({ orders }) => {
  return (
    <table className={styles.container}>
      <thead className={clsx(styles.header)}>
        <tr className={clsx(styles["title-row"])}>
          <th>STT</th>
          <th>Hình ảnh</th>
          <th>Thông tin</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody className={clsx(styles.content)}>
        {orders.map((product, index) => {
          return (
            <tr key={index} className={clsx(styles["content-row"])}>
              <td className={styles.td}>{index}</td>
              <td className={clsx(styles["content-img-container"])}>
                <img
                  className={clsx(styles["content-img"])}
                  src={product.img}
                  alt=""
                />
              </td>
              <td className={styles.td}>
                <div className={styles["product-info"]}>
                  <span className={styles["product-name"]}>{product.name}</span>
                  <span className={styles["product-type"]}>{product.type}</span>
                </div>
              </td>
              <td className={styles.td}>{product.quantity}</td>
              <td className={styles.td}>{`${product.total}$`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductInCart;
