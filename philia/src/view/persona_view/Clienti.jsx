import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import personaStore from '../../store/persona_store/PersonaStore';
import { operazioniPersone } from '../../vario/Operazioni';
import { CardRicercaClienti, CardClienteEsistente } from '../component/card_item/CardsClienti';
import { FormRicercaClienti } from '../component/form_item/FormsClienti';
import { RowRicercaClienti } from '../component/row_item/RowsClienti';
import { RowClienteEsistente } from '../component/row_item/RowsClienti';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import Items from '../component/Items';
import { OperazioniItems } from '../component/Operazioni';

const Clienti = () => {
  const [clienti, setClienti] = useState(-1);
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
    "note": ""
  });

  const [errori, setErrori] = useState({
    "erroreNome": "",
    "erroreCognome": "",
    "erroreContatto": "",
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
    const onChange = () => setClienti(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }, []);

  let RicercaClientiTag = (formSession.view === "form") ? FormRicercaClienti : (
    (formSession.view === "card") ? CardRicercaClienti : RowRicercaClienti
  )
  
  const itemsComponent = (
    <Items 
      tipoItem={"cliente"} 
      items={clienti} 
      selectOperation={selectOperation}
      emptyIsConsidered={true}
    />
  );

  return (
    <>
      <Header />

      <div className="main-content" />

      <RicercaClientiTag 
        item={datiRicerca} 
        setItem={setDatiRicerca} 
        eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)}
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
        modifica={(e) => modifica(e, "cliente", selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti)} 
        elimina={(e) => elimina(e, "cliente", selectedIdsEliminazione, setSelectedIdsEliminazione, clienti, setClienti)}
      />
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Clienti;









