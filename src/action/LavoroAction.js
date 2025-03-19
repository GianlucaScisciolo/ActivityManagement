import { controlloLavoro } from "../vario/Controlli";
import { 
  inserimentoLavoro, aggiornaTipoSelezione, aggiornaLavori, getLavoroPrimaDellaModifica, getLavoroDopoLaModifica 
} from "../store/redux/LavoroSlice";
import { generaFileLavoriPDF, generaFileLavoriExcel } from "../vario/File";
import { dispatcher } from "../dispatcher/Dispatcher";

export class LavoroAction {
  constructor() {

  }
  
  async inserimentoLavoro(e, servizi, clienti, nuovoLavoro, setNuovoLavoro) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il lavoro?")) {
      let descrizione = "";
      for(let servizio of servizi) {
        if(nuovoLavoro.id_servizi.includes(servizio.id)) {
          nuovoLavoro.totale += servizio.prezzo;
          descrizione += servizio.nome + " - " + servizio.prezzo + " €, "
        }
      }
      for(let cliente of clienti) {
        console.log(cliente.id + " === " + nuovoLavoro.id_cliente);
        if (parseInt(cliente.id) === parseInt(nuovoLavoro.id_cliente)) {
          console.log("Cliente trovato!!");
          nuovoLavoro["cliente"] = cliente.nome + " " + cliente.cognome +
            ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") + 
            ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "");
          break;
        }
      }
      nuovoLavoro["descrizione"] = descrizione;
      /**/
      const serviziSelezionatiAttuali = descrizione.split(',').map(item => item.trim()).filter(item => item !== "");
      for(let i = 0; i < serviziSelezionatiAttuali.length; i++) {
        serviziSelezionatiAttuali[i] = serviziSelezionatiAttuali[i].split('-').map(item => item.trim()).filter(item => item !== "");
        serviziSelezionatiAttuali[i] = {
          nome: serviziSelezionatiAttuali[i][0], 
          prezzo: serviziSelezionatiAttuali[i][1].substring(0, serviziSelezionatiAttuali[i][1].length-2)
        };
      }
      nuovoLavoro["serviziSelezionati"] = serviziSelezionatiAttuali;
      
      /**/
      
      if (controlloLavoro(nuovoLavoro, setNuovoLavoro) > 0) 
        return;
      
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
        dispatcher(inserimentoLavoro({
          nuovoLavoro: nuovoLavoro 
        }));
        alert("L\'inserimento del lavoro è andato a buon fine!!");
      }
      else if(response.status === 400) {
        alert("Errore: lavoro gia\' presente.")
      }
      else {
        alert("Errore durante il salvataggio del nuovo lavoro, riprova più tardi1.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  async ricercaLavori(e, datiRicerca) {
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
        dispatcher(aggiornaLavori({
          lavori: result.items,
        }));
      }
      else {
        alert("Errore durante la ricerca dei lavori, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei lavori, riprova più tardi.");
    }
  }

  async handleSearchLavoriRangeFile(e, tipoFile, setTipoFile, datiRicerca, lavori, setLavori) {
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
        setLavori(result.items);

        if(tipoFile === "pdf") {
          generaFileLavoriPDF(lavori);
        }
        else if(tipoFile === "excel") {
          generaFileLavoriExcel(lavori);
        }
      }
      else {
        alert("Errore durante la ricerca dei lavori, riprova più tardi.");
      }
    }
    else {
      alert("Operazione annullata.");
    }
  }

  async handleSearchEntrateLavori(setEntrateLavori) {
    const dati = {
      tipo_item: "lavoro" 
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
      alert("Errore durante la ricerca delle entrate dei lavori, riprova più tardi.");
    }
  };

  selezioneOperazioneLavoro(
    icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
    setSelectedPencilCount, setSelectedTrashCount
  ) {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        dispatcher(aggiornaTipoSelezione({
          id_lavoro: item.id, 
          nuova_selezione: 0
        }));
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        dispatcher(aggiornaTipoSelezione({
          id_lavoro: item.id, 
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
        dispatcher(getLavoroPrimaDellaModifica({
          id_cliente: item.id,
        }));
        dispatcher(aggiornaTipoSelezione({
          id_lavoro: item.id, 
          nuova_selezione: 0
        }));
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        dispatcher(aggiornaTipoSelezione({
          id_lavoro: item.id, 
          nuova_selezione: 1
        }));
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  async modificaLavori(e, lavoriSession, selectedIdsModifica, setSelectedIdsModifica) {
    e.preventDefault();

    if (confirm("Sei sicuro di voler modificare i lavori?")) {
      let lavoriDaNonModificare = lavoriSession.lavori.filter(lavoro => !selectedIdsModifica.includes(lavoro.id));
      let lavoriDaModificare = lavoriSession.lavori.filter(lavoro => selectedIdsModifica.includes(lavoro.id));

      let idLavoriNonModificati = [];
      let idLavoriModificati = [];
      let esitoModifica = "Esito modifica:\n";
      for(let i = 0; i < lavoriDaModificare.length; i++) {
        const dati = {
          tipo_item: "lavoro", 
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
          esitoModifica += "Lavoro numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idLavoriModificati.push(lavoriDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Lavoro numero " + (i+1) + ": errore durante la modifica: lavoro gia\' presente.\n";
          idLavoriNonModificati.push(lavoriDaModificare[i].id);
        }
        else {
          esitoModifica += "Lavoro numero " + (i+1) + ": errore durante la modifica.\n";
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
      dispatcher(aggiornaLavori({
        lavori: lavoriAggiornati, 
      }));

      for(let id of idLavoriNonModificati) {
        console.log("\\"+id+"/");
        dispatcher(getLavoroPrimaDellaModifica({
          id_lavoro: id
        }));
      }

      for(let id of idLavoriModificati) {
        console.log("\\"+id+"/");
        dispatcher(getLavoroDopoLaModifica({
          id_lavoro: id
        }));
      }

      setSelectedIdsModifica([]);

      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  async eliminaLavori(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoriSession) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i lavori?")) {
      const dati = {
        tipo_item: "lavoro", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = lavoriSession.lavori.filter(lavoro => dati.ids.includes(lavoro.id));
      const itemsRestanti = lavoriSession.lavori.filter(lavoro => !dati.ids.includes(lavoro.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          dispatcher(aggiornaLavori({
            lavori: itemsRestanti,
          }));
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  async handleDeleteLavoriRangeFile(e, datiRicerca) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i lavori?")) {
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
        alert("Eliminazione completata con successo.");
      }
      else {
        alert("Errore durante l\'eliminazione dei lavori, riprova più tardi."); 
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }
}









