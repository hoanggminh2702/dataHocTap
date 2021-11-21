export const authenticate = (
  e,
  authen,
  fetchProducts,
  dispatch,
  action,
  callBack
) => {
  if (["admin", "staff"].includes(authen)) {
    callBack(e, fetchProducts, dispatch, action);
  } else {
    alert("Bạn phải đăng nhập để thực hiện hành động này");
  }
};

export const order = (e, fetchProducts, dispatch, action) => {
  fetchProducts.forEach((product) => {
    if (e.target.id === product._id) {
      const payload = {
        id: product._id,
        name: product.name,
        img: product.img,
        type: product.type,
        price: product.price,
      };
      dispatch(action(payload));
    }
  });
};
