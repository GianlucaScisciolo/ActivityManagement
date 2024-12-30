import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { TypeView, RenderItemsInRowsList } from '../component/View';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';

const Professionisti = () => {
  const [professionisti, setProfessionisti] = useState([]);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiProfessionistiLastSearch, setDatiProfessionistiLastSearch] = useState({
    "nome": "", 
    "professione": "", 
    "contatto": "",
    "email": "", 
    "note": ""
  });

  const updateDatiLastSearch = (nomeLastSearch, professioneLastSearch, contattoLastSearch, emailLastSearch, noteLastSearch) => {
    setDatiProfessionistiLastSearch({ 
      "nome": nomeLastSearch, 
      "professione": professioneLastSearch, 
      "contatto": contattoLastSearch,
      "email": emailLastSearch, 
      "note": noteLastSearch
    })
  }

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

      <FormRicerca 
        tipoLista={'professionisti'} 
        setterLista1={setProfessionisti} 
        setterLista2={''}
        setterDatiLastSearch={updateDatiLastSearch}
      />

      <div className='containerTitle'><label className='titoloForm'>Professionisti</label></div>

      <TypeView
        viewElements={viewElements}
        setViewElements={setViewElements}
      />
      
      <RenderItemsInRowsList
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
      />

      <div className='containerButtons'>
        <Row className='custom-row'>
          <Col className='custom-col'>
            {selectedIdsModifica.length > 0 && <button className='col-button-modifica' onClick={() => modifica("professionisti", datiProfessionistiLastSearch, selectedIdsModifica, setSelectedIdsModifica, professionisti, setProfessionisti, null, null)}>Modifica</button>}
          </Col>
          <Col className='custom-col'>
            {selectedIds.length > 0 && <button className='col-button-elimina' onClick={() => elimina("professionisti", datiProfessionistiLastSearch, selectedIds, setSelectedIds, professionisti, setProfessionisti, null, null)}>Elimina</button>}
          </Col>
        </Row>
      </div>
      
      <button onClick={controllo}>Controllo</button>
    </>
  );
}

export default Professionisti;









