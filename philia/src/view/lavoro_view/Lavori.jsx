import React, { useState, useEffect, useRef } from 'react';
import Header from '../component/Header';
import { FormRicerca } from '../component/FormRicerca';
import { Items } from '../component/Items';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector } from 'react-redux';
import { FormCercaLavori } from '../component/form_item/FormsLavori';
import { RowRicercaLavori} from '../component/row_item/RowsLavori';
import { CardCercaLavori, CardLavoroEsistente } from '../component/card_item/CardsLavori';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import lavoroStore from '../../store/lavoro_store/LavoroStore';
import LavoroAction from '../../action/lavoro_action/LavoroAction';
import { operazioniLavori } from '../../vario/Operazioni';

const Lavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [lavori, setLavori] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [datiRicerca, setDatiRicerca] = useState({
    "nome_cliente": "", 
    "cognome_cliente": "", 
    "nome_professionista": "",
    "professione": "", 
    "primo_giorno": "",
    "ultimo_giorno": "",
    "descrizione": "", 
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
    const onChange = () => setLavori(lavoroStore.getLavori());
    lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    return () => {
      lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
    };
  }, []);

  return (
    <>
      <Header />
      
      <div className="main-content"></div>
      
      {(formSession.view === "form") && (
        <center>
          <FormCercaLavori item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
        </center>
      )}
      {(formSession.view === "row") && (
        <RowRicercaLavori item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardCercaLavori item={datiRicerca} setItem={setDatiRicerca} eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)} />
        </center>
      )}

      <br /> <br /> <br /> <br />
      
      {(lavori.length === 0) && (
        <div className='contenitore-1'>Nessun lavoro trovato.</div>
      )}

      {(lavori.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {lavori.map((lavoro, index) => (
                <CardLavoroEsistente key={index} item={lavoro} items={lavori} setItems={setLavori} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {/* {(itemSession.view === "list") && (
            <>
              {lavori.map((lavoro, index) => (
                <RowLavoroEsistente key={index} item={lavoro} items={lavori} setItems={setLavori} selectOperation={selectOperation} />
              ))}
            </>
          )} */}
        </>
      )}
      <button>{lavori.length}</button>
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Lavori;









