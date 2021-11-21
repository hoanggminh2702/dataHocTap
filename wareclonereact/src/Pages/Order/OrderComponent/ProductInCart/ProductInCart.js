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
        <tr className={clsx(styles["content-row"])}>
          <td className={styles.td}>1</td>
          <td className={clsx(styles["content-img-container"])}>
            <img
              className={clsx(styles["content-img"])}
              src="https://product.hstatic.net/1000026716/product/tuf_gaming_f15_fx506hcb_hn139t_0409646a9fd94cdabfaef2cf14f555a8.png"
              alt=""
            />
          </td>
          <td className={styles.td}>
            <div className={styles["product-info"]}>
              <span className={styles["product-name"]}>
                MacBook Air M1 2020
              </span>
              <span className={styles["product-type"]}>LAPTOP</span>
            </div>
          </td>
          <td className={styles.td}>1</td>
          <td className={styles.td}>1600$</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductInCart;
