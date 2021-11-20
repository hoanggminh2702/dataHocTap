import clsx from "clsx";
import React, { useState } from "react";

import productApi from "../../../api/productApi";
import styles from "./FormProduct.module.css";

const FormProduct = ({ product }) => {
  const onChangeValidate = () => {};
  const flag = {
    typeField: !product ? false : true,
    action: product ? "Edit" : "Create",
  };
  const [payload, setPayload] = useState({
    name: product?.name || "",
    desc: product?.desc || "",
    price: product?.price || "",
    type: product?.type || "",
    quantity: product?.quantity || "",
    img: product?.img || "",
  });
  console.log(product);
  const errorImg =
    "https://st3.depositphotos.com/16262510/33733/v/1600/depositphotos_337332964-stock-illustration-photo-not-available-vector-icon.jpg";
  const handleProductValue = (e) => {
    setPayload((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    productApi[flag.action.toLowerCase()](
      {
        ...payload,
        type: product ? product.type : payload.type,
      },
      product._id
    )
      .then((res) => {
        console.log(`${flag.action} Successful`, res);
        alert(`${flag.action} thành công`, res.product);
      })
      .catch((err) => {
        console.log(err);
        alert(`${flag.action} thất bại`);
      });
  };
  return (
    <div className={clsx("container-width")}>
      <div className={clsx("row", styles.container)}>
        <form
          className={clsx("col h-l-12 m-7 h-m-12 c-12")}
          onChange={handleProductValue}
          onSubmit={handleOnSubmit}
        >
          <div className={styles["form-group"]}>
            <label htmlFor="name">Product Name</label>
            <input
              value={payload.name}
              type="text"
              name="name"
              placeholder="Vui lòng nhập tên sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="desc">Product Description</label>
            <input
              value={payload.desc}
              type="text"
              name="desc"
              placeholder="Vui lòng nhập mô tả sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="price">Product Price</label>
            <input
              value={payload.price}
              type="text"
              name="price"
              placeholder="Vui lòng nhập giá sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="type">Product Type</label>
            <input
              value={payload.type}
              type="text"
              name="type"
              placeholder="Vui lòng nhập loại sản phẩm"
              disabled={flag.typeField}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="quantity">Product Quantity</label>
            <input
              value={payload.quantity}
              type="text"
              name="quantity"
              placeholder="Vui lòng nhập số lượng sản phẩm"
            />
          </div>
          <button>Lưu</button>
        </form>
        <div
          className={clsx("col h-l-12 m-5 h-m-12 c-12", styles["img-preview"])}
        >
          <img
            src={payload.img || errorImg}
            alt=""
            onError={(e) => {
              e.target.src = errorImg;
            }}
          />
          <div className={clsx(styles["choose-img-container"])}>
            <input
              value={payload.img}
              type="text"
              name="img"
              placeholder="Nhập url hình vào đây..."
              onChange={handleProductValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
