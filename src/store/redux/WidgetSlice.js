import { createSlice } from "@reduxjs/toolkit";
import clienti from "../../view/img/img_widget/clienti.png";
import servizi from '../../view/img/img_widget/servizi.png';
import lavori from '../../view/img/img_widget/lavori.png';
import spese from '../../view/img/img_widget/spese.png';
import prenotazione from '../../view/img/img_widget/prenotazione.png';
import salone from '../../view/img/img_widget/salone.png';
import profilo from '../../view/img/img_widget/profilo.png';

export const BC_NOT_SELECTED = "rgba(0, 0, 0, 0.5)";
export const BC_SELECTED = "#0050EF";
export const BC_VIEW = "rgba(0, 0, 0, 0.5)";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("widgetsSession");
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
    localStorage.setItem("widgetsSession", serializedState);
  } 
  catch (e) {
    console.warn("Errore nel salvataggio dello stato nel local storage:", e);
  }
};

const initialState = loadFromLocalStorage() || {
  value: {
    nuovo_cliente: {
      id: 0, tipo:"CardWidget", tipoVisualizzazione: 0, nome: "nuovo_cliente", titolo: "Nuovo cliente", 
      img: clienti, backgroundColor: BC_NOT_SELECTED, x: 100, y: 100
    },
    clienti: {
      id: 1, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "clienti", titolo: "Clienti", 
      img: clienti, backgroundColor: BC_NOT_SELECTED, x: 450, y: 100
    }, 
    nuovo_servizio: {
      id: 2, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "nuovo_servizio", titolo: "Nuovo servizio", 
      img: servizi, backgroundColor: BC_NOT_SELECTED, x: 800, y: 100
    }, 
    servizi: {
      id: 3, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "servizi", titolo: "Servizi", 
      img: servizi, backgroundColor: BC_NOT_SELECTED, x: 1150, y: 100
    }, 
    nuovo_lavoro: {
      id: 4, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "nuovo_lavoro", titolo: "Nuovo lavoro", 
      img: lavori, backgroundColor: BC_NOT_SELECTED, x: 1500, y: 100
    }, 
    lavori: {
      id: 5, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "lavori", titolo: "Lavori", 
      img: lavori, backgroundColor: BC_NOT_SELECTED, x: 1850, y: 100
    }, 
    file_lavori: {
      id: 6, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "file_lavori", titolo: "File lavori", 
      img: lavori, backgroundColor: BC_NOT_SELECTED, x: 2200, y: 100
    }, 
    prenotazione: {
      id: 7, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "prenotazione", titolo: "Prenotazione", 
      img: prenotazione, backgroundColor: BC_NOT_SELECTED, x: 2550, y: 100
    },  
    nuova_spesa: {
      id: 8, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "nuova_spesa", titolo: "Nuova spesa", 
      img: spese, backgroundColor: BC_NOT_SELECTED, x: 100, y: 600
    }, 
    spese: {
      id: 9, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "spese", titolo: "Spese", 
      img: spese, backgroundColor: BC_NOT_SELECTED, x: 450, y: 600
    }, 
    file_spese: {
      id: 10, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "file_spese", titolo: "File spese", 
      img: spese, backgroundColor: BC_NOT_SELECTED, x: 800, y: 600
    }, 
    salone: {
      id: 11, tipo:"CardWidget",  tipoVisualizzazione: 0, nome: "salone", titolo: "Salone", 
      img: salone, backgroundColor: BC_NOT_SELECTED, x: 1150, y: 600 
    }, 
    profilo: {
      id: 12, tipo:"CardWidget",  tipoVisualizzazione: 0, nome: "profilo", titolo: "Profilo", 
      img: profilo, backgroundColor: BC_NOT_SELECTED, x: 1500, y: 600 
    }, 
  },
};

const getColor = (tipoVisualizzazione) => {
  if(tipoVisualizzazione === 0) {
    return BC_NOT_SELECTED;
  }
  else if(tipoVisualizzazione === 1) {
    return BC_SELECTED;
  }
  else if(tipoVisualizzazione === 2) {
    return BC_VIEW;
  }
  else(
    console.log(tipoVisualizzazione)
  )
}

const widgetSlice = createSlice({
  name: "widget",
  initialState: initialState,
  reducers: {
    modificaWidget: (state, action) => {
      // console.log(action.payload.nomeWidget);
      state.value[action.payload.nomeWidget].tipoVisualizzazione = action.payload.tipoVisualizzazione;
      state.value[action.payload.nomeWidget].backgroundColor = getColor(action.payload.tipoVisualizzazione);
      saveToLocalStorage(state);
      console.log(state.value[action.payload.nomeWidget].tipoVisualizzazione);
    },
    widgetSelected: (state) => {
      // console.log("visualizzazioneWidget");
      const nomi = [
        "nuovo_cliente", "clienti", "nuovo_servizio", "servizi", "nuovo_lavoro", 
        "lavori", "file_lavori", "prenotazione", "nuova_spesa", "spese", "file_spese", "salone", "profilo"
      ];

      for(let nome of nomi) {
        state.value[nome].tipoVisualizzazione = (state.value[nome].tipoVisualizzazione === 0 || state.value[nome].tipoVisualizzazione === "0") ? 0 : 1
        state.value[nome].backgroundColor = getColor(state.value[nome].tipoVisualizzazione);
      }
      saveToLocalStorage(state);
    },
    widgetView: (state) => {
      // console.log("visualizzazioneWidget");
      const nomi = [
        "nuovo_cliente", "clienti", "nuovo_servizio", "servizi", "nuovo_lavoro", 
        "lavori", "file_lavori", "prenotazione", "nuova_spesa", "spese", "file_spese", "salone", "profilo"
      ];

      for(let nome of nomi) {
        state.value[nome].tipoVisualizzazione = (state.value[nome].tipoVisualizzazione === 0 || state.value[nome].tipoVisualizzazione === "0") ? 0 : 2
        state.value[nome].backgroundColor = getColor(state.value[nome].tipoVisualizzazione);
      }
      saveToLocalStorage(state);
    },
  },
});

export const widgetSliceActions = {
  modificaWidget: widgetSlice.actions.modificaWidget,
  widgetSelected: widgetSlice.actions.widgetSelected,
  widgetView: widgetSlice.actions.widgetView,
};

export const widgetSliceReducer = widgetSlice.reducer;