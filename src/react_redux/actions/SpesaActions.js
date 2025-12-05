// React e Redux
import { useSelector } from 'react-redux';
// Dispatcher 
import { Dispatcher } from "../dispatcher/Dispatcher";
// Utils
import { controlloSpesa } from "../../utils/Controlli";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../../utils/File";

export class SpesaActions {
  dispatcher;
  saloneState = useSelector((state) => state.salone.value);
  lingua = this.saloneState.lingua;

  constructor() {
    this.dispatcher = new Dispatcher();
  }

  async inserimentoSpesa(e, nuovaSpesa, setNuovaSpesa) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler salvare la spesa?" : "Are you sure you want to save the expense?")) {
      if (controlloSpesa(nuovaSpesa, setNuovaSpesa, this.lingua) > 0) 
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
        this.dispatcher.inserimentoSpesa(nuovaSpesa);
        alert(this.lingua === "italiano" ? "L\'inserimento della spesa è andato a buon fine." : "Expense entry was successful.");
      }
      else if(response.status === 400) {
        alert(this.lingua === "italiano" ? "Errore: spesa gia\' presente." : "Error: expense already present.")
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante il salvataggio della nuova spesa, riprova più tardi." : "Error while saving new expense, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  };

  async ricercaSpese(e, datiRicerca) {
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
        this.dispatcher.aggiornaSpese(result.items);
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante la ricerca delle spese, riprova più tardi." : "Error while searching expenses, please try again later.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert(this.lingua === "italiano" ? "Errore durante la ricerca delle spese, riprova più tardi." : "Error while searching expenses, please try again later.");
    }
  }
  
  async handleSearchSpeseRangeFile(e, tipoFile, setTipoFile, datiRicerca, spese, setSpese) {
    e.preventDefault();

    if (!confirm(this.lingua === "italiano" ? "Sei sicuro di voler ottenere il file?" : "Are you sure you want to get the file?")) {
      alert(this.lingua === "italiano" ? "Operazione annullata." : "Operation canceled.");
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
        let errorMessage = this.lingua === "italiano" ? "Errore durante il recupero dei dati." : "Error during data recovery.";
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
        generaFileSpesePDF(result.items, this.lingua);
      }
      else {
        generaFileSpeseExcel(result.items, this.lingua);
      }
    }
    catch (error) {
      console.error("Errore nella richiesta:", error);
      alert(this.lingua === "italiano" ? "Errore sconosciuto durante il recupero dei dati. Verificare la connessione." : "Unknown error during data recovery. Check the connection.");
    }
  }

  async handleSearchUsciteSpese(setUsciteSpese, datiRicerca) {
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
      alert(this.lingua === "italiano" ? "Errore durante la ricerca delle uscite delle spese, riprova più tardi." : "Error while searching for expenses outputs, try again later.");
    }
  };

  selezioneOperazioneSpesa(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        this.dispatcher.aggiornaTipoSelezioneSpesa(item.id, 0);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.getSpesaPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneSpesa(item.id, 2);
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        this.dispatcher.getSpesaPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneSpesa(item.id, 0);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.aggiornaTipoSelezioneSpesa(item.id, 1);
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaSpese(e, speseSession, selectedIdsModifica, setSelectedIdsModifica) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler modificare le spese?" : "Are you sure you want to edit the expenses?")) {
      let speseDaNonModificare = speseSession.spese.filter(spesa => !selectedIdsModifica.includes(spesa.id));
      let speseDaModificare = speseSession.spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      
      let idSpeseNonModificate = [];
      let idSpeseModificate = [];
      let esitoModifica = this.lingua === "italiano" ? "Esito modifica:\n" : "Modification outcome:\n";
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
          esitoModifica += this.lingua === "italiano" ? "Spesa numero " + (i+1) + ": modifica avvenuta con successo.\n" : "Expense number " + (i+1) + ": successful modification.\n";
          idSpeseModificate.push(speseDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += this.lingua === "italiano" ? "Spesa numero " + (i+1) + ": errore durante la modifica: spesa gia\' presente.\n" : "Expense number " + (i+1) + ": Error while editing: expense already present.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
        else {
          esitoModifica += this.lingua === "italiano" ? "Spesa numero " + (i+1) + ": errore durante la modifica.\n" : "Expense number " + (i+1) + ": error while editing.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
      }

      let speseAggiornate = [];
      for (let i = 0; i < speseSession.spese.length; i++) {
        let spesaAggiornata = { ...speseSession.spese[i] };
        if(spesaAggiornata.tipo_selezione === 1) {
          spesaAggiornata.tipo_selezione = 0;
        }
        speseAggiornate.push(spesaAggiornata);
      }
      this.dispatcher.aggiornaSpese(speseAggiornate);

      for(let id of idSpeseNonModificate) {
        this.dispatcher.getSpesaPrimaDellaModifica(id);
      }
      for(let id of idSpeseModificate) {
        this.dispatcher.getSpesaDopoLaModifica(id);
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  };

  aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore) {
    this.dispatcher.aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore);
  }

  async eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, spesaState) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare le spese?" : "Are you sure you want to eliminate expenses?")) {
      const dati = {
        tipo_item: "spesa", 
        ids: selectedIdsEliminazione
      }

      const itemsDaEliminare = (spesaState.spese && spesaState.spese !== -1) ? spesaState.spese.filter(spesa => dati.ids.includes(spesa.id)) : -1;
      const itemsRestanti = (spesaState.spese && spesaState.spese !== -1) ? spesaState.spese.filter(spesa => !dati.ids.includes(spesa.id)) : -1;
            
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          this.dispatcher.aggiornaSpese(itemsRestanti);
          setSelectedIdsEliminazione([]);
          alert(this.lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
        }
        else {
          alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }

  async handleDeleteSpeseRangeFile(e, datiRicerca) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare le spese?" : "Are you sure you want to eliminate expenses?")) {
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
        alert(this.lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione delle spese, riprova più tardi." : "Error while deleting expenses, try again later."); 
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }
}









