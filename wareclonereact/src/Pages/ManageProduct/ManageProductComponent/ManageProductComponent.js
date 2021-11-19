import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import LoadingComponent from "../../../component/LoadingComponent/LoadingComponent";
import TitleComponent from "../../../component/TitleComponent/TitleComponent";
import { fetchAllProduct, setLoaded } from "../../../features/productSlice";
import Product from "../../Product/Product";

const ManageProductComponent = () => {
  console.log("abc");
  const btns = [
    {
      title: "Edit",
      onClick: (e) => {
        console.log(e.target);
      },
    },
    {
      title: "Delete",
      onClick: (e) => {
        console.log(e.target);
      },
    },
  ];
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products.data.map((product) => ({
      name: product.name,
      type: product.type,
      price: product.price,
      productImg: product.img,
    }));
  });
  const isLoading = useSelector((state) => !state.products.loaded);
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
      setLoaded(false);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <TitleComponent title={"Trang quản lý sản phẩm"} />

          <div className={clsx("grid wide")}>
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col l-3 m-4 h-m-6 c-12">
                  <Product
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
