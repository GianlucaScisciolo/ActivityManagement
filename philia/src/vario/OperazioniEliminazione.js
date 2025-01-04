import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from "./Operazioni";

export const elimina = async (tipo, datiLastSearch, selectedIds, setSelectedIds, items1, setterItems1, items2, setterItems2) => {
  const data = { ids: selectedIds };
  
  // Trova gli elementi i cui id sono in data.ids
  try {
    if (tipo === "clienti") {
      const itemsDaEliminare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsRestanti1 = items1.filter(item => !data.ids.includes(item.id));
      // alert(itemsDaEliminare1.length);
      await PersonaAction.dispatchAction(data, operazioniPersone.ELIMINA_CLIENTI);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaEliminare1.some(modItem => modItem.id === item.id)));
      setterItems1(itemsRestanti1);
      // await PersonaAction.dispatchAction(datiLastSearch, operazioniPersone.VISUALIZZA_CLIENTI);
    } else if (tipo === "professionisti") {
      const itemsDaEliminare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsRestanti1 = items1.filter(item => !data.ids.includes(item.id));
      await ProfessionistaAction.dispatchAction(data, operazioniProfessionisti.ELIMINA_PROFESSIONISTI);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaEliminare1.some(modItem => modItem.id === item.id)));
      setterItems1(itemsRestanti1);
      // await ProfessionistaAction.dispatchAction(datiLastSearch, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
    } else if (tipo === "lavori") {
      const itemsDaEliminare1 = items1.filter(item => data.ids.includes(item.id));
      const itemsDaEliminare2 = items2.filter(item => data.ids.includes(item.id));
      const itemsRestanti1 = items1.filter(item => !data.ids.includes(item.id));
      const itemsRestanti2 = items2.filter(item => !data.ids.includes(item.id));
      await LavoroAction.dispatchAction(data, operazioniLavori.ELIMINA_LAVORI);
      // setterItems1(prevItems => prevItems.filter(item => !itemsDaEliminare1.some(modItem => modItem.id === item.id)));
      // setterItems2(prevItems => prevItems.filter(item => !itemsDaEliminare2.some(modItem => modItem.id === item.id)));
      setterItems1(itemsRestanti1);
      setterItems2(itemsRestanti2);
      // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
      // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);
    }
    
    alert("Eliminazione completata con successo.");
  } 
  catch (error) {
    alert("Errore durante l'eliminazione, riprova più tardi.");
  }
  setSelectedIds([]);
}









