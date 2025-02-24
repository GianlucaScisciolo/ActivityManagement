import PersonaAction from "../action/persona_action/PersonaAction";
import ServizioAction from "../action/servizio_action/ServizioAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";

import personaStore from "../store/persona_store/PersonaStore";
import servizioStore from "../store/servizio_store/ServizioStore";
import lavoroStore from "../store/lavoro_store/LavoroStore";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";

import { operazioniPersone, operazioniServizi, operazioniLavori, operazioniAutenticazione } from "./Operazioni";


// azzeraSelezione(items, selectedIdsModifica, setItems, tipoItem, ids_lavori);
export const azzeraSelezione = (items, setItems, tipoItem, idsLavori) => {
  let itemsAggiornati = [];
  for (let i = 0, j = 0; i < items.length; i++) {
    let itemAggiornato = { ...items[i] };
    if(itemAggiornato.tipo_selezione === 1) {
      itemAggiornato.tipo_selezione = 0;
      if(tipoItem === "lavoro") {
        itemAggiornato.id_lavoro = idsLavori[j];
        j++;
      }
    }
    itemsAggiornati.push(itemAggiornato);
  }
  try {
    setItems(itemsAggiornati);
  } 
  catch (error) {
    console.error("Errore durante l'aggiornamento degli items:", error);
  }
};

export const modifica = async (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setItems) => {
  e.preventDefault();
  
  if(tipoItem !== "cliente" && tipoItem !== "servizio" && tipoItem !== "lavoro") {
    alert("Errore: tipo non valido, Riprova più tardi.");
    return;
  }
  try {
    let dati = null;
    let itemsDaModificare = [];
    let itemsRestanti = [];
    let ids_lavori = [];

    dati = { ids: selectedIdsModifica };
    
    if(tipoItem === "cliente" || tipoItem === "servizio" || tipoItem === "lavoro") {
      itemsDaModificare = items.filter(item => dati.ids.includes(item.id)); 
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }

    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(itemsDaModificare, operazioniPersone.MODIFICA_CLIENTI);
    }
    else if(tipoItem === "servizio") {
      await ServizioAction.dispatchAction(itemsDaModificare, operazioniServizi.MODIFICA_SERVIZI);
    }
    else if(tipoItem === "lavoro") {
      await LavoroAction.dispatchAction([itemsDaModificare, servizioStore.getServizi()], operazioniLavori.MODIFICA_LAVORI);
    }
    azzeraSelezione(items, setItems, tipoItem, ids_lavori);
    
    setSelectedIdsModifica([]);
    alert("Modifica completata con successo.");
  }
  catch (error) {
    alert("Errore durante la modifica, riprova più tardi.");
  }
}









