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
/*
  username: utente.username,
  ruolo: utente.ruolo,
  note: utente.note, 
  num_lavori_cliente: salone.num_lavori_cliente, 
  num_lavori_professionisti: salone.num_lavori_professionisti, 
  num_lavori_giorno: salone.num_lavori_giorno
*/
const initialState = loadFromLocalStorage() || {
  value: {
    username: null,
    ruolo: "guest",
    note: null,
    isLogged: false,
    num_lavori_clienti: null, 
    num_lavori_professionisti: null, 
    num_lavori_giorno: null
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
      state.value.num_lavori_clienti = action.payload.num_lavori_clienti; 
      state.value.num_lavori_professionisti = action.payload.num_lavori_professionisti; 
      state.value.num_lavori_giorno = action.payload.num_lavori_giorno; 
      saveToLocalStorage(state);
    },
    eseguiLogout: (state) => {
      state.value.username = null;
      state.value.ruolo = "guest";
      state.value.note = null;
      state.value.isLogged = false;
      state.value.num_lavori_clienti = null; 
      state.value.num_lavori_professionisti = null; 
      state.value.num_lavori_giorno = null;
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
