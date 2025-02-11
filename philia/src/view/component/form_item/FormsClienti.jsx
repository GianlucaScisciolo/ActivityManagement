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
  handleInputChange, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';

import { 
  OperazioniNuovoItem, OperazioniCercaItems, 
  getInputTag, getTextAreaTag, 
  FormNuovoItem, FormRicercaItems
} from './FormItem';

export function FormNuovoCliente({item, setItem, eseguiSalvataggio}) {
  let campi = {
    header: "Nuovo cliente", 
    type: [null, null, "text", null], 
    label: ["Nome*", "Cognome*", "Contatto*", "Note"],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"],
    errore: [item.errore_nome, item.errore_cognome, item.errore_contatto, item.errore_note], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3];

    return (
      <>
        <FormNuovoItem 
          campi={campi}
          indici={indici}
          eseguiSalvataggio={eseguiSalvataggio}
        />
      </>
    );
}

export function FormRicercaClienti({item, setItem, eseguiRicerca}) {
  let campi = {
    header: "Ricerca clienti", 
    label: ["Nome", "Cognome", "Contatto", "Note"], 
    type: [null, null, "text", null],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3];

  return (
    <>
      <FormRicercaItems 
        item={item}
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

export function FormCercaClienti({item, setItem, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);
  
  return (
    <>
      <StyledForm>
        <StyledHeader>Ricerca clienti</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="nome">Nome</StyledLabel>
          <TextAreaTag rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="nome">Cognome</StyledLabel>
          <TextAreaTag rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="contatto">Contatto</StyledLabel>
          <InputTag rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          <br /> <br />
        </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledForm>
    </>
  );
}









