import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { TypeView, RenderItemsInRowsList } from '../component/View';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiClienteLastSearch, setDatiClienteLastSearch] = useState({
    "nome": "", 
    "cognome": "", 
    "contatto": "", 
    "note": ""
  });

  const updateDatiLastSearch = (nomeLastSearch, cognomeLastSearch, contattoLastSearch, noteLastSearch) => {
    setDatiClienteLastSearch({
      "nome": nomeLastSearch, 
      "cognome": cognomeLastSearch, 
      "contatto": contattoLastSearch, 
      "note": noteLastSearch
    })
  }

  const [errori, setErrori] = useState({
    "erroreNome": "",
    "erroreCognome": "",
    "erroreContatto": "",
    "erroreNote": ""
  })

  const controllo = () => {
    console.log(datiClienteLastSearch);

    // console.log(selectedIds.length);
    // for (let i = 0; i < selectedIds.length; i++) {
    //   const cliente = clienti.find(c => c.id === selectedIds[i]);
    //   if (cliente) {
    //     console.log(`\t${selectedIds[i]} ${JSON.stringify(cliente)}`);
    //   }
    // }

    console.log(selectedIdsModifica.length);
    // for (let i = 0; i < selectedIdsModifica.length; i++) {
    //   const cliente = clienti.find(c => c.id === selectedIdsModifica[i]);
    //   if (cliente) {
    //     console.log(`\t${selectedIdsModifica[i]} ${JSON.stringify(cliente)}`);
    //   }
    // }
    // console.log("\n");
  };

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <FormRicerca 
        tipoLista={'clienti'} 
        setterLista1={setClienti} 
        setterLista2={''}
        setterDatiLastSearch={updateDatiLastSearch}
      />

      <div className='containerTitle'><label className='titoloForm'>Clienti</label></div>

      <TypeView
        viewElements={viewElements}
        setViewElements={setViewElements}
      />
      
      <RenderItemsInRowsList
        tipoItem={"cliente"} 
        items={clienti}
        setterItems={setClienti}
        viewElements={viewElements}
        setSelectedTrashCount={setSelectedTrashCount}
        setSelectedPencilCount={setSelectedPencilCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedIdsModifica={selectedIdsModifica}
        setSelectedIdsModifica={setSelectedIdsModifica}
        errori={errori}
        setErrori={setErrori}
      />

      <div className='containerButtons'>
        <Row className='custom-row'>
          <Col className='custom-col'>
            {selectedIdsModifica.length > 0 && <button className='col-button-modifica' onClick={() => modifica("clienti", datiClienteLastSearch, selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti, null, null, setErrori, null)}>Modifica</button>}
          </Col>
          <Col className='custom-col'>
            {selectedIds.length > 0 && <button className='col-button-elimina' onClick={() => elimina("clienti", datiClienteLastSearch, selectedIds, setSelectedIds, clienti, setClienti, null, null)}>Elimina</button>}
          </Col>
        </Row>
      </div>
      
      <button onClick={controllo}>Controllo</button>
    </>
  );
}

export default Clienti;









