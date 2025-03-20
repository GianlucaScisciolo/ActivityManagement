import { createSlice } from "@reduxjs/toolkit";

const servizioSlice = createSlice ({
  name: "servizio",
  initialState: {
    value: {
      servizi: -1, 
      nuoviServizi: -1,
    } 
  },
  reducers: {
    aggiornaServizi: (state, action) => {
      state.value.servizi = action.payload.servizi 
    },
    aggiornaTipoSelezione: (state, action) => {
      if(state.value.servizi !== -1) {
        for(let i = 0; i < state.value.servizi.length; i++) {
          if(state.value.servizi[i].id === action.payload.id_servizio) {
            state.value.servizi[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
      if(state.value.nuoviServizi !== -1) {
        for(let i = 0; i < state.value.nuoviServizi.length; i++) {
          if(state.value.nuoviServizi[i].id === action.payload.id_servizio) {
            state.value.nuoviServizi[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
    }, 
    aggiornaServizio: (state, action) => {
      if(state.value.servizi !== -1) {
        for(let i = 0; i < state.value.servizi.length; i++) {
          if(state.value.servizi[i].id === action.payload.id_servizio) {
            state.value.servizi[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
      if(state.value.nuoviServizi !== -1) {
        for(let i = 0; i < state.value.nuoviServizi.length; i++) {
          if(state.value.nuoviServizi[i].id === action.payload.id_servizio) {
            state.value.nuoviServizi[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
    }, 
    getServizioPrimaDellaModifica: (state, action) => {
      if(state.value.servizi !== -1) {
        for(let i = 0; i < state.value.servizi.length; i++) {
          if(state.value.servizi[i].id === action.payload.id_servizio) {
            state.value.servizi[i]["nome"] = state.value.servizi[i]["nome_attuale"];
            state.value.servizi[i]["prezzo"] = state.value.servizi[i]["prezzo_attuale"]; 
            state.value.servizi[i]["note"] = state.value.servizi[i]["note_attuale"]; 
            break;
          }
        }
      }
      if(state.value.nuoviServizi !== -1) {
        for(let i = 0; i < state.value.nuoviServizi.length; i++) {
          if(state.value.nuoviServizi[i].id === action.payload.id_servizio) {
            state.value.nuoviServizi[i]["nome"] = state.value.nuoviServizi[i]["nome_attuale"];
            state.value.nuoviServizi[i]["prezzo"] = state.value.nuoviServizi[i]["prezzo_attuale"]; 
            state.value.nuoviServizi[i]["note"] = state.value.nuoviServizi[i]["note_attuale"]; 
            break;
          }
        }
      }
    },
    getServizioDopoLaModifica: (state, action) => {
      if(state.value.servizi !== -1) {
        for(let i = 0; i < state.value.servizi.length; i++) {
          if(state.value.servizi[i].id === action.payload.id_servizio) {
            state.value.servizi[i]["nome_attuale"] = state.value.servizi[i]["nome"];
            state.value.servizi[i]["prezzo_attuale"] = state.value.servizi[i]["prezzo"]; 
            state.value.servizi[i]["note_attuale"] = state.value.servizi[i]["note"]; 
            break;
          }
        }
      }
      if(state.value.nuoviServizi !== -1) {
        for(let i = 0; i < state.value.nuoviServizi.length; i++) {
          if(state.value.nuoviServizi[i].id === action.payload.id_servizio) {
            state.value.nuoviServizi[i]["nome_attuale"] = state.value.nuoviServizi[i]["nome"];
            state.value.nuoviServizi[i]["prezzo_attuale"] = state.value.nuoviServizi[i]["prezzo"]; 
            state.value.nuoviServizi[i]["note_attuale"] = state.value.nuoviServizi[i]["note"]; 
            break;
          }
        }
      }
    },
    inserimentoServizio: (state, action) => {
      if(state.value.nuoviServizi === -1) {
        state.value.nuoviServizi = [];
      }
      state.value.nuoviServizi.push(action.payload.nuovoServizio);
    },
  },
})

export const servizioSliceActions = {
  aggiornaServizi: servizioSlice.actions.aggiornaServizi,
  aggiornaTipoSelezione: servizioSlice.actions.aggiornaTipoSelezione,
  aggiornaServizio: servizioSlice.actions.aggiornaServizio,
  getServizioPrimaDellaModifica: servizioSlice.actions.getServizioPrimaDellaModifica,
  getServizioDopoLaModifica: servizioSlice.actions.getServizioDopoLaModifica,
  inserimentoServizio: servizioSlice.actions.inserimentoServizio
};
export const servizioSliceReducer = servizioSlice.reducer;









