import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';

const Clienti = () => {
  const [clienti, setClienti] = useState(-1);
  // const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  // const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  // const [selectedIds, setSelectedIds] = useState([]);
  // const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const itemSession = useSelector((state) => state.itemSession.value);
  const formSession = useSelector((state) => state.formSession.value);
  
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

  return (
    <>
      <Header />

      <div className="main-content" />

      <FormRicerca 
        tipoLista={'clienti'} 
        setLista1={setClienti}
        datiRicerca={datiRicerca}
        setDatiRicerca={setDatiRicerca} 
      />

      {(clienti.length === 0) && (
        <div className='contenitore-1'>Nessun cliente trovato!!</div>
      )}

      {(clienti.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items tipoItem={"cliente"} items={clienti} setterItems={setClienti} errori={errori} setErrori={setErrori}/>    
        </>
      )}

      {/* <div className="main-content"></div>
      
      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              <button className='bottone-blu-non-selezionato' onClick={() => modifica("clienti", datiClienteLastSearch, selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti, null, null, setErrori, null)}>Modifica</button>
            </Col>
          )}        
          {selectedIds.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato' onClick={() => elimina("clienti", datiClienteLastSearch, selectedIds, setSelectedIds, clienti, setClienti, null, null)}>Elimina</button>
            </Col>
          )}
        </Row>
      </div> */}
    </>
  );
}

export default Clienti;









