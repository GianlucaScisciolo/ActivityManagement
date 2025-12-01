// React e Redux
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// Utils
import { controlloServizio } from "../../utils/Controlli";

export class ServizioForms {
  saloneState = useSelector((state) => state.saloneSliceReducer.value);
  lingua = this.saloneState.lingua;

  constructor() {

  }

  getCampiNuovoServizio(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Nuovo servizio" : "New service", 
      label: [
        this.lingua === "italiano" ? "Nome*" : "Name*", 
        this.lingua === "italiano" ? "Prezzo*" : "Price*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      type: [null, "text", null], 
      step: [null, null, null], 
      min: [null, null, null], 
      name: ["nome", "prezzo", "note"], 
      id: ["nuovo_nome_servizio", "nuovo_prezzo_servizio", "nuove_note_servizio"], 
      value: [item.nome, item.prezzo, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome*" : "Name*", 
        this.lingua === "italiano" ? "Prezzo*" : "Price*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      errore: [item.errore_nome, item.errore_prezzo, item.errore_note], 
      options: [null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaServizi(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Ricerca servizi" : "Services research", 
      label: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Prezzo minimo" : "Minimum price", 
        this.lingua === "italiano" ? "Prezzo massimo" : "Maximum price", 
        this.lingua === "italiano" ? "Note" : "Notes", 
        this.lingua === "italiano" ? "In uso" : "In use", 
      ], 
      type: [null, "text", "text", null, "text"], 
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "prezzo_min", "prezzo_max", "note", "in_uso"], 
      id: ["ricerca_nome_servizio", "ricerca_prezzo_min_servizio", "ricerca_prezzo_max_servizio", "ricerca_note_servizio", "ricerca_in_uso_servizio"], 
      value: [item.nome, item.prezzo_min, item.prezzo_max, item.note, item.in_uso], 
      placeholder: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Prezzo minimo" : "Minimum price", 
        this.lingua === "italiano" ? "Prezzo massimo" : "Maximum price", 
        this.lingua === "italiano" ? "Note" : "Notes", 
        this.lingua === "italiano" ? "In uso" : "In use", 
      ], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiServizioEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const saloneState = useSelector((state) => state.saloneSliceReducer.value);
    const lingua = saloneState.lingua;

    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_prezzo: "", 
      errore_note: "", 
      errore_in_uso: ""
    }); 
  
    useEffect(() => {
      controlloServizio(item, setErrori, lingua);
    }, [item]);
  
    return {
      header: lingua === "italiano" ? "Servizio" : "Service", 
      label: [null, null, null, null], 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "text", null, "text"], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome", "prezzo", "note", "in_uso"], 
      id: ["nome_servizio", "prezzo_servizio", "note_servizio", "in_uso_servizio"], 
      value: [item.nome, parseFloat(item.prezzo).toFixed(2) + " €", item.note, item.in_uso], 
      placeholder: [
        lingua === "italiano" ? "Nome" : "Name", 
        lingua === "italiano" ? "Prezzo" : "Price", 
        lingua === "italiano" ? "Note" : "Notes",
        lingua === "italiano" ? "In uso" : "In use", 
      ], 
      errore: [errori.errore_nome, errori.errore_prezzo, errori.errore_note, errori.errore_in_uso], 
      valoreModificabile: [true, true, true, true], 
      options: [null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
}









