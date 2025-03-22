// React e Redux
import React, { useState } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../../view/forms/OperazioniForms.js";
import { ServizioForms } from "../../view/forms/ServizioForms.js"
// Actions
import { ServizioActions } from "../../actions/ServizioActions.js";
// Riutilizzabile
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem.jsx";

const NuovoServizio = () => {
  const servizioActions = new ServizioActions();
  const servizioForms = new ServizioForms();
  const operazioniForms = new OperazioniForms();
  const servizioSliceReducer = useSelector((state) => state.servizioSliceReducer.value);
  const stileSliceReducer = useSelector((state) => state.stileSliceReducer.value);
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
  })

  const selectOperation = (icon, item) => {
    servizioActions.selezioneOperazioneServizio(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <PaginaWebNewItem 
        componenti={
          {
            stileSliceReducer: stileSliceReducer, 
            lavoroActions: null, 
            campiNuovoItem: servizioForms.getCampiNuovoServizio(nuovoServizio, (e) => operazioniForms.handleInputChange(e, setNuovoServizio), null, null), 
            indiciNuovoItem: servizioForms.INDICI_NUOVO_SERVIZIO, 
            handleInsert: (e) => servizioActions.inserisciServizio(e, nuovoServizio, setNuovoServizio), 
            tipoItem: "servizio", 
            items: servizioSliceReducer.nuoviServizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            indiciItemEsistente: servizioForms.INDICI_SERVIZIO_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  )
}

export default NuovoServizio;









