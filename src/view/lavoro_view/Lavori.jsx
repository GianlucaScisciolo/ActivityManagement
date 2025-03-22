// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../../view/forms/OperazioniForms.js";
import { LavoroForms } from "../../view/forms/LavoroForms.js";
// Actions
import { LavoroActions } from "../../actions/LavoroActions.js";
// Riutilizzabile
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";

const Lavori = () => {
  const lavoroActions = new LavoroActions();
  const lavoroForms = new LavoroForms();
  const operazioniForms = new OperazioniForms();
  const lavoroSliceReducer = useSelector((state) => state.lavoroSliceReducer.value);
  const stileSliceReducer = useSelector((state) => state.stileSliceReducer.value);
  const [servizi, setServizi] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "lavoro", 
    nome_cliente: "", 
    cognome_cliente: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    descrizione: "",   
    note: ""
  });

  const selectOperation = (icon, item) => {
    lavoroActions.selezioneOperazioneLavoro(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  }

  const getAllServizi = async () => {
    try {
      const response = await fetch('/OTTIENI_TUTTI_GLI_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tipo_item: "servizio"}),
      });

      if(response.status === 200) {
        const result = await response.json();
        setServizi(result.items);
      }
      else {
        alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
    }
  };

  useEffect(() => {
    getAllServizi();
  }, []);

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <PaginaWebRicercaItems 
        componenti={
          {
            stileSliceReducer: stileSliceReducer, 
            lavoroActions: lavoroActions, 
            campiRicercaItems: lavoroForms.getCampiRicercaLavori(
              datiRicerca, 
              (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputClick(e), 
              (e) => operazioniForms.handleInputBlur(e)  
            ), 
            indiciRicercaItems: lavoroForms.INDICI_RICERCA_LAVORI, 
            handleSearch: (e) => lavoroActions.ricercaLavori(e, datiRicerca), 
            tipoItem: "lavoro", 
            items: lavoroSliceReducer.lavori, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: lavoroForms.getCampiLavoroEsistente, 
            indiciItemEsistente: lavoroForms.INDICI_LAVORO_ESISTENTE, 
            servizi: servizi, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => lavoroActions.modificaLavori(e, lavoroSliceReducer, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => lavoroActions.eliminaLavori(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoroSliceReducer)
          }
        }
      />
    </>
  );
}

export default Lavori;