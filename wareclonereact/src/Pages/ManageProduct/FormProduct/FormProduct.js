import clsx from "clsx";
import React, { useState } from "react";
import styles from "./FormProduct.module.css";

const FormProduct = ({ product, action }) => {
  const [updateProduct, setUpdateProduct] = useState({
    name: product?.name || "",
    desc: product?.desc || "",
    price: product?.price || "",
    type: product?.type || "",
    quantify: product?.quantity || "",
    img:
      product?.img ||
      "https://st3.depositphotos.com/16262510/33733/v/1600/depositphotos_337332964-stock-illustration-photo-not-available-vector-icon.jpg",
  });
  const handleProductValue = (e) => {
    setUpdateProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className={clsx("container-width")}>
      <div className={clsx("row", styles.container)}>
        <form
          className={clsx("col h-l-12 m-7 h-m-12 c-12")}
          onChange={handleProductValue}
        >
          <div className={styles["form-group"]}>
            <label htmlFor="name">Product Name</label>
            <input
              value={updateProduct.name}
              type="text"
              name="name"
              placeholder="Vui lòng nhập tên sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="desc">Product Description</label>
            <input
              value={updateProduct.desc}
              type="text"
              name="desc"
              placeholder="Vui lòng nhập mô tả sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="price">Product Price</label>
            <input
              value={updateProduct.price}
              type="text"
              name="price"
              placeholder="Vui lòng nhập giá sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="type">Product Type</label>
            <input
              value={updateProduct.type}
              type="text"
              name="type"
              placeholder="Vui lòng nhập loại sản phẩm"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="quantity">Product Quantity</label>
            <input
              value={updateProduct.quantity}
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
          <img src={updateProduct.img} alt="" />
          <div className={clsx(styles["choose-img-container"])}>
            <input
              value={updateProduct.img}
              type="text"
              placeholder="Nhập url hình vào đây..."
            />
            <button>Preview Image</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
