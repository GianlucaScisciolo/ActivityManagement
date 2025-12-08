// React e Redux
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms.js";
import { LavoroForms } from "../forms/LavoroForms";
import OptionsClientiNuovoLavoro from "../options/OptionsClientiNuovoLavoro.jsx";
import OptionsServiziNuovoLavoro from "../options/OptionsServiziNuovoLavoro.jsx";
// Actions
import { LavoroActions } from "../../actions/LavoroActions.js";
import { AttivitaActions } from "../../actions/AttivitaActions.js";
// Riutilizzabile
import PaginaWeb from "../../../riutilizzabile/pagine_web/PaginaWeb.jsx";

const Lavori = () => {
  const lavoroActions = new LavoroActions();
  const lavoroForms = new LavoroForms();
  const operazioniForms = new OperazioniForms();
  const lavoroState = useSelector((state) => state.lavoro.value);
  const stileState = useSelector((state) => state.stile.value);
  const attivitaState = useSelector((state) => state.attivita.value);

  const classeFormWrapperCheckbox = (stileState.vistaForm === "form") ? "checkbox-wrapper-form" : "checkbox-wrapper";
  const classeItemWrapperCheckbox = (stileState.vistaItem === "form") ? "checkbox-wrapper-form" : "checkbox-wrapper";

  const [lavori, setLavori] = useState(-1);
  const [tipoFile, setTipoFile] = useState("");

  const [clienti, setClienti] = useState(-1);
  const [servizi, setServizi] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovoLavoro, setNuovoLavoro] = useState({
    tipo_item: "lavoro", 
    tipo_selezione: 0, 
    id_cliente: 0, 
    cliente: "", 
    id_servizi: [], 
    servizio: "", 
    giorno: "",
    totale: 0, 
    note: "", 
    errore_cliente: "", 
    errore_servizi: "", 
    errore_giorno: "", 
    errore_note: "" 
  });

  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "lavoro", 
    cliente: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    note: ""
  });

  const selectOperation = (icon, item) => {
    lavoroActions.selezioneOperazioneLavoro(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, 
      setSelectedIdsEliminazione, setSelectedPencilCount, setSelectedTrashCount
    );
  };
  
  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    lavoroActions.aggiornaLavoro(item.id, name, value);
    if(["giorno_lavoro"].includes(e.target.id)) {
      e.target.type = (!e.target.value) ? "text" : "date";
    }
  };

  const getTotaleLavori = () => {
    let totaleLavori = 0;
    if(lavoroState.lavori && lavoroState.lavori.length > 0) {
      for(let lavoro of lavoroState.lavori) {
        totaleLavori += parseFloat(lavoro.totale);
      }
      return "Total: " + parseFloat(totaleLavori).toFixed(2) + " €";
    }
    else {
      return "";
    }
  }
  
  useEffect(() => {
    const attivitaActions = new AttivitaActions();
    attivitaActions.azzeraListe();
  }, []);
  
  const campiNuovoLavoro = lavoroForms.getCampiNuovoLavoro(
    nuovoLavoro, 
    setNuovoLavoro, 
    (e) => operazioniForms.handleInputChange(e, setNuovoLavoro), 
    (e) => operazioniForms.handleInputClick(e), 
    (e) => operazioniForms.handleInputBlur(e) 
  );
  const campiRicercaLavori = lavoroForms.getCampiRicercaLavori(
    datiRicerca, 
    (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
    (e) => operazioniForms.handleInputClick(e), 
    (e) => operazioniForms.handleInputBlur(e)  
  );
  const campiFile = lavoroForms.getCampiFile(
    datiRicerca, 
    (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
    (e) => operazioniForms.handleInputClick(e), 
    (e) => operazioniForms.handleInputBlur(e) 
  );

  return (
    <>
      <Header />

      <div className="main-content" />
      <PaginaWeb 
        componenti={
          {
            // Items
            tipoItem: "lavoro", 
            items: lavoroState.lavori, 
            setItems: null, 
            // Stati 
            stileState: stileState,
            // Ations 
            lavoroActions: lavoroActions,
            // Handle operations 
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => lavoroActions.inserimentoLavoro(e, servizi, clienti, nuovoLavoro, setNuovoLavoro), 
            handleSearch: (e) => lavoroActions.ricercaLavori(e, datiRicerca), 
            handleEdit: (e) => lavoroActions.modificaLavori(e, servizi, lavoroState, selectedIdsModifica, setSelectedIdsModifica), 
            handleDelete: (e) => lavoroActions.eliminaLavori(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoroState), 
            handleSearchRangeFilePDF: (e) => lavoroActions.handleSearchLavoriRangeFile(e, "pdf", setTipoFile, datiRicerca, setLavori), 
            handleSearchRangeFileExcel: (e) => lavoroActions.handleSearchLavoriRangeFile(e, "excel", setTipoFile, datiRicerca, setLavori), 
            handleDeleteRangeFile: (e) => lavoroActions.handleDeleteLavoriRangeFile(e, datiRicerca), 
            // Campi
            campiNuovoItem: campiNuovoLavoro,
            campiRicercaItems: campiRicercaLavori, 
            campiItemEsistente: lavoroForms.getCampiLavoroEsistente, 
            campiFile: campiFile, 
            // Indici
            indiciNuovoItem: [...Array(campiNuovoLavoro.label.length).keys()], 
            indiciRicercaItems: [...Array(campiRicercaLavori.label.length).keys()], 
            indiciFile: [...Array(campiFile.label.length).keys()], 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            // Informazioni 
            visualizzazioneInformazioni: true,
            totaleItems: getTotaleLavori(),
          }
        } 
        elementi={["search", "insert", "file"]}
        vistaItem={stileState.vistaItem} 
        vistaForm={stileState.vistaForm}
      />
    </>
  );
}

export default Lavori;