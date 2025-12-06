// React e Redux
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
// View
import { OptionsServizi } from './ServizioForms';
// Actions
import { LavoroActions } from "../../actions/LavoroActions";
import { ServizioActions } from "../../actions/ServizioActions";
// Utils
import { controlloLavoro } from "../../../utils/Controlli";

export class LavoroForms {
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;

  constructor() {

  }

  getCampiNuovoLavoro(item, clienti, servizi, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Nuovo lavoro" : "New job", 
      label: [
        this.lingua === "italiano" ? "Cliente*" : "Client*", 
        this.lingua === "italiano" ? "Servizio*" : "Service*", 
        this.lingua === "italiano" ? "Giorno*" : "Day*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ],  
      type: [null, null, "text", null], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["cliente", "servizio", "giorno", "note"], 
      id: ["nuovo_cliente_lavoro", "nuovo_servizio_lavoro", "nuovo_giorno_lavoro", "nuove_note_lavoro"], 
      value: [item.cliente, item.servizio, item.giorno, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Cliente*" : "Client*", 
        this.lingua === "italiano" ? "Servizio*" : "Service*", 
        this.lingua === "italiano" ? "Giorno*" : "Day*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ],
      errore: [item.errore_cliente, item.errore_servizi, item.errore_giorno, item.errore_note], 
      options: [clienti, servizi, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
  
  getCampiRicercaLavori(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Ricerca lavori" : "Jobs research", 
      label: [
        this.lingua === "italiano" ? "Cliente" : "Client", 
        this.lingua === "italiano" ? "Primo giorno" : "First day",
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      type: [null, "text", "text", null], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["cliente", "primo_giorno", "ultimo_giorno", "note"], 
      id: ["ricerca_cliente_lavoro", "ricerca_primo_giorno_lavoro", "ricerca_ultimo_giorno_lavoro", "ricerca_note_lavoro"], 
      value: [item.cliente, item.primo_giorno, item.ultimo_giorno, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Cliente" : "Client", 
        this.lingua === "italiano" ? "Primo giorno" : "First day",
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiLavoroEsistente(item, handleOnChange, handleOnClick, handleOnBlur) {
    const attivitaState = useSelector((state) => state.attivita.value);
    const lingua = attivitaState.lingua;
    const sottoStringa = item.servizio || "";
    const optionsServiziVar = React.createElement(OptionsServizi, { item, sottoStringa, setServiziLavoro: null });
    
    const [errori, setErrori] = useState({
      errore_cliente: "", 
      errore_servizi: "", 
      errore_totale: "", 
      errore_giorno: "", 
      errore_note: ""
    });
    
    useEffect(() => {
      controlloLavoro(item, setErrori, lingua);
    }, [item]);
    
    return {
      header: lingua === "italiano" ? "Lavoro" : "Job", 
      label: [null, null, null, null], 
      tipoSelezione: item.tipo_selezione,  
      type: [null, null, "date", null],
      step: [null, null, null, null], 
      min: [null, null, null, null],
      name: ["cliente", "servizio", "giorno", "note"], 
      id: ["cliente_lavoro", "servizio_lavoro", "giorno_lavoro", "note_lavoro"], 
      value: [item.cliente, item.servizio, item.giorno, item.note], 
      placeholder: [
        lingua === "italiano" ? "Cliente*" : "Client*", 
        lingua === "italiano" ? "Servizio*" : "Service*", 
        lingua === "italiano" ? "Giorno*" : "Day*", 
        lingua === "italiano" ? "Note" : "Notes",
      ], 
      errore: [errori.errore_cliente, errori.errore_totale, errori.errore_giorno, errori.errore_note], 
      valoreModificabile: [false, true, true, true], 
      options: [null, optionsServiziVar, null],
      onChange: handleOnChange,
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiFile(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "File lavori" : "Jobs file",  
      label: [
        this.lingua === "italiano" ? "Primo giorno" : "First day",
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day",
      ], 
      type: ["text", "text"], 
      step: [null, null], 
      min: [null, null], 
      name: ["primo_giorno", "ultimo_giorno"], 
      id: ["file_primo_giorno_lavoro", "file_ultimo_giorno_lavoro"], 
      value: [item.primo_giorno, item.ultimo_giorno], 
      placeholder: [
        this.lingua === "italiano" ? "Primo giorno" : "First day",
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day",
      ],  
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
  
}









