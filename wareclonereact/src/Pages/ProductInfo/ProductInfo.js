import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import productApi from "../../api/productApi";
import LoadingComponent from "../../component/LoadingComponent/LoadingComponent";

import styles from "./ProductInfo.module.css";

const ProductInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState();
  const findProduct = useSelector((state) =>
    state.products.data.find((product) => {
      return product.id === id;
    })
  );
  useEffect(() => {
    if (!findProduct) {
      productApi
        .get(id)
        .then((res) => {
          console.log(res.product);
          setProduct(res.product);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setProduct(findProduct);
    }
  }, []);
  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={"grid wide"}>
          <div className={clsx("row", styles.container)}>
            <div className="col l-6 m-6 h-m-12 c-12">
              <img src={product.img} alt="" style={{ width: "100%" }} />
            </div>
            <div
              className={clsx(
                "col l-6 m-6 h-m-12 c-12",
                styles["product-info"]
              )}
            >
              <div className={clsx(styles["product-info-top"])}>
                <h1 className={clsx(styles["product-name"])}>{product.name}</h1>
                <h1
                  className={clsx(styles["product-price"])}
                >{`${product.price}$`}</h1>
              </div>
              <div className={clsx(styles["product-info-bottom"])}>
                <p className={clsx(styles["product-desc"])}>{product.desc}</p>
                <button className={clsx(styles["add-cart-btn"])}>
                  Add to card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
