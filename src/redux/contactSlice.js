import { createSlice } from "@reduxjs/toolkit";

const getInitialContactInfo = () => {
  if (typeof window !== "undefined") {
    const storedContactInfo = localStorage.getItem("contactInfo");
    return storedContactInfo
      ? JSON.parse(storedContactInfo)
      : {
          titleEng: "",
          titleAr: "",
          subTitleEng: "",
          subTitleAr: "",
        };
  }
  return {
    titleEng: "",
    titleAr: "",
    subTitleEng: "",
    subTitleAr: "",
  };
};

const initialState = getInitialContactInfo();
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactInfo: (state, action) => {
      const { titleEng, titleAr, subTitleEng, subTitleAr } = action.payload;
      state.titleEng = titleEng;
      state.titleAr = titleAr;
      state.subTitleEng = subTitleEng;
      state.subTitleAr = subTitleAr;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "contactInfo",
          JSON.stringify({
            titleEng,
            titleAr,
            subTitleEng,
            subTitleAr,
          })
        );
      }
    },
  },
});

export const { setContactInfo } = contactSlice.actions;

export default contactSlice.reducer;
