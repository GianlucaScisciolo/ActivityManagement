import { selectOperationBody } from "../component/Operazioni"

export const selectOperation = (icon, item) => {
  selectOperationBody(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  )
}

export const handleSearch = async (e) => {
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
      setClienti(result.items);
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

export const handleDelete = async (e) => {
  e.preventDefault();
  if (confirm("Sei sicuro di voler eliminare i clienti?")) {
    const dati = {
      tipo_item: "cliente", 
      ids: selectedIdsEliminazione
    }
    const itemsDaEliminare = clienti.filter(cliente => dati.ids.includes(cliente.id));
    const itemsRestanti = clienti.filter(cliente => !dati.ids.includes(cliente.id));
    try {
      const response = await fetch('/ELIMINA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {          
        setClienti(itemsRestanti);
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

export const handleEdit = async (e) => {
  e.preventDefault();
  if (confirm("Sei sicuro di voler modificare i clienti?")) {
    let clientiDaNonModificare = clienti.filter(cliente => !selectedIdsModifica.includes(cliente.id));
    let clientiDaModificare = clienti.filter(cliente => selectedIdsModifica.includes(cliente.id)); 
    // let copiaClientiDaModificare = [...clientiDaModificare];
    
    let esitiModifica = [];
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
        esitiModifica.push([clientiDaModificare[i], "Modifica avvenuta con successo."]);
      }
      else if(response.status === 400) {
        esitiModifica.push([clientiDaModificare[i], "Errore durante la modifica: cliente x gia\' presente."]);
        // copiaClientiDaModificare[i] = clientiDaModificare[i];
      }
      else {
        esitiModifica.push([clientiDaModificare[i], "Errore durante la modifica del cliente x."]);
        // copiaClientiDaModificare[i] = clientiDaModificare[i];
      }
    }

    let clientiAggiornati = [];
    for (let i = 0; i < clienti.length; i++) {
      let clienteAggiornato = { ...clienti[i] };
      if(clienteAggiornato.tipo_selezione === 1) {
        clienteAggiornato.tipo_selezione = 0;
      }
      clientiAggiornati.push(clienteAggiornato);
    }
    setClienti(clientiAggiornati);

    setSelectedIdsModifica([]);

    // alert("Risultati modifica:\n")
    alert("Modifica effettuata.");
  }
  else {
    alert("Salvataggio annullato.");
  }
}










