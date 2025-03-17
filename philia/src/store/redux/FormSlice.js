import { createSlice } from "@reduxjs/toolkit";

// Funzioni per caricare e salvare lo stato nel localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("form");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } 
  catch (e) {
    console.warn("Errore nel caricamento dello stato dal local storage:", e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("form", serializedState);
  } 
  catch (e) {
    console.warn("Errore nel salvataggio dello stato nel local storage:", e);
  }
};

// Stato iniziale del slice
const initialState = loadFromLocalStorage() || {
  value: {
    view: "form",
  },
};

// Definizione del slice
export const formSlice = createSlice({
  name: "formSession",
  initialState: initialState,
  reducers: {
    changeViewForm: (state, action) => {
      state.value.view = action.payload.view;
      saveToLocalStorage(state);
    },
  },
});

// Esportazione delle azioni e del reducer
export const { changeViewForm } = formSlice.actions;
export const formReducer = formSlice.reducer;