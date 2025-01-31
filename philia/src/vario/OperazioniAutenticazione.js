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
    setSalone(autenticazioneStore.getSalone());
    // console.log("utente: " + autenticazioneStore.getUtente());
    // console.log("salone: " + autenticazioneStore.getSalone());
  } 
  catch (error) {
    console.error("Errore durante il login: ", error);
  }
};

export const modificaProfilo = async (datiProfilo) => {
  // console.log (`
  //   username: ${datiProfilo.username}
  //   nuovo_username: ${datiProfilo.nuovo_username}
  //   note: ${datiProfilo.note}
  //   password_attuale: ${datiProfilo.password_attuale}
  //   nuova_password: ${datiProfilo.nuova_password}
  //   conferma_nuova_password: ${datiProfilo.conferma_nuova_password}
  //   password_db: ${datiProfilo.password_db}
  //   salt_hex_db: ${datiProfilo.salt_hex_db}
  // `);

  try {
    const nuovo_salt_hex = (datiProfilo["nuova_password"] !== "") ? generateRandomString(32) : "";
    const nuova_password = (datiProfilo["nuova_password"] !== "") ? encryptPassword(datiProfilo["nuova_password"], nuovo_salt_hex, PEPPER_HEX) : "";
    // ----------------------------------------------------- //
    let datiModifica = {
      username_attuale: datiProfilo["username"], 
      password_attuale: datiProfilo["password_db"], 
      nuovo_username: datiProfilo["nuovo_username"],
      nuove_note: datiProfilo["note"], 
      nuova_password: nuova_password, 
      nuovo_salt_hex: nuovo_salt_hex, 
      num_lavori_clienti: datiProfilo["num_lavori_clienti"], 
      num_lavori_professionisti: datiProfilo["num_lavori_professionisti"], 
      num_lavori_giorno: datiProfilo["num_lavori_giorno"]
    }
    
    // console.log(`
    //   username_attuale: ${datiModifica.username_attuale}
    //   password_attuale: ${datiModifica.password_attuale}
    //   nuove_note: ${datiModifica.nuove_note}
    //   nuova_password: ${datiModifica.nuova_password}
    //   nuovo_salt_hex: ${datiModifica.nuovo_salt_hex}
    // `);

    await AutenticazioneAction.dispatchAction(datiModifica, operazioniAutenticazione.MODIFICA_PROFILO);
  }
  catch (error) {
    console.error("Errore nella modifica del profilo:", error);  // Log per vedere l'errore
    alert("Modifica profilo fallita, riprova più tardi.");
  }
}











