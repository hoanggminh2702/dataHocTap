import React from "react";
import Product from "../Product/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <h1>Đây là Slide</h1>
      <div className={styles["slide-container"]}>
        <Slider {...settings}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Slider>
      </div>

      <div style={{ backgroundColor: "orange", height: "600px" }}></div>
    </>
  );
};

export default Homepage;
