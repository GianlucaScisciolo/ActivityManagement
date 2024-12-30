import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { TypeView, RenderItemsInRowsList } from '../component/View';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';

const Lavori = () => {
  const [lavoriClienti, setLavoriClienti] = useState([]);
  const [lavoriProfessionisti, setLavoriProfessionisti] = useState([]);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiLavoriLastSearch, setDatiLavoriLastSearch] = useState({
    "nomeCliente": "", 
    "cognomeCliente": "", 
    "nomeProfessionista": "",
    "descrizione": "", 
    "primoGiorno": "",
    "ultimoGiorno": "",
  });

  const updateDatiLastSearch = (nomeClienteLastSearch, cognomeClienteLastSearch, nomeProfessionistaLastSearch, descrizioneLastSearch, primoGiornoLastSearch, ultimoGiornoLastSearch) => {
    setDatiLavoriLastSearch({ 
      "nomeCliente": nomeClienteLastSearch, 
      "cognomeCliente": cognomeClienteLastSearch, 
      "nomeProfessionista": nomeProfessionistaLastSearch,
      "descrizione": descrizioneLastSearch, 
      "primoGiorno": primoGiornoLastSearch,
      "ultimoGiorno": ultimoGiornoLastSearch,
    })
  }

  const controllo = () => {
    console.log(datiLavoriLastSearch);

    console.log(selectedIds.length);
    console.log(lavoriClienti.length);
    console.log(lavoriProfessionisti.length);
    // for (let i = 0; i < selectedIds.length; i++) {
    //   const lavoroCliente = lavori.find(p => p.id === selectedIds[i]);
    //   if (professionista) {
    //     console.log(`\t${selectedIds[i]} ${JSON.stringify(professionista)}`);
    //   }
    // }

    // console.log(selectedIdsModifica.length);
    // for (let i = 0; i < selectedIdsModifica.length; i++) {
    //   const professionista = professionisti.find(p => p.id === selectedIdsModifica[i]);
    //   if (professionista) {
    //     console.log(`\t${selectedIdsModifica[i]} ${JSON.stringify(professionista)}`);
    //   }
    // }
    console.log("\n");
  };
  

  return (
    <>
      <Header />
      
      <div className="main-content"></div>

      <FormRicerca
        tipoLista={'lavori'} 
        setterLista1={setLavoriClienti} 
        setterLista2={setLavoriProfessionisti}
        setterDatiLastSearch={updateDatiLastSearch}
        />

      <TypeView
        viewElements={viewElements}
        setViewElements={setViewElements}
        />
      
      <div className='containerTitle'><label className='titoloForm'>Lavori clienti</label></div>
      
      <RenderItemsInRowsList
        tipoItem={"lavoro cliente"} 
        items={lavoriClienti}
        setterItems={setLavoriClienti}
        viewElements={viewElements}
        setSelectedTrashCount={setSelectedTrashCount}
        setSelectedPencilCount={setSelectedPencilCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedIdsModifica={selectedIdsModifica}
        setSelectedIdsModifica={setSelectedIdsModifica}
        />

      <div className='containerTitle'><label className='titoloForm'>Lavori professionisti</label></div>
      
      <RenderItemsInRowsList
        tipoItem={"lavoro professionista"} 
        items={lavoriProfessionisti}
        setterItems={setLavoriProfessionisti}
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
            {selectedIdsModifica.length > 0 && <button className='col-button-modifica' onClick={() => modifica("lavori", datiLavoriLastSearch, selectedIdsModifica, setSelectedIdsModifica, lavoriClienti, setLavoriClienti, lavoriProfessionisti, setLavoriProfessionisti)}>Modifica</button>}
          </Col>
          <Col className='custom-col'>
            {selectedIds.length > 0 && <button className='col-button-elimina' onClick={() => elimina("lavori", datiLavoriLastSearch, selectedIds, setSelectedIds, lavoriClienti, setLavoriClienti, lavoriProfessionisti, setLavoriProfessionisti)}>Elimina</button>}
          </Col>
        </Row>
      </div>
      
      <button onClick={controllo}>Controllo</button>
    </>
  );
}

export default Lavori;









