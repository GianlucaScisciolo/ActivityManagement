import { useState, useEffect } from "react";
import { controlloServizio } from "../../vario/Controlli";
import { inserimentoServizio, aggiornaServizi, getServizioPrimaDellaModifica, getServizioDopoLaModifica } from "../../store/redux/ServiziSlice";

export class ServizioAction {
  INDICI_NUOVO_SERVIZIO = [0, 1, 2];
  INDICI_RICERCA_SERVIZI = [0, 1, 2, 3];
  INDICI_SERVIZIO_ESISTENTE = [0, 1, 2];

  constructor() {

  }

  getCampiNuovoServizio(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Nuovo servizio", 
      label: ["Nome*", "Prezzo*", "Note"],  
      type: [null, "number", null], 
      step: [null, "0.50", null], 
      min: [null, "0.50", null], 
      name: ["nome", "prezzo", "note"], 
      id: ["nuovo_nome_servizio", "nuovo_prezzo_servizio", "nuove_note_servizio"], 
      value: [item.nome, item.prezzo, item.note], 
      placeholder: ["Nome*", "Prezzo*", "Note"],
      errore: [item.errore_nome, item.errore_prezzo, item.errore_note], 
      options: [null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaServizi(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Ricerca servizi", 
      label: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note"], 
      type: [null, "text", "text", null], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome", "prezzo_min", "prezzo_max", "note"], 
      id: ["ricerca_nome_servizio", "ricerca_prezzo_min_servizio", "ricerca_prezzo_max_servizio", "ricerca_note_servizio"], 
      value: [item.nome, item.prezzo_min, item.prezzo_max, item.note], 
      placeholder: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note"], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiServizioEsistente(servizi, item, handleOnChange, handleOnClick, handleOnBlur) {
    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_prezzo: "", 
      errore_note: "" 
    }); 
  
    useEffect(() => {
      controlloServizio(item, setErrori);
    }, [item]);
  
    return {
      header: "Servizio", 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "number", null], 
      step: [null, "0.50", null], 
      min: [null, "0.50", null], 
      name: ["nome", "prezzo", "note"], 
      id: ["nome_servizio", "prezzo_servizio", "note_servizio"], 
      value: [item.nome, parseFloat(item.prezzo).toFixed(2), item.note], 
      placeholder: ["Nome", "Prezzo", "Note"], 
      errore: [errori.errore_nome, errori.errore_prezzo, errori.errore_note], 
      valoreModificabile: [true, true, true], 
      options: [null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  async handleInsert(e, nuovoServizio, setNuovoServizio, dispatch) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il servizio?")) {
      if (controlloServizio(nuovoServizio, setNuovoServizio) > 0) 
        return;
      
      try {
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
          dispatch(inserimentoServizio({
            nuovoServizio: nuovoServizio
          }));
          alert("L\'inserimento del servizio è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: servizio gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio del nuovo servizio, riprova più tardi.");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio del nuovo servizio, riprova più tardi.");
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
        dispatch(aggiornaServizi({
          servizi: result.items, 
        }));
      }
      else {
        alert("Errore durante la ricerca dei servizi, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  async handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, serviziSession, dispatch) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i servizi?")) {
      const dati = {
        tipo_item: "servizio", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = serviziSession.servizi.filter(servizio => dati.ids.includes(servizio.id));
      const itemsRestanti = serviziSession.servizi.filter(servizio => !dati.ids.includes(servizio.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          dispatch(aggiornaServizi({
            servizi: itemsRestanti, 
          }))
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  async handleEdit(e, serviziSession, selectedIdsModifica, setSelectedIdsModifica, dispatch) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i servizi?")) {
      let serviziDaNonModificare = serviziSession.servizi.filter(servizio => !selectedIdsModifica.includes(servizio.id));
      let serviziDaModificare = serviziSession.servizi.filter(servizio => selectedIdsModifica.includes(servizio.id)); 
      // let copiaServiziDaModificare = [...serviziDaModificare];
      
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
      // setServizi(serviziAggiornati);
      dispatch(aggiornaServizi({
        servizi: serviziAggiornati, 
      }));

      for(let id of idServiziNonModificati) {
        console.log("\\"+id+"/");
        dispatch(getServizioPrimaDellaModifica({
          id_servizio: id
        }));
      }

      for(let id of idServiziModificati) {
        console.log("\\"+id+"/");
        dispatch(getServizioDopoLaModifica({
          id_servizio: id
        }));
      }
      
      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  }
}









