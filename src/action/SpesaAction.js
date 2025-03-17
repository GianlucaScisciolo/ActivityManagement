import { controlloSpesa } from "../vario/Controlli";
import { inserimentoSpesa, aggiornaSpese, getSpesaPrimaDellaModifica, getSpesaDopoLaModifica } from "../store/redux/SpeseSlice";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../vario/File";

export class SpesaAction {
  constructor() {

  }

  async handleInsert(e, nuovaSpesa, setNuovaSpesa, dispatch) {
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
          dispatch(inserimentoSpesa({
            nuovaSpesa: nuovaSpesa 
          }));
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
        dispatch(aggiornaSpese({
          spese: result.items,
        }));
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

  async handleEdit(e, speseSession, selectedIdsModifica, setSelectedIdsModifica, dispatch) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      let speseDaNonModificare = speseSession.spese.filter(spesa => !selectedIdsModifica.includes(spesa.id));
      let speseDaModificare = speseSession.spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      // let copiaSpeseDaModificare = [...speseDaModificare];
      
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
      // setSpese(speseAggiornate);
      dispatch(aggiornaSpese({
        spese: speseAggiornate, 
      }));

      for(let id of idSpeseNonModificate) {
        console.log("\\"+id+"/");
        dispatch(getSpesaPrimaDellaModifica({
          id_spesa: id
        }));
      }
      for(let id of idSpeseModificate) {
        console.log("\\"+id+"/");
        dispatch(getSpesaDopoLaModifica({
          id_spesa: id
        }));
      }

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

  async handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, speseSession, dispatch) {
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
          dispatch(aggiornaSpese({
            spese: itemsRestanti, 
          }))
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









