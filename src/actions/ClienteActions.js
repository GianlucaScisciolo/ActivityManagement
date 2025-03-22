import { controlloCliente } from "../utils/Controlli";
import { clienteSliceActions } from "../store/redux/ClienteSlice";
import { dispatcher } from "../dispatcher/Dispatcher";

export class ClienteActions {

  constructor() {

  }
  
  async inserimentoCliente(e, nuovoCliente, setNuovoCliente) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il cliente?")) {
      if (controlloCliente(nuovoCliente, setNuovoCliente) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoCliente),
        });

        if(response.status === 200) {
          const result = await response.json();
          nuovoCliente.id = result.id;
          dispatcher(clienteSliceActions.inserimentoCliente({
            nuovoCliente: nuovoCliente
          }));
          alert("L\'inserimento del cliente è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: cliente gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio del nuovo cliente, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio del nuovo cliente, riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  async ricercaClienti(e, datiRicerca) {
    e.preventDefault();
        
    try {
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(response.status === 200) {
        const result = await response.json();
        dispatcher(clienteSliceActions.aggiornaClienti({
          clienti: result.items, 
        }));
      }
      else {
        alert("Errore durante la ricerca dei clienti, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  selezioneOperazioneCliente(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        dispatcher(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 0
        }));
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        dispatcher(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 2
        }));
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        dispatcher(clienteSliceActions.getClientePrimaDellaModifica({
          id_cliente: item.id,
        }));
        dispatcher(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 0
        }));
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        dispatcher(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 1
        }));
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaClienti(e, clientiSession, selectedIdsModifica, setSelectedIdsModifica) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i clienti?")) {
      let clientiDaNonModificare = clientiSession.clienti.filter(cliente => !selectedIdsModifica.includes(cliente.id));
      let clientiDaModificare = clientiSession.clienti.filter(cliente => selectedIdsModifica.includes(cliente.id)); 
      
      let idClientiNonModificati = [];
      let idClientiModificati = [];
      let esitoModifica = "Esito modifica:\n";
      for(let i = 0; i < clientiDaModificare.length; i++) {
        const dati = {
          tipo_item: "cliente", 
          item: clientiDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += "Cliente numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idClientiModificati.push(clientiDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Cliente numero " + (i+1) + ": errore durante la modifica: cliente gia\' presente.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
        else {
          esitoModifica += "Cliente numero " + (i+1) + ": errore durante la modifica.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
      }

      let clientiAggiornati = [];
      for (let i = 0; i < clientiSession.clienti.length; i++) {
        let clienteAggiornato = { ...clientiSession.clienti[i] };
        if(clienteAggiornato.tipo_selezione === 1) {
          clienteAggiornato.tipo_selezione = 0;
        }
        clientiAggiornati.push(clienteAggiornato);
      }
      dispatcher(clienteSliceActions.aggiornaClienti({
        clienti: clientiAggiornati, 
      }));

      for(let id of idClientiNonModificati) {
        console.log("\\"+id+"/");
        dispatcher(clienteSliceActions.getClientePrimaDellaModifica({
          id_cliente: id
        }));
      }

      for(let id of idClientiModificati) {
        console.log("\\"+id+"/");
        dispatcher(clienteSliceActions.getClienteDopoLaModifica({
          id_cliente: id
        }));
      }

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  aggiornaCliente(id_cliente, nome_attributo, nuovo_valore) {
    dispatcher(clienteSliceActions.aggiornaCliente({
      id_cliente: id_cliente,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore,
    }));
  }

  async eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i clienti?")) {
      const dati = {
        tipo_item: "cliente", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = clientiSession.clienti.filter(cliente => dati.ids.includes(cliente.id));
      const itemsRestanti = clientiSession.clienti.filter(cliente => !dati.ids.includes(cliente.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          // setClienti(itemsRestanti);
          dispatcher(clienteSliceActions.aggiornaClienti({
            clienti: itemsRestanti, 
          }));
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }
}









