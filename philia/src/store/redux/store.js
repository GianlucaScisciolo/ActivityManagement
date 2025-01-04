import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { autenticazioneSessionReducer } from "./AutenticazioneSessionSlice";
import { sfondoReducer } from "./SfondoSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    autenticazioneSession: autenticazioneSessionReducer,
    sfondoSession: sfondoReducer,
  },
});

export default store;








