// React e Redux
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
// Utils
import { controlloCliente } from "../../../utils/Controlli";

export class ClienteForms {
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;

  constructor() {
    
  }
  
  getCampiNuovoCliente(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Nuovo cliente" : "New client", 
      label: [
        this.lingua === "italiano" ? "Nome*" : "First name*", 
        this.lingua === "italiano" ? "Cognome*" : "Last name*", 
        this.lingua === "italiano" ? "Telefono / cellulare" : "Landline phone / Mobile phone", 
        "Email", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ],  
      type: [null, null, "text", "text", null],
      step: [null, null, null, null, null],  
      min: [null, null, null, null, null], 
      name: ["nome", "cognome", "contatto", "email", "note"], 
      id: ["nuovo_nome_cliente", "nuovo_cognome_cliente", "nuovo_contatto_cliente", "nuova_email_cliente", "nuove_note_cliente"], 
      value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome*" : "First name*", 
        this.lingua === "italiano" ? "Cognome*" : "Last name*", 
        this.lingua === "italiano" ? "Telefono / cellulare" : "Landline phone / Mobile phone", 
        "Email", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ],
      errore: [item.errore_nome, item.errore_cognome, item.errore_contatto, item.errore_email, item.errore_note], 
      options: [null, null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaClienti(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Ricerca clienti" : "Clients research",  
      label: [
        this.lingua === "italiano" ? "Nome" : "First name", 
        this.lingua === "italiano" ? "Cognome" : "Last name", 
        this.lingua === "italiano" ? "Telefono / cellulare" : "Landline phone / Mobile phone", 
        "Email", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ], 
      type: [null, null, "text", "text", null],  
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "cognome", "contatto", "email", "note"], 
      id: ["ricerca_nome_cliente", "ricerca_cognome_cliente", "ricerca_contatto_cliente", "ricerca_email_cliente", "ricerca_note_cliente"], 
      value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome" : "First name", 
        this.lingua === "italiano" ? "Cognome" : "Last name", 
        this.lingua === "italiano" ? "Telefono / cellulare" : "Landline phone / Mobile phone", 
        "Email", 
        this.lingua === "italiano" ? "Note" : "Notes"
      ], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiClienteEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const attivitaState = useSelector((state) => state.attivita.value);
    const lingua = attivitaState.lingua;
    const [errori, setErrori] = useState({
      errore_contatto: "", 
      errore_email: "", 
      errore_note: ""
    });

    useEffect(() => {
      controlloCliente(item, setErrori, lingua);
    }, [item]);


    return {
      header: lingua === "italiano" ? "Cliente" : "Client", 
      label: [null, null, null, null], 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "text", "text", null],  
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome_e_cognome", "contatto", "email", "note"], 
      id: ["nome_e_cognome_cliente", "contatto_cliente", "email_cliente", "note_cliente"], 
      value: [item.nome + " " + item.cognome, item.contatto, item.email, item.note], 
      placeholder: [
        lingua === "italiano" ? "Nome e cognome" : "First and last name", 
        lingua === "italiano" ? "Telefono / cellulare" : "Landline phone / Mobile phone", 
        "Email", 
        lingua === "italiano" ? "Note" : "Notes", 
      ], 
      errore: [null, errori.errore_contatto, errori.errore_email, errori.errore_note], 
      valoreModificabile: [false, true, true, true], 
      options: [null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
}









