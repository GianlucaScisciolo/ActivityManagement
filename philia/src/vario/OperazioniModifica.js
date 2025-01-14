import LavoroAction from "../action/lavoro_action/LavoroAction";
import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione, operazioniLavori, operazioniPersone, operazioniProfessionisti } from "./Operazioni";
import { controlloCliente, controlloProfessionista, controlloLavoro } from "./Controlli";

const aggiornaItems = (items, data, setItems) => {
  const updatedItems = items.map(item => {
    if (data.ids.includes(item.id)) {
      return { ...item, tipo_selezione: 0 };
    }
    return item;
  });
  setItems(updatedItems);
};

export const modifica = async (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setErrori, setItems) => {
  e.preventDefault();
  // console.log(tipoItem);
  // for(let i = 0; i < selectedIdsModifica.length; i++) {
  //   console.log(selectedIdsModifica[i]);
  // }
  if(tipoItem !== "cliente" && tipoItem !== "professionista" && tipoItem !== "lavoro") {
    alert("Errore: tipo non valido, Riprova più tardi.");
    return;
  }
  try {
    const data = {ids: selectedIdsModifica};
    const itemsDaModificare = items.filter(item => data.ids.includes(item.id));
    const itemsRestanti = items.filter(item => !data.ids.includes(item.id));
    if(tipoItem === "cliente") {
      for(let i = 0; i < itemsDaModificare.length; i++) {
        let datiModifica = {
          id: itemsDaModificare[i].id,
          // nome: itemsDaModificare[i].nome,
          // cognome: itemsDaModificare[i].cognome,
          contatto: itemsDaModificare[i].contatto,
          note: itemsDaModificare[i].note
        }
        if(controlloCliente(datiModifica, setErrori) > 0) {
          return;
        }
        await PersonaAction.dispatchAction(datiModifica, operazioniPersone.MODIFICA_CLIENTI);
        aggiornaItems(items, data, setItems);
      }
    }
    else if(tipoItem === "professionista") {
      for(let i = 0; i < itemsDaModificare.length; i++) {
        let datiModifica = {
          "nome": itemsDaModificare[i].nome,
          "professione": itemsDaModificare[i].professione,
          "contatto": itemsDaModificare[i].contatto,
          "email": itemsDaModificare[i].email,
          "note": itemsDaModificare[i].note
        }
        if(controlloProfessionista(datiModifica, setErrori) > 0) {
          return;
        }
        await ProfessionistaAction.dispatchAction(itemsDaModificare, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
        aggiornaItems(items, data, setItems);
      }
    }
    else {
      alert(tipoItem);
      alert("Da fare!!");
      return;
    }
    alert("Modifica completata con successo.");
  }
  catch(error) {
    alert("Errore durante la modifica, riprova più tardi.");
  }
  setSelectedIdsModifica([]);
}








