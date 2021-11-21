import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import LoadingComponent from "../../../component/LoadingComponent/LoadingComponent";
import TitleComponent from "../../../component/TitleComponent/TitleComponent";
import { fetchAllProduct, setLoaded } from "../../../features/productSlice";
import Product from "../../Product/Product";

import clsx from "clsx";
import styles from "./ManageProductComponent.module.css";

import { useNavigate } from "react-router";

const ManageProductComponent = () => {
  const navigate = useNavigate();
  const btns = [
    {
      title: "Edit",
      onClick: (e) => {
        navigate(`/manageproduct/edit/${e.target.id}`);
      },
    },
    {
      title: "Delete",
      onClick: (e) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
          productApi
            .delete(e.target.id)
            .then((res) => {
              alert(`Đã xoá thành công sản phẩm`);

              console.log(`Đã xoá sản phẩm`, res.product);
              window.location = "/manageproduct";
            })
            .catch((err) => {
              console.log(err);
              alert("Xoá sản phẩm thất bại");
            });
        }
      },
    },
  ];
  const handleCreateOnClick = () => {
    navigate("/manageproduct/create");
  };
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products.all.data.map((product) => ({
      id: product._id,
      name: product.name,
      type: product.type,
      price: product.price,
      productImg: product.img,
    }));
  });
  const isLoading = useSelector((state) => !state.products.all.loaded);
  useEffect(() => {
    setTimeout(() => {
      productApi
        .getAll()
        .then((res) => {
          const action = fetchAllProduct(res.products);
          dispatch(action);
          dispatch(setLoaded(true));
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      dispatch(setLoaded(false));
    };
  }, []);
  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <TitleComponent title={"Trang quản lý sản phẩm"} />

          <div className={clsx("grid wide")}>
            <div className={styles["btn-container"]}>
              <button className={styles.btn} onClick={handleCreateOnClick}>
                Create Product
              </button>
              <button className={styles.btn}>Report</button>
            </div>
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col l-3 m-4 h-m-6 c-12">
                  <Product
                    onClick={handleOnClick}
                    id={product._id}
                    productInfo={product}
                    btns={btns}
                    style={{ zIndex: "1" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManageProductComponent;
