import React, { useEffect, useRef } from "react";
import Product from "../../Product/Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchAllProduct, setLoaded } from "../../../features/productSlice";
import clsx from "clsx";
import LoadingComponent from "../../../component/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router";
import { authenticate, order } from "../../../utils/orders";
import { add, update } from "../../../features/ordersSlice";
const TopProductComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const isLoading = useSelector((state) => !state.products.all.loaded);
  const productsInfo = useSelector((state) => {
    return state.products.all.data.map((product) => ({
      id: product["_id"],
      name: product.name,
      type: product.type,
      price: product.price,
      productImg: product.img,
    }));
  });

  const sliceRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      productApi.getAll().then((res) => {
        const action = fetchAllProduct({
          data: res.products,
          countDocs: res.totalProducts,
        });
        dispatch(action);
        dispatch(setLoaded(true));
      });
    }, 1000);
    return () => {
      dispatch(setLoaded(false));
    };
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          accessbility: true,
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          accessbility: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          accessbility: true,
          row: 2,
          slidePerRow: 2,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          accessbility: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={clsx("grid wide")}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Slider ref={sliceRef} {...settings}>
          {productsInfo.map((productInfo, index) => (
            <Product
              onClick={handleOnClick}
              key={index}
              productInfo={productInfo}
              btns={btns}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TopProductComponent;
