import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
// import { getCampiRicercaServizi, getCampiServizioEsistente, indiciRicercaServizi, indiciServizioEsistente } from "../servizio_action/ServiziVario";
import { ServizioAction } from "../servizio_action/ServizioAction";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaServizi, aggiornaTipoSelezione, getServizioPrimaDellaModifica, getServizioDopoLaModifica } from "../../store/redux/ServiziSlice";

const Servizi = () => {
  const servizioAction = new ServizioAction();
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
            campiRicercaItems: servizioAction.getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: servizioAction.INDICI_RICERCA_SERVIZI, 
            handleSearch: (e) => servizioAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "servizio", 
            items: serviziSession.servizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioAction.getCampiServizioEsistente, 
            indiciItemEsistente: servizioAction.INDICI_SERVIZIO_ESISTENTE, 
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