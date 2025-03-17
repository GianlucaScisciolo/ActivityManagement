import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { ServizioAction } from "../../action/ServizioAction";
import { ServizioForms } from "../../forms/ServizioForms";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaTipoSelezione } from "../../store/redux/ServiziSlice";

const Servizi = () => {
  const servizioAction = new ServizioAction();
  const servizioForms = new ServizioForms();
  const serviziSession = useSelector((state) => state.serviziSession.value);
  const dispatch = useDispatch();

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

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_servizio: id, 
      nuova_selezione: nuova_selezione
    }));
  }
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, "servizio" 
    )
  }
  
  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: servizioForms.getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: servizioForms.INDICI_RICERCA_SERVIZI, 
            handleSearch: (e) => servizioAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "servizio", 
            items: serviziSession.servizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            indiciItemEsistente: servizioForms.INDICI_SERVIZIO_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => servizioAction.handleEdit(e, serviziSession, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            handleDelete: (e) => servizioAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, serviziSession, dispatch)
          }
        }
      />
    </>
  );
}

export default Servizi;