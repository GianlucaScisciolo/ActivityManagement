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
    // trashStyle,
    // setTrashStyle,
    // pencilStyle,
    // setPencilStyle,
    isPencilSelected,
    isTrashSelected,
    // textAreaClassBlock,
    // textAreaClass,
    // inputClassBlock,
    // inputClass,
    // setTextAreaClassBlock,
    // setTextAreaClass,
    // setInputClassBlock,
    // setInputClass,
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
              className={getClassPencil(item.tipo_selezione)} 
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
              className={getClassTrash(item.tipo_selezione)} 
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
                className={getClassTextAreaBlock(item.tipo_selezione)} 
                value={nome} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setNome, item, setterItems, "nome")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextAreaBlock(item.tipo_selezione)}
                value={cognome} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setCognome, item, setterItems, "cognome")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextAreaBlock(item.tipo_selezione)}
                value={nomeCliente} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setNomeCliente, item, setterItems, "nomeCliente")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextAreaBlock(item.tipo_selezione)}
                value={cognomeCliente} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setCognomeCliente, item, setterItems, "cognomeCliente")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextAreaBlock(item.tipo_selezione)}
                value={nomeProfessionista} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setNomeProfessionista, item, setterItems, "nomeProfessionista")} 
              />
            </Col>
          )}
          {(tipoItem === "professionista" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextAreaBlock(item.tipo_selezione)}
                value={professione} 
                onChange={(e) => onChangeValue(e, getClassTextAreaBlock(item.tipo_selezione), setProfessione, item, setterItems, "professione")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente" || tipoItem === "professionista") && (
            <Col className='custom-col'>
              <input 
                className={getClassInput(item.tipo_selezione)}
                type="text" 
                value={contatto} 
                onChange={(e) => onChangeValue(e, getClassInput(item.tipo_selezione), setContatto, item, setterItems, "contatto")}
              />
            </Col>
          )}
          {(tipoItem === "professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextArea(item.tipo_selezione)}
                value={email} 
                onChange={(e) => onChangeValue(e, getClassTextArea(item.tipo_selezione), setEmail, item, setterItems, "email")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextArea(item.tipo_selezione)}
                value={descrizione} 
                onChange={(e) => onChangeValue(e, getClassTextArea(item.tipo_selezione), setDescrizione, item, setterItems, "descrizione")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={getClassInput(item.tipo_selezione)} 
                value={formatDate(giorno)} 
                type='date'
                onChange={(e) => onChangeValue(e, getClassInput(item.tipo_selezione), setGiorno, item, setterItems, "giorno")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={getClassInput(item.tipo_selezione)}
                value={formatTime(orarioInizio)} 
                onChange={(e) => onChangeValue(e, getClassInput(item.tipo_selezione), setOrarioInizio, item, setterItems, "orarioInizio")} 
              />
            </Col>
          )}
          {(tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <input 
                className={getClassInput(item.tipo_selezione)}
                value={formatTime(orarioFine)}
                type='time' 
                onChange={(e) => onChangeValue(e, getClassInput(item.tipo_selezione), setOrarioFine, item, setterItems, "orarioFine")} 
              />
            </Col>
          )}
          {(tipoItem === "cliente" || tipoItem === "professionista" || tipoItem === "lavoro cliente" || tipoItem === "lavoro professionista") && (
            <Col className='custom-col'>
              <textarea 
                className={getClassTextArea(item.tipo_selezione)}
                value={note} 
                onChange={(e) => onChangeValue(e, getClassTextArea(item.tipo_selezione), setNote, item, setterItems, "note")} 
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

  return (
    <>
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








