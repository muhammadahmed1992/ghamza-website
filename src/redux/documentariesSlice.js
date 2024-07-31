// documentariesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialDocumentariesData = () => {
  if (typeof window !== 'undefined') {
    const storedDocumentariesData = localStorage.getItem("documentariesData");
    return storedDocumentariesData ? JSON.parse(storedDocumentariesData) : [];
  }
  return [];
};

const initialState = {
  documentariesData: getInitialDocumentariesData(),
};

const documentariesSlice = createSlice({
  name: "documentaries",
  initialState,
  reducers: {
    setDocumentariesData: (state, action) => {
      state.documentariesData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("documentariesData", JSON.stringify(state.documentariesData));
      }
    },
  },
});

export const { setDocumentariesData } = documentariesSlice.actions;

export default documentariesSlice.reducer;
