import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    loaded: false,
    data: [],
  },
  reducers: {
    fetchAllProduct(state, action) {
      const products = [...action.payload];
      return {
        ...state,
        data: products,
      };
    },
    setLoaded(state, action) {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    deleteProduct(state, action) {
      state.data.splice(state.data.indexOf(action.payload, 1));
    },
  },
});

const { reducer, actions } = product;
export const { fetchAllProduct, setLoaded, deleteProduct } = actions;
export default reducer;
