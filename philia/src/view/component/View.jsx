import React, { useState } from 'react';
import { List, WalletCards, Trash2, Pencil } from 'lucide-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HookItems } from '../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './card_item/CardItem';
import RowItem from './row_item/RowItem';

export const Items = ({tipoItem, items, setterItems, viewElements, setSelectedTrashCount, setSelectedPencilCount, 
                       selectedIds, setSelectedIds, selectedIdsModifica, setSelectedIdsModifica, errori, setErrori}) => {

  // const [cognome, setCognome] = useState(item.cognome);
  // const [contatto, setContatto] = useState(item.contatto);
  // const [note, setNote] = useState(item.note);
  // const [professione, setProfessione] = useState(item.professione);
  // const [email, setEmail] = useState(item.email);
  // const [nomeCliente, setNomeCliente] = useState(item.nome_cliente);
  // const [cognomeCliente, setCognomeCliente] = useState(item.cognome_cliente);
  // const [nomeProfessionista, setNomeProfessionista] = useState(item.nome_professionista);
  // const [descrizione, setDescrizione] = useState(item.descrizione);
  // const [giorno, setGiorno] = useState(item.giorno);
  // const [orarioInizio, setOrarioInizio] = useState(item.orario_inizio);
  // const [orarioFine, setOrarioFine] = useState(item.orario_fine);
  // const [textAreaClassBlock, setTextAreaClassBlock] = useState("");
  // const [textAreaClass, setTextAreaClass] = useState("");
  // const [inputClassBlock, setInputClassBlock] = useState("");
  // const [inputClass, setInputClass] = useState("");
  
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
      <Row>
        {items.map((item) => (
          <>
            {itemSession.view === "list" && (
              <>
                {/* <div className='contenitore-1'>Clienti</div> */}
                <RowItem key={item.id} selectOperation={selectOperation} tipoItem={tipoItem} item={item} />
              </>
            )}
            {itemSession.view === "card" && (
              <Col><CardItem key={item.id} selectOperation={selectOperation} tipoItem={tipoItem} item={item} header={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} /></Col>
            )}
          </>
        ))}
      </Row> 
      <Row className='custom-row'>
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
      </Row>
    </>
  )
};








