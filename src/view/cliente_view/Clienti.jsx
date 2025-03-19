import React, { useState } from 'react';
import { ClienteForms } from "../../forms/ClienteForms.js";
import { ClienteAction } from "../../action/ClienteAction.js";
import { handleInputChange } from "../../vario/Vario.js";
import PaginaWebRicercaItems from '../../riutilizzabile/PaginaWebRicercaItems.jsx';

import { useSelector } from 'react-redux';


const Clienti = () => {
  const clienteAction = new ClienteAction();
  const clienteForms = new ClienteForms();
  const clienteReducer = useSelector((state) => state.clienteReducer.value);
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
            items: clienteReducer.clienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => clienteAction.modificaClienti(e, clienteReducer, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => clienteAction.eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteReducer)
          }
        }
      />
      <button>{clienteReducer.clienti.length}</button>
    </>
  );
}

export default Clienti;









