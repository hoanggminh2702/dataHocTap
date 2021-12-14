import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import loadingReducer from "../features/loadingSlice";
import ordersReducer from "../features/ordersSlice";
import filterReducer from "../features/filterSlice";

const rootReducer = {
  products: productReducer,
  user: userReducer,
  loading: loadingReducer,
  orders: ordersReducer,
  filter: filterReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
