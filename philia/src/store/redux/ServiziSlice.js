import { createSlice } from "@reduxjs/toolkit";

export const serviziSlice = createSlice ({
  name: "serviziSession",
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
      for(let servizio of [...state.value.servizi, ...state.value.nuoviServizi]) {
        if(servizio.id === action.payload.id_servizio) {
          servizio.tipo_selezione = action.payload.nuova_selezione;
          break;
        }
      }
    }, 
    aggiornaServizio: (state, action) => {
      for(let servizio of [...state.value.servizi, ...state.value.nuoviServizi]) {
        if(servizio.id === action.payload.id_servizio) {
          servizio[action.payload.nome_attributo] = action.payload.nuovo_valore;
          break;
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

export const { aggiornaServizi, aggiornaTipoSelezione, aggiornaServizio, inserimentoServizio } = serviziSlice.actions;
export const serviziReducer = serviziSlice.reducer;









