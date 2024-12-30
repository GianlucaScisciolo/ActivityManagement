import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { autenticazioneSessionReducer } from "./AutenticazioneSessionSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    autenticazioneSession: autenticazioneSessionReducer,
  },
});

export default store;








