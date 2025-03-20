import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { SpesaActions } from "../../actions/SpesaActions";
import { SpesaForms } from "../../forms/SpesaForms";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";

const NuovaSpesa = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const spesaSliceReducer = useSelector((state) => state.spesaSliceReducer.value);
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

  const selectOperation = (icon, item) => {
    spesaActions.selezioneOperazioneSpesa(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }

  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: spesaForms.getCampiNuovaSpesa(
              nuovaSpesa, 
              (e) => handleInputChange(e, setNuovaSpesa), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
            ), 
            indiciNuovoItem: spesaForms.INDICI_NUOVA_SPESA, 
            handleInsert: (e) => spesaActions.inserimentoSpesa(e, nuovaSpesa, setNuovaSpesa), 
            tipoItem: "spesa", 
            items: spesaSliceReducer.nuoveSpese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: spesaForms.getCampiSpesaEsistente, 
            indiciItemEsistente: spesaForms.INDICI_SPESA_ESISTENTE, 
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









