import React, { useState, useEffect, useRef } from 'react';
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "./Operazioni";
import { generateRandomString, encryptPassword, passwordIsCorrect, PEPPER_HEX } from './Sicurezza';

export const login = async (e, setUtenti) => {
  e.preventDefault();
  autenticazioneStore.setUtenti([]);
  const formData = new FormData(e.target);
  const data = {
    username: formData.get('username'),
    // password: formData.get('password')
    // password: encryptPassword(formData.get('password'), 'SALT_HEX', PEPPER_HEX)
  };

  try {
    await AutenticazioneAction.dispatchAction(data, operazioniAutenticazione.LOGIN);
    setUtenti(autenticazioneStore.getUtenti());
  } catch (error) {
    console.error("Errore durante il login: ", error);
  }
};

export const eseguiModificaProfilo = async (dati) => {
  try {
    // alert("Prima:");
    // alert(datiModifica['salt_hex_db']);
    // alert(datiModifica['nuova_password']);
    const nuovo_salt_hex = generateRandomString(32);
    const nuova_password = (dati["nuova_password"] !== "") 
                            ? encryptPassword(dati["nuova_password"], nuovo_salt_hex, PEPPER_HEX)
                            : "";
    const datiModifica = {
      "username_attuale": dati["username"],
      "password_attuale": dati["password_db"],
      "nuovo_username": dati["nuovo_username"],
      "nuova_password": nuova_password,
      "nuovo_ruolo": dati["nuovo_ruolo"],
      "nuove_note": dati["nuove_note"],
      "nuovo_salt_hex": nuovo_salt_hex
    }
    // datiModifica['salt_hex'] = generateRandomString(32);
    // datiModifica['nuova_password'] = encryptPassword(dati['nuova_password'], dati['salt_hex'], PEPPER_HEX);
    // alert("Dopo:");
    // alert(datiModifica['salt_hex']);
    // alert(datiModifica['nuova_password']);
    await AutenticazioneAction.dispatchAction(datiModifica, operazioniAutenticazione.MODIFICA_PROFILO);
    alert("Modifica profilo eseguita con successo");
  }
  catch (error) {
    console.error("Errore nella modifica del profilo:", error);  // Log per vedere l'errore
    alert("Modifica profilo fallita, riprova più tardi.");
  }
}











