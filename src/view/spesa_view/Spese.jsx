import React, { useState } from "react";
import { useSelector } from "react-redux";
import { OperazioniForms } from "../../view/forms/OperazioniForms";
import { SpesaActions } from "../../actions/SpesaActions";
import { SpesaForms } from "../../view/forms/SpesaForms";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Spese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const operazioniForms = new OperazioniForms();
  const spesaSliceReducer = useSelector((state) => state.spesaSliceReducer.value);
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

  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: spesaForms.getCampiRicercaSpese(
              datiRicerca, 
              (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputClick(e), 
              (e) => operazioniForms.handleInputBlur(e) 
            ),
            indiciRicercaItems: spesaForms.INDICI_RICERCA_SPESE, 
            handleSearch: (e) => spesaActions.ricercaSpese(e, datiRicerca), 
            tipoItem: "spesa", 
            items: spesaSliceReducer.spese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: spesaForms.getCampiSpesaEsistente, 
            indiciItemEsistente: spesaForms.INDICI_SPESA_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => spesaActions.modificaSpese(e, spesaSliceReducer, selectedIdsModifica, setSelectedIdsModifica),  
            handleDelete: (e) => spesaActions.eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, spesaSliceReducer)
          }
        }
      />
    </>
  );
}

export default Spese;









