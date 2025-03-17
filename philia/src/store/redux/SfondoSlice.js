import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("sfondo");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Errore nel caricamento dello stato dal local storage:", e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("sfondo", serializedState);
  } catch (e) {
    console.warn("Errore nel salvataggio dello stato nel local storage:", e);
  }
};

const initialState = loadFromLocalStorage() || {
  value: {
    pathImg: "../img/immagine_sfondo1.jpg",
    coloreRGB: null,
  },
};

export const sfondoSlice = createSlice({
  name: "sfondoSession",
  initialState: initialState,
  reducers: {
    changeWithImg: (state, action) => {
      state.value.pathImg = action.payload.pathImg;
      state.value.coloreRGB = null;
      saveToLocalStorage(state);
    },
    changeWithColoreRGB: (state, action) => {
      state.value.pathImg = null;
      state.value.coloreRGB = action.payload.coloreRGB;
      saveToLocalStorage(state);
    },
  },
});

export const { changeWithImg, changeWithColoreRGB } = sfondoSlice.actions;
export const sfondoReducer = sfondoSlice.reducer;