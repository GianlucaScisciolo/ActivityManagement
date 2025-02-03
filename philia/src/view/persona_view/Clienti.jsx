import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import personaStore from '../../store/persona_store/PersonaStore';
import { operazioniPersone } from '../../vario/Operazioni';
import { CardRicercaClienti, CardClienteEsistente } from '../component/card_item/CardsClienti';
import { FormCercaClienti } from '../component/form_item/FormsClienti';
import { RowRicercaClienti } from '../component/row_item/RowsClienti';
import { RowClienteEsistente } from '../component/row_item/RowsClienti';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';

const Clienti = () => {
  const [clienti, setClienti] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  
  const [datiRicerca, setDatiRicerca] = useState({
    "nome": "", 
    "cognome": "", 
    "contatto": "", 
    "note": ""
  });

  const [errori, setErrori] = useState({
    "erroreNome": "",
    "erroreCognome": "",
    "erroreContatto": "",
    "erroreNote": ""
  })

  const selectOperation = (icon, item) => {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 2;
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 1;
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }

  useEffect(() => {
    const onChange = () => setClienti(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }, []);
  
  return (
    <>
      <Header />

      <div className="main-content" />

      {(formSession.view === "form") && (
        <center>
          <FormCercaClienti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)} />
        </center>
      )}
      {(formSession.view === "row") && (
        <RowRicercaClienti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardRicercaClienti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)} />
        </center>
      )}

      {(clienti.length === 0) && (
        <div className='contenitore-1'>Nessun cliente trovato!!</div>
      )}

      <br /> <br /> <br /> <br />

      {(clienti.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {clienti.map((cliente, index) => (
                <CardClienteEsistente key={index} item={cliente} items={clienti} setItems={setClienti} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {clienti.map((cliente, index) => (
                <RowClienteEsistente key={index} item={cliente} items={clienti} setItems={setClienti} selectOperation={selectOperation} />
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
                onClick={(e) => modifica(e, "cliente", selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti)}
              >
                Modifica
              </button>
            </Col>
          )}
          {selectedIdsEliminazione.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato'
                onClick={(e) => elimina(e, "cliente", selectedIdsEliminazione, setSelectedIdsEliminazione, clienti, setClienti)}
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

export default Clienti;









