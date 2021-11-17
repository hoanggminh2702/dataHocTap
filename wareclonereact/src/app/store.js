import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/productSlice.js";
import userReducer from "../slice/accountSlice.js";

const rootReducer = {
  products: productReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
