import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import productApi from "../../../api/productApi";
import FormProduct from "../FormProduct/FormProduct";

const EditProduct = () => {
  const { id } = useParams();

  return <FormProduct action="edit" id={id} />;
};

export default EditProduct;
