import { configureStore } from "@reduxjs/toolkit";
import { stileSliceReducer } from "./StileSlice";
import { saloneSliceReducer } from "./SaloneSlice";
import { autenticazioneSliceReducer } from "./AutenticazioneSlice";
import { clienteSliceReducer } from "./ClienteSlice";
import { servizioSliceReducer } from "./ServizioSlice";
import { lavoroSliceReducer } from "./LavoroSlice";
import { spesaSliceReducer } from "./SpesaSlice";

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