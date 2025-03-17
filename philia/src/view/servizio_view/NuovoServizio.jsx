import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../component/Operazioni.jsx";
import { handleInputChange } from "../../vario/Vario.js";
import { ServizioAction } from "../../action/ServizioAction.js";
import { ServizioForms } from "../../forms/ServizioForms.js"
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem.jsx";
import { aggiornaTipoSelezione } from "../../store/redux/ServiziSlice.js";

const NuovoServizio = () => {
  const servizioAction = new ServizioAction();
  const servizioForms = new ServizioForms();
  const serviziSession = useSelector((state) => state.serviziSession.value);
  const dispatch = useDispatch();

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

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_servizio: id, 
      nuova_selezione: nuova_selezione
    }));
  }

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem 
    )
  }

  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: servizioForms.getCampiNuovoServizio(nuovoServizio, (e) => handleInputChange(e, setNuovoServizio), null, null), 
            indiciNuovoItem: servizioForms.INDICI_NUOVO_SERVIZIO, 
            handleInsert: (e) => servizioAction.handleInsert(e, nuovoServizio, setNuovoServizio, dispatch), 
            tipoItem: "servizio", 
            items: serviziSession.nuoviServizi, 
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









