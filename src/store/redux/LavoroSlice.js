import { createSlice } from "@reduxjs/toolkit";

export const lavoroSlice = createSlice ({
  name: "lavoro",
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

            /**/
            let serviziSelezionati = state.value.lavori[i]["descrizione_attuale"].split(',').map(item => item.trim()).filter(item => item !== "");
            for(let i = 0; i < serviziSelezionati.length; i++) {
              serviziSelezionati[i] = serviziSelezionati[i].split('-').map(item => item.trim()).filter(item => item !== "");
              serviziSelezionati[i] = {
                nome: serviziSelezionati[i][0], 
                prezzo: serviziSelezionati[i][1].substring(0, serviziSelezionati[i][1].length-2)
              };
            }
            state.value.lavori[i]["serviziSelezionati"] = serviziSelezionati;
            /**/
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

            /**/
            let serviziSelezionati = state.value.nuoviLavori[i]["descrizione_attuale"].split(',').map(item => item.trim()).filter(item => item !== "");
            for(let i = 0; i < serviziSelezionati.length; i++) {
              serviziSelezionati[i] = serviziSelezionati[i].split('-').map(item => item.trim()).filter(item => item !== "");
              serviziSelezionati[i] = {
                nome: serviziSelezionati[i][0], 
                prezzo: serviziSelezionati[i][1].substring(0, serviziSelezionati[i][1].length-2)
              };
            }
            state.value.nuoviLavori[i]["serviziSelezionati"] = serviziSelezionati;
            /**/
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
} = lavoroSlice.actions;
export const lavoroReducer = lavoroSlice.reducer;