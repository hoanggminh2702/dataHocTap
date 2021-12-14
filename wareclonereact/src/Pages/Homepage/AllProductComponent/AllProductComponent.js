import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import productApi from "../../../api/productApi";
import LoadingComponent from "../../../component/LoadingComponent/LoadingComponent";
import { setPage } from "../../../features/filterSlice";
import { add, update } from "../../../features/ordersSlice";
import { fetchAllProduct, setLoaded } from "../../../features/productSlice";
import { authenticate, order } from "../../../utils/orders.js";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

const AllProductComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProducts = useSelector((state) => state.products.all.data);
  const authen = useSelector((state) => state.user?.role);
  const btns = [
    {
      title: "Add",
      onClick: (e) => {
        authenticate(e, authen, fetchProducts, dispatch, add, order);
      },
    },
    {
      title: "Cancel",
      onClick: (e) => {
        authenticate(e, authen, fetchProducts, dispatch, update, order);
      },
    },
  ];
  const products = useSelector((state) => {
    return state.products.all.data.map((product) => ({
      id: product["_id"],
      name: product.name,
      type: product.type,
      price: product.price,
      productImg: product.img,
    }));
  });
  const page = useSelector((state) => state.filter.page);
  const isLoading = useSelector((state) => !state.products.all.loaded);
  const [curPage, setCurPage] = useState(page);
  useEffect(() => {
    const params = {
      page: curPage,
    };
    productApi
      .getAll(params)
      .then((res) => {
        const action = fetchAllProduct({
          data: res.products,
          countDocs: res.totalProducts,
        });
        dispatch(action);
        dispatch(setLoaded(true));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setLoaded(false);
    };
  }, [curPage]);
  console.log("render");
  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={clsx("grid wide")}>
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col l-3 m-4 h-m-6 c-12">
                <Product
                  onClick={handleOnClick}
                  productInfo={product}
                  btns={btns}
                  style={{ zIndex: "1" }}
                />
              </div>
            ))}
          </div>
          <Pagination setCurpage={setCurPage} />
        </div>
      )}
    </>
  );
};

export default AllProductComponent;
