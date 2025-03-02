import { createSlice } from "@reduxjs/toolkit";

export const speseSlice = createSlice ({
  name: "speseSession",
  initialState: {
    value: {
      spese: 0, 
      nuove_spese: 0,
    } 
  },
  reducers: {
    aggiornaSpese: (state, action) => {
      state.spese = action.payload.spese
    },
  },
})

export const { aggiornaSpese } = speseSlice.actions;
export const speseReducer = speseSlice.reducer;









