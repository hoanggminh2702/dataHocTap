import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    setLoading(state, action) {
      return true;
    },
    setNotLoading(state, action) {
      return false;
    },
  },
});

const { reducer, actions } = loading;
export const { setLoading, setNotLoading } = actions;
export default reducer;
