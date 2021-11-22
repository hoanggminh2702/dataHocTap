import React, { useMemo } from "react";
import ProductInCart from "./ProductInCart/ProductInCart";
import styles from "./OrderComponent.module.css";
import clsx from "clsx";
import TitleComponent from "../../../component/TitleComponent/TitleComponent";
import orderApi from "../../../api/orderApi";

import { useNavigate } from "react-router";
import { remove } from "../../../features/ordersSlice";
import { useDispatch } from "react-redux";

const OrderComponent = ({ orders = [], user }) => {
  const totalPrice = useMemo(() => {
    return orders.reduce((acc, cur) => {
      return acc + Number(cur.total);
    }, 0);
  }, [orders]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePay = (e) => {
    const payload = {
      username: user.username,
      boughtAt: new Date(),
      products: orders.map((product) => {
        return {
          _id: product._id,
          name: product.name,
          quantity: product.quantity,
          total: product.total,
        };
      }),
    };
    if (["staff", "admin"].includes(user.role)) {
      orderApi
        .create(payload, user.token)
        .then((res) => {
          alert("Thành công");
          dispatch(remove());
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Thất bại");
        });
    } else {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
    }
  };
  return orders.length && ["staff", "admin"].includes(user.role) ? (
    <div className={clsx(styles.container)}>
      <TitleComponent title={"Giỏ hàng của bạn"} />
      <ProductInCart orders={orders} />
      <div className={styles["total-container"]}>
        <span className={styles["total-title"]}>Tổng tiền:</span>
        <span className={styles["total"]}>{`${
          totalPrice.toFixed(2) || 0
        }$`}</span>
      </div>
      <div className={styles["btn-container"]}>
        <button className={clsx(styles["btn"])} onClick={() => navigate("/")}>
          Trở về trang chủ
        </button>
        <button className={clsx(styles["btn"])} onClick={handlePay}>
          Thanh toán
        </button>
      </div>
    </div>
  ) : (
    <TitleComponent
      title={"Bạn chưa cho vào giỏ mặt hàng nào hoặc chưa đăng nhập"}
    />
  );
};

export default OrderComponent;
