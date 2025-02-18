import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import PersonaAction from "../../action/persona_action/PersonaAction";
import personaStore from "../../store/persona_store/PersonaStore";
import ProfessionistaAction from "../../action/professionista_action/ProfessionistaAction";
import professionistaStore from "../../store/professionista_store/ProfessionistaStore";
import { operazioniPersone, operazioniProfessionisti } from "../../vario/Operazioni";
import { controlloLavoro } from "../../vario/Controlli";
import { FormNuovoLavoro } from "../component/form_item/FormsLavori";
import { RowNuovoLavoro, RowLavoroEsistente } from "../component/row_item/RowsLavori";
import { CardNuovoLavoro, CardLavoroEsistente } from "../component/card_item/CardsLavori";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { modifica } from "../../vario/OperazioniModifica";
import { elimina } from "../../vario/OperazioniEliminazione";
import { dizionarioOrari } from "../../vario/Tempo";
import { handleInputChangeLavoroEsistente } from "../../vario/Vario";

const NuovoLavoro = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [clienti, setClienti] = useState([]);
  const [professionisti, setProfessionisti] = useState([]);
  const [lavori, setLavori] = useState([]);
  const [lavoriGiornoSelezionato, setLavoriGiornoSelezionato] = useState(0);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [nuovoLavoro, setNuovoLavoro] = useState ({
    nome_cliente: "", 
    cognome_cliente: "", 
    nome_professionista: "", 
    professione: "", 
    tipo_selezione: 0, 
    id_lavoro: 0, 
    id_cliente: 0, 
    id_professionista: 0,
    giorno: "",
    orario_inizio: "",
    orario_fine: "",
    descrizione: "",
    note: "", 
    errore_cliente_e_professionista: "", 
    errore_descrizione: "", 
    errore_giorno: "", 
    errore_orario_inizio: "", 
    errore_orario_fine: "", 
    errore_note: ""
  });
  const [aggiornato, setAggiornato] = useState(false);
  const [orari, setOrari] = useState(dizionarioOrari);
  const [lavoriGiorniPresenti, setLavoriGiorniPresenti] = useState ({});
  
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
    } else if (icon === "pencil") {
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

  const handleInsertLavoro = async (e) => {
    e.preventDefault();

    if (controlloLavoro(nuovoLavoro, setNuovoLavoro) > 0) {
      return;
    }
    
    const response = await fetch('/INSERISCI_LAVORO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuovoLavoro),
    });

    if(response.ok) {
      const result = await response.json();
      nuovoLavoro.id_lavoro = result.id_lavoro;
      if(parseInt(nuovoLavoro.id_cliente) !== 0) {
        const cliente = clienti.filter(c => c.id === parseInt(nuovoLavoro.id_cliente))[0];
        nuovoLavoro.nome_cliente = cliente.nome;
        nuovoLavoro.cognome_cliente = cliente.cognome;
      }
      else if(parseInt(nuovoLavoro.id_professionista) !== 0) {
        const professionista = professionisti.filter(p => p.id === parseInt(nuovoLavoro.id_professionista))[0];
        nuovoLavoro.nome_professionista = professionista.nome;
        nuovoLavoro.professione = professionista.professione;
      }
      nuovoLavoro.note = (nuovoLavoro.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoLavoro.note;
      setLavori(prevLavori => [...prevLavori, nuovoLavoro]);
      setNuovoLavoro(prevState => ({
        ...prevState,
        nome_cliente: "", 
        cognome_cliente: "", 
        nome_professionista: "", 
        professione: "", 
        tipo_selezione: 0, 
        id_lavoro: 0, 
        id_cliente: 0, 
        id_professionista: 0,
        giorno: "",
        orario_inizio: "",
        orario_fine: "",
        descrizione: "",
        note: "", 
        errore_descrizione: "", 
        errore_giorno: "", 
        errore_orario_inizio: "", 
        errore_orario_fine: "", 
        errore_note: ""
      }));

      alert("L\'inserimento del nuovo lavoro è andato a buon fine.");
    }
    else {
      const errorData = await response.json();
      if (response.status === 409 || response.status === 500) {
        alert(errorData.message);
      }
      else {
        response.status = 500;
        alert('Errore durante l\'inserimento del lavoro');
      }
    }
  };
  
  useEffect(() => {
    const getClientiFiltrati = async () => {
      await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
      const clientiFiltrati = personaStore.getClienti();
      // console.log(clientiFiltrati); // Visualizza i dati ottenuti
      setClienti(clientiFiltrati);
    };
  
    getClientiFiltrati();
    
    const onChange = () => setClienti(personaStore.getClienti());

    personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
      
    return () => personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
  }, []);

  useEffect(() => {
    const getProfessionistiFiltrati = async () => {
      await ProfessionistaAction.dispatchAction(null, operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI);
      const professionistiFiltrati = professionistaStore.getProfessionisti();
      setProfessionisti(professionistiFiltrati);
    };
  
    getProfessionistiFiltrati();
  
    const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    
    professionistaStore.addChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
  
    return () => professionistaStore.removeChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
  }, []);

  const handleInputChangeGiorno = (e, setItem) => {
    e.preventDefault();

    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }

  const ottieniLavoriGiorno = async (setGiornoType, item) => {
    const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    // console.log((response).status);
    if(response.status === 200) {
      const risultato = await response.json();
      // console.log(risultato.lavoriGiornoSelezionato);
      setLavoriGiornoSelezionato(risultato.lavoriGiornoSelezionato);
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

  // const aggiornaOrari = (lavoriGiornoSelezionato, orari, setOrari) => {
  //   // console.log("Funzione aggiornaOrari!!");
  //   if(lavoriGiornoSelezionato !== -1 && lavoriGiornoSelezionato !== 0) {
  //     let listaOrari = Object.entries(orari);
  //     for(let lavoroGiorno of lavoriGiornoSelezionato) {
  //       console.log(lavoroGiorno.tipo_lavoro + ": " + lavoroGiorno.orario_inizio + " - " + lavoroGiorno.orario_fine);
  //       let indicePrimoGiornoConsiderato = orari[lavoroGiorno.orario_inizio][0];
  //       for (let i = indicePrimoGiornoConsiderato; i <= indiceUltimoGiornoConsiderato; i++) {
  //         if (lavoroGiorno.tipo_lavoro === "lavoro_cliente") {
  //           listaOrari[i][1][1] += 1;
  //         } else if (lavoroGiorno.tipo_lavoro === "lavoro_professionista") {
  //           listaOrari[i][1][2] += 1;
  //         }
  //       }
  //       setOrari(Object.fromEntries(listaOrari));
  //     }
  //     if(lavoriGiornoSelezionato.length === 0) {
  //       console.log("Nessun lavoro trovato per il giorno selezionato!!");
  //     }
  //   }
  // };

  const handleGiornoBlur = (setGiornoType, item, orari, setOrari) => {
    return () => {
      if(!item.giorno)
        setGiornoType('text');
      else {
        setGiornoType('date');
        setLavoriGiornoSelezionato(-1);
        ottieniLavoriGiorno(setGiornoType, item);
        setAggiornato(!aggiornato);
      }
    };
  };

  useEffect(() => {
    if (lavoriGiornoSelezionato === 0) {
      return;
    }
    if(lavoriGiornoSelezionato === -1) {
      console.log("Aggiornamento in corso...")
      setAggiornato(!aggiornato);
    }
  }, [aggiornato]);

  useEffect(() => {
    if (lavoriGiornoSelezionato === 0) {
      return;
    }
    if(lavoriGiornoSelezionato !== -1) {
      console.log("Agggiornamento effettuato.");
      setOrari(dizionarioOrari);
      console.log(orari);
      aggiornaOrari(lavoriGiornoSelezionato, orari, setOrari);
    }
  }, [aggiornato]);

  const NuovoLavoroTag = (formSession.view === "form") ? FormNuovoLavoro : (
    (formSession.view === "card") ? CardNuovoLavoro : RowNuovoLavoro
  )

  return (
    <>
      <Header />

      <div className="main-content" />

      <NuovoLavoroTag 
        lavoriGiornoSelezionato={lavoriGiornoSelezionato} 
        setLavoriGiornoSelezionato={setLavoriGiornoSelezionato}
        handleInputChangeGiorno={(e) => handleInputChangeGiorno(e, setNuovoLavoro)} 
        handleGiornoBlur={handleGiornoBlur}
        clienti={clienti} 
        professionisti={professionisti} 
        item={nuovoLavoro} 
        setItem={setNuovoLavoro} 
        eseguiSalvataggio={(e) => handleInsertLavoro(e)} 
        orari={orari} 
        setOrari={setOrari} 
      />      

      <br /> <br /> <br /> <br />
      
      {(lavori.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {lavori.map((lavoro, index) => (
                <CardLavoroEsistente 
                  key={index}
                  handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
                  clienti={clienti}
                  professionisti={professionisti}
                  item={lavoro} 
                  items={lavori} 
                  setItems={setLavori} 
                  selectOperation={selectOperation} 
                  lavoriGiorniPresenti={lavoriGiorniPresenti}
                />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {lavori.map((lavoro, index) => (
                <RowLavoroEsistente 
                  key={index}
                  handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
                  clienti={clienti}
                  professionisti={professionisti}
                  item={lavoro} 
                  items={lavori} 
                  setItems={setLavori} 
                  selectOperation={selectOperation} 
                  lavoriGiorniPresenti={lavoriGiorniPresenti}
                />
              ))}
            </>
          )} 
        </>
      )}

      <br /> <br /> <br /> <br />
      
      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              <button className="bottone-blu-non-selezionato"
                onClick={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)}
              >
                Modifica
              </button>
            </Col>
          )}
          {selectedIdsEliminazione.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato'
                onClick={(e) => elimina(e, "lavoro", selectedIdsEliminazione, setSelectedIdsEliminazione, lavori, setLavori)}
              >
                Elimina
              </button>
            </Col>
          )}
        </Row>
      </div>
            
      <br /> <br /> <br /> <br />
    </>
  );
}

export default NuovoLavoro;









