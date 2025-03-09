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
      if(state.value.clienti !== -1) {
        for(let i = 0; i < state.value.clienti.length; i++) {
          if(state.value.clienti[i].id === action.payload.id_cliente) {
            state.value.clienti[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
      if(state.value.nuoviClienti !== -1) {
        for(let i = 0; i < state.value.nuoviClienti.length; i++) {
          if(state.value.nuoviClienti[i].id === action.payload.id_cliente) {
            state.value.nuoviClienti[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
    }, 
    aggiornaCliente: (state, action) => {
      if(state.value.clienti !== -1) {
        for(let i = 0; i < state.value.clienti.length; i++) {
          if(state.value.clienti[i].id === action.payload.id_cliente) {
            state.value.clienti[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
      if(state.value.nuoviClienti !== -1) {
        for(let i = 0; i < state.value.nuoviClienti.length; i++) {
          if(state.value.nuoviClienti[i].id === action.payload.id_cliente) {
            state.value.nuoviClienti[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
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









