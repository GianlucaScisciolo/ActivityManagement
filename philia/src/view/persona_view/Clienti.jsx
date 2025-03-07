import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperationBody } from '../component/Operazioni';
import { 
  getCampiRicercaClienti, getCampiClienteEsistente, 
  indiciRicercaClienti, indiciClienteEsistente
} from './ClientiVario';
import { handleInputChange } from '../../vario/Vario';
import PaginaWeb from '../../riutilizzabile/PaginaWeb';
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems';
import { aggiornaClienti } from '../../store/redux/ClientiSlice';
import { aggiornaTipoSelezione } from '../../store/redux/ClientiSlice';

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
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem
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
      // let copiaClientiDaModificare = [...clientiDaModificare];
      
      let esitiModifica = [];
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
          esitiModifica.push([clientiDaModificare[i], "Modifica avvenuta con successo."]);
        }
        else if(response.status === 400) {
          esitiModifica.push([clientiDaModificare[i], "Errore durante la modifica: cliente x gia\' presente."]);
          // copiaClientiDaModificare[i] = clientiDaModificare[i];
        }
        else {
          esitiModifica.push([clientiDaModificare[i], "Errore durante la modifica del cliente x."]);
          // copiaClientiDaModificare[i] = clientiDaModificare[i];
        }
      }

      let clientiAggiornati = [];
      for (let i = 0; i < clienti.length; i++) {
        let clienteAggiornato = { ...clienti[i] };
        if(clienteAggiornato.tipo_selezione === 1) {
          clienteAggiornato.tipo_selezione = 0;
        }
        clientiAggiornati.push(clienteAggiornato);
      }
      setClienti(clientiAggiornati);

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert("Modifica effettuata.");
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
    </>
  );
}

export default Clienti;









