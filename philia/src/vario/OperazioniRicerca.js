import personaStore from "../store/persona_store/PersonaStore.js";
import servizioStore from "../store/servizio_store/ServizioStore.js"
import lavoroStore from "../store/lavoro_store/LavoroStore.js";
import PersonaAction from "../action/persona_action/PersonaAction.js"
import ServizioAction from "../action/servizio_action/ServizioAction.js"
import LavoroAction from "../action/lavoro_action/LavoroAction.js";
import { operazioniPersone, operazioniServizi, operazioniLavori } from "./Operazioni.js";

export const aggiornamentoLista = (tipoLista, setLista) => {
  if(tipoLista === "clienti") {
    const onChange = () => setLista(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }
  else if(tipoLista === "servizi") {
    const onChange = () => setLista(servizioStore.getServizi());
    servizioStore.addChangeListener(operazioniServizi.VISUALIZZA_SERVIZI, onChange);
    return () => {
      servizioStore.removeChangeListener(operazioniServizi.VISUALIZZA_SERVIZI, onChange);
    };
  }
  else if(tipoLista === "lavori") {
    let onChange = () => setLista(lavoroStore.getLavori());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    };
  }
  else {
    console.error("Errore: tipo lista = " + tipoLista + " non valido!");
  } 
}

const eseguiRicercaClienti = (e, setLista, datiRicerca) => {
  PersonaAction.dispatchAction(datiRicerca, operazioniPersone.VISUALIZZA_CLIENTI);
};

const eseguiRicercaServizi = (e, setLista, datiRicerca) => {
  ServizioAction.dispatchAction(datiRicerca, operazioniServizi.VISUALIZZA_SERVIZI);
};

const eseguiRicercaLavori = (e, setLista, datiRicerca) => {
  LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI);
};

export const eseguiRicerca = (e, tipoLista, setLista, datiRicerca) => {
  e.preventDefault();

  if(tipoLista === "clienti") {
    eseguiRicercaClienti(e, setLista, datiRicerca);
  }
  else if(tipoLista === "servizi") {
    eseguiRicercaServizi(e, setLista, datiRicerca)
  }
  else if(tipoLista === "lavori") {
    eseguiRicercaLavori(e, setLista, datiRicerca)
  }
  else {
    alert("Errore, tipo lista non valido.");
  }
}