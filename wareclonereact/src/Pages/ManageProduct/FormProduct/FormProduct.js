import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import productApi from "../../../api/productApi";
import styles from "./FormProduct.module.css";

const FormProduct = ({ action, id }) => {
  const [product, setProduct] = useState();
  const [payload, setPayload] = useState({
    name: product?.name || "",
    desc: product?.desc || "",
    price: product?.price || "",
    type: product?.type || "",
    quantity: product?.quantity || "",
    img: product?.img || "",
  });
  const data = useSelector((state) =>
    state.products.all.data.find((product) => {
      return product._id == id;
    })
  );
  useEffect(() => {
    if (action === "edit") {
      if (!data) {
        console.log("abc");
        productApi
          .get(id)
          .then((res) => {
            const resData = { ...res.product };
            delete resData._id;
            setProduct(res.product);
            setPayload({ ...resData });
          })
          .catch((err) => console.log(err));
      } else {
        const resData = { ...data };
        delete resData._id;
        setProduct({ ...data });
        setPayload(resData);
      }
    }
  }, []);
  const [message, setMessage] = useState({
    name: "",
    desc: "",
    price: "",
    type: "",
    quantity: "",
  });

  const validateInput = (element) => {
    if (element.value === "" && element.name !== "img") {
      setMessage((prev) => {
        return { ...prev, [element.name]: `Không để trống trường này` };
      });
    } else {
      if (element.name === "price" && !Number.isFinite(Number(element.value))) {
        return setMessage((prev) => {
          return { ...prev, [element.name]: `Trường này phải là số` };
        });
      } else if (
        element.name === "quantity" &&
        !Number.isInteger(Number(element.value))
      ) {
        return setMessage((prev) => {
          return { ...prev, [element.name]: `Trường này phải là số nguyên` };
        });
      } else {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: "",
          };
        });
      }
    }
  };
  const flag = {
    typeField: action !== "edit" ? false : true,
    action: action === "edit" ? "Edit" : "Create",
  };

  const errorImg =
    "https://st3.depositphotos.com/16262510/33733/v/1600/depositphotos_337332964-stock-illustration-photo-not-available-vector-icon.jpg";
  const handleProductValue = (e) => {
    action != "edit" && validateInput(e.target);
    setPayload((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnBlur = (e) => {
    validateInput(e.target);
  };

  const user = useSelector((state) => state.user);

  const submitToDb = () => {
    productApi[flag.action.toLowerCase()](
      {
        ...payload,
        type: action === "edit" ? product.type : payload.type,
      },
      action === "edit" ? product._id : user.token,
      action === "edit" ? user.token : undefined
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputsArr = Array.from(e.target.querySelectorAll("input"));

    action != "edit" &&
      inputsArr.forEach((input) => {
        validateInput(input);
      });

    action != "edit"
      ? inputsArr.every((input) => {
          console.log(message[input.name] !== "");
          return message[input.name] === "";
        }) && submitToDb()
      : submitToDb();
  };
  return (
    <div className={clsx("container-width")}>
      <div className={clsx("row", styles.container)}>
        <form
          className={clsx("col h-l-12 m-7 h-m-12 c-12")}
          onChange={handleProductValue}
          onSubmit={handleOnSubmit}
          onBlur={handleOnBlur}
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
          <p
            className={clsx(styles["validate-message"])}
            style={{ display: message.name ? "block" : "none" }}
          >
            {message.name}
          </p>
          <div className={styles["form-group"]}>
            <label htmlFor="desc">Product Description</label>
            <input
              value={payload.desc}
              type="text"
              name="desc"
              placeholder="Vui lòng nhập mô tả sản phẩm"
            />
          </div>
          <p
            className={clsx(styles["validate-message"])}
            style={{ display: message.desc ? "block" : "none" }}
          >
            {message.desc}
          </p>
          <div className={styles["form-group"]}>
            <label htmlFor="price">Product Price</label>
            <input
              value={payload.price}
              type="text"
              name="price"
              placeholder="Vui lòng nhập giá sản phẩm"
            />
          </div>
          <p
            className={clsx(styles["validate-message"])}
            style={{ display: message.price ? "block" : "none" }}
          >
            {message.price}
          </p>
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
          <p
            className={clsx(styles["validate-message"])}
            style={{ display: message.type ? "block" : "none" }}
          >
            {message.type}
          </p>
          <div className={styles["form-group"]}>
            <label htmlFor="quantity">Product Quantity</label>
            <input
              value={payload.quantity}
              type="text"
              name="quantity"
              placeholder="Vui lòng nhập số lượng sản phẩm"
            />
          </div>
          <p
            className={clsx(styles["validate-message"])}
            style={{ display: message.quantity ? "block" : "none" }}
          >
            {message.quantity}
          </p>
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
