import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import loadingReducer from "../features/loadingSlice";

const rootReducer = {
  products: productReducer,
  user: userReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
