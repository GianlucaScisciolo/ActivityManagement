import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import professionistaStore from '../../store/professionista_store/ProfessionistaStore';
import { operazioniProfessionisti } from '../../vario/Operazioni';
import { CardCercaProfessionisti, CardProfessionistaEsistente } from '../component/card_item/CardsProfessionisti';
import { FormCercaProfessionisti } from '../component/form_item/FormsProfessionisti';
import { RowRicercaProfessionisti, RowProfessionistaEsistente } from '../component/row_item/RowsProfessionisti';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';

const Professionisti = () => {
  const [professionisti, setProfessionisti] = useState(-1);
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
    "email": "", 
    "note": ""
  });

  const [errori, setErrori] = useState({
    "erroreNome": "",
    "erroreCognome": "",
    "erroreContatto": "",
    "erroreEmail": "",
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
    const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    professionistaStore.addChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    return () => {
      professionistaStore.removeChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    };
  }, []);
  
  return (
    <>
      <Header />

      <div className="main-content" />

      {(formSession.view === "form") && (
        <center>
          <FormCercaProfessionisti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
        </center>
      )}
      {(formSession.view === "row") && (
        <RowRicercaProfessionisti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardCercaProfessionisti item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)} />
        </center>
      )}

      {(professionisti.length === 0) && (
        <div className='contenitore-1'>Nessun professionista trovato!!</div>
      )}

      <br /> <br /> <br /> <br />

      {(professionisti.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {professionisti.map((professionista, index) => (
                <CardProfessionistaEsistente key={index} item={professionista} items={professionisti} setItems={setProfessionisti} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {professionisti.map((professionista, index) => (
                <RowProfessionistaEsistente key={index} item={professionista} items={professionisti} setItems={setProfessionisti} selectOperation={selectOperation} />
              ))}
            </>
          )}
        </>
      )}

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Professionisti;









