export const authenticate = (
  e,
  authen,
  fetchProducts,
  dispatch,
  action,
  callBack
) => {
  if (authen === "admin" || authen === "user") {
    callBack(e, fetchProducts, dispatch, action);
  } else {
    alert("Bạn phải đăng nhập để thực hiện hành động này");
  }
};

export const order = (e, fetchProducts, dispatch, action) => {
  fetchProducts.forEach((product) => {
    if (e.target.id == product._id) {
      const payload = { id: product._id, price: product.price };
      dispatch(action(payload));
    }
  });
};
