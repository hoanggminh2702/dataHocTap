import React from "react";
import Product from "../../Product/Product";
import ProductImg from "../../../assets/img/laptop.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const productInfoArr = [];
  for (let i = 0; i < 16; i++) {
    productInfoArr.push({
      type: "LAPTOP",
      name: "Máy tính xách tay",
      productImg: ProductImg,
    });
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          accessbility: true,
          row: 2,
          slidesPerRow: 2,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div>
      <Slider {...settings}>
        {productInfoArr.map((productInfo, index) => (
          <Product
            productInfo={productInfo}
            btns={btns}
            style={{ zIndex: "1" }}
          />
        ))}
      </Slider>
    </div>
  );
};

export default TopProductComponent;
