import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleInputChange } from "../../vario/Vario.js";
import { ServizioAction } from "../../action/ServizioAction.js";
import { ServizioForms } from "../../forms/ServizioForms.js"
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem.jsx";

const NuovoServizio = () => {
  const servizioAction = new ServizioAction();
  const servizioForms = new ServizioForms();
  const servizioReducer = useSelector((state) => state.servizioReducer.value);
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
    servizioAction.selezioneOperazioneServizio(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }

  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: servizioForms.getCampiNuovoServizio(nuovoServizio, (e) => handleInputChange(e, setNuovoServizio), null, null), 
            indiciNuovoItem: servizioForms.INDICI_NUOVO_SERVIZIO, 
            handleInsert: (e) => servizioAction.inserisciServizio(e, nuovoServizio, setNuovoServizio), 
            tipoItem: "servizio", 
            items: servizioReducer.nuoviServizi, 
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









