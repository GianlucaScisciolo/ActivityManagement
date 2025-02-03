import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { useSelector } from 'react-redux';
import { FormCercaLavori } from '../component/form_item/FormsLavori';
import { RowRicercaLavori, RowLavoroEsistente} from '../component/row_item/RowsLavori';
import { CardRicercaLavori, CardLavoroEsistente } from '../component/card_item/CardsLavori';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import lavoroStore from '../../store/lavoro_store/LavoroStore';
import LavoroAction from '../../action/lavoro_action/LavoroAction';
import { operazioniLavori } from '../../vario/Operazioni';
import { azzeraSelezione } from '../../vario/OperazioniModifica';

const Lavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [lavori, setLavori] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [idsLavori, setIdsLavori] = useState(-1);
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState("");

  const [datiRicerca, setDatiRicerca] = useState({
    "nome_cliente": "", 
    "cognome_cliente": "", 
    "nome_professionista": "",
    "professione": "", 
    "primo_giorno": "",
    "ultimo_giorno": "",
    "descrizione": "", 
    "note": ""
  });
  const [giornoType, setGiornoType] = useState('text');

  const [errori, setErrori] = useState ({
    erroreCliente: "",
    erroreProfessionista: "",
    erroreClienteEProfessionista: "",
    erroreDescrizione: "",
    erroreGiorno: "",
    erroreOrarioInizio: "",
    erroreOrarioFine: "",
    erroreOrari: "",
    erroreNote: ""
  })

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

  const modificaLavori = async(itemsDaModificare) => {
    await LavoroAction.dispatchAction(itemsDaModificare, operazioniLavori.MODIFICA_LAVORI);
  };

  const modifica = async (e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setItems) => {
    e.preventDefault();
    
    let dati = null;
    let itemsDaModificare = [];
    let itemsRestanti = [];
    
    try {
      dati = { ids: selectedIdsModifica };

      for (let item of items) {
        if (dati.ids.some(idArray =>
          idArray[0] === item.id_lavoro &&
          idArray[1] === item.id_cliente &&
          idArray[2] === item.id_professionista
        )) {
          itemsDaModificare.push(item);
        } else {
          itemsRestanti.push(item);
        }
      }      
      modificaLavori(itemsDaModificare);
      setIdsLavori(-1);
      setAggiornamentoCompletato(false);
    }
    catch (error) {
      alert("Errore durante la modifica, riprova più tardi.");
    }
  }

  const handleModifica = async(e) => {
    e.preventDefault();

    if (confirm("Sei sicuro di voler modificare i lavori?")) {
      // controlli da fare!!
      try {
        const dati = { ids: selectedIdsModifica };
        let itemsDaModificare = [], itemsRestanti = [];

        for (let lavoro of lavori) {
          if (dati.ids.some(idArray =>
            idArray[0] === lavoro.id_lavoro &&
            idArray[1] === lavoro.id_cliente &&
            idArray[2] === lavoro.id_professionista
          )) {
            itemsDaModificare.push(lavoro);
          } else {
            itemsRestanti.push(lavoro);
          }
        }    

        const response = await fetch('/MODIFICA_LAVORI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemsDaModificare),
        });

        if (!response.ok) {
          if (response.status === 409) {
            alert(errorData.message); 
          }
          else {
            throw new Error('Errore durante la modifica dei lavori.');
          }
        }
        else {
          const result = await response.json();
          console.log(result);
          setIdsLavori(result.ids_lavori);
          console.log("Result: ", result.ids_lavori);
          // console.log("Aggiornato: ", idsLavori); // Questo log potrebbe non mostrare immediatamente il valore aggiornato
          // alert("La modifica dei lavori è andata a buon fine.");
        }        
      }
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del cliente. Riprova più tardi.");
      }
    }
    else {
      alert("Modifiche annullate.");
    }
  }

  useEffect(() => {
    if (idsLavori !== -1) {
      console.log("IdsLavori aggiornato: ", idsLavori);
      // modificaLavori(itemsDaModificare);
      setIdsLavori(-1);
      // setAggiornamentoCompletato(false);
      azzeraSelezione(lavori, setLavori, "lavoro", idsLavori);
      setSelectedIdsModifica([]);
      alert("La modifica dei lavori è andata a buon fine.");
    }
  }, [idsLavori]);
  
  useEffect(() => {
    setLavori(lavoroStore.getLavori()); // Aggiungi questa riga
    const onChange = () => setLavori(lavoroStore.getLavori());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    };
  }, []);
  
  // useEffect(() => {
  //   if(!aggiornamentoCompletato) {
  //     setIdsLavori(lavoroStore.getIdsLavori());
  //     console.log("Aggiornamento in corso...");
  //   }
  // }, [!aggiornamentoCompletato]);

  // useEffect(() => {
  //   if(!aggiornamentoCompletato && idsLavori !== -1) {
  //     setAggiornamentoCompletato(true);
  //     console.log("Aggiornamento completato.");
  //     console.log(idsLavori);
  //   }
  //   else{
  //     console.log("Problema!!");
  //   }
  // }, [idsLavori]);

  const ottieniLavoriGiorno = async (setGiornoType, item) => {
    const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuovoLavoro),
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

  const handleGiornoBlur = (setGiornoType, item) => {
    return () => {
      if(!item.giorno)
        setGiornoType('text');
      else {
        setGiornoType('date');
        ottieniLavoriGiorno(setGiornoType, item);
      }
    };
         
  };

  return (
    <>
      <Header />
      
      <div className="main-content"></div>
      
      {(formSession.view === "form") && (
        <center>
          <FormCercaLavori item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
        </center>
      )}
      {(formSession.view === "row") && (
        <RowRicercaLavori item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardRicercaLavori handleGiornoBlur={handleGiornoBlur} item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
        </center>
      )}

      <br /> <br /> <br /> <br />
      
      {(lavori.length === 0) && (
        <div className='contenitore-1'>Nessun lavoro trovato.</div>
      )}
      
      {(lavori.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {lavori.map((lavoro, index) => (
                <CardLavoroEsistente handleGiornoBlur={handleGiornoBlur} key={index} item={lavoro} items={lavori} setItems={setLavori} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {lavori.map((lavoro, index) => (
                <RowLavoroEsistente key={index} item={lavoro} items={lavori} setItems={setLavori} selectOperation={selectOperation} />
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
                // onClick={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)}
                onClick={(e) => handleModifica(e)}
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

export default Lavori;









