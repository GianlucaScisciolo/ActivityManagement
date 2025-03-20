import { configureStore } from "@reduxjs/toolkit";
import { sfondoSliceReducer } from "./SfondoSlice";
import { itemSliceReducer } from "./ItemSlice";
import { formSliceReducer } from "./FormSlice";
import { widgetSliceReducer } from "./WidgetSlice";
import { autenticazioneSliceReducer } from "./AutenticazioneSlice";
import { clienteSliceReducer } from "./ClienteSlice";
import { servizioSliceReducer } from "./ServizioSlice";
import { lavoroSliceReducer } from "./LavoroSlice";
import { spesaSliceReducer } from "./SpesaSlice";

const store = configureStore({
  reducer: {
    sfondoSliceReducer: sfondoSliceReducer,
    itemSliceReducer: itemSliceReducer,
    formSliceReducer: formSliceReducer,
    widgetSliceReducer: widgetSliceReducer, 
    autenticazioneSliceReducer: autenticazioneSliceReducer,
    clienteSliceReducer: clienteSliceReducer, 
    servizioSliceReducer: servizioSliceReducer, 
    lavoroSliceReducer: lavoroSliceReducer,
    spesaSliceReducer: spesaSliceReducer, 
  },
});

export default store;