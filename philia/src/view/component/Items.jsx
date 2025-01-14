import React, { useState } from 'react';
import { List, WalletCards, Trash2, Pencil } from 'lucide-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HookItems } from '../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './card_item/CardItem';
import RowItem from './row_item/RowItem';
import { modifica } from '../../vario/OperazioniModifica';
import { elimina } from '../../vario/OperazioniEliminazione';

export const Items = ({tipoItem, items, setterItems, errori, setErrori}) => {
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const selectOperation = (icon, item) => {
    if(icon === "trash") {
      if(selectedIds.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 2;
        setSelectedIds(prevIds => [...prevIds, item.id]);
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
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }
  
  const itemSession = useSelector((state) => state.itemSession.value);
  
  return (
    <>
      {itemSession.view === "list" && (
        <>
          {items.map((item, index) => (
            <RowItem key={index} selectOperation={selectOperation} tipoItem={tipoItem} item={item} />
          ))}
        </>
      )}
      {itemSession.view === "card" && (
        <>
          <div className='contenitore-3'>
            {items.map((item, index) => (
              <CardItem key={index} selectOperation={selectOperation} tipoItem={tipoItem} item={item} header={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} />
            ))}
          </div>
        </>
      )}

      <div className="main-content"></div>
      
      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              {/* <button className='bottone-blu-non-selezionato' onClick={() => modifica("tipoItem"ClienteLastSearch, selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti, null, null, setErrori, null)}>Modifica</button> */}
              <button className="bottone-blu-non-selezionato"
                onClick={(e) => modifica(e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setErrori, setterItems)}
              >
                Modifica
              </button>
            </Col>
          )}        
          {selectedIds.length > 0 && (
            <Col>
              {/* <button className='bottone-rosso-non-selezionato' onClick={() => elimina("clienti", datiClienteLastSearch, selectedIds, setSelectedIds, clienti, setClienti, null, null)}>Elimina</button> */}
              <button className='bottone-rosso-non-selezionato'
                onClick={(e) => elimina(e, tipoItem, selectedIds, setSelectedIds, items, setterItems)}
              >
                Elimina
              </button>
            </Col>
          )}
        </Row>
      </div>

      <br /> <br />

      {/* <Row className='custom-row'>
        <Col className='custom-col'><span className='span-errore-col'></span></Col>
        {(tipoItem === "cliente") && (
          <>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreContatto}</span></Col>
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreNote}</span></Col>
          </>
        )}
        {(tipoItem === "professionista") && (
          <>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            {(tipoItem === "lavoro cliente") && (
              <>
                <Col className='custom-col'><span className='span-errore-col'>{errori.erroreContatto}</span></Col>
                <Col className='custom-col'><span className='span-errore-col'>{errori.erroreEmail}</span></Col>
              </>
            )}
            {(tipoItem === "lavoro cliente") && (
              <Col className='custom-col'><span className='span-errore-col'>{errori.erroreContattoEEmail}</span></Col>
            )}
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreNote}</span></Col>
          </>
        )}
        {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
          <>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            <Col className='custom-col'><span className='span-errore-col'></span></Col>
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreDescrizione}</span></Col>
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreGiorno}</span></Col>
            {(errori.erroreOrari === "") && (
              <>
                <Col className='custom-col'><span className='span-errore-col'>{errori.erroreOrarioInizio}</span></Col>
                <Col className='custom-col'><span className='span-errore-col'>{errori.erroreOrarioFine}</span></Col>
              </>
            )}
            {(errori.erroreOrari !== "") && (
              <Col className='custom-col'><span className='span-errore-col'>{errori.erroreOrari}</span></Col>
            )}
            <Col className='custom-col'><span className='span-errore-col'>{errori.erroreNote}</span></Col>
          </>
        )}
      </Row> */}

      {/* <div className="main-content" /> */}
    </>
  )
};








