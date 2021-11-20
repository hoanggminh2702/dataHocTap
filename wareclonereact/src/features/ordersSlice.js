import { createSlice } from "@reduxjs/toolkit";

const orders = createSlice({
  name: "orders",
  initialState: JSON.parse(localStorage.getItem("user"))?.cart || [],
  reducers: {
    add(state, action) {
      const addOrders = [...state, action.payload];
      localStorage.setItem(JSON.stringify(addOrders));
      return addOrders;
    },
    remove(state, action) {
      const updateOrder = [...state];
      const result = updateOrder.filter((order) => {
        return order?.item !== action.payload;
      });
      localStorage.setItem(JSON.stringify(result));
      return result;
    },
  },
});

const { reducer, actions } = orders;
export const { add, remove } = actions;
export default reducer;
