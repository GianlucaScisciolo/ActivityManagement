import personaStore from "../store/persona_store/PersonaStore.js";
import servizioStore from "../store/servizio_store/ServizioStore.js"
import lavoroStore from "../store/lavoro_store/LavoroStore.js";
import saloneStore from "../store/salone_store/SaloneStore.js";
import PersonaAction from "../action/persona_action/PersonaAction.js"
import ServizioAction from "../action/servizio_action/ServizioAction.js"
import LavoroAction from "../action/lavoro_action/LavoroAction.js";
import SaloneAction from "../action/salone_action/SaloneAction.js";
import { operazioniPersone, operazioniServizi, operazioniLavori, operazioniSaloni } from "./Operazioni.js";
import { aggiornaSpese } from "../store/redux/SpeseSlice.js";

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
  else if(tipoLista === "spese") {
    const onChange = () => setLista(saloneStore.getSpese());
    saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
    return () => {
      saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
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
  servizioStore.setServizi(-1);
  LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI);
};

const eseguiRicercaSpese = (e, datiRicerca, dispatch) => {
  saloneStore.setSpese(-1);
  dispatch(aggiornaSpese({
    spese: saloneStore.getSpese(),
  }));
  SaloneAction.dispatchAction(datiRicerca, operazioniSaloni.VISUALIZZA_SPESE);
  console.log(saloneStore.getSpese());

};

export const eseguiRicerca = (e, tipoLista, setLista, datiRicerca, dispatch) => {
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
  else if(tipoLista === "spese") {
    eseguiRicercaSpese(e, datiRicerca, dispatch)
  }
  else {
    alert("Errore, tipo lista non valido.");
  }
}