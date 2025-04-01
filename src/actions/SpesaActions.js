/************************************************** Dispatcher **************************************************/
import { Dispatcher } from "../dispatcher/Dispatcher";
/************************************************** Utils **************************************************/
import { controlloSpesa } from "../utils/Controlli";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../utils/File";

export class SpesaActions {
  dispatcher;
  constructor() {
    this.dispatcher = new Dispatcher();
  }

  async inserimentoSpesa(e, nuovaSpesa, setNuovaSpesa) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare la spesa?")) {
      if (controlloSpesa(nuovaSpesa, setNuovaSpesa) > 0) 
        return;
      
      try {
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
          alert("L\'inserimento della spesa è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: spesa gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio della nuova spesa, riprova più tardi.");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio della nuova spesa, riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
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
        alert("Errore durante la ricerca delle spese, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca delle spese, riprova più tardi.");
    }
  }
  
  async handleSearchSpeseRangeFile(e, tipoFile, setTipoFile, datiRicerca, spese, setSpese) {
    e.preventDefault();

    if (confirm("Sei sicuro di voler ottenere il file?")) {
      setTipoFile(tipoFile);
      
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(response.status === 200) {
        const result = await response.json();
        setSpese(result.items);

        if(tipoFile === "pdf") {
          generaFileSpesePDF(spese);
        }
        else if(tipoFile === "excel") {
          generaFileSpeseExcel(spese);
        }
      }
      else {
        alert("Errore durante la ricerca delle spese, riprova più tardi.");
      }
    }
    else {
      alert("Operazione annullata.");
    }
  }

  async handleSearchUsciteSpese(setUsciteSpese) {
    const dati = {
      tipo_item: "spesa" 
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
      alert("Errore durante la ricerca delle uscite delle spese, riprova più tardi.");
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
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      let speseDaNonModificare = speseSession.spese.filter(spesa => !selectedIdsModifica.includes(spesa.id));
      let speseDaModificare = speseSession.spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      
      let idSpeseNonModificate = [];
      let idSpeseModificate = [];
      let esitoModifica = "Esito modifica:\n";
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
          esitoModifica += "Spesa numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idSpeseModificate.push(speseDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Spesa numero " + (i+1) + ": errore durante la modifica: spesa gia\' presente.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
        else {
          esitoModifica += "Spesa numero " + (i+1) + ": errore durante la modifica.\n";
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
        console.log("\\"+id+"/");
        this.dispatcher.getSpesaPrimaDellaModifica(id);
      }
      for(let id of idSpeseModificate) {
        console.log("\\"+id+"/");
        this.dispatcher.getSpesaDopoLaModifica(id);
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

  aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore) {
    this.dispatcher.aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore);
  }

  async eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, speseSession) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
      const dati = {
        tipo_item: "spesa", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = speseSession.spese.filter(spesa => dati.ids.includes(spesa.id));
      const itemsRestanti = speseSession.spese.filter(spesa => !dati.ids.includes(spesa.id));
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
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  async handleDeleteSpeseRangeFile(e, datiRicerca) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
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
        alert("Eliminazione completata con successo.");
      }
      else {
        alert("Errore durante l\'eliminazione delle spese, riprova più tardi."); 
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }
}









