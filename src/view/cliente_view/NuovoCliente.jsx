import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ClienteAction } from "../../action/ClienteAction.js";
import { ClienteForms } from '../../forms/ClienteForms.js';
import { handleInputChange } from '../../vario/Vario.js';
import PaginaWebNewItem from '../../riutilizzabile/PaginaWebNewItem.jsx';

const NuovoCliente = () => {
  const clienteAction = new ClienteAction();
  const clienteForms = new ClienteForms();
  const clienteReducer = useSelector((state) => state.clienteReducer.value);

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
    clienteAction.selezioneOperazioneCliente(
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
            handleInsert: (e) => clienteAction.inserimentoCliente(e, nuovoCliente, setNuovoCliente), 
            tipoItem: "cliente", 
            items: clienteReducer.nuoviClienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            //handleEdit: (e) => clienteAction.handleEdit(e, clienteReducer, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            //handleDelete: (e) => clienteAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteReducer, dispatch)
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  );
};

export default NuovoCliente;









