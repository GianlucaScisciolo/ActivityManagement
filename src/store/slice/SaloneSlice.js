/************************************************** React e Redux **************************************************/
import { createSlice } from "@reduxjs/toolkit";

// Da vedere !!!!
import clienti from "../../view/img/img_widget/clienti.png";
import servizi from '../../view/img/img_widget/servizi.png';
import lavori from '../../view/img/img_widget/lavori.png';
import spese from '../../view/img/img_widget/spese.png';
import prenotazione from '../../view/img/img_widget/prenotazione.png';
import salone from '../../view/img/img_widget/salone.png';
import profilo from '../../view/img/img_widget/profilo.png';

const BC_NOT_SELECTED = "rgba(0, 0, 0, 0.5)";
const BC_SELECTED = "#0050EF";
const BC_VIEW = "rgba(0, 0, 0, 0.5)";

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
    clienti: {
      id: 1, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "clienti", titolo: "Clienti", 
      img: clienti, backgroundColor: BC_NOT_SELECTED, x: 100, y: 100
    }, 
    servizi: {
      id: 2, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "servizi", titolo: "Servizi", 
      img: servizi, backgroundColor: BC_NOT_SELECTED, x: 450, y: 100
    }, 
    lavori: {
      id: 3, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "lavori", titolo: "Lavori", 
      img: lavori, backgroundColor: BC_NOT_SELECTED, x: 800, y: 100
    }, 
    prenotazione: {
      id: 4, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "prenotazione", titolo: "Prenotazione", 
      img: prenotazione, backgroundColor: BC_NOT_SELECTED, x: 1150, y: 100
    },  
    spese: {
      id: 5, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "spese", titolo: "Spese", 
      img: spese, backgroundColor: BC_NOT_SELECTED, x: 1500, y: 100
    }, 
    salone: {
      id: 6, tipo:"CardWidget",  tipoVisualizzazione: 0, nome: "salone", titolo: "Salone", 
      img: salone, backgroundColor: BC_NOT_SELECTED, x: 1850, y: 100 
    }, 
    profilo: {
      id: 7, tipo:"CardWidget",  tipoVisualizzazione: 0, nome: "profilo", titolo: "Profilo", 
      img: profilo, backgroundColor: BC_NOT_SELECTED, x: 2200, y: 100//600 
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

const saloneSlice = createSlice({
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
        "clienti", "servizi", "lavori", "prenotazione", "spese", "salone", "profilo"
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
        "clienti", "servizi", "lavori", "prenotazione", "spese", "salone", "profilo"
      ];

      for(let nome of nomi) {
        state.value[nome].tipoVisualizzazione = (state.value[nome].tipoVisualizzazione === 0 || state.value[nome].tipoVisualizzazione === "0") ? 0 : 2
        state.value[nome].backgroundColor = getColor(state.value[nome].tipoVisualizzazione);
      }
      saveToLocalStorage(state);
    },
  },
});

export const saloneSliceActions = {
  modificaWidget: saloneSlice.actions.modificaWidget,
  widgetSelected: saloneSlice.actions.widgetSelected,
  widgetView: saloneSlice.actions.widgetView,
};

export const saloneSliceReducer = saloneSlice.reducer;









