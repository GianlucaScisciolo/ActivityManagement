import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/View';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';

const Professionisti = () => {
  const [professionisti, setProfessionisti] = useState(-1);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiRicerca, setDatiRicerca] = useState({
    "nome": "", 
    "professione": "", 
    "contatto": "",
    "email": "", 
    "note": ""
  });

  // const updateDatiLastSearch = (nomeLastSearch, professioneLastSearch, contattoLastSearch, emailLastSearch, noteLastSearch) => {
  //   setDatiProfessionistiLastSearch({ 
  //     "nome": nomeLastSearch, 
  //     "professione": professioneLastSearch, 
  //     "contatto": contattoLastSearch,
  //     "email": emailLastSearch, 
  //     "note": noteLastSearch
  //   })
  // }

  const[errori, setErrori] = useState({
    erroreNome: "",
    erroreProfessione: "",
    erroreContatto: "",
    erroreEmail: "",
    erroreContattoEEmail: "",
    erroreNote: ""
  })

  const controllo = () => {
    console.log(datiProfessionistiLastSearch);

    console.log(selectedIds.length);
    for (let i = 0; i < selectedIds.length; i++) {
      const professionista = professionisti.find(p => p.id === selectedIds[i]);
      if (professionista) {
        console.log(`\t${selectedIds[i]} ${JSON.stringify(professionista)}`);
      }
    }

    console.log(selectedIdsModifica.length);
    for (let i = 0; i < selectedIdsModifica.length; i++) {
      const professionista = professionisti.find(p => p.id === selectedIdsModifica[i]);
      if (professionista) {
        console.log(`\t${selectedIdsModifica[i]} ${JSON.stringify(professionista)}`);
      }
    }
    console.log("\n");
  };
  

  return (
    <>
      <Header />

      <div className="main-content"></div>

      {/* <FormRicerca 
        tipoLista={'professionisti'} 
        setterLista1={setProfessionisti} 
        setterLista2={''}
        datiLastSearch={datiProfessionistiLastSearch}
        setterDatiLastSearch={updateDatiLastSearch}
      /> */}

      <FormRicerca 
        tipoLista={'professionisti'} 
        setLista1={setProfessionisti}
        datiRicerca={datiRicerca}
        setDatiRicerca={setDatiRicerca}
      />

      {(professionisti.length === 0) && (
        <div className='contenitore-1'>Nessun professionista trovato!!</div>
      )}

      {(professionisti.length > 0) && (
        <>
            <div className="main-content"></div>
            <Items
              tipoItem={"professionista"} 
              items={professionisti}
              setterItems={setProfessionisti}
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
        </>
      )}

      <div className="main-content"></div>

      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              <button className='bottone-blu-non-selezionato'>Modifica</button>
            </Col>
          )}        
          {selectedIds.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato'>Elimina</button>
            </Col>
          )}
        </Row>
      </div>

      {/* <div className='containerTitle'><label className='titoloForm'>Professionisti</label></div> */}
      
      {/* <RenderItemsInRowsList
        tipoItem={"professionista"} 
        items={professionisti}
        setterItems={setProfessionisti}
        viewElements={viewElements}
        setSelectedTrashCount={setSelectedTrashCount}
        setSelectedPencilCount={setSelectedPencilCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedIdsModifica={selectedIdsModifica}
        setSelectedIdsModifica={setSelectedIdsModifica}
        errori={errori}
        setErrori={setErrori}
      /> */}

      {/* <div className='containerButtons'>
        <Row className='custom-row'>
          <Col className='custom-col'>
            {selectedIdsModifica.length > 0 && <button className='col-button-modifica' onClick={() => modifica("professionisti", datiProfessionistiLastSearch, selectedIdsModifica, setSelectedIdsModifica, professionisti, setProfessionisti, null, null, setErrori, null)}>Modifica</button>}
          </Col>
          <Col className='custom-col'>
            {selectedIds.length > 0 && <button className='col-button-elimina' onClick={() => elimina("professionisti", datiProfessionistiLastSearch, selectedIds, setSelectedIds, professionisti, setProfessionisti, null, null)}>Elimina</button>}
          </Col>
        </Row>
      </div> */}
      
      {/* <button onClick={controllo}>Controllo</button> */}
    </>
  );
}

export default Professionisti;









