import { createSlice } from "@reduxjs/toolkit";

const getInitialJoinUsInfo = () => {
  if (typeof window !== "undefined") {
    const storedJoinUsInfo = localStorage.getItem("joinUsInfo");
    return storedJoinUsInfo
      ? JSON.parse(storedJoinUsInfo)
      : {
          joinUsTitleEng: "",
          joinUsTitleAr: "",
        };
  }
  return {
    joinUsTitleEng: "",
    joinUsTitleAr: "",
  };
};

const initialState = getInitialJoinUsInfo();
const joinUsSlice = createSlice({
  name: "joinUs",
  initialState,
  reducers: {
    setJoinUsInfo: (state, action) => {
      const { joinUsTitleEng, joinUsTitleAr} = action.payload;
      state.joinUsTitleEng = joinUsTitleEng;
      state.joinUsTitleAr = joinUsTitleAr;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "joinUsInfo",
          JSON.stringify({
            joinUsTitleEng,
            joinUsTitleAr,
          })
        );
      }
    },
  },
});

export const { setJoinUsInfo } = joinUsSlice.actions;

export default joinUsSlice.reducer;
