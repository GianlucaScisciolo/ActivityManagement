import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleInputChange } from "../../vario/Vario";
import { ServizioAction } from "../../action/ServizioAction";
import { ServizioForms } from "../../forms/ServizioForms";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Servizi = () => {
  const servizioAction = new ServizioAction();
  const servizioForms = new ServizioForms();
  const serviziSession = useSelector((state) => state.servizioReducer.value);
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
    servizioAction.selezioneOperazioneServizio(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: servizioForms.getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: servizioForms.INDICI_RICERCA_SERVIZI, 
            handleSearch: (e) => servizioAction.ricercaServizi(e, datiRicerca), 
            tipoItem: "servizio", 
            items: servizioReducer.servizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            indiciItemEsistente: servizioForms.INDICI_SERVIZIO_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => servizioAction.modificaServizi(e, servizioReducer, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => servizioAction.eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, serviziSession)
          }
        }
      />
    </>
  );
}

export default Servizi;