import { configureStore } from "@reduxjs/toolkit";
import { sfondoReducer } from "./SfondoSlice";
import { itemReducer } from "./ItemSlice";
import { formReducer } from "./FormSlice";
import { widgetReducer } from "./WidgetSlice";
import { autenticazioneReducer } from "./AutenticazioneSlice";
import { clienteReducer } from "./ClienteSlice";
import { servizioReducer } from "./ServizioSlice";
import { lavoroReducer } from "./LavoroSlice";
import { spesaReducer } from "./SpesaSlice";

const store = configureStore({
  reducer: {
    sfondoReducer: sfondoReducer,
    itemReducer: itemReducer,
    formReducer: formReducer,
    widgetReducer: widgetReducer, 
    autenticazioneReducer: autenticazioneReducer,
    clienteReducer: clienteReducer, 
    servizioReducer: servizioReducer, 
    lavoroReducer: lavoroReducer,
    spesaReducer: spesaReducer, 
  },
});

export default store;