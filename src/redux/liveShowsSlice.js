// liveShowsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialLiveShowsData = () => {
  if (typeof window !== 'undefined') {
    const storedLiveShowsData = localStorage.getItem("liveShowsData");
    return storedLiveShowsData ? JSON.parse(storedLiveShowsData) : [];
  }
  return [];
};

const initialState = {
  liveShowsData: getInitialLiveShowsData(),
};

const liveShowsSlice = createSlice({
  name: "liveShows",
  initialState,
  reducers: {
    setLiveShowsData: (state, action) => {
      state.liveShowsData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("liveShowsData", JSON.stringify(state.liveShowsData));
      }
    },
  },
});

export const { setLiveShowsData } = liveShowsSlice.actions;

export default liveShowsSlice.reducer;
