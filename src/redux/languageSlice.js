import { createSlice } from "@reduxjs/toolkit";

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    return storedLanguage || "ENG";
  }
  return "ENG";
};

const initialState = {
  selectedLanguage: getInitialLanguage(),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.selectedLanguage = state.selectedLanguage === "ENG" ? "AR" : "ENG";
      if (typeof window !== 'undefined') {
        localStorage.setItem("selectedLanguage", state.selectedLanguage);
      }
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.selectedLanguage;

export default languageSlice.reducer;
