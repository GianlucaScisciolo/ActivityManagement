// React e Redux
import { useDispatch } from 'react-redux';
// Reducers
import { spesaSliceActions } from '../store/reducers/SpesaReducer';
// Utils
import { controlloSpesa } from "../../utils/Controlli";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../../utils/File";

export class SpesaActions {
  dispatch = useDispatch();

  constructor() {
  }

  azzeraLista() {
    this.dispatch(spesaSliceActions.aggiornaSpese({
      spese: -1,
    }));
  }

  async inserimentoSpesa(e, nuovaSpesa, setNuovaSpesa, lingua) {
    e.preventDefault();
    if (confirm(lingua === "italiano" ? "Sei sicuro di voler salvare la spesa?" : "Are you sure you want to save the expense?")) {
      if (controlloSpesa(nuovaSpesa, setNuovaSpesa, lingua) > 0) 
        return;

      nuovaSpesa["nome_attuale"] = nuovaSpesa["nome"];
      nuovaSpesa["descrizione_attuale"] = nuovaSpesa["descrizione"];
      nuovaSpesa["totale_attuale"] = nuovaSpesa["totale"];
      nuovaSpesa["giorno_attuale"] = nuovaSpesa["giorno"];
      nuovaSpesa["note_attuale"] = nuovaSpesa["note"];
      
      const response = await fetch('/INSERISCI_ITEM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovaSpesa),
      });

      if(response.status === 200) {
        const result = await response.json();
        nuovaSpesa.id = result.id;
        
        this.dispatch(spesaSliceActions.inserimentoSpesa({
          nuovaSpesa: nuovaSpesa 
        }))
        
        alert(lingua === "italiano" ? "L\'inserimento della spesa è andato a buon fine." : "Expense entry was successful.");
      }
      else if(response.status === 400) {
        alert(lingua === "italiano" ? "Errore: spesa gia\' presente." : "Error: expense already present.")
      }
      else {
        alert(lingua === "italiano" ? "Errore durante il salvataggio della nuova spesa, riprova più tardi." : "Error while saving new expense, try again later.");
      }
    }
    else {
      alert(lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  };

  async ricercaSpese(e, datiRicerca, lingua) {
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

        this.dispatch(spesaSliceActions.aggiornaSpese({
          spese: result.items,
        }));

      }
      else {
        alert(lingua === "italiano" ? "Errore durante la ricerca delle spese, riprova più tardi." : "Error while searching expenses, please try again later.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert(lingua === "italiano" ? "Errore durante la ricerca delle spese, riprova più tardi." : "Error while searching expenses, please try again later.");
    }
  }
  
  async handleSearchSpeseRangeFile(e, tipoFile, setTipoFile, datiRicerca, spese, setSpese, lingua) {
    e.preventDefault();

    if (!confirm(lingua === "italiano" ? "Sei sicuro di voler ottenere il file?" : "Are you sure you want to get the file?")) {
      alert(lingua === "italiano" ? "Operazione annullata." : "Operation canceled.");
      return;
    }
    
    setTipoFile(tipoFile);

    try {
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(!response.ok) {
        const errorData = await response.json();
        let errorMessage = lingua === "italiano" ? "Errore durante il recupero dei dati." : "Error during data recovery.";
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
        console.error("Errore nella richiesta:", errorMessage, response.status);
        alert(errorMessage);
        return;
      }

      const result = await response.json();
      setSpese(result.items);

      if (tipoFile === "pdf") {
        generaFileSpesePDF(result.items, lingua);
      }
      else {
        generaFileSpeseExcel(result.items, lingua);
      }
    }
    catch (error) {
      console.error("Errore nella richiesta:", error);
      alert(lingua === "italiano" ? "Errore sconosciuto durante il recupero dei dati. Verificare la connessione." : "Unknown error during data recovery. Check the connection.");
    }
  }

  async handleSearchUsciteSpese(setUsciteSpese, datiRicerca, lingua) {
    const dati = {
      tipo_item: "spesa", 
      primo_anno: datiRicerca.primo_anno, 
      ultimo_anno: datiRicerca.ultimo_anno
    };
    
    const response = await fetch('/VISUALIZZA_USCITE_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dati), 
    });
    
    if(response.status === 200) {
      const result = await response.json();
      setUsciteSpese(result.items);
    }
    else {
      alert(lingua === "italiano" ? "Errore durante la ricerca delle uscite delle spese, riprova più tardi." : "Error while searching for expenses outputs, try again later.");
    }
  };

  selezioneOperazioneSpesa(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        
        this.dispatch(spesaSliceActions.aggiornaTipoSelezione({
          id_spesa: item.id, 
          nuova_selezione: 0
        }));

        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        
        this.dispatch(spesaSliceActions.getSpesaPrimaDellaModifica({
          id_spesa: item.id,
        }))
        this.dispatch(spesaSliceActions.aggiornaTipoSelezione({
          id_spesa: item.id, 
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
        
        this.dispatch(spesaSliceActions.getSpesaPrimaDellaModifica({
          id_spesa: item.id,
        }));
        
        this.dispatch(spesaSliceActions.aggiornaTipoSelezione({
          id_spesa: item.id, 
          nuova_selezione: 0
        }));
        
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        
        this.dispatch(spesaSliceActions.aggiornaTipoSelezione({
          id_spesa: item.id, 
          nuova_selezione: 1
        }));
        
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaSpese(e, spese, selectedIdsModifica, setSelectedIdsModifica, lingua) {
    e.preventDefault();
    if (confirm(lingua === "italiano" ? "Sei sicuro di voler modificare le spese?" : "Are you sure you want to edit the expenses?")) {
      let speseDaModificare = spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      
      let idSpeseNonModificate = [];
      let idSpeseModificate = [];
      let esitoModifica = lingua === "italiano" ? "Esito modifica:\n" : "Modification outcome:\n";
      for(let i = 0; i < speseDaModificare.length; i++) {
        const dati = {
          tipo_item: "spesa", 
          item: speseDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += lingua === "italiano" ? "Spesa numero " + (i+1) + ": modifica avvenuta con successo.\n" : "Expense number " + (i+1) + ": successful modification.\n";
          idSpeseModificate.push(speseDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += lingua === "italiano" ? "Spesa numero " + (i+1) + ": errore durante la modifica: spesa gia\' presente.\n" : "Expense number " + (i+1) + ": Error while editing: expense already present.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
        else {
          esitoModifica += lingua === "italiano" ? "Spesa numero " + (i+1) + ": errore durante la modifica.\n" : "Expense number " + (i+1) + ": error while editing.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
      }

      let speseAggiornate = [];
      for (let i = 0; i < spese.length; i++) {
        let spesaAggiornata = { ...spese[i] };
        if(spesaAggiornata.tipo_selezione === 1) {
          spesaAggiornata.tipo_selezione = 0;
        }
        speseAggiornate.push(spesaAggiornata);
      }
      
      this.dispatch(spesaSliceActions.aggiornaSpese({
        spese: speseAggiornate,
      }))

      for(let id of idSpeseNonModificate) {
        this.dispatch(spesaSliceActions.getSpesaPrimaDellaModifica({
          id_spesa: id,
        }))
      }
      for(let id of idSpeseModificate) {
        
        this.dispatch(spesaSliceActions.getSpesaDopoLaModifica({
          id_spesa: id
        }))
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert(lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  };

  aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore) {
    this.dispatch(spesaSliceActions.aggiornaSpesa({
      id_spesa: id_spesa,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore,
    }))
  }

  async eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, spese, lingua) {
    e.preventDefault();
    if (confirm(lingua === "italiano" ? "Sei sicuro di voler eliminare le spese?" : "Are you sure you want to eliminate expenses?")) {
      const dati = {
        tipo_item: "spesa", 
        ids: selectedIdsEliminazione
      }

      const itemsRestanti = (spese && spese !== -1) ? spese.filter(spesa => !dati.ids.includes(spesa.id)) : -1;
            
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          
          this.dispatch(spesaSliceActions.aggiornaSpese({
            spese: itemsRestanti,
          }));
          
          setSelectedIdsEliminazione([]);
          alert(lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
        }
        else {
          alert(lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert(lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later.");
      }
    }
    else {
      alert(lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }

  async handleDeleteSpeseRangeFile(e, datiRicerca, lingua) {
    e.preventDefault();
    if (confirm(lingua === "italiano" ? "Sei sicuro di voler eliminare le spese?" : "Are you sure you want to eliminate expenses?")) {
      const dati = {
        tipo_item: "spesa", 
        "primo_giorno": datiRicerca.primo_giorno, 
        "ultimo_giorno": datiRicerca.ultimo_giorno 
      }
    
      const response = await fetch('/ELIMINA_ITEMS_RANGE_GIORNI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {
        alert(lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
      }
      else {
        alert(lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later."); 
      }
    }
    else {
      alert(lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }
}









