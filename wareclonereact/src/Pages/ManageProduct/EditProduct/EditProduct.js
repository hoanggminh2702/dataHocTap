import React from "react";
import { useParams } from "react-router";
import FormProduct from "../FormProduct/FormProduct";

const EditProduct = () => {
  const { id } = useParams();

  return <FormProduct action="edit" id={id} />;
};

export default EditProduct;
