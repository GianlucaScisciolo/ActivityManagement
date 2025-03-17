import { createSlice } from "@reduxjs/toolkit";

export const speseSlice = createSlice ({
  name: "speseSession",
  initialState: {
    value: {
      spese: -1, 
      nuoveSpese: -1,
    } 
  },
  reducers: {
    aggiornaSpese: (state, action) => {
      state.value.spese = action.payload.spese 
    },
    aggiornaTipoSelezione: (state, action) => {
      if(state.value.spese !== -1) {
        for(let i = 0; i < state.value.spese.length; i++) {
          if(state.value.spese[i].id === action.payload.id_spesa) {
            state.value.spese[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
      if(state.value.nuoveSpese !== -1) {
        for(let i = 0; i < state.value.nuoveSpese.length; i++) {
          if(state.value.nuoveSpese[i].id === action.payload.id_spesa) {
            state.value.nuoveSpese[i].tipo_selezione = action.payload.nuova_selezione;
            break;
          }
        }
      }
    }, 
    aggiornaSpesa: (state, action) => {
      if(state.value.spese !== -1) {
        for(let i = 0; i < state.value.spese.length; i++) {
          if(state.value.spese[i].id === action.payload.id_spesa) {
            state.value.spese[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
      if(state.value.nuoveSpese !== -1) {
        for(let i = 0; i < state.value.nuoveSpese.length; i++) {
          if(state.value.nuoveSpese[i].id === action.payload.id_spesa) {
            state.value.nuoveSpese[i][action.payload.nome_attributo] = action.payload.nuovo_valore;
            break;
          }
        }
      }
    },
    getSpesaPrimaDellaModifica: (state, action) => {
      if(state.value.spese !== -1) {
        for(let i = 0; i < state.value.spese.length; i++) {
          if(state.value.spese[i].id === action.payload.id_spesa) {
            state.value.spese[i]["descrizione"] = state.value.spese[i]["descrizione_attuale"];
            state.value.spese[i]["totale"] = state.value.spese[i]["totale_attuale"]; 
            state.value.spese[i]["giorno"] = state.value.spese[i]["giorno_attuale"]; 
            state.value.spese[i]["note"] = state.value.spese[i]["note_attuale"]; 
            break;
          }
        }
      }
      if(state.value.nuoveSpese !== -1) {
        for(let i = 0; i < state.value.nuoveSpese.length; i++) {
          if(state.value.nuoveSpese[i].id === action.payload.id_spesa) {
            state.value.nuoveSpese[i]["descrizione"] = state.value.nuoveSpese[i]["descrizione_attuale"];
            state.value.nuoveSpese[i]["totale"] = state.value.nuoveSpese[i]["totale_attuale"]; 
            state.value.nuoveSpese[i]["giorno"] = state.value.nuoveSpese[i]["giorno_attuale"]; 
            state.value.nuoveSpese[i]["note"] = state.value.nuoveSpese[i]["note_attuale"]; 
            break;
          }
        }
      }
    },
    getSpesaDopoLaModifica: (state, action) => {
      if(state.value.spese !== -1) {
        for(let i = 0; i < state.value.spese.length; i++) {
          if(state.value.spese[i].id === action.payload.id_spesa) {
            state.value.spese[i]["descrizione_attuale"] = state.value.spese[i]["descrizione"];
            state.value.spese[i]["totale_attuale"] = state.value.spese[i]["totale"]; 
            state.value.spese[i]["giorno_attuale"] = state.value.spese[i]["giorno"]; 
            state.value.spese[i]["note_attuale"] = state.value.spese[i]["note"]; 
            break;
          }
        }
      }
      if(state.value.nuoveSpese !== -1) {
        for(let i = 0; i < state.value.nuoveSpese.length; i++) {
          if(state.value.nuoveSpese[i].id === action.payload.id_spesa) {
            state.value.nuoveSpese[i]["descrizione_attuale"] = state.value.nuoveSpese[i]["descrizione"];
            state.value.nuoveSpese[i]["totale_attuale"] = state.value.nuoveSpese[i]["totale"]; 
            state.value.nuoveSpese[i]["giorno_attuale"] = state.value.nuoveSpese[i]["giorno"]; 
            state.value.nuoveSpese[i]["note_attuale"] = state.value.nuoveSpese[i]["note"]; 
            break;
          }
        }
      }
    },
    inserimentoSpesa: (state, action) => {
      if(state.value.nuoveSpese === -1) {
        state.value.nuoveSpese = [];
      }
      state.value.nuoveSpese.push(action.payload.nuovaSpesa);
    },
  },
})

export const { 
  aggiornaSpese, aggiornaTipoSelezione, aggiornaSpesa, getSpesaPrimaDellaModifica, getSpesaDopoLaModifica, inserimentoSpesa 
} = speseSlice.actions;
export const speseReducer = speseSlice.reducer;