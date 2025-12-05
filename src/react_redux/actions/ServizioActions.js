// React e Redux
import { useSelector } from 'react-redux';
// Dispatcher
import { Dispatcher } from "../dispatcher/Dispatcher";
// Utils
import { controlloServizio } from "../../utils/Controlli";

export class ServizioActions {
  dispatcher;
  saloneState = useSelector((state) => state.salone.value);
  lingua = this.saloneState.lingua;

  constructor() {
    this.dispatcher = new Dispatcher();
  }

  async inserisciServizio(e, nuovoServizio, setNuovoServizio) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler salvare il servizio?" : "Are you sure you want to save the service?")) {
      if (controlloServizio(nuovoServizio, setNuovoServizio, this.lingua) > 0) 
        return;

      nuovoServizio["nome_attuale"] = nuovoServizio["nome"];
      nuovoServizio["prezzo_attuale"] = nuovoServizio["prezzo"];
      nuovoServizio["note_attuale"] = nuovoServizio["note"];
      nuovoServizio["in_uso"] = true;
      nuovoServizio["in_uso_attuale"] = nuovoServizio["in_uso"];
      
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
        nuovoServizio["in_uso"] = "Si";
        nuovoServizio["in_uso_attuale"] = "Si";
        this.dispatcher.inserimentoServizio(nuovoServizio);
        alert(this.lingua === "italiano" ? "L\'inserimento del servizio è andato a buon fine." : "Service entry was successful.");
      }
      else if(response.status === 400) {
        alert(this.lingua === "italiano" ? "Errore: servizio gia\' presente." : "Error: service already present.")
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante il salvataggio del nuovo servizio, riprova più tardi." : "Error while saving the new service, please try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
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
      alert(this.lingua === "italiano" ? "Errore durante la ricerca dei servizi, riprova più tardi." : "Error while searching for services, please try again later.");
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
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler modificare i servizi?" : "Are you sure you want to modify the services?")) {
      let serviziDaNonModificare = serviziSession.servizi.filter(servizio => !selectedIdsModifica.includes(servizio.id));
      let serviziDaModificare = serviziSession.servizi.filter(servizio => selectedIdsModifica.includes(servizio.id)); 
      
      let idServiziNonModificati = [];
      let idServiziModificati = [];
      let esitoModifica = this.lingua === "italiano" ? "Esito modifica:\n" : "Modification outcome:\n";
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
          esitoModifica += this.lingua === "italiano" ? "Servizio numero " + (i+1) + ": modifica avvenuta con successo.\n" : "Service number " + (i+1) + ": successful modification..\n";
          if(serviziDaModificare[i].prezzo !== serviziDaModificare[i].prezzo_attuale) {
            const result = await response.json();
            let nuovoServizio = { ...serviziDaModificare[i] };
            nuovoServizio["id"] = result.id;
            this.dispatcher.inserimentoServizio(nuovoServizio);
          }
          idServiziModificati.push(serviziDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += this.lingua === "italiano" ? "Servizio numero " + (i+1) + ": errore durante la modifica: servizio gia\' presente.\n" : "Service number " + (i+1) + ": Error while editing: service already present.\n";
          idServiziNonModificati.push(serviziDaModificare[i].id);
        }
        else {
          esitoModifica += this.lingua === "italiano" ? "Servizio numero " + (i+1) + ": errore durante la modifica.\n" : "Service number " + (i+1) + ": error while editing.\n";
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
        this.dispatcher.getServizioPrimaDellaModifica(id);
      }

      for(let id of idServiziModificati) {
        this.dispatcher.getServizioDopoLaModifica(id);
      }
      
      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert(this.lingua === "italiano" ? "Salvataggio annullato." : "Saving Cancelled.");
    }
  }

  aggiornaServizio(id_servizio, nome_attributo, nuovo_valore) {
    this.dispatcher.aggiornaServizio(id_servizio, nome_attributo, nuovo_valore);
  }

  async eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, servizioState) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler eliminare i servizi? Tutti i lavori presenti attualmente nel database verranno modificati eliminando i servizi selezionati." : "Are you sure you want to delete the services? All jobs currently in the database will be modified by deleting the selected services.")) {
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
        alert(this.lingua === "italiano" ? "Eliminazione completata con successo." : "Elimination completed successfully.");
      }
      else {
        alert(this.lingua === "italiano" ? "Errore durante l\'eliminazione dei servizi, riprova più tardi." : "Error while deleting services, try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Eliminazione annullata." : "Elimination cancelled.");
    }
  }

  async handleSearchEntrateServizi(setEntrateServizi, datiRicerca) {
    const dati = {
      tipo_item: "servizio", 
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
      setEntrateServizi(result.items);
    }
    else {
      alert(this.lingua === "italiano" ? "Errore durante la ricerca delle entrate dei servizi, riprova più tardi." : "Error while searching for service entries, please try again later.");
    }
  };
}









