// React e Redux
import React, { useState } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../../view/forms/OperazioniForms";
import { SpesaForms } from "../../view/forms/SpesaForms";
// Actions
import { SpesaActions } from "../../actions/SpesaActions";
// Riutilizzabile
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";

const NuovaSpesa = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const operazioniForms = new OperazioniForms();
  const spesaSliceReducer = useSelector((state) => state.spesaSliceReducer.value);
  const stileSliceReducer = useSelector((state) => state.stileSliceReducer.value);
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

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    spesaActions.aggiornaSpesa(item.id, name, value);
    if(["giorno_spesa"].includes(e.target.id)) {
      e.target.type = (!e.target.value) ? "text" : "date";
    }
  };

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <PaginaWebNewItem 
        componenti={
          {
            stileSliceReducer: stileSliceReducer, 
            lavoroActions: null, 
            handleBlurItem: handleBlurItem, 
            campiNuovoItem: spesaForms.getCampiNuovaSpesa(
              nuovaSpesa, 
              (e) => operazioniForms.handleInputChange(e, setNuovaSpesa), 
              (e) => operazioniForms.handleInputClick(e), 
              (e) => operazioniForms.handleInputBlur(e) 
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









