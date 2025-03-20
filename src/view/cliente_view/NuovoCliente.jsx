import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ClienteActions } from "../../actions/ClienteActions.js";
import { ClienteForms } from '../../forms/ClienteForms.js';
import { handleInputChange } from '../../vario/Vario.js';
import PaginaWebNewItem from '../../riutilizzabile/PaginaWebNewItem.jsx';

const NuovoCliente = () => {
  const clienteActions = new ClienteActions();
  const clienteForms = new ClienteForms();
  const clienteSliceReducer = useSelector((state) => state.clienteSliceReducer.value);

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
  
  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: clienteForms.getCampiNuovoCliente(nuovoCliente, (e) => handleInputChange(e, setNuovoCliente), null, null), 
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









