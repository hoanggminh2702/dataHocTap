import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchAllProduct } from "../../../features/productSlice";
import Product from "../../Product/Product";
import styles from "./AllProductComponent.module.css";

const AllProductComponent = () => {
  const btns = [
    {
      title: "Buy",
      onClick: (e) => {
        console.log(e.target);
      },
    },
    {
      title: "Details",
      onClick: (e) => {
        console.log(e.target);
      },
    },
  ];
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products.map((product) => ({
      name: product.name,
      type: product.type,
      price: product.price,
      productImg: product.img,
    }));
  });
  useEffect(() => {
    productApi
      .getAll()
      .then((res) => {
        const action = fetchAllProduct(res.products);
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className={clsx("grid wide")}>
      <div className="row">
        {products.map((product, index) => (
          <div className="col l-3 m-4 c-12">
            <Product
              productInfo={product}
              key={index}
              btns={btns}
              style={{ zIndex: "1" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductComponent;
