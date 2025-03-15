import { useEffect, useState } from "react";
import { controlloLavoro } from "../../vario/Controlli";
import { aggiornaLavori, getLavoroPrimaDellaModifica, getLavoroDopoLaModifica } from "../../store/redux/LavoriSlice";

export class LavoroAction {
  INDICI_NUOVO_LAVORO = [0, 1, 2, 3];
  INDICI_RICERCA_LAVORI = [0, 1, 2, 3, 4, 5];
  INDICI_LAVORO_ESISTENTE = [0, 1, 2, 3, 4];
  INDICI_FILE = [0, 1];  

  getCampiNuovoLavoro(item, clienti, servizi, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Nuovo lavoro", 
      label: ["Cliente*", "Servizio*", "Giorno*", "Note"],  
      type: [null, null, "text", null], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["cliente", "servizio", "giorno", "note"], 
      id: ["nuovo_cliente_lavoro", "nuovo_servizio_lavoro", "nuovo_giorno_lavoro", "nuove_note_lavoro"], 
      value: [item.cliente, item.servizio, item.giorno, item.note], 
      placeholder: ["Cliente*", "Servizio*", "Giorno*", "Note"],
      errore: [item.errore_cliente, item.errore_servizi, item.errore_giorno, item.errore_note], 
      options: [clienti, servizi, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaLavori(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Ricerca lavori", 
      label: ["Nome cliente", "Cognome cliente", "Primo giorno", "Ultimo giorno", "Descrizione", "Note"], 
      type: [null, null, "text", "text", null, null], 
      step: [null, null, null, null, null, null], 
      min: [null, null, null, null, null, null], 
      name: ["nome_cliente", "cognome_cliente", "primo_giorno", "ultimo_giorno", "descrizione", "note"], 
      id: ["ricerca_nome_cliente_lavoro", "ricerca_cognome_cliente_lavoro", "ricerca_primo_giorno_lavoro", "ricerca_ultimo_giorno_lavoro", "ricerca_descrizione_lavoro", "ricerca_note_lavoro"], 
      value: [item.nome_cliente, item.cognome_cliente, item.primo_giorno, item.ultimo_giorno, item.descrizione, item.note], 
      placeholder: ["Nome cliente", "Cognome cliente", "Primo giorno", "Ultimo giorno", "Descrizione", "Note"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiLavoroEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const [errori, setErrori] = useState({
      errore_cliente: "", 
      errore_servizi: "", 
      errore_totale: "", 
      errore_giorno: "", 
      errore_note: ""
    }); 
    
    useEffect(() => {
      controlloLavoro(item, setErrori);
    }, [item]);
    
    return {
      header: "Lavoro", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, null, "text", "date", null],
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null],
      name: ["cliente", "servizio", "totale", "giorno", "note"], 
      id: ["cliente_lavoro", "servizio_lavoro", "totale_lavoro", "giorno_lavoro", "note_lavoro"], 
      value: [item.cliente, item.servizio, parseFloat(item.totale).toFixed(2), item.giorno, item.note], 
      placeholder: ["Cliente", "Servizio", "Totale", "Giorno", "Note"], 
      errore: [errori.errore_cliente, errori.errore_totale, null, errori.errore_giorno, errori.errore_note], 
      valoreModificabile: [false, true, false, true, true], 
      options: [null, servizi, null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiFile(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "File lavori", 
      label: ["Primo giorno", "Ultimo giorno"], 
      type: ["text", "text"], 
      step: [null, null], 
      min: [null, null], 
      name: ["primo_giorno", "ultimo_giorno"], 
      id: ["file_primo_giorno_lavoro", "file_ultimo_giorno_lavoro"], 
      value: [item.primo_giorno, item.ultimo_giorno], 
      placeholder: ["Primo giorno", "Ultimo giorno"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
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
        dispatch(aggiornaLavori({
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

  async handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoriSession, dispatch) {
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
          dispatch(aggiornaLavori({
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

  async handleEdit(e, lavoriSession, selectedIdsModifica, setSelectedIdsModifica, dispatch) {
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
      dispatch(aggiornaLavori({
        lavori: lavoriAggiornati, 
      }));

      for(let id of idLavoriNonModificati) {
        console.log("\\"+id+"/");
        dispatch(getLavoroPrimaDellaModifica({
          id_lavoro: id
        }));
      }

      for(let id of idLavoriModificati) {
        console.log("\\"+id+"/");
        dispatch(getLavoroDopoLaModifica({
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
}









