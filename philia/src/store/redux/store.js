import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { autenticazioneSessionReducer } from "./AutenticazioneSessionSlice";
import { sfondoReducer } from "./SfondoSlice";
import { itemReducer } from "./ItemSlice";
import { formReducer } from "./FormSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    autenticazioneSession: autenticazioneSessionReducer,
    sfondoSession: sfondoReducer,
    itemSession: itemReducer,
    formSession: formReducer,
  },
});

export default store;
