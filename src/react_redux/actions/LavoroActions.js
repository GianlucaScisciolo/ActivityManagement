// React e Redux
import { useSelector } from 'react-redux';
// Dispatcher
import { Dispatcher } from "../dispatcher/Dispatcher";
// Utils
import { controlloLavoro } from "../../utils/Controlli";
import { generaFileLavoriPDF, generaFileLavoriExcel } from "../../utils/File";

export class LavoroActions {
  dispatcher;
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;

  constructor() {
    this.dispatcher = new Dispatcher();
  }
  
  async inserimentoLavoro(e, servizi, clienti, nuovoLavoro, setNuovoLavoro) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler salvare il lavoro?" : "Are you sure you want to save the job?")) {
      nuovoLavoro.totale = 0;
      for(let servizio of servizi) {
        if(servizio.quantita > 0) {
          nuovoLavoro.totale += servizio.prezzo * servizio.quantita
        }
      }
      for(let cliente of clienti) {
        if (parseInt(cliente.id) === parseInt(nuovoLavoro.id_cliente)) {
          nuovoLavoro["cliente"] = cliente.nome + " " + cliente.cognome 
            + ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") 
            + ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "");
          break;
        }
      }
      nuovoLavoro["servizi"] = servizi;
      
      if (controlloLavoro(nuovoLavoro, setNuovoLavoro, this.lingua) > 0) 
        return;

      nuovoLavoro["giorno_attuale"] = nuovoLavoro["giorno"];
      nuovoLavoro["totale_attuale"] = nuovoLavoro["totale"];
      nuovoLavoro["note_attuale"] = nuovoLavoro["note"];
      nuovoLavoro["servizi_attuale"] = nuovoLavoro["servizi"];
      
      const response = await fetch('/INSERISCI_ITEM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovoLavoro),
      });

      if(response.status === 200) {
        const result = await response.json();
        nuovoLavoro.id = result.id;
        nuovoLavoro["collegamenti"] = result.collegamenti;
        nuovoLavoro["collegamenti_attuale"] = nuovoLavoro["collegamenti"];
        this.dispatcher.inserimentoLavoro(nuovoLavoro);
        alert(this.lingua === "italiano" ? "L\'inserimento del lavoro è andato a buon fine." : "Job entry was successful.");
      }
      else if(response.status === 400) {
        alert(this.lingua === "italiano" ? "Errore: lavoro gia\' presente." : "Error: job already present.")
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante il salvataggio del nuovo lavoro, riprova più tardi." : "Error while saving new job, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  }

  async ricercaLavori(e, datiRicerca) {
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
      this.dispatcher.aggiornaLavori(result.items);
    }
    else {
      alert(this.lingua === "italiano" ? "Errore durante la ricerca dei lavori, riprova più tardi." : "Error during job research, please try again later.");
    }
  }
  
  async handleSearchLavoriRangeFile(e, tipoFile, setTipoFile, datiRicerca, lavori, setLavori) {
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

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = this.lingua === "italiano" ? "Errore durante il recupero dei dati." : "Error while data recovery.";
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
        console.error(this.lingua === "italiano" ? "Errore nella richiesta:" : "Error in request", errorMessage, response.status);
        alert(errorMessage);
        return;
      }

      const result = await response.json();
      setLavori(result.items);

      if (tipoFile === "pdf") {
        generaFileLavoriPDF(result.items, this.lingua);
      }
      else {
        generaFileLavoriExcel(result.items, this.lingua);
      }
    } 
    catch (error) {
      console.error("Errore nella richiesta:", error);
      alert(this.lingua === "italiano" ? "Errore sconosciuto durante il recupero dei dati. Verificare la connessione." : "Unknown error while data recovery. Check the connection.");
    }
  }

  async handleSearchEntrateLavori(setEntrateLavori, datiRicerca) {
    const dati = {
      tipo_item: "lavoro", 
      primo_anno: datiRicerca.primo_anno, 
      ultimo_anno: datiRicerca.ultimo_anno
    };
    
    const response = await fetch('/VISUALIZZA_ENTRATE_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dati), 
    });
    
    if(response.status === 200) {
      const result = await response.json();
      setEntrateLavori(result.items);
    }
    else {
      alert(this.lingua === "italiano" ? "Errore durante la ricerca delle entrate dei lavori, riprova più tardi." : "Error while searching job entries, please try again later.");
    }
  };

  selezioneOperazioneLavoro(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        this.dispatcher.aggiornaTipoSelezioneLavoro(item.id, 0);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.getLavoroPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneLavoro(item.id, 2);
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        this.dispatcher.getLavoroPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneLavoro(item.id, 0);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.aggiornaTipoSelezioneLavoro(item.id, 1);
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaLavori(e, servizi, lavoriSession, selectedIdsModifica, setSelectedIdsModifica) {
    e.preventDefault();

    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler modificare i lavori?" : "Are you sure you want to edit the jobs?")) {
      let lavoriDaNonModificare = lavoriSession.lavori.filter(lavoro => !selectedIdsModifica.includes(lavoro.id));
      let lavoriDaModificare = lavoriSession.lavori.filter(lavoro => selectedIdsModifica.includes(lavoro.id));

      let idLavoriNonModificati = [];
      let idLavoriModificati = [];
      let esitoModifica = this.lingua === "italiano" ? "Esito modifica:\n" : "Modification outcome:\n";
      for(let i = 0; i < lavoriDaModificare.length; i++) {
        const dati = {
          tipo_item: "lavoro", 
          servizi: servizi, 
          item: lavoriDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += this.lingua === "italiano" ? "Lavoro numero " + (i+1) + ": modifica avvenuta con successo.\n" : "Job number " + (i+1) + ": successful modification.\n";
          idLavoriModificati.push(lavoriDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += this.lingua === "italiano" ? "Lavoro numero " + (i+1) + ": errore durante la modifica: lavoro gia\' presente.\n" : "Job number " + (i+1) + ": Error while editing: job already present.\n";
          idLavoriNonModificati.push(lavoriDaModificare[i].id);
        }
        else {
          esitoModifica += this.lingua === "italiano" ? "Lavoro numero " + (i+1) + ": errore durante la modifica.\n" : "Job number " + (i+1) + ": error while editing.\n";
          idLavoriNonModificati.push(lavoriDaModificare[i].id);
        }
      }

      let lavoriAggiornati = [];
      for (let i = 0; i < lavoriSession.lavori.length; i++) {
        let lavoroAggiornato = { ...lavoriSession.lavori[i] };
        if(lavoroAggiornato.tipo_selezione === 1) {
          lavoroAggiornato.tipo_selezione = 0;
        }
        lavoriAggiornati.push(lavoroAggiornato);
      }
      this.dispatcher.aggiornaLavori(lavoriAggiornati);

      for(let id of idLavoriNonModificati) {
        this.dispatcher.getLavoroPrimaDellaModifica(id);
      }

      for(let id of idLavoriModificati) {
        this.dispatcher.getLavoroDopoLaModifica(id);
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  }

  aggiornaLavoro(id_lavoro, nome_attributo, nuovo_valore) {
    this.dispatcher.aggiornaLavoro(id_lavoro, nome_attributo, nuovo_valore);
  }

  async eliminaLavori(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoroState) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare i lavori?" : "Are you sure you want to eliminate jobs?")) {
      const dati = {
        tipo_item: "lavoro", 
        ids: selectedIdsEliminazione
      }
      
      const itemsDaEliminare = (lavoroState.lavori && lavoroState.lavori !== -1) ? lavoroState.lavori.filter(lavoro => dati.ids.includes(lavoro.id)) : -1;
      const itemsRestanti = (lavoroState.lavori && lavoroState.lavori !== -1) ? lavoroState.lavori.filter(lavoro => !dati.ids.includes(lavoro.id)) : -1;
      
      const response = await fetch('/ELIMINA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {          
        this.dispatcher.aggiornaLavori(itemsRestanti);
        setSelectedIdsEliminazione([]);
        alert(this.lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione dei lavori, riprova più tardi." : "Error while deleting jobs, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }

  async handleDeleteLavoriRangeFile(e, datiRicerca) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare i lavori?" : "Are you sure you want to eliminate jobs?")) {
      const dati = {
        tipo_item: "lavoro", 
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
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione dei lavori, riprova più tardi." : "Error while deleting jobs, try again later."); 
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }
}









