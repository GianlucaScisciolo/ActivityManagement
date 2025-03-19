import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ClienteAction } from "../../action/ClienteAction.js";
import { ClienteForms } from "../../forms/ClienteForms.js";
import { handleInputChange } from "../../vario/Vario.js";
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems.jsx';

const Clienti = () => {
  const clienteAction = new ClienteAction();
  const clienteForms = new ClienteForms();
  const clientiSession = useSelector((state) => state.clientiSession.value);
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
    clienteAction.selezioneOperazioneCliente(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: clienteForms.getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: clienteForms.INDICI_RICERCA_CLIENTI, 
            handleSearch: (e) => clienteAction.ricercaClienti(e, datiRicerca), 
            tipoItem: "cliente", 
            items: clientiSession.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => clienteAction.modificaClienti(e, clientiSession, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => clienteAction.eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clientiSession)
          }
        }
      />
      <button>{clientiSession.clienti.length}</button>
    </>
  );
}

export default Clienti;









