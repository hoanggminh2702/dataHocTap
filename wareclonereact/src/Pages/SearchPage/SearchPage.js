import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import productApi from "../../api/productApi";
import LoadingComponent from "../../component/LoadingComponent/LoadingComponent";
import TitleComponent from "../../component/TitleComponent/TitleComponent";
import { add, update } from "../../features/ordersSlice";
import { fetchAllProduct, setLoaded } from "../../features/productSlice";
import { authenticate, order } from "../../utils/orders.js";
import Product from "../Product/Product";

const SearchPage = (props) => {
  const { keyword } = useParams();
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

  const isLoading = useSelector((state) => !state.products.all.loaded);
  useEffect(() => {
    setTimeout(() => {
      const params = {
        search: keyword,
      };
      productApi
        .getAll(params)
        .then((res) => {
          const action = fetchAllProduct({
            data: res.products,
            countDocs: res.countDocs,
          });
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

  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {!fetchProducts.length ? (
            <TitleComponent title="Không tìm thấy kết quả nào" />
          ) : (
            <TitleComponent
              title={`Tìm được ${fetchProducts.length} kết quả`}
            />
          )}
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
          </div>
        </>
      )}
    </>
  );
};

export default SearchPage;
