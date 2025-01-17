import LavoroAction from "../action/lavoro_action/LavoroAction";
import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione, operazioniLavori, operazioniPersone, operazioniProfessionisti } from "./Operazioni";
import { controlloCliente, controlloProfessionista, controlloLavoro } from "./Controlli";

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

const azzeraSelezione = (items, ids, setItems) => {
  let itemsAggiornati = [];
  for (let i = 0; i < items.length; i++) {
    let itemAggiornato = { ...items[i] }; // Clonazione dell'oggetto per evitare mutazioni
    if (ids.includes(items[i].id)) {
      itemAggiornato.tipo_selezione = 0;
    }
    itemsAggiornati.push(itemAggiornato);
  }
  try {
    setItems(itemsAggiornati);
  } catch (error) {
    console.error("Errore durante l'aggiornamento degli items:", error);
  }
};

function prova(items, ids, setItems) {
  console("- 1");
  // let itemsAggiornati = [];
  // console("- 2");
  // for (let i = 0; i < items.length; i++) {
  //   console("- 3 - " + i);
  //   let itemAggiornato = { ...items[i] }; // Clonare l'oggetto per evitare mutazioni
  //   console("- 4 - " + i);
  //   if(ids.includes(items[i].id)) {
  //     console("- 5 - " + i);
  //     itemAggiornato.id = 0;
  //     console("- 6 - " + i);
  //   }
  //   console("- 7 - " + i);
  //   itemsAggiornati.push(itemAggiornato);
  //   console("- 8 - " + i);
  // }
  // console("- 9");
  // setItems(itemsAggiornati);
  // console("- 10");
};
// (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setterItems)
export const modifica = async (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setItems) => {
  e.preventDefault();

  // alert("Modifica");
  // alert(selectedIdsModifica);
  if(tipoItem !== "cliente" && tipoItem !== "professionista" && tipoItem !== "lavoro") {
    alert("Errore: tipo non valido, Riprova più tardi.");
    return;
  }
  try {
    const dati = { ids: selectedIdsModifica };
    const itemsDaModificare = items.filter(item => dati.ids.includes(item.id));
    const itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    console.log("-------------------------------------");
    for(let item of itemsDaModificare) {
      console.log(item);
    }
    console.log("-------------------------------------");
    for(let item of itemsRestanti) {
      console.log(item);
    }
    console.log("prima della modifica");
    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(itemsDaModificare, operazioniPersone.MODIFICA_CLIENTI);
    }
    else if(tipoItem === "professionista") {
      await ProfessionistaAction.dispatchAction(itemsDaModificare, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
    }
    else if(tipoItem === "lavoro") {
      await LavoroAction.dispatchAction(itemsDaModificare, operazioniLavori.MODIFICA_LAVORI);
    }
    console.log("Dopo la modifica");
    console.log("Prima del setter");
    // azzeraSelezione(items, selectedIdsModifica, setItems);
    azzeraSelezione(items, selectedIdsModifica, setItems);
    console.log("Dopo il setter");
    // setSelectedIdsModifica([]);
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








