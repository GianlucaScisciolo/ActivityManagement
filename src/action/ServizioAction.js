import { controlloServizio } from "../vario/Controlli";
import { inserimentoServizio, aggiornaServizi, getServizioPrimaDellaModifica, getServizioDopoLaModifica } from "../store/redux/ServiziSlice";

export class ServizioAction {
  constructor() {

  }

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









