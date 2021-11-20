import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    all: {
      loaded: false,
      data: [],
    },
  },
  reducers: {
    fetchAllProduct(state, action) {
      const products = [...action.payload];
      const updateProduct = JSON.parse(JSON.stringify(state));
      updateProduct.all.data = products;
      return updateProduct;
    },

    setLoaded(state, action) {
      const updateProduct = JSON.parse(JSON.stringify(state));
      updateProduct.all.loaded = action.payload;
      return updateProduct;
    },
  },
});

const { reducer, actions } = product;
export const { fetchAllProduct, setLoaded, deleteProduct } = actions;
export default reducer;
