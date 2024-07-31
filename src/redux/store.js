// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import searchResultsReducer from "./searchResultsSlice";
import languageReducer from "./languageSlice";
import modalReducer from "./modalSlice";
import filmsReducer from "./filmsSlice";
import documentariesReducer from "./documentariesSlice";
import showsReducer from "./showsSlice";
import musicReducer from "./musicSlice";
import liveReducer from "./liveShowsSlice";
import contactReducer from "./contactSlice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    search: searchReducer,
    language: languageReducer,
    modal: modalReducer,
    films: filmsReducer,
    documentaries: documentariesReducer,
    shows: showsReducer,
    music: musicReducer,
    liveShows: liveReducer,
    contact: contactReducer,
  },
});
