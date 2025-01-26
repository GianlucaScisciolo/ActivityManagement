import LavoroAction from "../action/lavoro_action/LavoroAction";
import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione, operazioniLavori, operazioniPersone, operazioniProfessionisti } from "./Operazioni";
import { controlloCliente, controlloProfessionista, controlloLavoro } from "./Controlli";
import lavoroStore from "../store/lavoro_store/LavoroStore";
import { attesaLista } from "./Vario";
import { useState } from "react";

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
  
  // const [idsLavori, setIdsLavori] = useState(-1);
  // const [completato, setCompletato] = useState(true);

  // useEffect(() => {
    // setIdsLavori(lavoroStore.getIdsLavori());
    // if(idsLavori !== -1) {
      // setCompletato(true);
    // }
  // }, !completato);

  // alert("Modifica");
  // alert(selectedIdsModifica);
  if(tipoItem !== "cliente" && tipoItem !== "professionista" && tipoItem !== "lavoro") {
    alert("Errore: tipo non valido, Riprova più tardi.");
    return;
  }
  try {
    let dati = null;
    let itemsDaModificare = [];
    let itemsRestanti = [];
    let ids_lavori = [];

    dati = { ids: selectedIdsModifica };
    
    if(tipoItem === "cliente" || tipoItem === "professionista") {
      itemsDaModificare = items.filter(item => dati.ids.includes(item.id)); 
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }
    else if(tipoItem === "lavoro") {

      for (let item of items) {
        if (dati.ids.some(idArray =>
          idArray[0] === item.id_lavoro &&
          idArray[1] === item.id_cliente &&
          idArray[2] === item.id_professionista
        )) {
          itemsDaModificare.push(item);
        } else {
          itemsRestanti.push(item);
        }
      }
      // console.log(itemsDaModificare.length);
      // for(let item of itemsDaModificare) {
      //   console.log(item.id_lavoro);
      // }
      // console.log(itemsRestanti.length);
    }
    // console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    // console.log("|"+tipoItem+"|");
    // for(let i = 0; i < itemsDaModificare.length; i++) {console.log("||"+itemsDaModificare[i].id_lavoro+"||")}
    // console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("fuori 1");
    console.log("fuori 2");
    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(itemsDaModificare, operazioniPersone.MODIFICA_CLIENTI);
    }
    else if(tipoItem === "professionista") {
      await ProfessionistaAction.dispatchAction(itemsDaModificare, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
    }
    else if(tipoItem === "lavoro") {
      console.log("fuori 3");
      await LavoroAction.dispatchAction(itemsDaModificare, operazioniLavori.MODIFICA_LAVORI);
      console.log("fuori 4");
      // const result = await response.json();
      // ids_lavori = result.ids_lavori;
      // setIdsLavori(-1);
      // setCompletato(false);
      ids_lavori = -1;
      do { 
        console.log("Aggiornamento in corso...");
        ids_lavori = lavoroStore.getIdsLavori();
      } while(ids_lavori !== -1);
      console.log("Aggiornamento completato.");

      console.log("ids lavori ricevuti: " + ids_lavori);
      console.log("fuori 5");
    }
    console.log("fuori 6");
    azzeraSelezione(items, selectedIdsModifica, setItems, tipoItem, ids_lavori);
    console.log("fuori 7");
    setSelectedIdsModifica([]);
    console.log("fuori 8");
    alert("Modifica completata con successo.");
    console.log("fuori 9");
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








