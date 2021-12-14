import { createSlice } from "@reduxjs/toolkit";

const orders = createSlice({
  name: "orders",
  initialState: JSON.parse(localStorage.getItem("cart")) || { orders: [] },
  reducers: {
    add(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      const newOrders = newState.orders;
      const checkBought = newOrders.find((product) => {
        return product._id === action.payload.id;
      });
      if (checkBought) {
        newOrders.forEach((product) => {
          if (product._id === action.payload.id) {
            product.quantity += 1;
            product.total += +Number(action.payload.price);
          }
        });
      } else {
        newOrders.push({
          _id: action.payload.id,
          quantity: 1,
          total: +Number(action.payload.price),
          name: action.payload.name,
          img: action.payload.img,
          type: action.payload.type,
        });
      }

      newState.orders = newOrders;
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    update(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      const newOrders = newState.orders;
      const checkBought = newOrders.find((product) => {
        return product._id === action.payload.id;
      });
      if (checkBought) {
        newOrders.forEach((product, index, object) => {
          if (product._id === action.payload.id) {
            if (product.quantity > 1) {
              product.quantity -= 1;
              product.total -= +Number(action.payload.price);
            } else if (product.quantity === 1) {
              object.splice(index, 1);
            }
          }
        });
      }

      newState.orders = newOrders;
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    remove(state, action) {
      localStorage.removeItem("cart");
      return { orders: [] };
    },
  },
});

const { reducer, actions } = orders;
export const { add, update, remove } = actions;
export default reducer;
