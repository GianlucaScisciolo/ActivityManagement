import PersonaAction from "../action/persona_action/PersonaAction";
import ServizioAction from "../action/servizio_action/ServizioAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import SaloneAction from "../action/salone_action/SaloneAction";
import { operazioniPersone, operazioniServizi, operazioniLavori, operazioniSaloni } from "./Operazioni";

export const elimina = async (e, tipoItem, selectedIdsEliminazione, setSelectedIdsEliminazione, items, setterItems) => {
  e.preventDefault();
  if(tipoItem !== "cliente" && tipoItem !== "servizio" && tipoItem !== "lavoro" && tipoItem !== "spesa") {
    alert("Errore, tipo non valido.");
    return;
  }
  try {
    let dati = null, itemsDaEliminare = null, itemsRestanti = null;

    dati = { ids: selectedIdsEliminazione };
    if(tipoItem === "cliente" || tipoItem === "servizio" || tipoItem === "lavoro" || tipoItem === "spesa") {
      itemsDaEliminare = items.filter(item => dati.ids.includes(item.id));
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }

    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(dati, operazioniPersone.ELIMINA_CLIENTI);
    }
    else if(tipoItem === "servizio") {
      await ServizioAction.dispatchAction(dati, operazioniServizi.ELIMINA_SERVIZI);
    }
    else if(tipoItem === "lavoro") {
      await LavoroAction.dispatchAction(dati, operazioniLavori.ELIMINA_LAVORI)
    } 
    else if(tipoItem === "spesa") {
      await SaloneAction.dispatchAction(dati, operazioniSaloni.ELIMINA_SPESE)
    } 
    setterItems(itemsRestanti);
    setSelectedIdsEliminazione([]);
    alert("Eliminazione completata con successo.");
  }
  catch (error) {
    alert("Errore durante l'eliminazione, riprova più tardi.");
  }
}









