import { useState, useEffect } from "react";
import { controlloSpesa } from "../../vario/Controlli";
import { inserimentoSpesa, aggiornaSpese, getSpesaPrimaDellaModifica, getSpesaDopoLaModifica } from "../../store/redux/SpeseSlice";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../../vario/File";

export class SpesaAction {
  INDICI_NUOVA_SPESA = [0, 1, 2, 3, 4];
  INDICI_RICERCA_SPESE = [0, 1, 2, 3, 4, 5, 6];
  INDICI_SPESA_ESISTENTE = [0, 1, 2, 3, 4]; 
  INDICI_FILE = [0, 1];

  constructor() {

  }

  getCampiNuovaSpesa(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Nuova spesa", 
      label: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"],  
      type: [null, null, "number", "text", null], 
      step: [null, null, "0.50", null, null], 
      min: [null, null, "0.50", null, null], 
      name: ["nome", "descrizione", "totale", "giorno", "note"], 
      id: ["nuovo_nome_spesa", "nuova_descrizione_spesa", "nuovo_totale_spesa", "nuovo_giorno_spesa", "nuove_note_spesa"], 
      value: [item.nome, item.descrizione, parseFloat(item.totale).toFixed(2), item.giorno, item.note], 
      placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
      errore: [item.errore_nome, item.errore_descrizione, item.errore_totale, item.errore_giorno, item.errore_note], 
      options: [null, null, null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaSpese(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Ricerca spese", 
      label: ["Nome", "Descrizione", "Totale minimo", "Totale massimo", "Primo giorno", "Ultimo giorno", "Note"], 
      type: [null, null, "text", "text", "text", "text", null], 
      step: [null, null, null, null, null, null, null], 
      min: [null, null, null, null, null, null, null], 
      name: ["nome", "descrizione", "totale_min", "totale_max", "primo_giorno", "ultimo_giorno", "note"], 
      id: ["ricerca_nome_spesa", "ricerca_descrizione_spesa", "ricerca_totale_min_spesa", "ricerca_totale_max_spesa", "ricerca_primo_giorno_spesa", "ricerca_ultimo_giorno_spesa", "ricerca_note_spesa"], 
      value: [item.nome, item.descrizione, item.totale_min, item.totale_max, item.primo_giorno, item.ultimo_giorno, item.note], 
      placeholder: ["Nome", "Descrizione", "Totale minimo", "Totale massimo", "Primo giorno", "Ultimo giorno", "Note"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiSpesaEsistente(nullo, item, handleOnChange, handleOnClick, handleOnBlur) {
    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_descrizione: "", 
      errore_totale: "", 
      errore_giorno: "", 
      errore_note: ""
    }); 
    
    useEffect(() => {
      controlloSpesa(item, setErrori);
    }, [item]);
  
    return {
      header: "Spesa", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, null, "number", "date", null], 
      step: [null, null, "0.50", null, null], 
      min: [null, null, "0.50", null, null], 
      name: ["nome", "descrizione", "totale", "giorno", "note"], 
      id: ["nome-spesa", "descrizione_spesa", "totale_spesa", "giorno_spesa", "note_spesa"], 
      value: [item.nome, item.descrizione, parseFloat(item.totale).toFixed(2), item.giorno, item.note], 
      placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
      errore: [errori.errore_nome, errori.errore_descrizione, errori.errore_totale, errori.errore_giorno, errori.errore_note], 
      valoreModificabile: [false, true, true, true, true], 
      options: [null, null, null, null, null], 
      onChange: handleOnChange,  
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiFile(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "File spese", 
      label: ["Primo giorno", "Ultimo giorno"], 
      type: ["text", "text"], 
      step: [null, null], 
      min: [null, null], 
      name: ["primo_giorno", "ultimo_giorno"], 
      id: ["file_primo_giorno_spesa", "file_ultimo_giorno_spesa"], 
      value: [item.primo_giorno, item.ultimo_giorno], 
      placeholder: ["Primo giorno", "Ultimo giorno"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

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
    // setUsciteSpese(-1);
    // saloneStore.setUsciteSpese(-1);
    // await SaloneAction.dispatchAction(null, operazioniSaloni.VISUALIZZA_USCITE_SPESE);
    // setUsciteSpese(saloneStore.getUsciteSpese());
    // e.preventDefault();
    
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









