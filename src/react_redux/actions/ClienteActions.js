// React e Redux
import { useSelector } from 'react-redux';
// Store
import store from '../store/store';
// Reducers
import { clienteSliceActions } from '../store/reducers/ClienteReducer';
// Utils
import { controlloCliente } from "../../utils/Controlli";

export class ClienteActions {
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;
  
  constructor() {

  }

  azzeraLista() {
    store.dispatch(clienteSliceActions.aggiornaClienti({
      clienti: -1, 
    }));
  }
  
  async inserimentoCliente(e, nuovoCliente, setNuovoCliente) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler salvare il cliente?" : "Are you sure you want to save the client?")) {
      if (controlloCliente(nuovoCliente, setNuovoCliente, this.lingua) > 0) 
        return;

      nuovoCliente["giorno_attuale"] = nuovoCliente["giorno"];
      nuovoCliente["contatto_attuale"] = nuovoCliente["contatto"];
      nuovoCliente["email_attuale"] = nuovoCliente["email"];
      nuovoCliente["note_attuale"] = nuovoCliente["note"];
            
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
        
        store.dispatch(clienteSliceActions.inserimentoCliente({
          nuovoCliente: nuovoCliente
        }))
        
        alert(this.lingua === "italiano" ? "L\'inserimento del cliente è andato a buon fine." : "Client input was successful.");
      }
      else if(response.status === 400) {
        alert(this.lingua === "italiano" ? "Errore: cliente gia\' presente." : "Error: client already present.")
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante il salvataggio del nuovo cliente, riprova più tardi." : "Error while saving new client, please try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  }

  async ricercaClienti(e, datiRicerca) {
    e.preventDefault();
        
    const response = await fetch('/VISUALIZZA_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datiRicerca),
    });

    if(response.status === 200) {
      const result = await response.json();
      
      store.dispatch(clienteSliceActions.aggiornaClienti({
        clienti: result.items, 
      }))

    }
    else {
      alert(this.lingua === "italiano" ? "Errore durante la ricerca dei clienti, riprova più tardi." : "Error while customer search, please try again later.");
    }
  }

  selezioneOperazioneCliente(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, 
    setSelectedIdsEliminazione, setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        store.dispatch(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 0
        }))
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        store.dispatch(clienteSliceActions.getClientePrimaDellaModifica({
          id_cliente: item.id,
        }))
        store.dispatch(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 2
        }))
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        store.dispatch(clienteSliceActions.getClientePrimaDellaModifica({
          id_cliente: item.id,
        }))
        store.dispatch(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 0
        }))
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        store.dispatch(clienteSliceActions.aggiornaTipoSelezione({
          id_cliente: item.id, 
          nuova_selezione: 1
        }))
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaClienti(e, selectedIdsModifica, setSelectedIdsModifica, clienteState) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler modificare i clienti?" : "Are you sure you want to edit the clients?")) {
      let clientiDaNonModificare = clienteState.clienti.filter(cliente => !selectedIdsModifica.includes(cliente.id));
      let clientiDaModificare = clienteState.clienti.filter(cliente => selectedIdsModifica.includes(cliente.id));
      let idClientiNonModificati = [];
      let idClientiModificati = [];
      let esitoModifica = this.lingua === "italiano" ? "Esito modifica:\n" : "Modification outcome:\n";
            
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
          esitoModifica += this.lingua === "italiano" ? "Cliente numero " + (i+1) + ": modifica avvenuta con successo.\n" : "Client number " + (i+1) + ": successful modification.\n";
          idClientiModificati.push(clientiDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += this.lingua === "italiano" ? "Cliente numero " + (i+1) + ": errore durante la modifica: cliente gia\' presente.\n" : "Client number " + (i+1) + ": error while editing: client already present.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
        else {
          esitoModifica += this.lingua === "italiano" ? "Cliente numero " + (i+1) + ": errore durante la modifica.\n" : "Client number " + (i+1) + ": error while editing.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
      }

      let clientiAggiornati = [];
      for (let i = 0; i < clienteState.clienti.length; i++) {
        let clienteAggiornato = { ...clienteState.clienti[i] };
        if(clienteAggiornato.tipo_selezione === 1) {
          clienteAggiornato.tipo_selezione = 0;
        }
        clientiAggiornati.push(clienteAggiornato);
      }
      store.dispatch(clienteSliceActions.aggiornaClienti({
        clienti: clientiAggiornati, 
      }))

      for(let id of idClientiNonModificati) {
        store.dispatch(clienteSliceActions.getClientePrimaDellaModifica({
          id_cliente: id,
        }));
      }

      for(let id of idClientiModificati) {
        store.dispatch(clienteSliceActions.getClienteDopoLaModifica({
          id_cliente: id
        }));
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving cancelled.");
    }
  }

  aggiornaCliente(id_cliente, nome_attributo, nuovo_valore) {
    store.dispatch(clienteSliceActions.aggiornaCliente({
      id_cliente: id_cliente,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore,
    }))
  }

  async eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteState) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare i clienti?" : "Are you sure you want to eliminate clients?")) {
      const dati = {
        tipo_item: "cliente", 
        ids: selectedIdsEliminazione
      }

      const itemsDaEliminare = (clienteState.clienti && clienteState.clienti !== -1) ? clienteState.clienti.filter(cliente => dati.ids.includes(cliente.id)) : -1;
      const itemsRestanti = (clienteState.clienti && clienteState.clienti !== -1) ? clienteState.clienti.filter(cliente => !dati.ids.includes(cliente.id)) : -1;
      
      const response = await fetch('/ELIMINA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {
        store.dispatch(clienteSliceActions.aggiornaClienti({
          clienti: itemsRestanti, 
        }))
        setSelectedIdsEliminazione([]);
        alert(this.lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione dei clienti, riprova più tardi." : "Error while deleting clients, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }
}









