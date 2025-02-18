// import React, { useState, useEffect, useRef } from 'react';
// import Header from '../component/Header';
// import Row from 'react-bootstrap/esm/Row';
// import Col from 'react-bootstrap/esm/Col';
// import { elimina } from '../../vario/OperazioniEliminazione';
// import { useSelector } from 'react-redux';
// import { FormRicercaLavori } from '../component/form_item/FormsLavori';
// import { RowRicercaLavori, RowLavoroEsistente} from '../component/row_item/RowsLavori';
// import { CardRicercaLavori, CardLavoroEsistente } from '../component/card_item/CardsLavori';
// import { eseguiRicerca } from '../../vario/OperazioniRicerca';
// import lavoroStore from '../../store/lavoro_store/LavoroStore';
// import LavoroAction from '../../action/lavoro_action/LavoroAction';
// import { operazioniLavori } from '../../vario/Operazioni';
// import { azzeraSelezione } from '../../vario/OperazioniModifica';
// import PersonaAction from '../../action/persona_action/PersonaAction';
// import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
// import personaStore from '../../store/persona_store/PersonaStore';
// import professionistaStore from '../../store/professionista_store/ProfessionistaStore';
// import { operazioniPersone, operazioniProfessionisti } from '../../vario/Operazioni';
// import { handleInputChangeLavoroEsistente } from '../../vario/Vario';
// import { formatoDate } from '../../vario/Tempo';
// import { dizionarioOrari } from '../../vario/Tempo';

// const Lavori = () => {
//   const formSession = useSelector((state) => state.formSession.value);
//   const itemSession = useSelector((state) => state.itemSession.value);

//   const [lavori, setLavori] = useState(-1);
//   const [clienti, setClienti] = useState([]);
//   const [professionisti, setProfessionisti] = useState([]);
//   const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
//   const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
//   const [selectedTrashCount, setSelectedTrashCount] = useState(0);
//   const [selectedPencilCount, setSelectedPencilCount] = useState(0);

//   const [idsLavori, setIdsLavori] = useState(-1);

//   const [datiRicerca, setDatiRicerca] = useState({
//     "nome_cliente": "", 
//     "cognome_cliente": "", 
//     "nome_professionista": "",
//     "professione": "", 
//     "primo_giorno": "",
//     "ultimo_giorno": "",
//     "descrizione": "", 
//     "note": ""
//   });
//   const [giornoType, setGiornoType] = useState('text');

//   const [errori, setErrori] = useState ({
//     erroreCliente: "",
//     erroreProfessionista: "",
//     erroreClienteEProfessionista: "",
//     erroreDescrizione: "",
//     erroreGiorno: "",
//     erroreOrarioInizio: "",
//     erroreOrarioFine: "",
//     erroreOrari: "",
//     erroreNote: ""
//   })

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

//   const RicercaLavoriTag = (formSession.view === "form") ? FormRicercaLavori : (
//     (formSession.view === "card") ? CardRicercaLavori : RowRicercaLavori
//   )

//   const modificaLavori = async(itemsDaModificare) => {
//     await LavoroAction.dispatchAction(itemsDaModificare, operazioniLavori.MODIFICA_LAVORI);
//   };

//   const modifica = async (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setItems) => {
//     e.preventDefault();
    
//     let dati = null;
//     let itemsDaModificare = [];
//     let itemsRestanti = [];
    
//     try {
//       dati = { ids: selectedIdsModifica };

//       for (let item of items) {
//         if (dati.ids.some(idArray =>
//           idArray[0] === item.id_lavoro &&
//           idArray[1] === item.id_cliente &&
//           idArray[2] === item.id_professionista
//         )) {
//           itemsDaModificare.push(item);
//         } else {
//           itemsRestanti.push(item);
//         }
//       }      
//       modificaLavori(itemsDaModificare);
//       setIdsLavori(-1);
//       setAggiornamentoCompletato(false);
//     }
//     catch (error) {
//       alert("Errore durante la modifica, riprova più tardi.");
//     }
//   }

//   const handleModifica = async(e) => {
//     e.preventDefault();

//     if (confirm("Sei sicuro di voler modificare i lavori?")) {
//       try {
//         const dati = { ids: selectedIdsModifica };
//         let itemsDaModificare = [], itemsRestanti = [];

//         for (let lavoro of lavori) {
//           if (dati.ids.some(idArray =>
//             idArray[0] === lavoro.id_lavoro &&
//             idArray[1] === lavoro.id_cliente &&
//             idArray[2] === lavoro.id_professionista
//           )) {
//             itemsDaModificare.push(lavoro);
//           } else {
//             itemsRestanti.push(lavoro);
//           }
//         }    

//         const response = await fetch('/MODIFICA_LAVORI', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(itemsDaModificare),
//         });

//         if (!response.ok) {
//           if (response.status === 409) {
//             alert(errorData.message); 
//           }
//           else {
//             throw new Error('Errore durante la modifica dei lavori.');
//           }
//         }
//         else {
//           const result = await response.json();
//           console.log(result);
//           setIdsLavori(result.ids_lavori);
//           console.log("Result: ", result.ids_lavori);
//         }        
//       }
//       catch (error) {
//         console.error('Errore:', error);
//         alert("C'è stato un errore durante l'inserimento del cliente. Riprova più tardi.");
//       }
//     }
//     else {
//       alert("Modifiche annullate.");
//     }
//   }

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

//   useEffect(() => {
//     const getProfessionistiFiltrati = async () => {
//       await ProfessionistaAction.dispatchAction(null, operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI);
//       const professionistiFiltrati = professionistaStore.getProfessionisti();
//       setProfessionisti(professionistiFiltrati);
//     };
  
//     getProfessionistiFiltrati();
  
//     const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    
//     professionistaStore.addChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
  
//     return () => professionistaStore.removeChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
//   }, []);

//   useEffect(() => {
//     if (idsLavori !== -1) {
//       console.log("IdsLavori aggiornato: ", idsLavori);
//       setIdsLavori(-1);
//       azzeraSelezione(lavori, setLavori, "lavoro", idsLavori);
//       setSelectedIdsModifica([]);
//       alert("La modifica dei lavori è andata a buon fine.");
//     }
//   }, [idsLavori]);
  
//   useEffect(() => {
//     setLavori(lavoroStore.getLavori()); // Aggiungi questa riga
//     const onChange = () => setLavori(lavoroStore.getLavori());
//     lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
//     return () => {
//       lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
//     };
//   }, []);
  
//   const [lavoriGiorniPresenti, setLavoriGiorniPresenti] = useState ({});

//   const ottieniLavoriGiorno = async (item, lavoriGiorniPresenti, setLavoriGiorniPresenti) => {
//     const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     });

//     if(response.status === 200) {
//       const risultato = await response.json();
//       // console.log(risultato.lavoriGiornoSelezionato);
//       setLavoriGiorniPresenti(prevState => ({
//         ...prevState,
//         [formatoDate(item["giorno"].toString(), "AAAA-MM-GG")]: risultato.lavoriGiornoSelezionato
//       }));
//       // aggiornaOrari(lavoriGiorniPresenti, setLavoriGiorniPresenti);
//       // setLavoriGiorniPresenti(prevState => ({
//       //   ...prevState,
//       //   [formatoDate(item["giorno"].toString(), "GG-MM-AAAA")]: [
//       //     setLavoriGiorniPresenti[formatoDate(item["giorno"].toString(), "GG-MM-AAAA")], dizionarioOrari]
//       // }));
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

//   useEffect(() => {
//     const updateLavoriGiorniPresenti = () => {
//       const newLavoriGiorniPresenti = {};
//       for (let i = 0; i < lavori.length; i++) {
//         const lavoro = lavori[i];
//         console.log(lavoro.id_lavoro + " - " + lavoro.id_cliente);
//         ottieniLavoriGiorno(lavoro, lavoriGiorniPresenti, setLavoriGiorniPresenti);
//       }
//       setLavoriGiorniPresenti(newLavoriGiorniPresenti);
//       console.log(lavoriGiorniPresenti);
//     };
//     updateLavoriGiorniPresenti();
//   }, [lavori]);

//   return (
//     <>
//       <Header />
      
//       <div className="main-content"></div>
      
//       <RicercaLavoriTag 
//         item={datiRicerca} 
//         setItem={setDatiRicerca} 
//         eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} 
//       />

//       <br /> <br /> <br /> <br />
      
//       {(lavori.length === 0) && (
//         <div className='contenitore-1'>Nessun lavoro trovato.</div>
//       )}
      
//       {(lavori.length > 0) && (
//         <>
//           {(itemSession.view === "card") && (
//             <div className="contenitore-3">
//               {lavori.map((lavoro, index) => (
//                 <CardLavoroEsistente 
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
//                 // onClick={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)}
//                 onClick={(e) => handleModifica(e)}
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

// export default Lavori;







import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../component/Header';
import { RowLavoroEsistente} from '../component/row_item/RowsLavori';
import { CardLavoroEsistente } from '../component/card_item/CardsLavori';
import { FormRicercaItems } from '../component/form_item/FormItem';
import { CardRicercaItems } from '../component/card_item/CardItem';
import { RowRicercaItems } from '../component/row_item/RowItem';
import PersonaAction from '../../action/persona_action/PersonaAction';
import personaStore from '../../store/persona_store/PersonaStore';
import lavoroStore from '../../store/lavoro_store/LavoroStore';
import { operazioniPersone, operazioniLavori } from '../../vario/Operazioni';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import { formatoDate } from '../../vario/Tempo';
import { ItemsLavori } from '../component/Items';

const Lavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [clienti, setClienti] = useState([]);
  const [lavori, setLavori] = useState(-1);

  const [datiRicerca, setDatiRicerca] = useState({
    "nome_cliente": "", 
    "cognome_cliente": "", 
    "primo_giorno": "",
    "ultimo_giorno": "",
    "descrizione": "", 
    "note": ""
  });

  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');
  const [lavoriGiorniPresenti, setLavoriGiorniPresenti] = useState ({});

  datiRicerca.primo_giorno = (datiRicerca.primo_giorno !== undefined) ? datiRicerca.primo_giorno : '';
  datiRicerca.ultimo_giorno = (datiRicerca.ultimo_giorno !== undefined) ? datiRicerca.ultimo_giorno : '';  

  const campiRicerca = {
    header: "Ricerca lavori", 
    label: [
      "Nome cliente", "Cognome cliente", "Primo giorno", "Ultimo giorno", "Descrizione", "Note"
    ],
    type: [null, null, primoGiornoType, ultimoGiornoType, null, null], 
    name: [
      "nome_cliente", "cognome_cliente", "primo_giorno", "ultimo_giorno", "descrizione", "note"
    ], 
    value: [
      datiRicerca.nome_cliente, datiRicerca.cognome_cliente, datiRicerca.primo_giorno, 
      datiRicerca.ultimo_giorno, datiRicerca.descrizione, datiRicerca.note
    ], 
    placeholder: [
      "Nome cliente", "Cognome cliente", "Primo giorno", "Ultimo giorno", "Descrizione", "Note"
    ], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indiciCampiRicerca = [0, 1, 2, 3, 4, 5];

  const RicercaLavoriTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  const getClientiFiltrati = async () => {
    await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
    const clientiFiltrati = personaStore.getClienti();
    setClienti(clientiFiltrati);
  };
  
  const ottieniLavoriGiorno = async (item) => {
    const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if(response.status === 200) {
      const risultato = await response.json();
      setLavoriGiorniPresenti(prevState => ({
        ...prevState,
        [formatoDate(item["giorno"].toString(), "AAAA-MM-GG")]: risultato.lavoriGiornoSelezionato
      }));

      console.log(lavoriGiorniPresenti);
    }
    else {
      const errorData = await response.json();
      if (response.status === 409 || response.status === 500) {
        alert(errorData.message);
      }
      else {
        response.status = 500;
        alert('Errore durante l\'ottenimento dei lavori.');
      }
    }
  }

  const updateLavoriGiorniPresenti = () => {
    const newLavoriGiorniPresenti = {};
    for (let i = 0; i < lavori.length; i++) {
      const lavoro = lavori[i];
      console.log(lavoro.id_lavoro + " - " + lavoro.id_cliente);
      ottieniLavoriGiorno(lavoro, lavoriGiorniPresenti, setLavoriGiorniPresenti);
    }
    setLavoriGiorniPresenti(newLavoriGiorniPresenti);
    console.log(lavoriGiorniPresenti);
  };

  const selectOperation = (icon, item) => {
    if (icon === "trash") {
      if (selectedIdsEliminazione.some(el => el[0] === item.id_lavoro && el[1] === item.id_cliente && el[2] === item.id_professionista)) {
        item.tipo_selezione = 0;
        setSelectedIdsEliminazione(prevIds => prevIds.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      } else {
        item.tipo_selezione = 2;
        setSelectedIdsEliminazione(prevIds => [...prevIds, [item.id_lavoro, item.id_cliente, item.id_professionista]]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    } 
    else if (icon === "pencil") {
      if (selectedIdsModifica.some(el => el[0] === item.id_lavoro && el[1] === item.id_cliente && el[2] === item.id_professionista)) {
        item.tipo_selezione = 0;
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      } else {
        item.tipo_selezione = 1;
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, [item.id_lavoro, item.id_cliente, item.id_professionista]]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(el => el[0] !== item.id_lavoro || el[1] !== item.id_cliente || el[2] !== item.id_professionista));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  useEffect(() => {
    getClientiFiltrati();
    const onChange = () => setClienti(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
    
    return () => personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
  }, []);

  useEffect(() => {
    setLavori(lavoroStore.getLavori()); // Aggiungi questa riga
    const onChange = () => setLavori(lavoroStore.getLavori());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    };
  }, []);

  useEffect(() => {
    updateLavoriGiorniPresenti();
  }, [lavori]);
  console.log("----------------------------------------------------------------------------------------------------");
  console.log(lavoriGiorniPresenti);
  console.log("----------------------------------------------------------------------------------------------------");

  return (
    <>
      <Header />

      <div className="main-content"></div>
      
      <RicercaLavoriTag 
        campi={campiRicerca}
        indici={indiciCampiRicerca}
        eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)}
      />

      <br /> <br /> <br /> <br />

      <ItemsLavori 
        tipoItem="lavoro" 
        items={lavori} 
        setItems={setLavori} 
        selectOperation={selectOperation} 
        emptyIsConsidered={true}
        lavoriGiorniPresenti={lavoriGiorniPresenti} 
      />
    </>
  )
}

export default Lavori;








