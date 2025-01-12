import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';

const Lavori = () => {
  // const [lavoriClienti, setLavoriClienti] = useState(-1);
  // const [lavoriProfessionisti, setLavoriProfessionisti] = useState(-1);
  const [lavori, setLavori] = useState(-1);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [datiRicerca, setDatiRicerca] = useState({
    "nome_cliente": "", 
    "cognome_cliente": "", 
    "nome_professionista": "",
    "descrizione": "", 
    "primo_giorno": "",
    "ultimo_giorno": "",
    "note": ""
  });

  // const updateDatiLastSearch = (nomeClienteLastSearch, cognomeClienteLastSearch, nomeProfessionistaLastSearch, descrizioneLastSearch, primoGiornoLastSearch, ultimoGiornoLastSearch) => {
  //   setDatiLavoriLastSearch({ 
  //     "nomeCliente": nomeClienteLastSearch, 
  //     "cognomeCliente": cognomeClienteLastSearch, 
  //     "nomeProfessionista": nomeProfessionistaLastSearch,
  //     "descrizione": descrizioneLastSearch, 
  //     "primoGiorno": primoGiornoLastSearch,
  //     "ultimoGiorno": ultimoGiornoLastSearch,
  //   })
  // }

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

// const [errori2, setErrori2] = useState ({
//   erroreCliente: "",
//   erroreProfessionista: "",
//   erroreClienteEProfessionista: "",
//   erroreDescrizione: "",
//   erroreGiorno: "",
//   erroreOrarioInizio: "",
//   erroreOrarioFine: "",
//   erroreOrari: "",
//   erroreNote: ""
// })

  // const controllo = () => {
  //   console.log(datiLavoriLastSearch);

  //   console.log(selectedIds.length);
  //   console.log(lavoriClienti.length);
  //   console.log(lavoriProfessionisti.length);
  //   // for (let i = 0; i < selectedIds.length; i++) {
  //   //   const lavoroCliente = lavori.find(p => p.id === selectedIds[i]);
  //   //   if (professionista) {
  //   //     console.log(`\t${selectedIds[i]} ${JSON.stringify(professionista)}`);
  //   //   }
  //   // }

  //   // console.log(selectedIdsModifica.length);
  //   // for (let i = 0; i < selectedIdsModifica.length; i++) {
  //   //   const professionista = professionisti.find(p => p.id === selectedIdsModifica[i]);
  //   //   if (professionista) {
  //   //     console.log(`\t${selectedIdsModifica[i]} ${JSON.stringify(professionista)}`);
  //   //   }
  //   // }
  //   console.log("\n");
  // };
  

  return (
    <>
      <Header />
      
      <div className="main-content"></div>
      {/* <FormRicerca
        tipoLista={'lavori'} 
        setterLista1={setLavoriClienti} 
        setterLista2={setLavoriProfessionisti}
        datiLastSearch={datiLavoriLastSearch}
        setterDatiLastSearch={updateDatiLastSearch}
      /> */}

      <FormRicerca 
        tipoLista={'lavori'} 
        setLista1={setLavori}
        datiRicerca={datiRicerca}
        setDatiRicerca={setDatiRicerca}
      />
      
      {/* <div className='containerTitle'><label className='titoloForm'>Lavori clienti</label></div>
      
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
        errori={errori1}
        setErrori={setErrori1}
      /> */}

      {/* <div className='containerTitle'><label className='titoloForm'>Lavori professionisti</label></div>
      
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
        errori={errori2}
        setErrori={setErrori2}
        /> */}

      {/* <div className='containerButtons'>
        <Row className='custom-row'>
          <Col className='custom-col'>
            {selectedIdsModifica.length > 0 && <button className='col-button-modifica' onClick={() => modifica("lavori", datiLavoriLastSearch, selectedIdsModifica, setSelectedIdsModifica, lavoriClienti, setLavoriClienti, lavoriProfessionisti, setLavoriProfessionisti, setErrori1, setErrori2)}>Modifica</button>}
          </Col>
          <Col className='custom-col'>
            {selectedIds.length > 0 && <button className='col-button-elimina' onClick={() => elimina("lavori", datiLavoriLastSearch, selectedIds, setSelectedIds, lavoriClienti, setLavoriClienti, lavoriProfessionisti, setLavoriProfessionisti)}>Elimina</button>}
          </Col>
        </Row>
      </div> */}
      
      {/* <button onClick={controllo}>Controllo</button> */}

      {(lavori.length === 0) && (
        <div className='contenitore-1'>Nessun lavoro trovato!!</div>
      )}

      {(lavori.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items
            tipoItem={"lavoro"} 
            items={lavori}
            setterItems={setLavori}
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

      {/* {(lavoriProfessionisti.length === 0) && (
        <div className='contenitore-1'>Nessun lavoro professionista trovato!!</div>
      )}

      {(lavoriProfessionisti.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items
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
            errori={errori2}
            setErrori={setErrori2}
          />     
        </>
      )} */}
    </>
  );
}

export default Lavori;









