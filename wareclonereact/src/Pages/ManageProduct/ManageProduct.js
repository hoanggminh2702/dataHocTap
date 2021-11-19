import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useMatch } from "react-router";
import ManageProductComponent from "./ManageProductComponent/ManageProductComponent";
import { Routes as Switch, Route } from "react-router-dom";
import FormProduct from "./FormProduct/FormProduct";

const ManageProduct = () => {
  const isAdmin = useSelector((state) => state.user?.role);

  return (
    <Switch>
      <Route index element={<ManageProductComponent />} />
    </Switch>
  );
};

export default ManageProduct;
