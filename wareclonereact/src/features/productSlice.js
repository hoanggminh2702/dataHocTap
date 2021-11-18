import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    fetchAllProduct(state, action) {
      const products = [...action.payload];
      return products;
    },
  },
});

const { reducer, actions } = product;
export const { fetchAllProduct } = actions;
export default reducer;
