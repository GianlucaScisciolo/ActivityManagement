import { createSlice } from "@reduxjs/toolkit";

export const clientiSlice = createSlice ({
  name: "clientiSession",
  initialState: {
    value: {
      clienti: -1, 
      nuoviClienti: -1,
    } 
  },
  reducers: {
    aggiornaClienti: (state, action) => {
      state.value.clienti = action.payload.clienti 
    },
    aggiornaTipoSelezione: (state, action) => {
      for(let cliente of [...state.value.clienti, ...state.value.nuoviClienti]) {
        if(cliente.id === action.payload.id_cliente) {
          cliente.tipo_selezione = action.payload.nuova_selezione;
          break;
        }
      }
    }, 
    aggiornaCliente: (state, action) => {
      for(let cliente of [...state.value.clienti, ...state.value.nuoviClienti]) {
        if(cliente.id === action.payload.id_cliente) {
          cliente[action.payload.nome_attributo] = action.payload.nuovo_valore;
          break;
        }
      }
    },
    inserimentoCliente: (state, action) => {
      if(state.value.nuoviClienti === -1) {
        state.value.nuoviClienti = [];
      }
      state.value.nuoviClienti.push(action.payload.nuovoCliente);
    },
  },
})

export const { aggiornaClienti, aggiornaTipoSelezione, aggiornaCliente, inserimentoCliente } = clientiSlice.actions;
export const clientiReducer = clientiSlice.reducer;









