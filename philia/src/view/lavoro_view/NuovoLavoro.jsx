import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { modifica } from "../../vario/OperazioniModifica";
import { elimina } from "../../vario/OperazioniEliminazione";
import PersonaAction from "../../action/persona_action/PersonaAction";
import ServizioAction from "../../action/servizio_action/ServizioAction";
import personaStore from "../../store/persona_store/PersonaStore";
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniPersone, operazioniServizi } from "../../vario/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { FormNuovoItem } from "../../trasportabile/form_item/FormItem";
import { CardNuovoItem } from "../../trasportabile/card_item/CardItem";
import { RowNuovoItem } from "../../trasportabile/row_item/RowItem";
import { 
  getCampiNuovoLavoro, getCampiLavoroEsistente, 
  indiciNuovoLavoro, indiciLavoroEsistente  
} from "./LavoriVario";
import ProvaOptions from "./ProvaOptions";
import { getSelectTag } from "../../trasportabile/form_item/FormItem";
import { Items } from "../component/Items";
import { controlloLavoro } from "../../vario/Controlli";

const NuovoLavoro = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [clienti, setClienti] = useState(-1);
  const [servizi, setServizi] = useState(-1);
  const [lavori, setLavori] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [aggiornamento, setAggiornamento] = useState(0);
  const NuovoLavoroTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )
  const [nuovoLavoro, setNuovoLavoro] = useState({
    tipo_item: "lavoro", 
    tipo_selezione: 1, 
    id_cliente: "", 
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
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
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
          setLavori(prevLavori => [...prevLavori, nuovoLavoro]);
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
    const NomeTagSelect = getSelectTag(1);
    
    const optionStr = (cliente) => {
      return cliente.nome + " " + cliente.cognome +
        ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") + 
        ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "")
    }
    
    const sottoStringa = nuovoLavoro.cliente;

    return (
      <>
        {/* {(clienti !== -1) && ( */}
          <NomeTagSelect name="id_cliente" value={nuovoLavoro.id_cliente} onChange={(e) => handleInputChange(e, setNuovoLavoro)}>
            <option key={-1} value="">Seleziona il cliente.</option>
            {Object.values(clienti).filter(cliente => 
              optionStr(cliente).toLowerCase().includes(sottoStringa.toLowerCase())
            ).map((cliente, index) => (
              <option key={index} value={cliente.id}>
                {optionStr(cliente)}
              </option>
            ))}
          </NomeTagSelect>
        {/* )} */}
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
              Servizi non selezionati:<br />
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
                    className="custom-checkbox"
                  />
                  <label htmlFor={"servizio_non_sel_" + index}>
                    {optionStr(servizio)}
                  </label>
                </div>                
              ))}
            </div>
            <div>
              Servizi selezionati (seleziona almeno un servizio):<br />
              {serviziSelezionati.map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_sel_" + index} 
                    name={"servizio_sel_" + index} 
                    value={servizio.id} 
                    checked={true}
                    onChange={(e) => handleCheckboxChange(e, servizio)}
                    className="custom-checkbox"
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
      <Header />

      <div className="main-content" />

      <NuovoLavoroTag 
        campi={getCampiNuovoLavoro(nuovoLavoro, OptionsClienti({clienti}), OptionsServizi({servizi}), (e) => handleInputChange(e, setNuovoLavoro), null, null)} 
        indici={indiciNuovoLavoro} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
      />
      
      <br /> <br /> <br /> <br />
      <Items 
        tipoItem={"lavoro"} 
        items={lavori} 
        setItems={setLavori}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiLavoroEsistente}
        indici={indiciLavoroEsistente} 
        servizi={servizi}
      />
      
      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)} 
        elimina={(e) => elimina(e, "lavoro", selectedIdsEliminazione, setSelectedIdsEliminazione, lavori, setLavori)}
      />
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default NuovoLavoro;









