// filmsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialFilmsData = () => {
  if (typeof window !== 'undefined') {
    const storedFilmsData = localStorage.getItem("filmsData");
    return storedFilmsData ? JSON.parse(storedFilmsData) : [];
  }
  return [];
};

const initialState = {
  filmsData: getInitialFilmsData(),
};


const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilmsData: (state, action) => {
      state.filmsData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("filmsData", JSON.stringify(state.filmsData));
      }
    },
  },
});


export const { setFilmsData } = filmsSlice.actions;

export default filmsSlice.reducer;
