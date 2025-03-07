import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInputChange } from "../../vario/Vario";
import { selectOperationBody } from "../component/Operazioni";
import { 
  getCampiNuovoLavoro, getCampiLavoroEsistente, 
  indiciNuovoLavoro, indiciLavoroEsistente  
} from "./lavoriVario";
import { getSelectTag } from "../../riutilizzabile/form_item/FormItem";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";
import { aggiornaTipoSelezione, inserimentoLavoro } from "../../store/redux/LavoriSlice";

const NuovoLavoro = () => {
  const lavoriSession = useSelector((state) => state.lavoriSession.value);
  const dispatch = useDispatch();
  
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
    descrizione: ", ",
    totale: 0, 
    note: "", 
    errore_cliente: "", 
    errore_servizio: "", 
    errore_giorno: "", 
    errore_note: "" 
  })
  
  const handleGiornoClick = (setGiornoType) => {
    return () => {
      setGiornoType('date');
    };
  };

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_lavoro: id, 
      nuova_selezione: nuova_selezione
    }));
  }
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem 
    )
  }

  const handleInsert = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il lavoro?")) {
      let descrizione = "";
      for(let servizio of servizi) {
        if(nuovoLavoro.id_servizi.includes(servizio.id)) {
          nuovoLavoro.totale += servizio.prezzo;
          descrizione += servizio.nome + " - " + servizio.prezzo + " €, "
        }
      }
      for(let cliente of clienti) {
        console.log(cliente.id + " === " + nuovoLavoro.id_cliente);
        if (parseInt(cliente.id) === parseInt(nuovoLavoro.id_cliente)) {
          console.log("Cliente trovato!!");
          nuovoLavoro["cliente"] = cliente.nome + " " + cliente.cognome +
            ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") + 
            ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "");
          break;
        }
      }
      nuovoLavoro["descrizione"] = descrizione;
      
      // if (controlloLavoro(nuovoLavoro, setNuovoLavoro) > 0) 
      //   return;
      
      try {
        const response = await fetch('/INSERISCI_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoLavoro),
        });

        if(response.status === 200) {
          const result = await response.json();
          nuovoLavoro.id = result.id;
          dispatch(inserimentoLavoro({
            nuovoLavoro: nuovoLavoro 
          }));
          alert("L\'inserimento del lavoro è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: lavoro gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio del nuovo lavoro, riprova più tardi1.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio del nuovo lavoro, riprova più tardi2.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

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
                <div key={index} className="checkbox-wrapper clientiNonSelezionati">
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
                <div key={index} className="checkbox-wrapper clientiSelezionati">
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
  }

  const OptionsServizi = ({ servizi }) => {
    const [serviziSelezionati, setServiziSelezionati] = useState([]);
    const [serviziNonSelezionati, setServiziNonSelezionati] = useState(Object.values(servizi));

    useEffect(() => {
      setServiziNonSelezionati(Object.values(servizi));
    }, [servizi]);
    
    const optionStr = (servizio) => {
      return servizio.nome + " - " + servizio.prezzo + " €";
    }
    
    const sottoStringa = nuovoLavoro.servizio;

    const handleCheckboxChange = (e, servizio) => {
      if (e.target.checked) {
        const updatedSelezionati = [...serviziSelezionati, servizio];
        setServiziSelezionati(updatedSelezionati);
        setServiziNonSelezionati(serviziNonSelezionati.filter(s => s.id !== servizio.id));
        setNuovoLavoro(prevState => ({
          ...prevState,
          id_servizi: [...prevState.id_servizi, servizio.id]
        }));
      } 
      else {
        const updatedSelezionati = serviziSelezionati.filter(s => s.id !== servizio.id);
        setServiziSelezionati(updatedSelezionati);
        setServiziNonSelezionati([...serviziNonSelezionati, servizio]);
        setNuovoLavoro(prevState => ({
          ...prevState,
          id_servizi: prevState.id_servizi.filter(id => id !== servizio.id)
        }));
      }
    };

    return (
      <>
        {(servizi !== -1) && (
          <>
            <div>
              Seleziona almeno 1 servizio:<br />
              {serviziNonSelezionati.filter(servizio => 
                optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
              ).map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_non_sel_" + index} 
                    name={"servizio_non_sel_" + index} 
                    value={servizio.id}
                    checked={false}
                    onChange={(e) => handleCheckboxChange(e, servizio)}
                    className="custom-checkbox serviziNonSelezionati"
                  />
                  <label htmlFor={"servizio_non_sel_" + index}>
                    {optionStr(servizio)}
                  </label>
                </div>                
              ))}
            </div>
            <div>
              {serviziSelezionati.map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_sel_" + index} 
                    name={"servizio_sel_" + index} 
                    value={servizio.id} 
                    checked={true}
                    onChange={(e) => handleCheckboxChange(e, servizio)}
                    className="custom-checkbox serviziSelezionati"
                  />
                  <label htmlFor={"servizio_sel_" + index}>
                    {optionStr(servizio)}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
  
  const getAllClienti = async () => {
    try {
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
        alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
    }
  };

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
    getAllClienti();
  }, []);

  useEffect(() => {
    getAllServizi();
  }, []);

  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: getCampiNuovoLavoro(nuovoLavoro, OptionsClienti({clienti}), OptionsServizi({servizi}), (e) => handleInputChange(e, setNuovoLavoro), null, null), 
            indiciNuovoItem: indiciNuovoLavoro, 
            handleInsert: (e) => handleInsert(e), 
            tipoItem: "lavoro", 
            items: lavoriSession.nuoviLavori, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiLavoroEsistente, 
            indiciItemEsistente: indiciLavoroEsistente, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  );
}

export default NuovoLavoro;









