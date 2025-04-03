// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms";
import { ServizioForms } from "../forms/ServizioForms";
// Actions
import { ServizioActions } from "../../actions/ServizioActions";
import { SaloneActions } from "../../actions/SaloneActions.js";
// Riutilizzabile
import SearchAndInsertPage from "../../riutilizzabile/SearchAndInsertPage.jsx";

const Servizi = () => {
  const servizioActions = new ServizioActions();
  const servizioForms = new ServizioForms();
  const operazioniForms = new OperazioniForms();
  const servizioState = useSelector((state) => state.servizioSliceReducer.value);
  const stileState = useSelector((state) => state.stileSliceReducer.value);

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovoServizio, setNuovoServizio] = useState({
    tipo_item: "servizio", 
    tipo_selezione: 0,
    nome: "",
    prezzo: "0.50",
    note: "", 
    errore_nome: "", 
    errore_prezzo: "", 
    errore_note: ""
  });
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "servizio", 
    nome: "", 
    prezzo_min: "",
    prezzo_max: "",  
    note: ""
  });

  const selectOperation = (icon, item) => {
    servizioActions.selezioneOperazioneServizio(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  };

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    servizioActions.aggiornaServizio(item.id, name, value);
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
            tipoItem: "servizio", 
            items: (servizioState.servizi) ? servizioState.servizi : [], 
            setItems: null, 
            servizi: null, 
            // Stati
            stileState: stileState, 
            // Actions
            lavoroActions: null, 
            // Handle operations
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => servizioActions.inserisciServizio(e, nuovoServizio, setNuovoServizio), 
            handleSearch: (e) => servizioActions.ricercaServizi(e, datiRicerca), 
            handleEdit: (e) => servizioActions.modificaServizi(e, servizioState, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => servizioActions.eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, servizioState), 
            // Campi
            campiNuovoItem: servizioForms.getCampiNuovoServizio(nuovoServizio, (e) => operazioniForms.handleInputChange(e, setNuovoServizio), null, null), 
            campiRicercaItems: servizioForms.getCampiRicercaServizi(datiRicerca, (e) => operazioniForms.handleInputChange(e, setDatiRicerca), null, null),
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            // Indici
            indiciNuovoItem: servizioForms.INDICI_NUOVO_SERVIZIO, 
            indiciRicercaItems: servizioForms.INDICI_RICERCA_SERVIZI, 
            indiciItemEsistente: servizioForms.INDICI_SERVIZIO_ESISTENTE, 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
          }
        }
      />
    </>
  );
}

export default Servizi;