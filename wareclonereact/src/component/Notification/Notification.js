import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Notification.module.css";

const Notification = (props) => {
  const countOrder = useSelector((state) =>
    state.orders.orders.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0)
  );

  return (
    <div className={clsx(styles.noti)} style={{ ...props }}>
      <p>{countOrder && countOrder}</p>
    </div>
  );
};

export default Notification;
