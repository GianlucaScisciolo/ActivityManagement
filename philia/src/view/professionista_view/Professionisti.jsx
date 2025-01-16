import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
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

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <FormRicerca tipoLista={'professionisti'} setLista1={setProfessionisti} datiRicerca={datiRicerca} setDatiRicerca={setDatiRicerca} />

      {(professionisti.length === 0) && (
        <div className='contenitore-1'>Nessun professionista trovato!!</div>
      )}

      {(professionisti.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items tipoItem={"professionista"} items={professionisti} setterItems={setProfessionisti} />      
        </>
      )}
    </>
  );
}

export default Professionisti;









