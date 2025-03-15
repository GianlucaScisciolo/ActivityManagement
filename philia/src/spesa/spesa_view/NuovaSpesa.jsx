import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormNuovoItem } from "../../riutilizzabile/form_item/FormItem";
import { CardNuovoItem } from "../../riutilizzabile/card_item/CardItem";
import { RowNuovoItem } from "../../riutilizzabile/row_item/RowItem";
import { controlloSpesa } from "../../vario/Controlli";
import { SpesaAction } from "../spesa_action/SpesaAction";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";
import { aggiornaTipoSelezione, inserimentoSpesa } from "../../store/redux/SpeseSlice";

const NuovaSpesa = () => {
  const spesaAction = new SpesaAction();
  const speseSession = useSelector((state) => state.speseSession.value);
  const dispatch = useDispatch();
  
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovaSpesa, setNuovaSpesa] = useState({
    tipo_item: "spesa", 
    tipo_selezione: 0,
    nome: "",
    giorno: "",
    descrizione: "",
    totale: 0,
    note: "", 
    errore_nome: "",
    errore_giorno: "",
    errore_descrizione: "",
    errore_totale: "",
    errore_note: "",
  })

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_spesa: id, 
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
            campiNuovoItem: spesaAction.getCampiNuovaSpesa(
              nuovaSpesa, 
              (e) => handleInputChange(e, setNuovaSpesa), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
            ), 
            indiciNuovoItem: spesaAction.INDICI_NUOVA_SPESA, 
            handleInsert: (e) => spesaAction.handleInsert(e, nuovaSpesa, setNuovaSpesa, dispatch), 
            tipoItem: "spesa", 
            items: speseSession.nuoveSpese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: spesaAction.getCampiSpesaEsistente, 
            indiciItemEsistente: spesaAction.INDICI_SPESA_ESISTENTE, 
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

export default NuovaSpesa;









