import React, { useState, useEffect, useRef } from 'react';
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "./Operazioni";
import { generateRandomString, encryptPassword, passwordIsCorrect, PEPPER_HEX } from './Sicurezza';

export const login = async (e, datiLogin, setUtente, setSalone) => {
  e.preventDefault();
  try {
    await AutenticazioneAction.dispatchAction(datiLogin, operazioniAutenticazione.LOGIN);
    setUtente(autenticazioneStore.getUtente());
  } 
  catch (error) {
    console.error("Errore durante il login: ", error);
  }
};

export const modificaProfilo = async (datiProfilo) => {
  try {
    const nuovo_salt_hex = (datiProfilo["nuova_password"] !== "") ? generateRandomString(32) : "";
    const nuova_password = (datiProfilo["nuova_password"] !== "") ? encryptPassword(datiProfilo["nuova_password"], nuovo_salt_hex, PEPPER_HEX) : "";
    let datiModifica = {
      username_attuale: datiProfilo["username"], 
      password_attuale: datiProfilo["password_db"], 
      nuovo_username: datiProfilo["nuovo_username"],
      nuove_note: datiProfilo["note"], 
      nuova_password: nuova_password, 
      nuovo_salt_hex: nuovo_salt_hex, 
    }
    
    await AutenticazioneAction.dispatchAction(datiModifica, operazioniAutenticazione.MODIFICA_PROFILO);
  }
  catch (error) {
    console.error("Errore nella modifica del profilo:", error);  // Log per vedere l'errore
    alert("Modifica profilo fallita, riprova più tardi.");
  }
}











