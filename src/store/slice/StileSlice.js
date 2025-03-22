/************************************************** React e Redux **************************************************/
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
    vistaItem: "row",
    vistaForm: "form"
  },
};

const stileSlice = createSlice({
  name: "sfondo",
  initialState: initialState,
  reducers: {
    cambioImmagineSfondo: (state, action) => {
      state.value.pathImg = action.payload.pathImg;
      state.value.coloreRGB = null;
      saveToLocalStorage(state);
    },
    cambioColoreSfondo: (state, action) => {
      state.value.pathImg = null;
      state.value.coloreRGB = action.payload.coloreRGB;
      saveToLocalStorage(state);
    },
    cambioVistaItem: (state, action) => {
      state.value.vistaItem = action.payload.vistaItem;
      saveToLocalStorage(state);
    },
    cambioVistaForm: (state, action) => {
      state.value.vistaForm = action.payload.vistaForm;
      saveToLocalStorage(state);
    },
  },
});

export const stileSliceActions = {
  cambioImmagineSfondo: stileSlice.actions.cambioImmagineSfondo,
  cambioColoreSfondo: stileSlice.actions.cambioColoreSfondo,
  cambioVistaItem: stileSlice.actions.cambioVistaItem, 
  cambioVistaForm: stileSlice.actions.cambioVistaForm
};

export const stileSliceReducer = stileSlice.reducer;










