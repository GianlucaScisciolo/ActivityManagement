import React, { useState } from 'react';
import { List, WalletCards, Trash2, Pencil } from 'lucide-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HookItems } from '../../vario/HookItems';

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

const Item = ({key, tipoItem, item, setterItems, viewElements, setSelectedTrashCount, setSelectedPencilCount,
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
/*


// Quando passi il valore dell'ora al campo di input
const formattedOrarioFine = formatTimeWithoutSeconds(orarioFine);

// Poi usi `formattedOrarioFine` come valore dell'input
<Col className='custom-col'>
  <input 
    className={inputClass} 
    value={formattedOrarioFine} 
    type='time'
    onChange={(e) => onChangeValue(e, textAreaClass, setOrarioFine, item, setterItems, "orarioFine")} 
  />
</Col>


*/
  
  const {
    trashStyle,
    setTrashStyle,
    pencilStyle,
    setPencilStyle,
    isPencilSelected,
    isTrashSelected,
    textAreaClassBlock,
    textAreaClass,
    inputClassBlock,
    inputClass,
    setTextAreaClassBlock,
    setTextAreaClass,
    setInputClassBlock,
    setInputClass,
    handlePencilClickWrapperClienti, 
    handlePencilClickWrapperProfessionisti, 
    handlePencilClickWrapperLavori, 
    handleTrashClickWrapper,
    onChangeValue,
    selectOperation,
  } = HookItems();

  // if(!selectedIdsModifica.includes(item.id)) {
  //   setTextAreaClassBlock("custom-textarea-block");
  //   setTextAreaClass("custom-textarea-block");
  //   setInputClassBlock("custom-input-block");
  //   setInputClass("custom-input-block");
  // }
  // selectOperation(
  //   "pencil",
  //   item,
  //   setterItems,
  //   setSelectedTrashCount,
  //   setSelectedPencilCount,
  //   selectedIds,
  //   setSelectedIds,
  //   selectedIdsModifica,
  //   setSelectedIdsModifica
  // )

  return (
    <>
      {viewElements === "list" && (
        <Row className='custom-row'>
          <Col className='custom-col-black'>
            <Pencil 
              className={pencilStyle} 
              id='pencil' 
              size={35} 
              onClick={() => selectOperation(
                "pencil",
                item,
                setterItems,
                setSelectedTrashCount,
                setSelectedPencilCount,
                selectedIds,
                setSelectedIds,
                selectedIdsModifica,
                setSelectedIdsModifica
              )} 
            />
            <Trash2 
              className={trashStyle} 
              id='trash' 
              size={35} 
              onClick={() => selectOperation(
                "trash",
                item,
                setterItems,
                setSelectedTrashCount,
                setSelectedPencilCount,
                selectedIds,
                setSelectedIds,
                selectedIdsModifica,
                setSelectedIdsModifica
              )}
            />
          </Col>
          {(tipoItem === "cliente" || tipoItem === "professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={nome} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setNome, item, setterItems, "nome")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={cognome} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setCognome, item, setterItems, "cognome")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={nomeCliente} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setNomeCliente, item, setterItems, "nomeCliente")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={cognomeCliente} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setCognomeCliente, item, setterItems, "cognomeCliente")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={nomeProfessionista} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setNomeProfessionista, item, setterItems, "nomeProfessionista")} 
              />
            </Col>
          )}
          {(tipoItem === "professionista" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClassBlock} 
                value={professione} 
                onChange={(e) => onChangeValue(e, textAreaClassBlock, setProfessione, item, setterItems, "professione")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente" || tipoItem === "professionista") && (
            <Col className='custom-col'>
              <input 
                className={inputClass} 
                type="text" 
                value={contatto} 
                onChange={(e) => onChangeValue(e, inputClass, setContatto, item, setterItems, "contatto")}
              />
            </Col>
          )}
          {(tipoItem === "professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClass} 
                value={email} 
                onChange={(e) => onChangeValue(e, textAreaClass, setEmail, item, setterItems, "email")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClass} 
                value={descrizione} 
                onChange={(e) => onChangeValue(e, textAreaClass, setDescrizione, item, setterItems, "descrizione")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={inputClass} 
                value={formatDate(giorno)} 
                type='date'
                onChange={(e) => onChangeValue(e, inputClass, setGiorno, item, setterItems, "giorno")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={inputClass} 
                value={formatTime(orarioInizio)} 
                onChange={(e) => onChangeValue(e, inputClass, setOrarioInizio, item, setterItems, "orarioInizio")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={inputClass} 
                value={formatTime(orarioFine)}
                type='time' 
                onChange={(e) => onChangeValue(e, textAreaClass, setOrarioFine, item, setterItems, "orarioFine")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente" || tipoItem === "professionista" || tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={textAreaClass} 
                value={note} 
                onChange={(e) => onChangeValue(e, textAreaClass, setNote, item, setterItems, "note")} 
              />
            </Col>
          )}
        </Row>
      )}
      {viewElements === "card" && (
        <>
        ciao
        </>
      )}
    </>
  );
}

export const RenderItemsInRowsList = ({tipoItem, items, setterItems, viewElements, setSelectedTrashCount, setSelectedPencilCount, 
                                       selectedIds, setSelectedIds, selectedIdsModifica, setSelectedIdsModifica, 
                                       errori, setErrori}) => {
  if (items.length === 0) {
    return <center><div>Nessun {tipoItem} trovato.</div></center>;
  }

  // if(selectedIdsModifica.length === 0) {
  //   setTextAreaClassBlock("custom-textarea-block");
  //   setTextAreaClass("custom-textarea-block");
  //   setInputClassBlock("custom-input-block");
  //   setInputClass("custom-input-block");
  // }

  // if(selectedIds.length === 0) {
  //   setTextAreaClassBlock("custom-textarea-block");
  //   setTextAreaClass("custom-textarea-block");
  //   setInputClassBlock("custom-input-block");
  //   setInputClass("custom-input-block");
  // }

  const rows = [
    <Row className='custom-row'>
      <Col className='custom-col-black'>Operazione</Col>
      {(tipoItem === "cliente") && (
        <>
          <Col className='custom-col-black'>Nome</Col>
          <Col className='custom-col-black'>Cognome</Col>
          <Col className='custom-col-black'>Contatto</Col>
          <Col className='custom-col-black'>Note</Col>
        </>
      )}
      {(tipoItem === "professionista") && (
        <>
          <Col className='custom-col-black'>Nome</Col>
          <Col className='custom-col-black'>Professione</Col>
          <Col className='custom-col-black'>Contatto</Col>
          <Col className='custom-col-black'>Email</Col>
          <Col className='custom-col-black'>Note</Col>
        </>
      )}
      {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
        <>
          <Col className='custom-col-black'>Nome</Col>
          {(tipoItem === "lavoro cliente") && (
            <Col className='custom-col-black'>Cognome</Col>
          )}
          {(tipoItem === "lavoro professionista") && (
            <Col className='custom-col-black'>Professione</Col>
          )}
          <Col className='custom-col-black'>Descrizione</Col>
          <Col className='custom-col-black'>Giorno</Col>
          <Col className='custom-col-black'>Orario inizio</Col>
          <Col className='custom-col-black'>Orario fine</Col>
          <Col className='custom-col-black'>Note</Col>
        </>
      )}
    </Row>
  ];
  for (let i = 0; i < items.length; i++) {
    rows.push(
      <Item 
        key={items[i].id}
        tipoItem={tipoItem}
        item={items[i]}
        setterItems={setterItems}
        viewElements={viewElements}
        setSelectedTrashCount={setSelectedTrashCount}
        setSelectedPencilCount={setSelectedPencilCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedIdsModifica={selectedIdsModifica}
        setSelectedIdsModifica={setSelectedIdsModifica}
      />
    )
  }
  rows.push(
    <>
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
  return rows;
};
/*
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : ""
*/












