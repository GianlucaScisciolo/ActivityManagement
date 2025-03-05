import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { autenticazioneSessionReducer } from "./AutenticazioneSessionSlice";
import { sfondoReducer } from "./SfondoSlice";
import { itemReducer } from "./ItemSlice";
import { formReducer } from "./FormSlice";
import { widgetsReducer } from "./WidgetsSlice";
import { clientiReducer } from "./ClientiSlice";
import { lavoriReducer } from "./LavoriSlice";
import { speseReducer } from "./SpeseSlice";
import { serviziReducer } from "./ServiziSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    autenticazioneSession: autenticazioneSessionReducer,
    sfondoSession: sfondoReducer,
    itemSession: itemReducer,
    formSession: formReducer,
    widgetsSession: widgetsReducer, 
    clientiSession: clientiReducer, 
    lavoriSession: lavoriReducer,
    speseSession: speseReducer, 
    serviziSession: serviziReducer, 
  },
});

export default store;









