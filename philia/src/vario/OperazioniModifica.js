import LavoroAction from "../action/lavoro_action/LavoroAction";
import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import AutenticazioneAction from "../action/autenticazione_action/AutenticazioneAction";
import autenticazioneStore from "../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione, operazioniLavori, operazioniPersone, operazioniProfessionisti } from "./Operazioni";

export const modifica = async (tipo, datiLastSearch, selectedIdsModifica, setSelectedIdsModifica, items1, setterItems1, items2, setterItems2) => {
  const data = { ids: selectedIdsModifica };

  // Trova gli elementi i cui id sono in data.ids
  try {
    if (tipo === "clienti") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      await PersonaAction.dispatchAction(itemsDaModificare1, operazioniPersone.MODIFICA_CLIENTI);
      setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      await PersonaAction.dispatchAction(datiLastSearch, operazioniPersone.VISUALIZZA_CLIENTI);
    }
    else if (tipo === "professionisti") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      await ProfessionistaAction.dispatchAction(itemsDaModificare1, operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
      setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      await ProfessionistaAction.dispatchAction(datiLastSearch, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
    }
    else if (tipo === "lavori") {
      const itemsDaModificare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsDaModificare2 = items2.filter(item => data.ids.includes(item.id));
      await LavoroAction.dispatchAction(itemsDaModificare1, operazioniLavori.MODIFICA_LAVORI);
      await LavoroAction.dispatchAction(itemsDaModificare2, operazioniLavori.MODIFICA_LAVORI);
      setterItems1(prevItems => prevItems.filter(item => !itemsDaModificare1.some(modItem => modItem.id === item.id)));
      setterItems2(prevItems => prevItems.filter(item => !itemsDaModificare2.some(modItem => modItem.id === item.id)));
      await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
      await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);
    }
    alert("Modifica completata con successo.")
  }
  catch (error) {
    alert("Errore durante la modifica, riprova più tardi.");
  }
  setSelectedIdsModifica([]);
};








