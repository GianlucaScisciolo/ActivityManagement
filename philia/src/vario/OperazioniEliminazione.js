import PersonaAction from "../action/persona_action/PersonaAction";
import ProfessionistaAction from "../action/professionista_action/ProfessionistaAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from "./Operazioni";

export const elimina = async (e, tipoItem, selectedIdsEliminazione, setSelectedIdsEliminazione, items, setterItems) => {
  e.preventDefault();
  if(tipoItem !== "cliente" && tipoItem !== "professionista" && tipoItem !== "lavoro") {
    alert("Errore, tipo non valido.");
    return;
  }
  try {
    const dati = { ids: selectedIdsEliminazione };
    const itemsDaEliminare = items.filter(item => dati.ids.includes(item.id));
    const itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    // alert(itemsDaEliminare.length);
    // alert(itemsRestanti.length);
    // console.log("-------------------------------------");
    // for(let item of itemsDaEliminare) {
    //   console.log(item.id);
    // }
    // console.log("-------------------------------------");
    // for(let item of itemsRestanti) {
    //   console.log(item.id);
    // }
    // console.log("-------------------------------------");
    
    if(tipoItem === "cliente") {
      await PersonaAction.dispatchAction(dati, operazioniPersone.ELIMINA_CLIENTI);
    }
    else if(tipoItem === "professionista") {
      await ProfessionistaAction.dispatchAction(dati, operazioniProfessionisti.ELIMINA_PROFESSIONISTI);
    }
    else if(tipoItem === "lavoro") {
      await LavoroAction.dispatchAction(dati, operazioniLavori.ELIMINA_LAVORI)
    } 
    setterItems(itemsRestanti);
    alert("Eliminazione completata con successo.");
    setSelectedIdsEliminazione([]);
  }
  catch (error) {
    alert("Errore durante l'eliminazione, riprova più tardi.");
  }
  
  // alert("Eliminazione cliccata");
  // alert(selectedIds);
  // if(tipo !== "cliente" && tipo !== "professionista" && tipo !== "lavoro") {
  //   alert("Errore, tipo non valido.");
  //   return;
  // }

  // try {
  //   const dati = { ids: selectedIds };
  //   const itemsDaEliminare = items.filter(item => dati.ids.includes(item.id));
  //   const itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
  //   if (tipo === "cliente") {
  //     // alert("Cliente");
  //     await PersonaAction.dispatchAction(dati, operazioniPersone.ELIMINA_CLIENTI);
  //   }
  //   else if (tipo === "professionista") {
  //     alert("Professionista");
  //   }
  //   else if (tipo === "lavoro") {
  //     alert("Lavoro");
  //   }
  //   setterItems(itemsRestanti);
  //   alert("Eliminazione completata con successo.");
  //   setSelectedIds([]);
  // }
  // catch (error) {
  //   alert("Errore durante l'eliminazione, riprova più tardi.");
  // }




  // for(let i = 0; i < selectedIds; i++) {
    // id_da_eliminare += selectedIds[i] + "\n";
  // }
  // alert(id_da_eliminare);
  // const data = { ids: selectedIds };
  
  // // Trova gli elementi i cui id sono in data.ids
  // try {
  //   if (tipo === "cliente") {
  //     const itemsDaEliminare = items.filter(item => data.ids.includes(item.id));
  //     const itemsRestanti = items.filter(item => !data.ids.includes(item.id));
  //     await PersonaAction.dispatchAction(data, operazioniPersone.ELIMINA_CLIENTI);
  //     itemsRestanti.forEach(item => item.tipo_selezione = 0);
  //     setteritems([]);
  //     setteritems(itemsRestanti);
  //   } else if (tipo === "professionista") {
  //     const itemsDaEliminare = items.filter(item => data.ids.includes(item.id));
  //     const itemsRestanti = items.filter(item => !data.ids.includes(item.id));
  //     await ProfessionistaAction.dispatchAction(data, operazioniProfessionisti.ELIMINA_PROFESSIONISTI);
  //     itemsRestanti.forEach(item => item.tipo_selezione = 0);
  //     setteritems([]);
  //     setteritems(itemsRestanti);
  //   } else if (tipo === "lavoro") {
  //     // const itemsDaEliminare = items.filter(item => data.ids.includes(item.id));
  //     // const itemsDaEliminare2 = items2.filter(item => data.ids.includes(item.id));
  //     // const itemsRestanti = items.filter(item => !data.ids.includes(item.id));
  //     // const itemsRestanti2 = items2.filter(item => !data.ids.includes(item.id));
  //     // await LavoroAction.dispatchAction(data, operazioniLavori.ELIMINA_LAVORI);
  //     // // setteritems(prevItems => prevItems.filter(item => !itemsDaEliminare.some(modItem => modItem.id === item.id)));
  //     // // setterItems2(prevItems => prevItems.filter(item => !itemsDaEliminare2.some(modItem => modItem.id === item.id)));
  //     // setteritems(itemsRestanti);
  //     // setterItems2(itemsRestanti2);
  //     // // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
  //     // // await LavoroAction.dispatchAction(datiLastSearch, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);
  //   }
    
  //   alert("Eliminazione completata con successo.");
  // } 
  // catch (error) {
  //   alert("Errore durante l'eliminazione, riprova più tardi.");
  // }
  // setSelectedIds([]);
}








