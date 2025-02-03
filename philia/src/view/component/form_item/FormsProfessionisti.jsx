import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledForm, StyledListGroupItem, StyledRow, StyledCol, 
  StyledLabel, StyledHeader, grandezzaIcona, SlideContainer, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, StyledPencilNotSelected,  
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledSelect, StyledOption, 
  BottoneBluNonSelezionato, BottoneBluSelezionato, BottoneRossoNonSelezionato, BottoneRossoSelezionato, 
  StyledSpanErrore, StyledLoginNotSelected
} from "./StyledFormItem";
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, 
  getTextAreaTag, getInputTag
} from './FormItem';

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 1000); 
};

export function FormNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = "2000px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledForm>
        <StyledHeader>Nuovo professionista</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="nome">Nome*</StyledLabel>
          <TextAreaTag rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nome !== "") && (<StyledSpanErrore>{item.errore_nome}</StyledSpanErrore>)}
          <StyledLabel htmlFor="professione">Professione*</StyledLabel>
          <TextAreaTag rows="1" placeholder="Professione*" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_professione !== "") && (<StyledSpanErrore>{item.errore_professione}</StyledSpanErrore>)}
          <StyledLabel htmlFor="contatto">Contatto</StyledLabel>
          <InputTag rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_contatto !== "") && (<StyledSpanErrore>{item.errore_contatto}</StyledSpanErrore>)}
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <InputTag rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_email !== "") && (<StyledSpanErrore>{item.errore_email}</StyledSpanErrore>)}
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          <br /> <br />
        </SlideContainer>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledForm>
    </>
  );
}

export function FormCercaProfessionisti({item, setItem, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledForm>
        <StyledHeader>Ricerca professionisti</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="nome">Nome</StyledLabel>
          <TextAreaTag rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="nome">Professione</StyledLabel>
          <TextAreaTag rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="contatto">Contatto</StyledLabel>
          <InputTag rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <InputTag rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          <br /> <br />
        </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledForm>
    </>
  );
}









