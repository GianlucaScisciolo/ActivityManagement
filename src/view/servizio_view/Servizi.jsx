import React, { useState } from "react";
import { useSelector } from "react-redux";
import { OperazioniForms } from "../../view/forms/OperazioniForms";
import { ServizioActions } from "../../actions/ServizioActions";
import { ServizioForms } from "../../view/forms/ServizioForms";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Servizi = () => {
  const servizioActions = new ServizioActions();
  const servizioForms = new ServizioForms();
  const operazioniForms = new OperazioniForms();
  const servizioSliceReducer = useSelector((state) => state.servizioSliceReducer.value);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
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
  }
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: servizioForms.getCampiRicercaServizi(datiRicerca, (e) => operazioniForms.handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: servizioForms.INDICI_RICERCA_SERVIZI, 
            handleSearch: (e) => servizioActions.ricercaServizi(e, datiRicerca), 
            tipoItem: "servizio", 
            items: servizioSliceReducer.servizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            indiciItemEsistente: servizioForms.INDICI_SERVIZIO_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => servizioActions.modificaServizi(e, servizioSliceReducer, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => servizioActions.eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, serviziSession)
          }
        }
      />
    </>
  );
}

export default Servizi;