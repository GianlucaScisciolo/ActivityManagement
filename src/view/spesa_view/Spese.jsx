// React e Redux
import React, { useState } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms";
import { SpesaForms } from "../forms/SpesaForms";
// Actions
import { SpesaActions } from "../../actions/SpesaActions";
// Riutilizzabile
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Spese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const operazioniForms = new OperazioniForms();
  const spesaState = useSelector((state) => state.spesaSliceReducer.value);
  const stileState = useSelector((state) => state.stileSliceReducer.value);
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

      <PaginaWebRicercaItems 
        componenti={ 
          {
            stileState: stileState, 
            lavoroActions: null, 
            handleBlurItem: handleBlurItem, 
            campiRicercaItems: spesaForms.getCampiRicercaSpese(
              datiRicerca, 
              (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputClick(e), 
              (e) => operazioniForms.handleInputBlur(e) 
            ),
            indiciRicercaItems: spesaForms.INDICI_RICERCA_SPESE, 
            handleSearch: (e) => spesaActions.ricercaSpese(e, datiRicerca), 
            tipoItem: "spesa", 
            items: spesaState.spese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: spesaForms.getCampiSpesaEsistente, 
            indiciItemEsistente: spesaForms.INDICI_SPESA_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => spesaActions.modificaSpese(e, spesaState, selectedIdsModifica, setSelectedIdsModifica),  
            handleDelete: (e) => spesaActions.eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, spesaState)
          }
        }
      />
    </>
  );
}

export default Spese;









