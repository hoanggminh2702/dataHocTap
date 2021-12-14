import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")) || {
    username: "",
    token: "",
    role: "",
  },
  reducers: {
    setUser(state, action) {
      const newUser = { ...action.payload };
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      return newUser;
    },
    logOut(state, action) {
      const newUser = { username: "", token: "", role: "" };
      localStorage.removeItem("user");
      return newUser;
    },
  },
});

const { reducer, actions } = user;
export const { setUser, logOut } = actions;
export default reducer;
