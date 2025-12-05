// React e Redux
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms";
import { ServizioForms } from "../forms/ServizioForms";
// Actions
import { ServizioActions } from "../../actions/ServizioActions";
import { SaloneActions } from "../../actions/SaloneActions.js";
// Riutilizzabile
import SearchAndInsertPage from "../../../riutilizzabile/SearchAndInsertPage.jsx";

const Servizi = () => {
  const servizioActions = new ServizioActions();
  const servizioForms = new ServizioForms();
  const operazioniForms = new OperazioniForms();
  const servizioState = useSelector((state) => state.servizio.value);
  const stileState = useSelector((state) => state.stile.value);

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovoServizio, setNuovoServizio] = useState({
    tipo_item: "servizio", 
    tipo_selezione: 0,
    nome: "",
    prezzo: "",
    note: "", 
    errore_nome: "", 
    errore_prezzo: "", 
    errore_note: ""
  });
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "servizio", 
    nome: "", 
    prezzo_min: "",
    prezzo_max: "",  
    note: "", 
    in_uso: ""
  });

  const selectOperation = (icon, item) => {
    servizioActions.selezioneOperazioneServizio(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  };

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    servizioActions.aggiornaServizio(item.id, name, value);
  };

  useEffect(() => {
    const saloneActions = new SaloneActions();
    saloneActions.azzeraListe();
  }, []);

  const campiNuovoServizio = servizioForms.getCampiNuovoServizio(
    nuovoServizio, 
    (e) => operazioniForms.handleInputChange(e, setNuovoServizio), 
    (e) => operazioniForms.handleInputClick(e, setNuovoServizio), 
    (e) => operazioniForms.handleInputBlur(e, setNuovoServizio)
  );
  const campiRicercaServizi = servizioForms.getCampiRicercaServizi(
    datiRicerca, 
    (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
    (e) => operazioniForms.handleInputClick(e, setDatiRicerca), 
    (e) => operazioniForms.handleInputBlur(e, setDatiRicerca)
  );
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <SearchAndInsertPage 
        componenti={ 
          {
            // Items
            tipoItem: "servizio", 
            items: servizioState.servizi, 
            setItems: null, 
            servizi: null, 
            // Stati
            stileState: stileState, 
            // Actions
            lavoroActions: null, 
            // Handle operations
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => servizioActions.inserisciServizio(e, nuovoServizio, setNuovoServizio), 
            handleSearch: (e) => servizioActions.ricercaServizi(e, datiRicerca), 
            handleEdit:   (e) => servizioActions.modificaServizi(e, servizioState, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => servizioActions.eliminaServizi(e, selectedIdsEliminazione, setSelectedIdsEliminazione, servizioState), 
            // Campi
            campiNuovoItem: campiNuovoServizio, 
            campiRicercaItems: campiRicercaServizi,
            campiItemEsistente: servizioForms.getCampiServizioEsistente, 
            // Indici
            indiciNuovoItem: [...Array(campiNuovoServizio.label.length).keys()], 
            indiciRicercaItems: [...Array(campiRicercaServizi.label.length).keys()], 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
          }
        }
      />
    </>
  );
}

export default Servizi;