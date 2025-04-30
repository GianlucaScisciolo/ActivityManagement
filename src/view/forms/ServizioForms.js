// React e Redux
import { useState, useEffect } from "react";
// Utils
import { controlloServizio } from "../../utils/Controlli";

export class ServizioForms {
  INDICI_NUOVO_SERVIZIO = [0, 1, 2];
  INDICI_RICERCA_SERVIZI = [0, 1, 2, 3, 4];
  INDICI_SERVIZIO_ESISTENTE = [0, 1, 2, 3];

  constructor() {

  }

  getCampiNuovoServizio(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Nuovo servizio", 
      label: ["Nome*", "Prezzo*", "Note"],  
      type: [null, "text", null], 
      step: [null, null, null], 
      min: [null, null, null], 
      name: ["nome", "prezzo", "note"], 
      id: ["nuovo_nome_servizio", "nuovo_prezzo_servizio", "nuove_note_servizio"], 
      value: [item.nome, item.prezzo, item.note], 
      placeholder: ["Nome*", "Prezzo*", "Note"],
      errore: [item.errore_nome, item.errore_prezzo, item.errore_note], 
      options: [null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaServizi(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Ricerca servizi", 
      label: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note", "In uso"], 
      type: [null, "text", "text", null, "text"], 
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "prezzo_min", "prezzo_max", "note", "in_uso"], 
      id: ["ricerca_nome_servizio", "ricerca_prezzo_min_servizio", "ricerca_prezzo_max_servizio", "ricerca_note_servizio", "ricerca_in_uso_servizio"], 
      value: [item.nome, item.prezzo_min, item.prezzo_max, item.note, item.in_uso], 
      placeholder: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note", "In uso"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiServizioEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_prezzo: "", 
      errore_note: "", 
      errore_in_uso: ""
    }); 
  
    useEffect(() => {
      controlloServizio(item, setErrori);
    }, [item]);
  
    return {
      header: "Servizio", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "text", null, "text"], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome", "prezzo", "note", "in_uso"], 
      id: ["nome_servizio", "prezzo_servizio", "note_servizio", "in_uso_servizio"], 
      value: [item.nome, parseFloat(item.prezzo).toFixed(2) + " €", item.note, item.in_uso], 
      placeholder: ["Nome", "Prezzo", "Note", "In uso"], 
      errore: [errori.errore_nome, errori.errore_prezzo, errori.errore_note, errori.errore_in_uso], 
      valoreModificabile: [true, true, true, true], 
      options: [null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
}









