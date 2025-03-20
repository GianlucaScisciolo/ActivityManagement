import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { SpesaActions } from "../../actions/SpesaActions";
import { SpesaForms } from "../../forms/SpesaForms";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Spese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
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
              (e) => handleInputChange(e, setDatiRicerca), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
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









