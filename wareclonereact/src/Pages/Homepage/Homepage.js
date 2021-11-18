import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopProductComponent from "./TopProductComponent/TopProductComponent";

const Homepage = () => {
  return (
    <>
      <h1>Top sản phẩm bán chạy nhất tháng</h1>
      <TopProductComponent />
      <div style={{ backgroundColor: "orange", height: "600px" }}></div>
    </>
  );
};

export default Homepage;
