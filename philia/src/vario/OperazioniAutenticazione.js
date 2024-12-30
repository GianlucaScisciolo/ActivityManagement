import React, { useState, useEffect, useRef } from 'react';
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "./Operazioni";

export const login = async (e, setUtenti) => {
  e.preventDefault();
  autenticazioneStore.setUtenti([]);
  const formData = new FormData(e.target);
  const data = {
    username: formData.get('username'),
    password: (formData.get('password') !== null ? formData.get('password') : formData.get('passwordAttuale')),
  };

  try {
    await AutenticazioneAction.dispatchAction(data, operazioniAutenticazione.LOGIN);
    setUtenti(autenticazioneStore.getUtenti());
  } catch (error) {
    console.error("Errore durante il login: ", error);
  }
};


// export const modificaProfilo = async (e, utenti, setUtenti) => {
  // e.preventDefault();

  // await login(e, setUtenti);
  
  // autenticazioneStore.setUtenti(utenti); // Aggiorna lo store
  // //const updatedUtenti = autenticazioneStore.getUtenti(); // Ottieni l'aggiornamento degli utenti
  // alert(utenti.length);


  // autenticazioneStore.setUtenti([]);
  // const datiForm = {
  //   username: e.target.username.value,
  //   ruolo: e.target.ruolo.value,
  //   note: e.target.note.value,
  //   passwordAttuale: e.target.passwordAttuale.value,
  //   nuovaPassword: e.target.nuovaPassword.value,
  //   confermaNuovaPassword: e.target.confermaNuovaPassword.value
  // };
  
  // // console.log("Dati del form:", datiForm);
  
  // const datiLogin = {
  //   username: datiForm.username,
  //   password: datiForm.passwordAttuale,
  // };

  // await AutenticazioneAction.dispatchAction(datiLogin, operazioniAutenticazione.LOGIN).then(() => {
  //   utenti = autenticazioneStore.getUtenti();
  // }).catch(error => {
  //   console.error("Errore durante il login: ", error);
  //   return;
  // });
  // alert(utenti.length);
// };

export const modificaProfilo = async (e, setUtenti) => {
  e.preventDefault();
  autenticazioneStore.setUtenti([]);
  const datiForm = {
    username_attuale: e.target.usernameAttuale.value,
    nuovo_username: e.target.nuovoUsername.value,
    ruolo: e.target.ruolo.value,
    note: e.target.note.value,
    password_attuale: e.target.passwordAttuale.value,
    nuova_password: e.target.nuovaPassword.value,
  };

  try {
    await AutenticazioneAction.dispatchAction(datiForm, operazioniAutenticazione.MODIFICA_PROFILO);
    alert("Modifica profilo eseguita con successo");
  } catch (error) {
    console.error("Errore durante la modifica del profilo: ", error);
    if (error.message === 'Username e/o password errati') {
      alert("Username e/o password errati");
    } else {
      alert("Modifica profilo fallita.");
    }
  }
}










