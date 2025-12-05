// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms.js";
import { LavoroForms } from "../forms/LavoroForms.js";
// Actions
import { LavoroActions } from "../../actions/LavoroActions.js";
import { SaloneActions } from "../../actions/SaloneActions.js";
// Riutilizzabile
import FileSearchAndInsertPage from "../../../riutilizzabile/FileSearchAndInsertPage.jsx";

const Lavori = () => {
  const lavoroActions = new LavoroActions();
  const lavoroForms = new LavoroForms();
  const operazioniForms = new OperazioniForms();
  const lavoroState = useSelector((state) => state.lavoro.value);
  const stileState = useSelector((state) => state.stile.value);
  const saloneState = useSelector((state) => state.salone.value);

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
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  };

  const OptionsClienti = ({ clienti }) => {
    const [clientiSelezionati, setClientiSelezionati] = useState([]);
    const [clientiNonSelezionati, setClientiNonSelezionati] = useState(Object.values(clienti));

    useEffect(() => {
      setClientiNonSelezionati(Object.values(clienti));
    }, [clienti]);
    
    const optionStr = (cliente) => {
      return cliente.nome + " " + cliente.cognome +
        ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") + 
        ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "")
    }
    
    const sottoStringa = nuovoLavoro.cliente;

    const handleCheckboxChange = (e, cliente) => {
      if (e.target.checked) {
        if (clientiSelezionati.length === 0) {
          setClientiSelezionati([cliente]);
          setClientiNonSelezionati(clientiNonSelezionati.filter(c => c.id !== cliente.id));
          setNuovoLavoro(prevState => ({
            ...prevState,
            id_cliente: cliente.id
          }));
        } 
        else {
          // Sposta il cliente già presente in clientiSelezionati a clientiNonSelezionati
          const clienteCorrente = clientiSelezionati[0];
          setClientiNonSelezionati([
            ...clientiNonSelezionati,
            clienteCorrente
          ].filter(c => c.id !== cliente.id));
    
          // Aggiorna il cliente selezionato
          setClientiSelezionati([cliente]);
          setNuovoLavoro(prevState => ({
            ...prevState,
            id_cliente: cliente.id
          }));
        }
      } else {
        // Deseleziona il cliente e reimposta lo stato
        setClientiSelezionati([]);
        setClientiNonSelezionati([...clientiNonSelezionati, cliente]);
        setNuovoLavoro(prevState => ({
          ...prevState,
          id_cliente: 0
        }));
      }
    };
    

    return (
      <>
        {(clienti !== -1) && (
          <>
            <div>
              Seleziona solo 1 cliente:<br />
              {clientiNonSelezionati.filter(cliente => 
                optionStr(cliente).toLowerCase().includes(sottoStringa.toLowerCase())
              ).map((cliente, index) => (
                <div key={index} className={classeFormWrapperCheckbox + " clientiNonSelezionati"}>
                  <input 
                    type="checkbox" 
                    id={"cliente_non_sel_" + index} 
                    name={"cliente_non_sel_" + index} 
                    value={cliente.id}
                    checked={false}
                    onChange={(e) => handleCheckboxChange(e, cliente)}
                    className="custom-checkbox-rounded"
                  />
                  <label htmlFor={"cliente_non_sel_" + index}>
                    {optionStr(cliente)}
                  </label>
                </div>                
              ))}
            </div>
            <div>
              {clientiSelezionati.map((cliente, index) => (
                <div key={index} className={classeFormWrapperCheckbox + " clientiSelezionati"}>
                  <input 
                    type="checkbox" 
                    id={"cliente_sel_" + index} 
                    name={"cliente_sel_" + index} 
                    value={cliente.id} 
                    checked={true}
                    onChange={(e) => handleCheckboxChange(e, cliente)}
                    className="custom-checkbox-rounded"
                  />
                  <label htmlFor={"cliente_sel_" + index}>
                    {optionStr(cliente)}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  const aggiornaServizio = (id, parametro, nuovoValore) => {
    setServizi((prevServizi) =>
      prevServizi.map((servizio) =>
        servizio.id === id
          ? { ...servizio, [parametro]: nuovoValore }
          : servizio
      )
    );
  };

  const OptionsServizi = ({ servizi }) => {
    const optionStr = (servizio) => {
      return servizio.nome + " - " + servizio.prezzo + " €";
    }
    
    const sottoStringa = nuovoLavoro.servizio;

    return (
      <>
        {(servizi !== -1) && (
          <>
            <div>
              {servizi.filter(servizio => 
                optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
              ).map((servizio, index) => (
                <React.Fragment key={index}>
                  {servizio.in_uso === 1 && (
                    <Row style={{padding: "10px"}}>
                      <Col>
                        <label htmlFor={"servizio_" + index}>
                          {optionStr(servizio)}
                        </label>
                      </Col>
                      <Col>
                        <input 
                          style={{width: "90px", padding:"5px 10px"}}
                          rows={1}
                          name={"servizio_" + index} 
                          id={"servizio_" + index} 
                          type="number" 
                          step={1}
                          value={servizio.quantita}
                          placeholder={"quantita_servizio_" + index}
                          onChange={(e) => {
                            const { value } = e.target;
                            if(servizio.quantita + value >= 0) {
                              aggiornaServizio(servizio.id, "quantita", value);
                            } 
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  const getAllClienti = async () => {
    const response = await fetch('/OTTIENI_TUTTI_GLI_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tipo_item: "cliente"}),
    });

    if(response.status === 200) {
      const result = await response.json();
      setClienti(result.items);
    }
    else {
      alert(saloneState.lingua === "italiano" ? "Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi." : "Error while obtaining clients for new job entry, try again later.");
    }
  };

  const getAllServizi = async () => {
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
      alert(saloneState.lingua === "italiano" ? "Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi." : "Error while obtaining clients for new job entry, try again later.");
    }
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
    getAllClienti();
  }, []);
  
  useEffect(() => {
    getAllServizi();
  }, []);

  useEffect(() => {
    const saloneActions = new SaloneActions();
    saloneActions.azzeraListe();
  }, []);
  const campiNuovoLavoro = lavoroForms.getCampiNuovoLavoro(
    nuovoLavoro, 
    OptionsClienti({clienti}), 
    OptionsServizi({servizi}), 
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
      
      <FileSearchAndInsertPage 
        componenti={
          {
            // Items
            tipoItem: "lavoro", 
            items: lavoroState.lavori, 
            setItems: null, 
            servizi: servizi,
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
            handleSearchRangeFilePDF: (e) => lavoroActions.handleSearchLavoriRangeFile(e, "pdf", setTipoFile, datiRicerca, lavori, setLavori), 
            handleSearchRangeFileExcel: (e) => lavoroActions.handleSearchLavoriRangeFile(e, "excel", setTipoFile, datiRicerca, lavori, setLavori), 
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
      />
    </>
  );
}

export default Lavori;