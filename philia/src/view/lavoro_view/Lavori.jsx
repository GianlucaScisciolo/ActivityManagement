import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { CardCercaDate } from '../component/card_item/CardsLavori';
import { FormCercaDate } from '../component/form_item/FormsLavori';
import { RowRicercaDate } from '../component/row_item/RowsLavori';
import { useSelector } from 'react-redux';

const Lavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [lavori, setLavori] = useState(-1);
  const [viewElements, setViewElements] = useState("list");
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  // const [datiRicerca, setDatiRicerca] = useState({
  //   "nome_cliente": "", 
  //   "cognome_cliente": "", 
  //   "nome_professionista": "",
  //   "descrizione": "", 
  //   "primo_giorno": "",
  //   "ultimo_giorno": "",
  //   "note": ""
  // });
  const [datiRicerca, setDatiRicerca] = useState({
    "nome_cliente": "", 
    "cognome_cliente": "", 
    "nome_professionista": "",
    "descrizione": "", 
    "primo_giorno": "",
    "ultimo_giorno": "",
    "note": ""
  });

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

  return (
    <>
      <Header />
      
      <div className="main-content"></div>
      
      {(formSession.view === "form") && (
        <center>
          <FormCercaDate item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
        </center>
      )}
      {(formSession.view === "row") && (
        <RowRicercaDate item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardCercaDate item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
        </center>
      )}
      
      {(lavori.length === 0) && (
        <div className='contenitore-1'>Nessun lavoro trovato.</div>
      )}

      {(lavori.length > 0) && (
        <>
          <div className="main-content"></div>      
          <Items tipoItem={"lavoro"} items={lavori} setterItems={setLavori} />
        </>
      )}
    </>
  );
}

export default Lavori;









