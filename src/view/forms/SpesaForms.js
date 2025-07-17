// React e Redux
import { useState, useEffect } from "react";
// Utils
import { controlloSpesa } from "../../utils/Controlli";
import { useSelector } from 'react-redux';

export class SpesaForms {
  INDICI_NUOVA_SPESA = [0, 1, 2, 3, 4];
  INDICI_RICERCA_SPESE = [0, 1, 2, 3, 4, 5, 6];
  INDICI_SPESA_ESISTENTE = [0, 1, 2, 3, 4]; 
  INDICI_FILE = [0, 1];
  saloneState = useSelector((state) => state.saloneSliceReducer.value);
  lingua = this.saloneState.lingua;

  constructor() {

  }

  getCampiNuovaSpesa(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Nuova spesa" : "New expense", 
      label: [
        this.lingua === "italiano" ? "Nome*" : "Name*", "Nome*", 
        this.lingua === "italiano" ? "Descrizione" : "Description", 
        this.lingua === "italiano" ? "Totale*" : "Total*", 
        this.lingua === "italiano" ? "Giorno*" : "Day*", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ],  
      type: [null, null, "text", "text", null], 
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "descrizione", "totale", "giorno", "note"], 
      id: ["nuovo_nome_spesa", "nuova_descrizione_spesa", "nuovo_totale_spesa", "nuovo_giorno_spesa", "nuove_note_spesa"], 
      value: [item.nome, item.descrizione, item.totale, item.giorno, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome*" : "Name*", "Nome*", 
        this.lingua === "italiano" ? "Descrizione" : "Description", 
        this.lingua === "italiano" ? "Totale*" : "Total*", 
        this.lingua === "italiano" ? "Giorno*" : "Day*", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ], 
      errore: [item.errore_nome, item.errore_descrizione, item.errore_totale, item.errore_giorno, item.errore_note], 
      options: [null, null, null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaSpese(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Ricerca spese" : "Expenses research", 
      label: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Descrizione" : "Description", 
        this.lingua === "italiano" ? "Totale minimo" : "Minimum total",  
        this.lingua === "italiano" ? "Totale massimo" : "Maximum total",  
        this.lingua === "italiano" ? "Primo giorno" : "First day",  
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day", 
        this.lingua === "italiano" ? "Note" : "Notes", 
      ], 
      type: [null, null, "text", "text", "text", "text", null], 
      step: [null, null, null, null, null, null, null], 
      min: [null, null, null, null, null, null, null], 
      name: ["nome", "descrizione", "totale_min", "totale_max", "primo_giorno", "ultimo_giorno", "note"], 
      id: ["ricerca_nome_spesa", "ricerca_descrizione_spesa", "ricerca_totale_min_spesa", "ricerca_totale_max_spesa", "ricerca_primo_giorno_spesa", "ricerca_ultimo_giorno_spesa", "ricerca_note_spesa"], 
      value: [item.nome, item.descrizione, item.totale_min, item.totale_max, item.primo_giorno, item.ultimo_giorno, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Descrizione" : "Description", 
        this.lingua === "italiano" ? "Totale minimo" : "Minimum total",  
        this.lingua === "italiano" ? "Totale massimo" : "Maximum total",  
        this.lingua === "italiano" ? "Primo giorno" : "First day",  
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day", 
        this.lingua === "italiano" ? "Note" : "Notes", 
      ], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiSpesaEsistente(nullo, item, handleOnChange, handleOnClick, handleOnBlur) {
    const saloneState = useSelector((state) => state.saloneSliceReducer.value);
    const lingua = saloneState.lingua;

    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_descrizione: "", 
      errore_totale: "", 
      errore_giorno: "", 
      errore_note: ""
    }); 
    
    useEffect(() => {
      controlloSpesa(item, setErrori, lingua);
    }, [item]);
  
    return {
      header: lingua === "italiano" ? "Spesa" : "Expense", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, null, "number", "date", null], 
      step: [null, null, "0.50", null, null], 
      min: [null, null, "0.50", null, null], 
      name: ["nome", "descrizione", "totale", "giorno", "note"], 
      id: ["nome_spesa", "descrizione_spesa", "totale_spesa", "giorno_spesa", "note_spesa"], 
      value: [item.nome, item.descrizione, parseFloat(item.totale).toFixed(2), item.giorno, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome*" : "Name*", 
        this.lingua === "italiano" ? "Descrizione" : "Description", 
        this.lingua === "italiano" ? "Totale*" : "Total*", 
        this.lingua === "italiano" ? "Giorno*" : "Day*", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ], 
      errore: [errori.errore_nome, errori.errore_descrizione, errori.errore_totale, errori.errore_giorno, errori.errore_note], 
      valoreModificabile: [false, true, true, true, true], 
      options: [null, null, null, null, null], 
      onChange: handleOnChange,  
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiFile(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "File spese" : "Expenses file", 
      label: [
        this.lingua === "italiano" ? "Primo giorno" : "First day", 
        this.lingua === "italiano" ? "Ultimo giorno" : "Last day", 
      ], 
      type: ["text", "text"], 
      step: [null, null], 
      min: [null, null], 
      name: ["primo_giorno", "ultimo_giorno"], 
      id: ["file_primo_giorno_spesa", "file_ultimo_giorno_spesa"], 
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









