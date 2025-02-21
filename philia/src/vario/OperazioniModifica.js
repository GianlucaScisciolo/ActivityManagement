import PersonaAction from "../action/persona_action/PersonaAction";
import ServizioAction from "../action/servizio_action/ServizioAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";

import personaStore from "../store/persona_store/PersonaStore";
import servizioStore from "../store/servizio_store/ServizioStore";
import lavoroStore from "../store/lavoro_store/LavoroStore";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";

import { operazioniPersone, operazioniServizi, operazioniLavori, operazioniAutenticazione } from "./Operazioni";

const aggiornaItems = (items, dati, setItems) => {
  const updatedItems = items.map(item => {
    if (dati.ids.includes(item.id)) {
      return { 
        ...item, 
        tipo_selezione: 0 
      };
    }
    return item;
  });
  setItems(updatedItems);
};

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
    
    if(tipoItem === "cliente") {
      itemsDaModificare = items.filter(item => dati.ids.includes(item.id)); 
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }
    else if(tipoItem === "servizio") {
      itemsDaModificare = items.filter(item => dati.ids.includes(item.id)); 
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }
    else if(tipoItem === "lavoro") {
      for (let item of items) {
        if (dati.ids.some(idArray =>
          idArray[0] === item.id_lavoro &&
          idArray[1] === item.id_cliente 
        )) {
          itemsDaModificare.push(item);
        } else {
          itemsRestanti.push(item);
        }
      }
    }
    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(itemsDaModificare, operazioniPersone.MODIFICA_CLIENTI);
    }
    else if(tipoItem === "servizio") {
      await ServizioAction.dispatchAction(itemsDaModificare, operazioniServizi.MODIFICA_SERVIZI);
    }
    else if(tipoItem === "lavoro") {
      await LavoroAction.dispatchAction(itemsDaModificare, operazioniLavori.MODIFICA_LAVORI);
      ids_lavori = -1;
      do { 
        console.log("Aggiornamento in corso...");
        ids_lavori = lavoroStore.getIdsLavori();
      } while(ids_lavori !== -1);
      console.log("Aggiornamento completato.");

      console.log("ids lavori ricevuti: " + ids_lavori);
      console.log("fuori 5");
    }
    azzeraSelezione(items, selectedIdsModifica, setItems, tipoItem, ids_lavori);
    
    setSelectedIdsModifica([]);
    alert("Modifica completata con successo.");
  }
  catch (error) {
    alert("Errore durante la modifica, riprova più tardi.");
  }
}


  // try {
  //   const data = {ids: selectedIdsModifica};
  //   const itemsDaModificare = items.filter(item => data.ids.includes(item.id));
  //   const itemsRestanti = items.filter(item => !data.ids.includes(item.id));
  //   if(tipoItem === "cliente") {
  //     for(let i = 0; i < itemsDaModificare.length; i++) {
  //       let datiModifica = {
  //         id: itemsDaModificare[i].id,
  //         // nome: itemsDaModificare[i].nome,
  //         // cognome: itemsDaModificare[i].cognome,
  //         contatto: itemsDaModificare[i].contatto,
  //         note: itemsDaModificare[i].note
  //       }
  //       if(controlloCliente(datiModifica, setErrori) > 0) {
  //         return;
  //       }
  //       await PersonaAction.dispatchAction(datiModifica, operazioniPersone.MODIFICA_CLIENTI);
  //       aggiornaItems(items, data, setItems);
  //     }
  //   }
  //   else if(tipoItem === "professionista") {
  //     for(let i = 0; i < itemsDaModificare.length; i++) {
  //       let datiModifica = {
  //         "nome": itemsDaModificare[i].nome,
  //         "professione": itemsDaModificare[i].professione,
  //         "contatto": itemsDaModificare[i].contatto,
  //         "email": itemsDaModificare[i].email,
  //         "note": itemsDaModificare[i].note
  //       }
  //       if(controlloProfessionista(datiModifica, setErrori) > 0) {
  //         return;
  //       }
  //       await ProfessionistaAction.dispatchAction(itemsDaModificare, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
  //       aggiornaItems(items, data, setItems);
  //     }
  //   }
  //   else {
  //     alert(tipoItem);
  //     alert("Da fare!!");
  //     return;
  //   }
  //   alert("Modifica completata con successo.");
  // }
  // catch(error) {
  //   alert("Errore durante la modifica, riprova più tardi.");
  // }
  // setSelectedIdsModifica([]);
// }








