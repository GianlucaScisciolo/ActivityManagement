import LavoroAction from "../action/lavoro_action/LavoroAction";
import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione, operazioniLavori, operazioniPersone, operazioniProfessionisti } from "./Operazioni";
import { controlloNuovoCliente, controlloNuovoProfessionista, controlloNuovoLavoro } from "./Controlli";

const aggiornaItems = (items, data, setterItems) => {
  const updatedItems = items.map(item => {
    if (data.ids.includes(item.id)) {
      return { ...item, tipo_selezione: 0 };
    }
    return item;
  });
  setterItems(updatedItems);
};

export const modifica = async (tipo, datiLastSearch, selectedIdsModifica, setSelectedIdsModifica, 
                               items1, setterItems1, items2, setterItems2, settersErrori1, settersErrori2) => {
  const data = { ids: selectedIdsModifica };
  
  // Trova gli elementi i cui id sono in data.ids
  try {
    if (tipo === "clienti") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsRestanti1 = items1.filter(item => !data.ids.includes(item.id));
      for(let i = 0; i < itemsDaModificare1.length; i++) {
        let datiModifica = {
          "nome": itemsDaModificare1[i].nome,
          "cognome": itemsDaModificare1[i].cognome,
          "contatto": itemsDaModificare1[i].contatto,
          "note": itemsDaModificare1[i].note
        }
        if(controlloNuovoCliente(datiModifica, settersErrori1) > 0) {
          return;
        }
      }
      // setterItems1(voglio settare item.tipo_selezione = 0 per ogni item il cui item.id è incluso in data.ids);
      await PersonaAction.dispatchAction(itemsDaModificare1, operazioniPersone.MODIFICA_CLIENTI);
      aggiornaItems(items1, data, setterItems1);
      // setterItems1([]);
      // setterItems1(itemsUniti1);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      // setterItems1(itemsRestanti1);
      // await PersonaAction.dispatchAction(datiLastSearch, operazioniPersone.VISUALIZZA_CLIENTI);
    }
    else if (tipo === "professionisti") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsRestanti1 = items1.filter(item => !data.ids.includes(item.id));
      for(let i = 0; i < itemsDaModificare1.length; i++) {
        let datiModifica = {
          "nome": itemsDaModificare1[i].nome,
          "professione": itemsDaModificare1[i].professione,
          "contatto": itemsDaModificare1[i].contatto,
          "email": itemsDaModificare1[i].email,
          "note": itemsDaModificare1[i].note
        }
        if(controlloNuovoProfessionista(datiModifica, settersErrori1) > 0) {
          return;
        }
      }
      await ProfessionistaAction.dispatchAction(itemsDaModificare1, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
      aggiornaItems(items1, data, setterItems1);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      // setterItems1(itemsRestanti1);
      // await ProfessionistaAction.dispatchAction(datiLastSearch, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
    }
    else if (tipo === "lavori") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      let controlloLista1 = false;
      let controlloLista2 = false;
      for(let i = 0; i < itemsDaModificare1.length; i++) {
        let datiModifica = {
          "id_cliente": "0",
          "id_professionista": "",
          "descrizione": itemsDaModificare1[i].descrizione,
          "giorno": itemsDaModificare1[i].giorno,
          "orario_inizio": itemsDaModificare1[i].orario_inizio,
          "orario_fine": itemsDaModificare1[i].orario_fine,
          "note": itemsDaModificare1[i].note,
        };
        if(controlloNuovoLavoro(datiModifica, settersErrori1) > 0) {
          controlloLista1 = true;
          break;
        }
      }
      const itemsDaModificare2 = items2.filter(item => data.ids.includes(item.id));
      for(let i = 0; i < itemsDaModificare2.length; i++) {
        let datiModifica = {
          "id_cliente": "",
          "id_professionista": "0",
          "descrizione": itemsDaModificare2[i].descrizione,
          "giorno": itemsDaModificare2[i].giorno,
          "orario_inizio": itemsDaModificare2[i].orario_inizio,
          "orario_fine": itemsDaModificare2[i].orario_fine,
          "note": itemsDaModificare2[i].note
        };
        if(controlloNuovoLavoro(datiModifica, settersErrori2) > 0) {
          controlloLista2 = true;
          break;
        }
      }
      if(controlloLista1 === true || controlloLista2 === true) {
        return;
      }
      await LavoroAction.dispatchAction(itemsDaModificare1, operazioniLavori.MODIFICA_LAVORI);
      await LavoroAction.dispatchAction(itemsDaModificare2, operazioniLavori.MODIFICA_LAVORI);
      aggiornaItems(items1, data, setterItems1);
      aggiornaItems(items2, data, setterItems2);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      // setterItems2(prevItems => prevItems.filter(item => !itemsDaModificare2.some(modItem => modItem.id === item.id)));
      // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
      // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);
    }
    alert("Modifica completata con successo.")
  }
  catch (error) {
    alert("Errore durante la modifica, riprova più tardi.");
  }
  setSelectedIdsModifica([]);
};








