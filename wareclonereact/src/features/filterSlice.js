import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
  name: "filter",
  initialState: {
    search: "",
    page: 1,
    limit: 8,
  },
  reducers: {
    setSearch(state, action) {
      return {
        ...state,
        search: action.payload,
      };
    },
    setPage(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
    setLimit(state, action) {
      return {
        ...state,
        limit: action.payload,
      };
    },

    removeFilter(state, action) {
      return {
        search: "",
        page: "",
        limit: "",
      };
    },
    removeSearch(state, action) {
      return {
        ...state,
        search: "",
      };
    },
    removePage(state, action) {
      return {
        ...state,
        page: "",
      };
    },
    removeLimit(state, action) {
      return {
        ...state,
        limit: "",
      };
    },
  },
});

const { reducer, actions } = filter;
export const {
  setSearch,
  setPage,
  setLimit,
  removeFilter,
  removeSearch,
  removePage,
  removeLimit,
} = actions;
export default reducer;
