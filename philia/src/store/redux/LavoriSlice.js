import { createSlice } from "@reduxjs/toolkit";

export const lavoriSlice = createSlice ({
  name: "lavoriSession",
  initialState: {
    value: {
      lavori: -1, 
      nuoviLavori: -1,
    } 
  },
  reducers: {
    aggiornaLavori: (state, action) => {
      state.value.lavori = action.payload.lavori 
    },
    aggiornaTipoSelezione: (state, action) => {
      if(state.value.lavori !== -1) {
        for(let i = 0; i < state.value.lavori.length; i++) {
          if(state.value.lavori[i].id === action.payload.id_lavoro) {
            state.value.lavori[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
      if(state.value.nuoviLavori !== -1) {
        for(let i = 0; i < state.value.nuoviLavori.length; i++) {
          if(state.value.nuoviLavori[i].id === action.payload.id_lavoro) {
            state.value.nuoviLavori[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
    }, 
    aggiornaLavoro: (state, action) => {
      if(state.value.lavori !== -1) {
        for(let i = 0; i < state.value.lavori.length; i++) {
          if(state.value.lavori[i].id === action.payload.id_lavoro) {
            state.value.lavori[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
      if(state.value.nuoviLavori !== -1) {
        for(let i = 0; i < state.value.nuoviLavori.length; i++) {
          if(state.value.nuoviLavori[i].id === action.payload.id_lavoro) {
            state.value.nuoviLavori[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
    }, 
    getLavoroPrimaDellaModifica: (state, action) => {
      if(state.value.lavori !== -1) {
        for(let i = 0; i < state.value.lavori.length; i++) {
          if(state.value.lavori[i].id === action.payload.id_lavoro) {
            state.value.lavori[i]["giorno"] = state.value.lavori[i]["giorno_attuale"]; 
            state.value.lavori[i]["descrizione"] = state.value.lavori[i]["descrizione_attuale"];
            state.value.lavori[i]["totale"] = state.value.lavori[i]["totale_attuale"]; 
            state.value.lavori[i]["note"] = state.value.lavori[i]["note_attuale"]; 
            break;
          }
        }
      }
      if(state.value.nuoviLavori !== -1) {
        for(let i = 0; i < state.value.nuoviLavori.length; i++) {
          if(state.value.nuoviLavori[i].id === action.payload.id_lavoro) {
            state.value.nuoviLavori[i]["giorno"] = state.value.nuoviLavori[i]["giorno_attuale"]; 
            state.value.nuoviLavori[i]["descrizione"] = state.value.nuoviLavori[i]["descrizione_attuale"];
            state.value.nuoviLavori[i]["totale"] = state.value.nuoviLavori[i]["totale_attuale"]; 
            state.value.nuoviLavori[i]["note"] = state.value.nuoviLavori[i]["note_attuale"]; 
            break;
          }
        }
      }
    },
    getLavoroDopoLaModifica: (state, action) => {
      if(state.value.lavori !== -1) {
        for(let i = 0; i < state.value.lavori.length; i++) {
          if(state.value.lavori[i].id === action.payload.id_lavoro) {
            state.value.lavori[i]["giorno_attuale"] = state.value.lavori[i]["giorno"]; 
            state.value.lavori[i]["descrizione_attuale"] = state.value.lavori[i]["descrizione"];
            state.value.lavori[i]["totale_attuale"] = state.value.lavori[i]["totale"]; 
            state.value.lavori[i]["note_attuale"] = state.value.lavori[i]["note"]; 
            break;
          }
        }
      }
      if(state.value.nuoviLavori !== -1) {
        for(let i = 0; i < state.value.nuoviLavori.length; i++) {
          if(state.value.nuoviLavori[i].id === action.payload.id_lavoro) {
            state.value.nuoviLavori[i]["giorno_attuale"] = state.value.nuoviLavori[i]["giorno"]; 
            state.value.nuoviLavori[i]["descrizione_attuale"] = state.value.nuoviLavori[i]["descrizione"];
            state.value.nuoviLavori[i]["totale_attuale"] = state.value.nuoviLavori[i]["totale"]; 
            state.value.nuoviLavori[i]["note_attuale"] = state.value.nuoviLavori[i]["note"]; 
            break;
          }
        }
      }
    },
    inserimentoLavoro: (state, action) => {
      if(state.value.nuoviLavori === -1) {
        state.value.nuoviLavori = [];
      }
      state.value.nuoviLavori.push(action.payload.nuovoLavoro);
    },
  },
})

export const { 
  aggiornaLavori, aggiornaTipoSelezione, aggiornaLavoro, getLavoroPrimaDellaModifica, getLavoroDopoLaModifica, inserimentoLavoro 
} = lavoriSlice.actions;
export const lavoriReducer = lavoriSlice.reducer;









