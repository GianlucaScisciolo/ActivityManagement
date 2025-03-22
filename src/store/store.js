/************************************************** React e Redux **************************************************/
import { configureStore } from "@reduxjs/toolkit";
/************************************************** Slices Reducers **************************************************/
import { stileSliceReducer } from "./slice/StileSlice";
import { saloneSliceReducer } from "./slice/SaloneSlice";
import { autenticazioneSliceReducer } from "./slice/AutenticazioneSlice";
import { clienteSliceReducer } from "./slice/ClienteSlice";
import { servizioSliceReducer } from "./slice/ServizioSlice";
import { lavoroSliceReducer } from "./slice/LavoroSlice";
import { spesaSliceReducer } from "./slice/SpesaSlice";

const store = configureStore({
  reducer: {
    stileSliceReducer: stileSliceReducer, 
    saloneSliceReducer: saloneSliceReducer, 
    autenticazioneSliceReducer: autenticazioneSliceReducer,
    clienteSliceReducer: clienteSliceReducer, 
    servizioSliceReducer: servizioSliceReducer, 
    lavoroSliceReducer: lavoroSliceReducer,
    spesaSliceReducer: spesaSliceReducer, 
  },
});

export default store;