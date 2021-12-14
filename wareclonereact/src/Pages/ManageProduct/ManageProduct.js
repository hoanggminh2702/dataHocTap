import React from "react";
import ManageProductComponent from "./ManageProductComponent/ManageProductComponent";
import { Routes as Switch, Route } from "react-router-dom";

const ManageProduct = () => {
  return (
    <Switch>
      <Route index element={<ManageProductComponent />} />
    </Switch>
  );
};

export default ManageProduct;
