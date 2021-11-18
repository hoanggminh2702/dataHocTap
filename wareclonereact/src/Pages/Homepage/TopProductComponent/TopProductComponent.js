import React from "react";
import Product from "../../Product/Product";
import ProductImg from "../../../assets/img/laptop.png";

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

  const productInfo = {
    productImg: ProductImg,
  };
  return (
    <div>
      <div style={{ width: "200px" }}>
        <Product productInfo={productInfo} btns={btns} />
      </div>
    </div>
  );
};

export default TopProductComponent;
