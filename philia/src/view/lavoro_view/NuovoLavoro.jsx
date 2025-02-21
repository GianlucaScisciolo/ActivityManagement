// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Header from "../component/Header";
// import PersonaAction from "../../action/persona_action/PersonaAction";
// import personaStore from "../../store/persona_store/PersonaStore";
// import ProfessionistaAction from "../../action/professionista_action/ProfessionistaAction";
// import professionistaStore from "../../store/professionista_store/ProfessionistaStore";
// import { operazioniPersone, operazioniProfessionisti } from "../../vario/Operazioni";
// import { controlloLavoro } from "../../vario/Controlli";
// import { FormNuovoLavoro } from "../component/form_item/FormsLavori";
// import { RowNuovoLavoro, RowLavoroEsistente } from "../component/row_item/RowsLavori";
// import { CardNuovoLavoro, CardLavoroEsistente } from "../component/card_item/CardsLavori";
// import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";
// import { modifica } from "../../vario/OperazioniModifica";
// import { elimina } from "../../vario/OperazioniEliminazione";
// import { dizionarioOrari } from "../../vario/Tempo";
// import { handleInputChangeLavoroEsistente } from "../../vario/Vario";

// const NuovoLavoro = () => {
//   const formSession = useSelector((state) => state.formSession.value);
//   const itemSession = useSelector((state) => state.itemSession.value);

//   const [clienti, setClienti] = useState([]);
//   const [lavori, setLavori] = useState([]);
//   const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
//   const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
//   const [nuovoLavoro, setNuovoLavoro] = useState ({
//     nome_cliente: "", 
//     cognome_cliente: "", 
//     tipo_selezione: 0, 
//     id_lavoro: 0, 
//     id_cliente: 0, 
//     giorno: "",
//     orario_inizio: "",
//     descrizione: "",
//     note: "", 
//     errore_cliente: "", 
//     errore_descrizione: "", 
//     errore_giorno: "", 
//     errore_orario_inizio: "", 
//     errore_note: ""
//   });
//   const [aggiornato, setAggiornato] = useState(false);
//   const [orari, setOrari] = useState(dizionarioOrari);
//   const [lavoriGiornoSelezionato, setLavoriGiornoSelezionato] = useState(0);
//   const [lavoriGiorniPresenti, setLavoriGiorniPresenti] = useState ({});
  
//   const selectOperation = (icon, item) => {
//     if (icon === "trash") {
//       if (selectedIdsEliminazione.some(el => el[0] === item.id_lavoro && el[1] === item.id_cliente && el[2] === item.id_professionista)) {
//         item.tipo_selezione = 0;
//         setSelectedIdsEliminazione(prevIds => prevIds.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
//         setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
//       } else {
//         item.tipo_selezione = 2;
//         setSelectedIdsEliminazione(prevIds => [...prevIds, [item.id_lavoro, item.id_cliente, item.id_professionista]]);
//         setSelectedTrashCount(prevCount => prevCount + 1);
//         setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
//         setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
//       }
//     } else if (icon === "pencil") {
//       if (selectedIdsModifica.some(el => el[0] === item.id_lavoro && el[1] === item.id_cliente && el[2] === item.id_professionista)) {
//         item.tipo_selezione = 0;
//         setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
//         setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
//       } else {
//         item.tipo_selezione = 1;
//         setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, [item.id_lavoro, item.id_cliente, item.id_professionista]]);
//         setSelectedPencilCount(prevCount => prevCount + 1);
//         setSelectedIdsEliminazione(prevIds => prevIds.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
//         setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
//       }
//     }
//   }

//   const handleInsertLavoro = async (e) => {
//     e.preventDefault();

//     if (controlloLavoro(nuovoLavoro, setNuovoLavoro) > 0) {
//       return;
//     }
    
//     const response = await fetch('/INSERISCI_LAVORO', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(nuovoLavoro),
//     });

//     if(response.ok) {
//       const result = await response.json();
//       nuovoLavoro.id_lavoro = result.id_lavoro;
//       if(parseInt(nuovoLavoro.id_cliente) !== 0) {
//         const cliente = clienti.filter(c => c.id === parseInt(nuovoLavoro.id_cliente))[0];
//         nuovoLavoro.nome_cliente = cliente.nome;
//         nuovoLavoro.cognome_cliente = cliente.cognome;
//       }
//       nuovoLavoro.note = (nuovoLavoro.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoLavoro.note;
//       setLavori(prevLavori => [...prevLavori, nuovoLavoro]);
//       setNuovoLavoro(prevState => ({
//         ...prevState,
//         nome_cliente: "", 
//         cognome_cliente: "", 
//         tipo_selezione: 0, 
//         id_lavoro: 0, 
//         id_cliente: 0, 
//         giorno: "",
//         orario_inizio: "",
//         descrizione: "",
//         note: "", 
//         errore_cliente: "",
//         errore_descrizione: "", 
//         errore_giorno: "", 
//         errore_orario_inizio: "", 
//         errore_note: ""
//       }));

//       alert("L\'inserimento del nuovo lavoro è andato a buon fine.");
//     }
//     else {
//       const errorData = await response.json();
//       if (response.status === 409 || response.status === 500) {
//         alert(errorData.message);
//       }
//       else {
//         response.status = 500;
//         alert('Errore durante l\'inserimento del lavoro');
//       }
//     }
//   };
  
//   useEffect(() => {
//     const getClientiFiltrati = async () => {
//       await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
//       const clientiFiltrati = personaStore.getClienti();
//       setClienti(clientiFiltrati);
//     };
  
//     getClientiFiltrati();
    
//     const onChange = () => setClienti(personaStore.getClienti());

//     personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
      
//     return () => personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
//   }, []);

//   const handleInputChangeGiorno = (e, setItem) => {
//     e.preventDefault();

//     const { name, value } = e.target;
//     setItem(prevState => ({
//       ...prevState, 
//       [name]: value
//     }));
//   }

//   const ottieniLavoriGiorno = async (setGiornoType, item) => {
//     const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     });

//     if(response.status === 200) {
//       const risultato = await response.json();
//       setLavoriGiornoSelezionato(risultato.lavoriGiornoSelezionato);
//     }
//     else {
//       const errorData = await response.json();
//       if (response.status === 409 || response.status === 500) {
//         alert(errorData.message);
//       }
//       else {
//         response.status = 500;
//         alert('Errore durante l\'ottenimento dei lavori.');
//       }
//     }
//   }

//   const aggiornaOrari = (lavoriGiornoSelezionato, orari, setOrari) => {
//     if(lavoriGiornoSelezionato !== -1 && lavoriGiornoSelezionato !== 0) {
//       let listaOrari = Object.entries(orari);
//       for(let lavoroGiorno of lavoriGiornoSelezionato) {
//         let indicePrimoGiornoConsiderato = orari[lavoroGiorno.orario_inizio][0];
//         console.log("|||| " + listaOrari[indicePrimoGiornoConsiderato]);
//         console.log("|||| " + listaOrari[indicePrimoGiornoConsiderato][0]);
//         console.log("|||| " + listaOrari[indicePrimoGiornoConsiderato][1]);
//         listaOrari[indicePrimoGiornoConsiderato][1] += 1;
//         console.log("|||| " + listaOrari[indicePrimoGiornoConsiderato][1]);
//         setOrari(Object.fromEntries(listaOrari));
//       }
//       if(lavoriGiornoSelezionato.length === 0) {
//         console.log("Nessun lavoro trovato per il giorno selezionato!!");
//       }
//     }
//   };

//   const handleGiornoBlur = (setGiornoType, item, orari, setOrari) => {
//     return () => {
//       if(!item.giorno)
//         setGiornoType('text');
//       else {
//         setGiornoType('date');
//         setLavoriGiornoSelezionato(-1);
//         ottieniLavoriGiorno(setGiornoType, item);
//         setAggiornato(!aggiornato);
//       }
//     };
//   };

//   useEffect(() => {
//     if (lavoriGiornoSelezionato === 0) {
//       return;
//     }
//     if(lavoriGiornoSelezionato === -1) {
//       console.log("Aggiornamento in corso...")
//       setAggiornato(!aggiornato);
//     }
//   }, [aggiornato]);

//   useEffect(() => {
//     if (lavoriGiornoSelezionato === 0) {
//       return;
//     }
//     if(lavoriGiornoSelezionato !== -1) {
//       console.log("Agggiornamento effettuato.");
//       setOrari(dizionarioOrari);
//       console.log(orari);
//       aggiornaOrari(lavoriGiornoSelezionato, orari, setOrari);
//     }
//   }, [aggiornato]);

//   const NuovoLavoroTag = (formSession.view === "form") ? FormNuovoLavoro : (
//     (formSession.view === "card") ? CardNuovoLavoro : RowNuovoLavoro
//   )
  
//   return (
//     <>
//       <Header />

//       <div className="main-content" />

//       <NuovoLavoroTag 
//         lavoriGiornoSelezionato={lavoriGiornoSelezionato} 
//         setLavoriGiornoSelezionato={setLavoriGiornoSelezionato}
//         handleInputChangeGiorno={(e) => handleInputChangeGiorno(e, setNuovoLavoro)} 
//         handleGiornoBlur={handleGiornoBlur}
//         clienti={clienti} 
//         item={nuovoLavoro} 
//         setItem={setNuovoLavoro} 
//         eseguiSalvataggio={(e) => handleInsertLavoro(e)} 
//         orari={orari} 
//         setOrari={setOrari} 
//       />      

//       <br /> <br /> <br /> <br />
      
//       {(lavori.length > 0) && (
//         <>
//           {(itemSession.view === "card") && (
//             <div className="contenitore-3">
//               {lavori.map((lavoro, index) => (
//                 <CardLavoroEsistente 
//                   key={index}
//                   handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
//                   clienti={clienti}
//                   item={lavoro} 
//                   items={lavori} 
//                   setItems={setLavori} 
//                   selectOperation={selectOperation} 
//                   lavoriGiorniPresenti={lavoriGiorniPresenti}
//                 />
//               ))}
//             </div>
//           )}
//           {(itemSession.view === "list") && (
//             <>
//               {lavori.map((lavoro, index) => (
//                 <RowLavoroEsistente 
//                   key={index}
//                   handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
//                   clienti={clienti}
//                   professionisti={professionisti}
//                   item={lavoro} 
//                   items={lavori} 
//                   setItems={setLavori} 
//                   selectOperation={selectOperation} 
//                   lavoriGiorniPresenti={lavoriGiorniPresenti}
//                 />
//               ))}
//             </>
//           )} 
//         </>
//       )}

//       <br /> <br /> <br /> <br />
      
//       <div className='contenitore-2'>
//         <Row>
//           {selectedIdsModifica.length > 0 && (
//             <Col>
//               <button className="bottone-blu-non-selezionato"
//                 onClick={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)}
//               >
//                 Modifica
//               </button>
//             </Col>
//           )}
//           {selectedIdsEliminazione.length > 0 && (
//             <Col>
//               <button className='bottone-rosso-non-selezionato'
//                 onClick={(e) => elimina(e, "lavoro", selectedIdsEliminazione, setSelectedIdsEliminazione, lavori, setLavori)}
//               >
//                 Elimina
//               </button>
//             </Col>
//           )}
//         </Row>
//       </div>
            
//       <br /> <br /> <br /> <br />
//     </>
//   );
// }

// export default NuovoLavoro;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import PersonaAction from "../../action/persona_action/PersonaAction";
import ServizioAction from "../../action/servizio_action/ServizioAction";
import personaStore from "../../store/persona_store/PersonaStore";
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniPersone, operazioniServizi } from "../../vario/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { selectOperationBody } from "../component/Operazioni";
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
  const [aggiornamento, setAggiornamento] = useState(true);
  const NuovoLavoroTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )
  const [nuovoLavoro, setNuovoLavoro] = useState({
    tipo_selezione: 1, 
    id_cliente: "", 
    cliente: "", 
    id_servizi: [], 
    servizio: "", 
    giorno: "",
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
    let descrizione = "";
    if (confirm("Sei sicuro di voler salvare il servizio?")) {
      for(let servizio of servizi) {
        if(nuovoLavoro.id_servizi.includes(servizio.id)) {
          // serviziSelezionati.push(servizio.nome + " - " + servizio.prezzo + " €.");
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
      console.log(nuovoLavoro);
      // if (controlloServizio(nuovoServizio, setNuovoServizio) > 0) 
      //   return;
      
      try {
        const response = await fetch('/INSERISCI_LAVORO', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoLavoro),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); 
          } 
          else {
            throw new Error('Errore durante l\'inserimento del lavoro. ');
          }
        } 
        else {
          const result = await response.json();
          nuovoLavoro.note = (nuovoLavoro.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoLavoro.note;
          setLavori(prevLavori => [...prevLavori, { ...nuovoLavoro, id: result.id }]);
          setNuovoLavoro({
            tipo_selezione: 1, 
            id_cliente: "", 
            cliente: "", 
            id_servizi: [], 
            servizio: "", 
            giorno: "",
            note: "", 
            errore_cliente: "", 
            errore_servizio: "", 
            errore_giorno: "", 
            errore_note: "" 
          });
          alert("L'inserimento del lavoro è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del lavoro. Riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

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
  
  const getClientiFiltrati = async () => {
    await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
    const clientiFiltrati = personaStore.getClienti();
    setClienti(clientiFiltrati);
  };

  const getServiziFiltrati = async () => {
    setServizi(-1);
    console.log(servizi);
    await ServizioAction.dispatchAction(null, operazioniServizi.OTTIENI_TUTTI_I_SERVIZI);
    const serviziFiltrati = servizioStore.getServizi();
    setServizi(serviziFiltrati);
    console.log(servizi);
  };

  useEffect(() => {
    getClientiFiltrati();
    const onChange = () => setClienti(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
    return () => personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
  }, []);

  useEffect(() => {
    getServiziFiltrati();
    const onChange = () => setServizi(servizioStore.getServizi());
    servizioStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_SERVIZI, onChange);
    servizioStore.removeChangeListener(operazioniServizi.OTTIENI_TUTTI_I_SERVIZI, onChange);
    setAggiornamento(!aggiornamento);
  }, []);

  useEffect(() => {
    // if(servizi !== 0) {
      if(servizi === -1) {
        console.log("Aggiornamento in corso...");
        // setServizi(servizioStore.getServizi());
        setAggiornamento(!aggiornamento);
      }
      else {
        console.log("Aggiornamento completato.");
      }
    // }
  }, [aggiornamento])


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
      />

      <br /> <br /> <br /> <br />
    </>
  );
}

export default NuovoLavoro;









