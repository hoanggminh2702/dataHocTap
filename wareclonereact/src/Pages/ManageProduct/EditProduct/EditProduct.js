import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import productApi from "../../../api/productApi";
import FormProduct from "../FormProduct/FormProduct";

const EditProduct = () => {
  const { id } = useParams();
  let product = useSelector((state) =>
    state.products.data.find((product) => {
      return product._id == id;
    })
  );
  if (!product) {
    productApi.get(id).then((res) => {
      product = res.product;
    });
  }
  return <FormProduct product={product} />;
};

export default EditProduct;
