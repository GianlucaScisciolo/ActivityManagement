import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("autenticazioneSession");
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
    localStorage.setItem("autenticazioneSession", serializedState);
  } 
  catch (e) {
    console.warn("Errore nel salvataggio dello stato nel local storage:", e);
  }
};

const initialState = loadFromLocalStorage() || {
  value: {
    username: null,
    ruolo: "guest",
    note: "",
    isLogged: false 
  },
};

export const autenticazioneSessionSlice = createSlice({
  name: "autenticazioneSession",
  initialState: initialState,
  reducers: {
    eseguiLogin: (state, action) => {
      state.value.username = action.payload.username;
      state.value.ruolo = action.payload.ruolo;
      state.value.note = action.payload.note;
      state.value.isLogged = true;  
      saveToLocalStorage(state);
    },
    eseguiLogout: (state) => {
      state.value.username = null;
      state.value.ruolo = "guest";
      state.value.note = null;
      state.value.isLogged = false;
      saveToLocalStorage(state);
    },
    eseguiModificaAutenticazioneSession : (state, action) => {
      state.value.username = action.payload.username;
      state.value.note = action.payload.note;
      state.value.isLogged = true;
      saveToLocalStorage(state);
    },
  },
});

export const { eseguiLogin, eseguiLogout, eseguiModificaAutenticazioneSession } = autenticazioneSessionSlice.actions;
export const autenticazioneSessionReducer = autenticazioneSessionSlice.reducer;