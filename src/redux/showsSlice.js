// showsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialShowsData = () => {
  if (typeof window !== 'undefined') {
    const storedShowsData = localStorage.getItem("showsData");
    return storedShowsData ? JSON.parse(storedShowsData) : [];
  }
  return [];
};

const initialState = {
  showsData: getInitialShowsData(),
};

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShowsData: (state, action) => {
      state.showsData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("showsData", JSON.stringify(state.showsData));
      }
    },
  },
});

export const { setShowsData } = showsSlice.actions;

export default showsSlice.reducer;
