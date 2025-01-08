import React, { useState } from 'react';
import { List, WalletCards, Trash2, Pencil } from 'lucide-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HookItems } from '../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './card_item/CardItem';
import RowItem from './row_item/RowItem';

const handleClickChangeViewElements = ({viewElements, setViewElements}) => {
  setViewElements(viewElements === "list" ? "cards" : "list");
};

export const TypeView = ({viewElements, setViewElements}) => {
  return (
    <Row className='custom-row'>
      <Col style={{marginLeft:'45%', marginRight:'45%'}} className='custom-col-black'>
        <div className='icon-container' onClick={() => handleClickChangeViewElements({viewElements, setViewElements})}>
          {
            viewElements === "list" 
              ? <WalletCards className='icon-view-style' id='walletCards' size={40} />
              : <List className='icon-view-style' id='walletCards' size={40} />
          }
        </div>
      </Col>
    </Row>
  )
}

const Item = ({tipoItem, item, setterItems, viewElements, setSelectedTrashCount, setSelectedPencilCount,
              selectedIds, setSelectedIds, selectedIdsModifica, setSelectedIdsModifica}) => {
  const [nome, setNome] = useState(item.nome);
  const [cognome, setCognome] = useState(item.cognome);
  const [contatto, setContatto] = useState(item.contatto);
  const [note, setNote] = useState(item.note);
  const [professione, setProfessione] = useState(item.professione);
  const [email, setEmail] = useState(item.email);
  const [nomeCliente, setNomeCliente] = useState(item.nome_cliente);
  const [cognomeCliente, setCognomeCliente] = useState(item.cognome_cliente);
  const [nomeProfessionista, setNomeProfessionista] = useState(item.nome_professionista);
  const [descrizione, setDescrizione] = useState(item.descrizione);
  const [giorno, setGiorno] = useState(item.giorno);
  const [orarioInizio, setOrarioInizio] = useState(item.orario_inizio);
  const [orarioFine, setOrarioFine] = useState(item.orario_fine);
  const [textAreaClassBlock, setTextAreaClassBlock] = useState("");
  const [textAreaClass, setTextAreaClass] = useState("");
  const [inputClassBlock, setInputClassBlock] = useState("");
  const [inputClass, setInputClass] = useState("");

  const itemSession = useSelector((state) => state.itemSession.value);
  
  const selectOperation = (icon) => {
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  }

  const getClassTrash = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
      case 1:
        return "trash-style-not-selected";
      case 2:
        return "trash-style-selected";
      default:
        return "";
    }
  }

  const getClassPencil = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
      case 2:
        return "pencil-style-not-selected";
      case 1:
        return "pencil-style-selected";
      default:
        return "";
    }
  }

  const getClassTextAreaBlock = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
      case 1:
        return "custom-textarea-block";
      case 2:
        return "custom-textarea-elimina";
      default:
        return "";
    }
  }

  const getClassTextArea = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
        return "custom-textarea-block";
      case 1:
        return "custom-textarea-modifica";
      case 2:
        return "custom-textarea-elimina";
      default:
        return "";
    }
  };
  

  const getClassInputBlock = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
      case 1:
        return "custom-input-block";
      case 2:
        return "custom-input-elimina";
      default:
        return "";
    }
  }

  const getClassInput = (tipoSelezione) => {
    switch(tipoSelezione) {
      case 0:
        return "custom-input-block";
      case 1:
        return "custom-input-modifica";
      case 2:
        return "custom-input-elimina";
      default:
        return "";
    }
  }
  
  const {
    isPencilSelected,
    isTrashSelected,
    handlePencilClickWrapperProfessionisti, 
    handlePencilClickWrapperLavori, 
    handleTrashClickWrapper,
    onChangeValue,
    // selectOperation,
  } = HookItems();

  return (
    <>
      {itemSession.view === "list" && (
        <>
          <RowItem key={item.id}
            selectOperation={selectOperation}
            tipoItem={tipoItem}
            item={item} 
          />
        </>
      )}
      {itemSession.view === "card" && (
        <>
          <Col className='custom-col'>
            <CardItem key={item.id}
              selectOperation={selectOperation}
              tipoItem={tipoItem}
              item={item}
              header="" 
            />
          </Col>
        </>
      )}
    </>
  );
}

export const RenderItemsInRowsList = ({tipoItem, items, setterItems, viewElements, setSelectedTrashCount, setSelectedPencilCount, 
                                       selectedIds, setSelectedIds, selectedIdsModifica, setSelectedIdsModifica, 
                                       errori, setErrori}) => {
  
  const itemSession = useSelector((state) => state.itemSession.value);
  
  if (items.length === 0) {
    return (
      <div className='containerTitle'><label className='titoloForm'>Nessun {tipoItem} trovato.</label></div>
    )
  }

  return (
    <>
      <Row className='custom-row'>
      {items.map((item) => (
        <Item 
          key={`${item.id}`}
          id={item.id} // Passa l'ID come una proprietà distinta
          tipoItem={tipoItem}
          item={item}
          setterItems={setterItems}
          viewElements={viewElements}
          setSelectedTrashCount={setSelectedTrashCount}
          setSelectedPencilCount={setSelectedPencilCount}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          selectedIdsModifica={selectedIdsModifica}
          setSelectedIdsModifica={setSelectedIdsModifica}
        />
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








