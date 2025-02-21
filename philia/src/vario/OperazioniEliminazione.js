import PersonaAction from "../action/persona_action/PersonaAction";
import ServizioAction from "../action/servizio_action/ServizioAction";
import LavoroAction from "../action/lavoro_action/LavoroAction";
import { operazioniPersone, operazioniServizi, operazioniLavori } from "./Operazioni";

export const elimina = async (e, tipoItem, selectedIdsEliminazione, setSelectedIdsEliminazione, items, setterItems) => {
  e.preventDefault();
  if(tipoItem !== "cliente" && tipoItem !== "servizio" && tipoItem !== "lavoro") {
    alert("Errore, tipo non valido.");
    return;
  }
  try {
    let dati = null, itemsDaEliminare = null, itemsRestanti = null;

    dati = { ids: selectedIdsEliminazione };
    if(tipoItem === "cliente") {
      itemsDaEliminare = items.filter(item => dati.ids.includes(item.id));
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }
    else if(tipoItem === "servizio") {
      itemsDaEliminare = items.filter(item => dati.ids.includes(item.id));
      itemsRestanti = items.filter(item => !dati.ids.includes(item.id));
    }
    else if(tipoItem === "lavoro") {
      itemsDaEliminare = items.filter(item =>
        dati.ids.some(idArray => 
          idArray[0] === item.id_lavoro && 
          idArray[1] === item.id_cliente 
        )
      );     
      itemsRestanti = items.filter(item =>
        !dati.ids.some(idArray => 
          idArray[0] === item.id_lavoro && 
          idArray[1] === item.id_cliente 
        )
      );
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
    setterItems(itemsRestanti);
    setSelectedIdsEliminazione([]);
    alert("Eliminazione completata con successo.");
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








