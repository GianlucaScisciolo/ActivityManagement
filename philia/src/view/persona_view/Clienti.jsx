import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { TypeView, RenderItemsInRowsList } from '../component/View';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

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

  // const controllo = () => {
  //   console.log(datiClienteLastSearch);
  //   alert(itemSession.view);
  //   alert(formSession.view);

  //   // console.log(selectedIds.length);
  //   // for (let i = 0; i < selectedIds.length; i++) {
  //   //   const cliente = clienti.find(c => c.id === selectedIds[i]);
  //   //   if (cliente) {
  //   //     console.log(`\t${selectedIds[i]} ${JSON.stringify(cliente)}`);
  //   //   }
  //   // }

  //   console.log(selectedIdsModifica.length);
  //   // for (let i = 0; i < selectedIdsModifica.length; i++) {
  //   //   const cliente = clienti.find(c => c.id === selectedIdsModifica[i]);
  //   //   if (cliente) {
  //   //     console.log(`\t${selectedIdsModifica[i]} ${JSON.stringify(cliente)}`);
  //   //   }
  //   // }
  //   // console.log("\n");
  // };

  return (
    <>
      <Header />

      <div className="main-content"></div>

      {/* <FormRicerca 
        tipoLista={'clienti'} 
        setterLista1={setClienti} 
        setterLista2={''}
        datiLastSearch={datiClienteLastSearch}
        setterDatiLastSearch={updateDatiLastSearch}
      /> */}
      {/* ({tipoLista, setLista1, setLista2, datiLastSearch, setDatiLastSearch}) */}
      <FormRicerca 
        tipoLista={'clienti'} 
        setLista1={setClienti}
        datiRicerca={datiRicerca}
        setDatiRicerca={setDatiRicerca}
      />

      {/* <div className='containerTitle'><label className='titoloForm'>Clienti</label></div>

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
      </div> */}
      
      {/* <button onClick={controllo}>Controllo</button> */}
    </>
  );
}

export default Clienti;









