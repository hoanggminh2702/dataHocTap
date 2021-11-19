import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    username: "",
    token: "",
    role: "",
  },
  reducers: {
    setUser(state, action) {
      const newUser = { ...action.payload };
      return newUser;
    },
  },
});

const { reducer, actions } = user;
export const { setUser } = actions;
export default reducer;