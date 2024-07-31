"use client";
import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearchOpen: false,
  },
  reducers: {
    toggleSearch: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { toggleSearch } = searchSlice.actions;

export const selectSearchOpen = (state) => state.search.isSearchOpen;

export default searchSlice.reducer;
