// React e Redux
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from '../forms/OperazioniForms.js';
import { ClienteForms } from '../forms/ClienteForms.js';
// Actions
import { ClienteActions } from "../../actions/ClienteActions.js";
import { SaloneActions } from "../../actions/SaloneActions.js"
// Riutilizzabile
import SearchAndInsertPage from '../../riutilizzabile/SearchAndInsertPage.jsx';

const Clienti = () => {
  const clienteActions = new ClienteActions();
  const clienteForms = new ClienteForms();
  const operazioniForms = new OperazioniForms();
  const clienteState = useSelector((state) => state.clienteSliceReducer.value);
  const stileState = useSelector((state) => state.stileSliceReducer.value);

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
  });

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
  };

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    clienteActions.aggiornaCliente(item.id, name, value);
  };

  useEffect(() => {
    const saloneActions = new SaloneActions();
    saloneActions.azzeraListe();
  }, []);
  
  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      <SearchAndInsertPage 
        componenti={
          {
            // Items
            tipoItem: "cliente",
            items: clienteState.clienti, 
            setItems: null, 
            servizi: null, 
            // Stati
            stileState: stileState, 
            // Actions
            lavoroActions: null, 
            // Handle operations
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => clienteActions.inserimentoCliente(e, nuovoCliente, setNuovoCliente), 
            handleSearch: (e) => clienteActions.ricercaClienti(e, datiRicerca), 
            handleEdit: (e) => clienteActions.modificaClienti(e, selectedIdsModifica, setSelectedIdsModifica, clienteState),
            handleDelete: (e) => clienteActions.eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteState),             
            // Campi
            campiNuovoItem: clienteForms.getCampiNuovoCliente(nuovoCliente, (e) => operazioniForms.handleInputChange(e, setNuovoCliente), null, null), 
            campiRicercaItems: clienteForms.getCampiRicercaClienti(datiRicerca, (e) => operazioniForms.handleInputChange(e, setDatiRicerca), null, null),
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            // Indici
            indiciNuovoItem: clienteForms.INDICI_NUOVO_CLIENTE, 
            indiciRicercaItems: clienteForms.INDICI_RICERCA_CLIENTI, 
            indiciItemEsistente: clienteForms.INDICI_CLIENTE_ESISTENTE, 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
          }
        }
      />
    </>
  );
};

export default Clienti;









