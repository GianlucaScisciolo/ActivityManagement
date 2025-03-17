import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperationBody } from "../component/Operazioni.jsx";
import { ClienteAction } from "../../action/ClienteAction.js";
import { ClienteForms } from '../../forms/ClienteForms.js';
import { handleInputChange } from '../../vario/Vario.js';
import PaginaWebNewItem from '../../riutilizzabile/PaginaWebNewItem.jsx';
import { aggiornaTipoSelezione } from "../../store/redux/ClientiSlice.js";

const NuovoCliente = () => {
  const clienteAction = new ClienteAction();
  const clienteForms = new ClienteForms();
  const clientiSession = useSelector((state) => state.clientiSession.value);
  const dispatch = useDispatch();

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
  


  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: clienteForms.getCampiNuovoCliente(nuovoCliente, (e) => handleInputChange(e, setNuovoCliente), null, null), 
            indiciNuovoItem: clienteForms.INDICI_NUOVO_CLIENTE, 
            handleInsert: (e) => clienteAction.handleInsert(e, nuovoCliente, setNuovoCliente, dispatch), 
            tipoItem: "cliente", 
            items: clientiSession.nuoviClienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            //handleEdit: (e) => clienteAction.handleEdit(e, clientiSession, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            //handleDelete: (e) => clienteAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession, dispatch)
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  );
};

export default NuovoCliente;









