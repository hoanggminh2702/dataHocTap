import React from "react";
import { useSelector } from "react-redux";

const EditProduct = () => {
  const isAdmin = useSelector((state) => state.user?.role == "admin");

  return <div></div>;
};

export default EditProduct;
