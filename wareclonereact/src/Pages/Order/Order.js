import React from "react";
import { useSelector } from "react-redux";
import OrderComponent from "./OrderComponent/OrderComponent";

const Order = () => {
  const orders = useSelector((state) => state.orders?.orders);
  const user = useSelector((state) => state.user);

  return (
    <div orders={orders} user={user}>
      <OrderComponent />
    </div>
  );
};

export default Order;
