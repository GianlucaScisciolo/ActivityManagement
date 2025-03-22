// React e Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from '../forms/OperazioniForms.js';
import { ClienteForms } from '../forms/ClienteForms.js';
// Actions
import { ClienteActions } from "../../actions/ClienteActions.js";
// Riutilizzabile
import PaginaWebNewItem from '../../riutilizzabile/PaginaWebNewItem.jsx';

const NuovoCliente = () => {
  const clienteActions = new ClienteActions();
  const clienteForms = new ClienteForms();
  const operazioniForms = new OperazioniForms();
  const clienteSliceReducer = useSelector((state) => state.clienteSliceReducer.value);
  const stileSliceReducer = useSelector((state) => state.stileSliceReducer.value);

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [nuovoCliente, setNuovoCliente] = useState({
    tipo_item: "cliente", 
    tipo_selezione: 0,
    nome: "",
    cognome: "",
    contatto: "", 
    email: "", 
    note: "", 
    errore_nome: "", 
    errore_cognome: "", 
    errore_contatto: "",
    errore_email: "", 
    errore_note: ""
  })

  const selectOperation = (icon, item) => {
    clienteActions.selezioneOperazioneCliente(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    clienteActions.aggiornaCliente(item.id, name, value);
  };
  
  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      <PaginaWebNewItem 
        componenti={
          {
            stileSliceReducer: stileSliceReducer, 
            lavoroActions: null, 
            handleBlurItem: handleBlurItem, 
            campiNuovoItem: clienteForms.getCampiNuovoCliente(nuovoCliente, (e) => operazioniForms.handleInputChange(e, setNuovoCliente), null, null), 
            indiciNuovoItem: clienteForms.INDICI_NUOVO_CLIENTE, 
            handleInsert: (e) => clienteActions.inserimentoCliente(e, nuovoCliente, setNuovoCliente), 
            tipoItem: "cliente", 
            items: clienteSliceReducer.nuoviClienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            //handleEdit: (e) => clienteAction.handleEdit(e, clienteSliceReducer, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            //handleDelete: (e) => clienteAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteSliceReducer, dispatch)
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  );
};

export default NuovoCliente;









