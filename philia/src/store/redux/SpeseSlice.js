import { createSlice } from "@reduxjs/toolkit";

export const speseSlice = createSlice ({
  name: "speseSession",
  initialState: {
    value: {
      spese: [], 
      nuoveSpese: [],
    } 
  },
  reducers: {
    aggiornaSpese: (state, action) => {
      state.value.spese = action.payload.spese 
    },
    aggiornaTipoSelezione: (state, action) => {
      for(let spesa of [...state.value.spese, ...state.value.nuoveSpese]) {
        if(spesa.id === action.payload.id_spesa) {
          spesa.tipo_selezione = action.payload.nuova_selezione;
          break;
        }
      }
    }, 
    aggiornaSpesa: (state, action) => {
      for(let spesa of [...state.value.spese, ...state.value.nuoveSpese]) {
        if(spesa.id === action.payload.id_spesa) {
          spesa[action.payload.nome_attributo] = action.payload.nuovo_valore;
          break;
        }
      }
    },
    inserimentoSpesa: (state, action) => {
      state.value.nuoveSpese.push(action.payload.nuovaSpesa);
    },
  },
})

export const { aggiornaSpese, aggiornaTipoSelezione, aggiornaSpesa, inserimentoSpesa } = speseSlice.actions;
export const speseReducer = speseSlice.reducer;









