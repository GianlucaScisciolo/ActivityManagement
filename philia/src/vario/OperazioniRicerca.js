import personaStore from "../store/persona_store/PersonaStore.js";
import professionistaStore from "../store/professionista_store/ProfessionistaStore.js";
import lavoroStore from "../store/lavoro_store/LavoroStore.js";
import PersonaAction from "../action/persona_action/PersonaAction.js"
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction.js";
import LavoroAction from "../action/lavoro_action/LavoroAction.js";
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from "./Operazioni.js";

export const aggiornamentoLista = (tipoLista, setLista1, setLista2) => {
  if(tipoLista === "clienti") {
    const onChange = () => setLista1(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }
  else if(tipoLista === "professionisti") {
    const onChange = () => setLista1(professionistaStore.getProfessionisti());
    professionistaStore.addChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    return () => {
      professionistaStore.removeChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    };
  }
  else if(tipoLista === "lavori") {
    let onChange = () => setLista1(lavoroStore.getLavori());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    };
  }
  else {
    console.error("Errore: tipo lista = " + tipoLista + " non valido!");
  } 
}

const eseguiRicercaClienti = (e, setLista1, datiRicerca) => {
  PersonaAction.dispatchAction(datiRicerca, operazioniPersone.VISUALIZZA_CLIENTI);//.visualizzaClienti(data);
};

const eseguiRicercaProfessionisti = (e, setLista1, datiRicerca) => {
  ProfessionistaAction.dispatchAction(datiRicerca, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
};

const eseguiRicercaLavori = (e, setLista1, datiRicerca) => {
  LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI);
};

// eseguiRicerca(e, tipoLista, setLista1, setLista2, setDatiRicerca)
export const eseguiRicerca = (e, tipoLista, setLista1, setLista2, datiRicerca) => {
  e.preventDefault();

  if(tipoLista === "clienti") {
    eseguiRicercaClienti(e, setLista1, datiRicerca);
  }
  else if(tipoLista === "professionisti") {
    eseguiRicercaProfessionisti(e, setLista1, datiRicerca)
  }
  else if(tipoLista === "lavori") {
    eseguiRicercaLavori(e, setLista1, datiRicerca)
  }
  else {
    alert("Errore, tipo lista non valido.");
  }
}