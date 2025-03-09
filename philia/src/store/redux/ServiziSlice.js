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









