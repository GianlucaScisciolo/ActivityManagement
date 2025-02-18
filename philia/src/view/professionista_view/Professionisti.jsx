import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import professionistaStore from '../../store/professionista_store/ProfessionistaStore';
import { operazioniProfessionisti } from '../../vario/Operazioni';
import { CardRicercaProfessionisti, CardProfessionistaEsistente } from '../component/card_item/CardsProfessionisti';
import { FormRicercaProfessionisti } from '../component/form_item/FormsProfessionisti';
import { RowRicercaProfessionisti, RowProfessionistaEsistente } from '../component/row_item/RowsProfessionisti';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import { Items } from '../component/Items';
import { OperazioniItems, selectOperationBody } from '../component/Operazioni';

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
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  useEffect(() => {
    const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    professionistaStore.addChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    return () => {
      professionistaStore.removeChangeListener(operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI, onChange);
    };
  }, []);
  
  let RicercaProfessionistiTag = (formSession.view === "form") ? FormRicercaProfessionisti : (
    (formSession.view === "card") ? CardRicercaProfessionisti : RowRicercaProfessionisti
  )

  const itemsComponent = (
    <Items 
      tipoItem={"professionista"} 
      items={professionisti} 
      selectOperation={selectOperation}
      emptyIsConsidered={true}
    />
  );

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <RicercaProfessionistiTag 
        item={datiRicerca} 
        setItem={setDatiRicerca} 
        eseguiRicerca={(e) => eseguiRicerca(e, "professionisti", setProfessionisti, datiRicerca)}
      />

      <br /> <br /> <br /> <br />
      
      {itemSession.view === "card" ? (
        <div className="contenitore-3">{itemsComponent}</div>
      ) : (
        itemsComponent
      )}

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "professionista", selectedIdsModifica, setSelectedIdsModifica, professionisti, setProfessionisti)} 
        elimina={(e) => elimina(e, "professionista", selectedIdsEliminazione, setSelectedIdsEliminazione, professionisti, setProfessionisti)}
      />

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Professionisti;









