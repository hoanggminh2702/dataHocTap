import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    fetchAllProducts: (state, action) => {
      console.log(action.payload);
      const productList = action.payload;
      return productList;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = product;
export const { fetchAllProducts, addProduct } = actions;
export default reducer;
