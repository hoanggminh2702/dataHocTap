import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import productApi from "../../../api/productApi";
import LoadingComponent from "../../../component/LoadingComponent/LoadingComponent";
import { fetchAllProduct, setLoaded } from "../../../features/productSlice";
import Product from "../../Product/Product";

const AllProductComponent = () => {
  const navigate = useNavigate();
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
        navigate(`/product/${e.target.id}`);
      },
    },
  ];
  const dispatch = useDispatch();
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
      )}
    </>
  );
};

export default AllProductComponent;
