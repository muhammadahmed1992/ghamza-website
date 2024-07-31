import { createSlice } from "@reduxjs/toolkit";

const getInitialSearchResults = () => {
  if (typeof window !== 'undefined') {
    const storedResults = localStorage.getItem("searchResults");
    const storedLastQuery = localStorage.getItem("lastQuery");
    return {
      results: storedResults ? JSON.parse(storedResults) : [],
      lastQuery: storedLastQuery || '',
    };
  }
  return {
    results: [],
    lastQuery: '',
  };
};

const initialState = getInitialSearchResults();

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("searchResults", JSON.stringify(state.results));
      }
    },
    setLastQuery: (state, action) => {
      state.lastQuery = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("lastQuery", state.lastQuery);
      }
    },
  },
});

export const { setSearchResults, setLastQuery } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
