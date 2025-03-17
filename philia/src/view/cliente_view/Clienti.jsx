import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperationBody } from "../component/Operazioni.jsx";
import { ClienteAction } from "../../action/ClienteAction.js";
import { ClienteForms } from "../../forms/ClienteForms.js";
import { handleInputChange } from "../../vario/Vario.js";
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems.jsx';
import { aggiornaTipoSelezione } from "../../store/redux/ClientiSlice.js";

const Clienti = () => {
  const clienteAction = new ClienteAction();
  const clienteForms = new ClienteForms();
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
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: clienteForms.getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: clienteForms.INDICI_RICERCA_CLIENTI, 
            handleSearch: (e) => clienteAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "cliente", 
            items: clientiSession.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => clienteAction.handleEdit(e, clientiSession.nuoviClienti, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            handleDelete: (e) => clienteAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession, dispatch)
          }
        }
      />
      <button>{clientiSession.clienti.length}</button>
    </>
  );
}

export default Clienti;









