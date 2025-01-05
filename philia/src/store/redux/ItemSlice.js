import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Funzioni per caricare e salvare lo stato nel localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("item");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Errore nel caricamento dello stato dal local storage:", e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("item", serializedState);
  } catch (e) {
    console.warn("Errore nel salvataggio dello stato nel local storage:", e);
  }
};

// Stato iniziale del slice
const initialState = loadFromLocalStorage() || {
  value: {
    view: "card",
  },
};

// Definizione del slice
export const itemSlice = createSlice({
  name: "itemSession",
  initialState: initialState,
  reducers: {
    changeView: (state, action) => {
      state.value.view = action.payload.view;
      saveToLocalStorage(state);
    },
  },
});

// Esportazione delle azioni e del reducer
export const { changeView } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
