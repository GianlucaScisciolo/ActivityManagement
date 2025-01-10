import personaStore from "../store/persona_store/PersonaStore.js";
import professionistaStore from "../store/professionista_store/ProfessionistaStore.js";
import lavoroStore from "../store/lavoro_store/LavoroStore.js";
import PersonaAction from "../action/persona_action/PersonaAction.js"
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction.js";
import LavoroAction from "../action/lavoro_action/LavoroAction.js";
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from "./Operazioni.js";

export const aggiornamentoLista = (tipoLista, setterLista1, setterLista2) => {
  if(tipoLista === "clienti") {
    const onChange = () => setterLista1(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }
  else if(tipoLista === "professionisti") {
    const onChange = () => setterLista1(professionistaStore.getProfessionisti());
    professionistaStore.addChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    return () => {
      professionistaStore.removeChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    };
  }
  else if(tipoLista === "lavori") {
    let onChange = () => setterLista1(lavoroStore.getLavoriClienti());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI_CLIENTI, onChange);
    onChange = () => setterLista2(lavoroStore.getLavoriProfessionisti());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI_CLIENTI, onChange);
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI, onChange);
    };
  }
  else {
    console.error("Errore: tipo lista = " + tipoLista + " non valido!");
  } 
}

const eseguiRicercaClienti = (e, setterLista1, setterDatiLastSearch) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    nome: formData.get('nome'),
    cognome: formData.get('cognome'),
    contatto: formData.get('contatto'),
    note: formData.get('note'),
  };
  PersonaAction.dispatchAction(data, operazioniPersone.VISUALIZZA_CLIENTI);//.visualizzaClienti(data);
  setterDatiLastSearch(data.nome, data.cognome, data.contatto, data.note);
  console.log(personaStore.getClienti().length);
  setterLista1(personaStore.getClienti());
};

const eseguiRicercaProfessionisti = (e, setterLista1, setterDatiLastSearch) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    nome: formData.get('nome'),
    professione: formData.get('professione'),
    contatto: formData.get('contatto'),
    email: formData.get('email'),
    note: formData.get('note'),
  };
  ProfessionistaAction.dispatchAction(data, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
  setterDatiLastSearch(data.nome, data.professione, data.contatto, data.email, data.note);
  console.log(professionistaStore.getProfessionisti().length);
  setterLista1(professionistaStore.getProfessionisti());
};

const eseguiRicercaLavori = (e, setterLista1, setterLista2, setterDatiLastSearch) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    nome_cliente: formData.get('nomeCliente'),
    cognome_cliente: formData.get('cognomeCliente'),
    nome_professionista: formData.get('nomeProfessionista'),
    professione: formData.get('professione'),
    descrizione: formData.get('descrizione'),
    primo_giorno: formData.get('primoGiorno'),
    ultimo_giorno: formData.get('ultimoGiorno'),
    note: formData.get('note'),
  };
  
  // alert(
  //   `Nome Cliente: ${data.nome_cliente}\n` +
  //   `Cognome Cliente: ${data.cognome_cliente}\n` +
  //   `Nome Professionista: ${data.nome_professionista}\n` +
  //   `Professione: ${data.professione}\n` +
  //   `Descrizione: ${data.descrizione}\n` +
  //   `Primo Giorno: ${data.primo_giorno}\n` +
  //   `Ultimo Giorno: ${data.ultimo_giorno}\n` +
  //   `Note: ${data.note}\n`
  // );
  
  LavoroAction.dispatchAction(data, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
  LavoroAction.dispatchAction(data, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);
  setterDatiLastSearch(data.nome_cliente, data.cognome_cliente, data.nome_professionista, data.professione, data.descrizione, data.primo_giorno, data.ultimo_giorno, data.note);
  console.log(lavoroStore.getLavoriClienti().length);
  console.log(lavoroStore.getLavoriProfessionisti().length);
  setterLista1(lavoroStore.getLavoriClienti());
  setterLista2(lavoroStore.getLavoriProfessionisti());
};

export const eseguiRicerca = (e, tipoLista, setterLista1, setterLista2, setterDatiLastSearch) => {
  if (tipoLista === "clienti") {
    eseguiRicercaClienti(e, setterLista1, setterDatiLastSearch);
  }
  else if (tipoLista === "professionisti") {
    eseguiRicercaProfessionisti(e, setterLista1, setterDatiLastSearch);
  }
  else if (tipoLista === "lavori") {
    eseguiRicercaLavori(e, setterLista1, setterLista2, setterDatiLastSearch);
  }
  else {
    alert("Errore: tipo ricerca non valido!!");
  }
}