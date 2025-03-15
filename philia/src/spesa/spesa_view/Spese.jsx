import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import { SpesaAction } from "../spesa_action/SpesaAction";
import { useDispatch } from "react-redux";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaSpese, aggiornaTipoSelezione, getSpesaPrimaDellaModifica, getSpesaDopoLaModifica } from "../../store/redux/SpeseSlice";

const Spese = () => {
  const spesaAction = new SpesaAction();
  const speseSession = useSelector((state) => state.speseSession.value);
  const dispatch = useDispatch();
  
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "spesa", 
    nome: "", 
    descrizione: "", 
    totale_min: "",
    totale_max: "",  
    primo_giorno: "", 
    ultimo_giorno: "", 
    note: ""
  });

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_spesa: id, 
      nuova_selezione: nuova_selezione
    }));
  }
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, "spesa" 
    )
  }



  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: spesaAction.getCampiRicercaSpese(
              datiRicerca, 
              (e) => handleInputChange(e, setDatiRicerca), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
            ),
            indiciRicercaItems: spesaAction.INDICI_RICERCA_SPESE, 
            handleSearch: (e) => spesaAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "spesa", 
            items: speseSession.spese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: spesaAction.getCampiSpesaEsistente, 
            indiciItemEsistente: spesaAction.INDICI_SPESA_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => spesaAction.handleEdit(e, speseSession, selectedIdsModifica, setSelectedIdsModifica, dispatch),  
            handleDelete: (e) => spesaAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, speseSession, dispatch)
          }
        }
      />
    </>
  );
}

export default Spese;









