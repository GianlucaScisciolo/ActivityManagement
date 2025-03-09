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
    inserimentoSpesa: (state, action) => {
      if(state.value.nuoveSpese === -1) {
        state.value.nuoveSpese = [];
      }
      state.value.nuoveSpese.push(action.payload.nuovaSpesa);
    },
  },
})

export const { aggiornaSpese, aggiornaTipoSelezione, aggiornaSpesa, inserimentoSpesa } = speseSlice.actions;
export const speseReducer = speseSlice.reducer;









