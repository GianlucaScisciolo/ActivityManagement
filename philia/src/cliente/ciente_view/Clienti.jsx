import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOperationBody } from '../../app/app_view/component/Operazioni';
import { ClienteAction } from "../cliente_action/ClienteAction.js";
import { handleInputChange } from '../../vario/Vario';
import PaginaWeb from '../../riutilizzabile/PaginaWeb';
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems';
import { aggiornaClienti } from '../../store/redux/ClientiSlice';
import { aggiornaTipoSelezione, getClientePrimaDellaModifica, getClienteDopoLaModifica } from '../../store/redux/ClientiSlice';
import { controlloCliente } from '../../vario/Controlli';

const Clienti = () => {
  const clienteAction = new ClienteAction();
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
            campiRicercaItems: clienteAction.getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: clienteAction.INDICI_RICERCA_CLIENTI, 
            handleSearch: (e) => clienteAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "cliente", 
            items: clientiSession.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteAction.getCampiClienteEsistente, 
            indiciItemEsistente: clienteAction.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => clienteAction.handleEdit(e, clientiSession, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            handleDelete: (e) => clienteAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession, dispatch)
          }
        }
      />
      <button>{clientiSession.clienti.length}</button>
    </>
  );
}

export default Clienti;









