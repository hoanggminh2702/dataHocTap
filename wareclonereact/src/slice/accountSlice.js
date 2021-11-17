import { createSlice } from "@reduxjs/toolkit";

const account = createSlice({
  name: "account",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return {};
    },
  },
});

const { reducer, actions } = account;
export const { setUser, removeUser } = actions;
export default reducer;
