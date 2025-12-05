// React e Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices Reducers
import { stileReducer } from "./reducers/StileReducer";
import { saloneReducer } from "./reducers/SaloneReducer";
import { autenticazioneReducer } from "./reducers/AutenticazioneReducer";
import { clienteReducer } from "./reducers/ClienteReducer";
import { servizioReducer } from "./reducers/ServizioReducer";
import { lavoroReducer } from "./reducers/LavoroReducer";
import { spesaReducer } from "./reducers/SpesaReducer";

const store = configureStore({
  reducer: {
    autenticazione: autenticazioneReducer,
    stile: stileReducer, 
    salone: saloneReducer, 
    cliente: clienteReducer, 
    servizio: servizioReducer, 
    lavoro: lavoroReducer,
    spesa: spesaReducer, 
  },
});

export default store;