// React e Redux
import { createSlice } from "@reduxjs/toolkit";

// Da rivedere
import clienti from "../../view/img/img_widget/clienti.png";
import servizi from '../../view/img/img_widget/servizi.png';
import lavori from '../../view/img/img_widget/lavori.png';
import spese from '../../view/img/img_widget/spese.png';
import analisi from '../../view/img/img_widget/analisi.png';
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
    lingua: "italiano", 
    clienti: {
      id: 1, tipo:"CardWidget", tipoVisualizzazione: 0, nome: "clienti", titolo: "Clienti", 
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
    spese: {
      id: 4, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "spese", titolo: "Spese", 
      img: spese, backgroundColor: BC_NOT_SELECTED, x: 1150, y: 100
    },  
    analisi: {
      id: 5, tipo:"CardWidget", tipoVisualizzazione: 0,  nome: "analisi", titolo: "Analisi", 
      img: analisi, backgroundColor: BC_NOT_SELECTED, x: 1500, y: 100
    }, 
    profilo: {
      id: 6, tipo:"CardWidget",  tipoVisualizzazione: 0, nome: "profilo", titolo: "Profilo", 
      img: profilo, backgroundColor: BC_NOT_SELECTED, x: 1850, y: 100 
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
    modificaLingua: (state) => {
      state.value.lingua = state.value.lingua === "italiano" ? "inglese" : "italiano";
      [state.value.clienti.nome, state.value.clienti.titolo] = state.value.lingua === "italiano" ? ["clienti", "Clienti"]: ["clients", "Clients"];
      [state.value.servizi.nome, state.value.servizi.titolo] = state.value.lingua === "italiano" ? ["servizi", "Servizi"]: ["services", "Services"];
      [state.value.lavori.nome, state.value.lavori.titolo] = state.value.lingua === "italiano" ? ["lavori", "Lavori"]: ["jobs", "Jobs"];
      [state.value.spese.nome, state.value.spese.titolo] = state.value.lingua === "italiano" ? ["spese", "Spese"]: ["expenses", "Expenses"];
      [state.value.analisi.nome, state.value.analisi.titolo] = state.value.lingua === "italiano" ? ["analisi", "Analisi"]: ["analyses", "Analyses"];
      [state.value.profilo.nome, state.value.profilo.titolo] = state.value.lingua === "italiano" ? ["profilo", "Profilo"]: ["profile", "Profile"];

      saveToLocalStorage(state);
    },
    modificaWidget: (state, action) => {
      state.value[action.payload.nomeWidget].tipoVisualizzazione = action.payload.tipoVisualizzazione;
      state.value[action.payload.nomeWidget].backgroundColor = getColor(action.payload.tipoVisualizzazione);
      saveToLocalStorage(state);
    },
    widgetSelected: (state) => {
      const nomi = [
        "clienti", "servizi", "lavori", "spese", "analisi", "profilo"
      ];

      for(let nome of nomi) {
        state.value[nome].tipoVisualizzazione = (state.value[nome].tipoVisualizzazione === 0 || state.value[nome].tipoVisualizzazione === "0") ? 0 : 1
        state.value[nome].backgroundColor = getColor(state.value[nome].tipoVisualizzazione);
      }
      saveToLocalStorage(state);
    },
    widgetView: (state) => {
      const nomi = [
        "clienti", "servizi", "lavori", "spese", "analisi", "profilo"
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
  modificaLingua: saloneSlice.actions.modificaLingua,
  modificaWidget: saloneSlice.actions.modificaWidget,
  widgetSelected: saloneSlice.actions.widgetSelected,
  widgetView: saloneSlice.actions.widgetView
};

export const saloneSliceReducer = saloneSlice.reducer;









