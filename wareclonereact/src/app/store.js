import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import loadingReducer from "../features/loadingSlice";
import ordersReducer from "../features/ordersSlice";

const rootReducer = {
  products: productReducer,
  user: userReducer,
  loading: loadingReducer,
  orders: ordersReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
