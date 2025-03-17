import { controlloCliente } from "../vario/Controlli";
import { inserimentoCliente, aggiornaClienti, getClientePrimaDellaModifica, getClienteDopoLaModifica } from "../store/redux/ClientiSlice";
// import { ClienteDispatcher } from "../dispatcher/Clientedispatcher";

export class ClienteAction {

  // ClienteDispatcher;

  // constructor() {
  //   ClienteDispatcher = new ClienteDispatcher();
  // }
  
  async handleInsert(e, nuovoCliente, setNuovoCliente, dispatch) {
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
          dispatch(inserimentoCliente({
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

  async handleSearch(e, datiRicerca, dispatch) {
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
        dispatch(aggiornaClienti({
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

  async handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession, dispatch) {
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
          dispatch(aggiornaClienti({
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

  async handleEdit(e, clientiSession, selectedIdsModifica, setSelectedIdsModifica, dispatch) {
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
      dispatch(aggiornaClienti({
        clienti: clientiAggiornati, 
      }));

      for(let id of idClientiNonModificati) {
        console.log("\\"+id+"/");
        dispatch(getClientePrimaDellaModifica({
          id_cliente: id
        }));
      }

      for(let id of idClientiModificati) {
        console.log("\\"+id+"/");
        dispatch(getClienteDopoLaModifica({
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
}









