// React e Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from '../forms/OperazioniForms.js';
import { ClienteForms } from "../forms/ClienteForms.js";
// Actions
import { ClienteActions } from "../../actions/ClienteActions.js";
// Riutilizzabile
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems.jsx';

const Clienti = () => {
  const clienteActions = new ClienteActions();
  const clienteForms = new ClienteForms();
  const operazioniForms = new OperazioniForms();
  const clienteSliceReducer = useSelector((state) => state.clienteSliceReducer.value);
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

  const selectOperation = (icon, item) => {
    clienteActions.selezioneOperazioneCliente(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }
  
  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: clienteForms.getCampiRicercaClienti(datiRicerca, (e) => operazioniForms.handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: clienteForms.INDICI_RICERCA_CLIENTI, 
            handleSearch: (e) => clienteActions.ricercaClienti(e, datiRicerca), 
            tipoItem: "cliente", 
            items: clienteSliceReducer.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => clienteActions.modificaClienti(e, clienteSliceReducer, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => clienteActions.eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteSliceReducer)
          }
        }
      />
    </>
  );
}

export default Clienti;









