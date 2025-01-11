import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { formatoDate, formatoTime } from '../../../vario/Tempo';
import { 
  StyledCard, StyledRow, StyledCol, StyledCardHeader, grandezzaIcona,
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina,
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledListGroupItem, SlideContainer, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected
} from './StyledCardItem';
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 450); 
};


const PencilTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    default:
      return <></>;
  }
}

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledTextAreaBlock rows="1" name={nome} value={valore} />;
    case 1:
      return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} value={valore} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} />;
    case 2:
      return <StyledTextAreaElimina rows="1" name={nome} value={valore} />;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />;
    case 2:
      return <StyledInputElimina rows="1" type={tipo} name={nome} value={valore} />;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation, item }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
    </StyledListGroupItem>
  )
}

const OperazioniNuovoItem = () => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ setIsVisible, arrowUp, setArrowUp }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

function CardCliente({ item, selectOperation }) {
  return (
    <>
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome" valore={item.nome + " " + item.cognome} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CardProfessionista({ item, selectOperation }) {
  return (
    <>
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome" valore={item.nome} modificabile={false} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="email" nome="email" valore={item.email} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CardLavoro({ tipoItem, item, selectOperation }) {
  return (
    <>
      {(tipoItem === "lavoro cliente") && (
        <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false} />
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_professionista" valore={item.nome_professionista} modificabile={false} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="descrizione" valore={item.descrizione} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno" valore={formatoDate(item.giorno, "AAAA-MM-GG")} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
        </>
      )}
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CardModificaProfilo({ item }) {
  return (
    <>
      <StyledTextArea rows="1" name="username" placeholder='Username*'/>
      <StyledTextArea rows="1" name="note" placeholder='Note'/>
      <StyledTextArea rows="1" name="password_attuale" placeholder='Password attuale*'/>
      <StyledTextArea rows="1" name="nuova_password" placeholder='Nuova password'/>
      <StyledTextArea rows="1" name="conferma_nuova_password" placeholder='Conferma nuova password'/>
    </>
  );
}

function CampiItem({campiItem, setItem}) {
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          {(type === null) && (
            <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
          {(type !== null) && (
            <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function CardNuovoItem({tipoItem, item, setItem}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={true}>
        <CampiItem campiItem={campiNuovoItem} setItem={setItem} />
      </SlideContainer>
      <OperazioniNuovoItem  />
    </>
  );
}

function CardRicerca({tipoItem, item, setItem, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

function CardItem({ selectOperation, tipoItem, item, setItem, header }) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  header = (tipoItem === "lavoro") ? item.tipo_lavoro : header;
  return (
    <StyledCard>
      <StyledCardHeader style={{backgroundColor: "#000000"}}>{(header !== "") ? header : " "}</StyledCardHeader>
      <StyledListGroupItem variant="flush">
        {(tipoItem.startsWith("nuovo")) && (
          <CardNuovoItem tipoItem={tipoItem} item={item} setItem={setItem} />
        )}
        {(tipoItem.startsWith("cerca")) && (
          <CardRicerca tipoItem={tipoItem} item={item} setItem={setItem}
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp} 
          />
        )}
        {(tipoItem === "cliente") &&(
          <CardCliente item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem === "professionista") &&(
          <CardProfessionista item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("lavoro")) &&(
          <CardLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("modifica profilo")) &&(
          <CardModificaProfilo item={item} />
        )}
      </StyledListGroupItem>
    </StyledCard>
  );
}

export default CardItem;









