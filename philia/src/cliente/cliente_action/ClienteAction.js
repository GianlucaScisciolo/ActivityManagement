import { useState, useEffect } from "react";
import { controlloCliente } from "../../vario/Controlli";

export class ClienteAction {
  INDICI_NUOVO_CLIENTE = [0, 1, 2, 3, 4];
  INDICI_RICERCA_CLIENTI = [0, 1, 2, 3, 4];
  INDICI_CLIENTE_ESISTENTE = [0, 1, 2, 3];

  constructor() {

  }

  getCampiNuovoCliente(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Nuovo cliente", 
      label: ["Nome*", "Cognome*", "Contatto", "Email", "Note"],  
      type: [null, null, "text", "text", null],
      step: [null, null, null, null, null],  
      min: [null, null, null, null, null], 
      name: ["nome", "cognome", "contatto", "email", "note"], 
      id: ["nuovo_nome_cliente", "nuovo_cognome_cliente", "nuovo_contatto_cliente", "nuova_email_cliente", "nuove_note_cliente"], 
      value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
      placeholder: ["Nome*", "Cognome*", "Contatto", "Email", "Note"],
      errore: [item.errore_nome, item.errore_cognome, item.errore_contatto, item.errore_email, item.errore_note], 
      options: [null, null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaClienti(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Ricerca clienti", 
      label: ["Nome", "Cognome", "Contatto", "email", "Note"], 
      type: [null, null, "text", "text", null],  
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "cognome", "contatto", "email", "note"], 
      id: ["ricerca_nome_cliente", "ricerca_cognome_cliente", "ricerca_contatto_cliente", "ricerca_email_cliente", "ricerca_note_cliente"], 
      value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
      placeholder: ["Nome", "Cognome", "Contatto", "Email", "Note"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiClienteEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const [errori, setErrori] = useState({
      errore_contatto: "", 
      errore_email: "", 
      errore_note: ""
    });
  
    useEffect(() => {
      controlloCliente(item, setErrori);
    }, [item]);
  
  
    return {
      header: "Cliente", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "text", "text", null],  
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome_e_cognome", "contatto", "email", "note"], 
      id: ["nome_e_cognome_cliente", "contatto_cliente", "email_cliente", "note_cliente"], 
      value: [item.nome + " " + item.cognome, item.contatto, item.email, item.note], 
      placeholder: ["Nome e cognome", "Contatto", "Email", "Note"], 
      errore: [null, errori.errore_contatto, errori.errore_email, errori.errore_note], 
      valoreModificabile: [false, true, true, true], 
      options: [null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
}









