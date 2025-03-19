import { createSlice } from "@reduxjs/toolkit";

export const clienteSlice = createSlice ({
  name: "cliente",
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
    getClientePrimaDellaModifica: (state, action) => {
      if(state.value.clienti !== -1) {
        for(let i = 0; i < state.value.clienti.length; i++) {
          if(state.value.clienti[i].id === action.payload.id_cliente) {
            state.value.clienti[i]["contatto"] = state.value.clienti[i]["contatto_attuale"];
            state.value.clienti[i]["email"] = state.value.clienti[i]["email_attuale"]; 
            state.value.clienti[i]["note"] = state.value.clienti[i]["note_attuale"]; 
            break;
          }
        }
      }
      if(state.value.nuoviClienti !== -1) {
        for(let i = 0; i < state.value.nuoviClienti.length; i++) {
          if(state.value.nuoviClienti[i].id === action.payload.id_cliente) {
            state.value.nuoviClienti[i]["contatto"] = state.value.nuoviClienti[i]["contatto_attuale"];
            state.value.nuoviClienti[i]["email"] = state.value.nuoviClienti[i]["email_attuale"]; 
            state.value.nuoviClienti[i]["note"] = state.value.nuoviClienti[i]["note_attuale"]; 
            break;
          }
        }
      }
    },
    getClienteDopoLaModifica: (state, action) => {
      if(state.value.clienti !== -1) {
        for(let i = 0; i < state.value.clienti.length; i++) {
          if(state.value.clienti[i].id === action.payload.id_cliente) {
            state.value.clienti[i]["contatto_attuale"] = state.value.clienti[i]["contatto"];
            state.value.clienti[i]["email_attuale"] = state.value.clienti[i]["email"]; 
            state.value.clienti[i]["note_attuale"] = state.value.clienti[i]["note"]; 
            break;
          }
        }
      }
      if(state.value.nuoviClienti !== -1) {
        for(let i = 0; i < state.value.nuoviClienti.length; i++) {
          if(state.value.nuoviClienti[i].id === action.payload.id_cliente) {
            state.value.nuoviClienti[i]["contatto_attuale"] = state.value.nuoviClienti[i]["contatto"];
            state.value.nuoviClienti[i]["email_attuale"] = state.value.nuoviClienti[i]["email"]; 
            state.value.nuoviClienti[i]["note_attuale"] = state.value.nuoviClienti[i]["note"]; 
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

export const { 
  aggiornaClienti, aggiornaTipoSelezione, aggiornaCliente, getClientePrimaDellaModifica, getClienteDopoLaModifica, inserimentoCliente 
} = clienteSlice.actions;
export const clienteReducer = clienteSlice.reducer;