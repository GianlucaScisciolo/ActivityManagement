import React, { useState, useEffect } from 'react';
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
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelect, StyledOption, StyledSpanErrore, StyledLoginNotSelected
} from './StyledCardItem';
import { 
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
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

function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

function OperazioniItemEsistente ({ tipoSelezione, selectOperation, item }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </StyledListGroupItem>
  )
}

export function CardNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Nuovo professionista</StyledCardHeader>
        <StyledTextAreaModifica rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
        <StyledTextAreaModifica rows="1" placeholder="Professione*" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledCard>
    </>
  );
}

export function CardCercaProfessionisti({item, setItem, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Ricerca professionisti</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        </SlideContainer>
        <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledCard>
    </>
  );
}

export function CardProfessionistaEsistente({item, items, setItems, selectOperation}) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Professionista</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        </SlideContainer>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      </StyledCard>
    </>
  );
}








