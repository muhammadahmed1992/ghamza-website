// musicSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialMusicData = () => {
  if (typeof window !== 'undefined') {
    const storedMusicData = localStorage.getItem("musicData");
    return storedMusicData ? JSON.parse(storedMusicData) : [];
  }
  return [];
};

const initialState = {
  musicData: getInitialMusicData(),
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMusicData: (state, action) => {
      state.musicData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("musicData", JSON.stringify(state.musicData));
      }
    },
  },
});

export const { setMusicData } = musicSlice.actions;

export default musicSlice.reducer;
