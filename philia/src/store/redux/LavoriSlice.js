import { createSlice } from "@reduxjs/toolkit";

export const lavoriSlice = createSlice ({
  name: "lavoriSession",
  initialState: {
    value: {
      lavori: [], 
      nuoviLavori: [],
    } 
  },
  reducers: {
    aggiornaLavori: (state, action) => {
      state.value.lavori = action.payload.lavori 
    },
    aggiornaTipoSelezione: (state, action) => {
      for(let lavoro of [...state.value.lavori, ...state.value.nuoviLavori]) {
        if(lavoro.id === action.payload.id_lavoro) {
          lavoro.tipo_selezione = action.payload.nuova_selezione;
          break;
        }
      }
    }, 
    aggiornaLavoro: (state, action) => {
      for(let lavoro of [...state.value.lavori, ...state.value.nuoviLavori]) {
        if(lavoro.id === action.payload.id_lavoro) {
          lavoro[action.payload.nome_attributo] = action.payload.nuovo_valore;
          break;
        }
      }
    }, 
    inserimentoLavoro: (state, action) => {
      state.value.nuoviLavori.push(action.payload.nuovoLavoro);
    },
  },
})

export const { aggiornaLavori, aggiornaTipoSelezione, aggiornaLavoro, inserimentoLavoro } = lavoriSlice.actions;
export const lavoriReducer = lavoriSlice.reducer;









