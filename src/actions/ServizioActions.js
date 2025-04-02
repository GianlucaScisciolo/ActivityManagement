/************************************************** Dispatcher **************************************************/
import { Dispatcher } from "../dispatcher/Dispatcher";
/************************************************** Utils **************************************************/
import { controlloServizio } from "../utils/Controlli";

export class ServizioActions {
  dispatcher;
  constructor() {
    this.dispatcher = new Dispatcher();
  }

  async inserisciServizio(e, nuovoServizio, setNuovoServizio) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il servizio?")) {
      if (controlloServizio(nuovoServizio, setNuovoServizio) > 0) 
        return;

      nuovoServizio["nome_attuale"] = nuovoServizio["nome"];
      nuovoServizio["prezzo_attuale"] = nuovoServizio["prezzo"];
      nuovoServizio["note_attuale"] = nuovoServizio["note"];
      
      const response = await fetch('/INSERISCI_ITEM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovoServizio),
      });
      if(response.status === 200) {
        const result = await response.json();
        nuovoServizio.id = result.id;
        this.dispatcher.inserimentoServizio(nuovoServizio);
        alert("L\'inserimento del servizio è andato a buon fine!!");
      }
      else if(response.status === 400) {
        alert("Errore: servizio gia\' presente.")
      }
      else {
        alert("Errore durante il salvataggio del nuovo servizio, riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

  async ricercaServizi(e, datiRicerca) {
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
      this.dispatcher.aggiornaServizi(result.items);
    }
    else {
      alert("Errore durante la ricerca dei servizi, riprova più tardi.");
    }
  }

  selezioneOperazioneServizio(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        this.dispatcher.aggiornaTipoSelezioneServizio(item.id, 0);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.getServizioPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneServizio(item.id, 2);
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        this.dispatcher.getServizioPrimaDellaModifica(item.id);
        this.dispatcher.aggiornaTipoSelezioneServizio(item.id, 0);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        this.dispatcher.aggiornaTipoSelezioneServizio(item.id, 1);
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaServizi(e, serviziSession, selectedIdsModifica, setSelectedIdsModifica) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i servizi?")) {
      let serviziDaNonModificare = serviziSession.servizi.filter(servizio => !selectedIdsModifica.includes(servizio.id));
      let serviziDaModificare = serviziSession.servizi.filter(servizio => selectedIdsModifica.includes(servizio.id)); 
      
      let idServiziNonModificati = [];
      let idServiziModificati = [];
      let esitoModifica = "Esito modifica:\n";
      for(let i = 0; i < serviziDaModificare.length; i++) {
        const dati = {
          tipo_item: "servizio", 
          item: serviziDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += "Servizio numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idServiziModificati.push(serviziDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Servizio numero " + (i+1) + ": errore durante la modifica: spesa gia\' presente.\n";
          idServiziNonModificati.push(serviziDaModificare[i].id);
        }
        else {
          esitoModifica += "Servizio numero " + (i+1) + ": errore durante la modifica.\n";
          idServiziNonModificati.push(serviziDaModificare[i].id);
        }
      }

      let serviziAggiornati = [];
      for (let i = 0; i < serviziSession.servizi.length; i++) {
        let servizioAggiornato = { ...serviziSession.servizi[i] };
        if(servizioAggiornato.tipo_selezione === 1) {
          servizioAggiornato.tipo_selezione = 0;
        }
        serviziAggiornati.push(servizioAggiornato);
      }
      this.dispatcher.aggiornaServizi(serviziAggiornati);

      for(let id of idServiziNonModificati) {
        console.log("\\"+id+"/");
        this.dispatcher.getServizioPrimaDellaModifica(id);
      }

      for(let id of idServiziModificati) {
        console.log("\\"+id+"/");
        this.dispatcher.getServizioDopoLaModifica(id);
      }
      
      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  aggiornaServizio(id_servizio, nome_attributo, nuovo_valore) {
    this.dispatcher.aggiornaServizio(id_servizio, nome_attributo, nuovo_valore);
  }

  async eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, servizioState) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i servizi?")) {
      const dati = {
        tipo_item: "servizio", 
        ids: selectedIdsEliminazione
      }
      
      const itemsDaEliminare = (servizioState.servizi && servizioState.servizi !== -1) ? servizioState.servizi.filter(servizio => dati.ids.includes(servizio.id)) : -1;
      const itemsRestanti = (servizioState.servizi && servizioState.servizi !== -1) ? servizioState.servizi.filter(servizio => !dati.ids.includes(servizio.id)) : -1;
      
      const response = await fetch('/ELIMINA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {          
        this.dispatcher.aggiornaServizi(itemsRestanti);
        setSelectedIdsEliminazione([]);
        alert("Eliminazione completata con successo.");
      }
      else {
        alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }
}









