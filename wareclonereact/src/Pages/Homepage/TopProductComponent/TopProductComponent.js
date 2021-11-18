import React, { useEffect } from "react";
import Product from "../../Product/Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchAllProduct } from "../../../features/productSlice";
import { setLoading, setNotLoading } from "../../../features/loadingSlice";
import { SpinnerCircularSplit } from "spinners-react";
import clsx from "clsx";
const TopProductComponent = () => {
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
  const isLoading = useSelector((state) => state.loading);
  const productsInfo = useSelector((state) => {
    return state.products.map((product) => ({
      name: product.name,
      type: product.type,
      productImg: product.img,
    }));
  });

  useEffect(() => {
    setTimeout(() => {
      productApi.getAll().then((res) => {
        const action = fetchAllProduct(res.products);
        dispatch(action);
        dispatch(setNotLoading());
      });
    }, 1000);
    return () => {
      dispatch(setLoading());
    };
  }, []);

  const settings = {
    dots: false,
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
  return (
    <div className={clsx("container-width")}>
      {isLoading ? (
        <SpinnerCircularSplit size={100} still={false} />
      ) : (
        <Slider {...settings}>
          {productsInfo.map((productInfo, index) => (
            <Product
              key={index}
              productInfo={productInfo}
              btns={btns}
              style={{ zIndex: "1" }}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TopProductComponent;
