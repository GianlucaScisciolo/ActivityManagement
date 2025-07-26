// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms";
import { SpesaForms } from "../forms/SpesaForms";
// Actions
import { SpesaActions } from "../../actions/SpesaActions";
import { SaloneActions } from "../../actions/SaloneActions.js";
// Riutilizzabile
import FileSearchAndInsertPage from "../../riutilizzabile/FileSearchAndInsertPage.jsx";

const Spese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const operazioniForms = new OperazioniForms();
  const spesaState = useSelector((state) => state.spesaSliceReducer.value);
  const stileState = useSelector((state) => state.stileSliceReducer.value);
  
  const [spese, setSpese] = useState(-1);
  const [tipoFile, setTipoFile] = useState("");
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
    totale: "",
    note: "", 
    errore_nome: "",
    errore_giorno: "",
    errore_descrizione: "",
    errore_totale: "",
    errore_note: "",
  });
  
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

  const getTotaleSpese = () => {
    let totaleSpese = 0;
    if(spesaState.spese && spesaState.spese.length > 0) {
      for(let spesa of spesaState.spese) {
        totaleSpese += parseFloat(spesa.totale);
      }
      return "Total: " + parseFloat(totaleSpese).toFixed(2) + " €";
    }
    else {
      return "";
    }
  }

  useEffect(() => {
    const saloneActions = new SaloneActions();
    saloneActions.azzeraListe();
  }, []);

  return (
    <>
      <Header />

      <div className="main-content" />

      <FileSearchAndInsertPage 
        componenti={ 
          {
            // Items
            tipoItem: "spesa", 
            items: spesaState.spese,  
            setItems: null, 
            servizi: null, 
            // Stati
            stileState: stileState, 
            // Actions
            lavoroActions: null, 
            // Handle operations
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => spesaActions.inserimentoSpesa(e, nuovaSpesa, setNuovaSpesa), 
            handleSearch: (e) => spesaActions.ricercaSpese(e, datiRicerca), 
            handleEdit:   (e) => spesaActions.modificaSpese(e, spesaState, selectedIdsModifica, setSelectedIdsModifica),  
            handleDelete: (e) => spesaActions.eliminaSpese(e, selectedIdsEliminazione, setSelectedIdsEliminazione, spesaState), 
            handleSearchRangeFilePDF: (e) => spesaActions.handleSearchSpeseRangeFile(e, "pdf", setTipoFile, datiRicerca, spese, setSpese),
            handleSearchRangeFileExcel: (e) => spesaActions.handleSearchSpeseRangeFile(e, "excel", setTipoFile, datiRicerca, spese, setSpese),
            handleDeleteRangeFile: (e) => spesaActions.handleDeleteSpeseRangeFile(e, datiRicerca),
            // Campi
            campiNuovoItem: spesaForms.getCampiNuovaSpesa(
              nuovaSpesa, 
              (e) => operazioniForms.handleInputChange(e, setNuovaSpesa), 
              (e) => operazioniForms.handleInputClick(e, setNuovaSpesa), 
              (e) => operazioniForms.handleInputBlur(e, setNuovaSpesa) 
            ), 
            campiRicercaItems: spesaForms.getCampiRicercaSpese(
              datiRicerca, 
              (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputClick(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputBlur(e, setDatiRicerca) 
            ),
            campiItemEsistente: spesaForms.getCampiSpesaEsistente, 
            campiFile: spesaForms.getCampiFile(
              datiRicerca, 
              (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
              (e) => operazioniForms.handleInputClick(e), 
              (e) => operazioniForms.handleInputBlur(e) 
            ),
            // Indici
            indiciNuovoItem: spesaForms.INDICI_NUOVA_SPESA, 
            indiciRicercaItems: spesaForms.INDICI_RICERCA_SPESE, 
            indiciItemEsistente: spesaForms.INDICI_SPESA_ESISTENTE, 
            indiciFile: spesaForms.INDICI_FILE, 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            // Informazioni
            visualizzazioneInformazioni: true,
            totaleItems: getTotaleSpese(),
          }
        }
      />
    </>
  );
}

export default Spese;









