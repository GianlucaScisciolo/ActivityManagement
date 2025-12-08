// React e Redux
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from '../forms/OperazioniForms.js';
import { ClienteForms } from '../forms/ClienteForms.jsx';
// Actions
import { ClienteActions } from "../../actions/ClienteActions.js";
import { AttivitaActions } from "../../actions/AttivitaActions.js"
// Riutilizzabile
import PaginaWeb from '../../../riutilizzabile/pagine_web/PaginaWeb.jsx';

const Clienti = () => {
  const clienteState = useSelector((state) => state.cliente.value);
  const stileState = useSelector((state) => state.stile.value);
  const attivitaState = useSelector((state) => state.attivita.value);
  const clienteActions = new ClienteActions();
  const clienteForms = new ClienteForms();
  const operazioniForms = new OperazioniForms();

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [nuovoCliente, setNuovoCliente] = useState({
    tipo_item: "cliente", 
    tipo_selezione: 0,
    nome: "",
    cognome: "",
    contatto: "", 
    email: "", 
    note: "", 
    errore_nome: "", 
    errore_cognome: "", 
    errore_contatto: "",
    errore_email: "", 
    errore_note: ""
  });

  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "cliente", 
    nome: "", 
    cognome: "", 
    contatto: "", 
    email: "", 
    note: ""
  });

  const selectOperation = (icon, item) => {
    clienteActions.selezioneOperazioneCliente(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    );
  };

  const handleBlurItem = (e, item) => {
    const { name, value } = e.target;
    clienteActions.aggiornaCliente(item.id, name, value);
  };

  useEffect(() => {
    const attivitaActions = new AttivitaActions();
    attivitaActions.azzeraListe();
  }, []);
  const campiNuovoCliente = clienteForms.getCampiNuovoCliente(nuovoCliente, (e) => operazioniForms.handleInputChange(e, setNuovoCliente), null, null)
  const campiRicercaClienti = clienteForms.getCampiRicercaClienti(datiRicerca, (e) => operazioniForms.handleInputChange(e, setDatiRicerca), null, null)
  
  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      <PaginaWeb 
        componenti={
          {
            // Items
            tipoItem: "cliente",
            items: clienteState.clienti, 
            setItems: null, 
            servizi: null, 
            // Stati
            stileState: stileState, 
            // Actions
            lavoroActions: null, 
            // Handle operations
            handleBlurItem: handleBlurItem, 
            handleInsert: (e) => clienteActions.inserimentoCliente(e, nuovoCliente, setNuovoCliente), 
            handleSearch: (e) => clienteActions.ricercaClienti(e, datiRicerca), 
            handleEdit: (e) => clienteActions.modificaClienti(e, selectedIdsModifica, setSelectedIdsModifica, clienteState),
            handleDelete: (e) => clienteActions.eliminaClienti(e, selectedIdsEliminazione, setSelectedIdsEliminazione, clienteState),             
            // Campi
            campiNuovoItem: campiNuovoCliente, 
            campiRicercaItems: campiRicercaClienti,
            campiItemEsistente: clienteForms.getCampiClienteEsistente, 
            // Indici
            indiciNuovoItem: [...Array(campiNuovoCliente.label.length).keys()], 
            indiciRicercaItems: [...Array(campiRicercaClienti.label.length).keys()], 
            // Selects
            selectOperation: selectOperation, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
          }
        }
        elementi={["search", "insert"]}
        vistaItem={stileState.vistaItem} 
        vistaForm={stileState.vistaForm}
      />
    </>
  );
};

export default Clienti;









