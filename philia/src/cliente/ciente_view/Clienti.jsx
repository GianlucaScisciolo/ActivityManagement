import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperationBody } from '../../app/app_view/component/Operazioni';
import { 
  getCampiRicercaClienti, getCampiClienteEsistente, 
  indiciRicercaClienti, indiciClienteEsistente
} from '../cliente_action/ClientiVario';
import { handleInputChange } from '../../vario/Vario';
import PaginaWeb from '../../riutilizzabile/PaginaWeb';
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems';
import { aggiornaClienti } from '../../store/redux/ClientiSlice';
import { aggiornaTipoSelezione, getClientePrimaDellaModifica, getClienteDopoLaModifica } from '../../store/redux/ClientiSlice';
import { controlloCliente } from '../../vario/Controlli';

const Clienti = () => {
  const clientiSession = useSelector((state) => state.clientiSession.value);
  const dispatch = useDispatch();
  
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "cliente", 
    nome: "", 
    cognome: "", 
    contatto: "", 
    email: "", 
    note: ""
  });

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_cliente: id, 
      nuova_selezione: nuova_selezione
    }));
  }

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, "cliente"
    )
  }
  
  const handleSearch = async (e) => {
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
        dispatch(aggiornaClienti({
          clienti: result.items, 
        }));
      }
      else {
        alert("Errore durante la ricerca dei clienti, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i clienti?")) {
      const dati = {
        tipo_item: "cliente", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = clientiSession.clienti.filter(cliente => dati.ids.includes(cliente.id));
      const itemsRestanti = clientiSession.clienti.filter(cliente => !dati.ids.includes(cliente.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          // setClienti(itemsRestanti);
          dispatch(aggiornaClienti({
            clienti: itemsRestanti, 
          }));
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i clienti?")) {
      let clientiDaNonModificare = clientiSession.clienti.filter(cliente => !selectedIdsModifica.includes(cliente.id));
      let clientiDaModificare = clientiSession.clienti.filter(cliente => selectedIdsModifica.includes(cliente.id)); 
      
      let idClientiNonModificati = [];
      let idClientiModificati = [];
      let esitoModifica = "Esito modifica:\n";
      for(let i = 0; i < clientiDaModificare.length; i++) {
        const dati = {
          tipo_item: "cliente", 
          item: clientiDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += "Cliente numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idClientiModificati.push(clientiDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Cliente numero " + (i+1) + ": errore durante la modifica: cliente gia\' presente.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
        else {
          esitoModifica += "Cliente numero " + (i+1) + ": errore durante la modifica.\n";
          idClientiNonModificati.push(clientiDaModificare[i].id);
        }
      }

      let clientiAggiornati = [];
      for (let i = 0; i < clientiSession.clienti.length; i++) {
        let clienteAggiornato = { ...clientiSession.clienti[i] };
        if(clienteAggiornato.tipo_selezione === 1) {
          clienteAggiornato.tipo_selezione = 0;
        }
        clientiAggiornati.push(clienteAggiornato);
      }
      dispatch(aggiornaClienti({
        clienti: clientiAggiornati, 
      }));

      for(let id of idClientiNonModificati) {
        console.log("\\"+id+"/");
        dispatch(getClientePrimaDellaModifica({
          id_cliente: id
        }));
      }

      for(let id of idClientiModificati) {
        console.log("\\"+id+"/");
        dispatch(getClienteDopoLaModifica({
          id_cliente: id
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
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: indiciRicercaClienti, 
            handleSearch: (e) => handleSearch(e), 
            tipoItem: "cliente", 
            items: clientiSession.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiClienteEsistente, 
            indiciItemEsistente: indiciClienteEsistente, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => handleEdit(e), 
            handleDelete: (e) => handleDelete(e)
          }
        }
      />
      <button>{clientiSession.clienti.length}</button>
    </>
  );
}

export default Clienti;









