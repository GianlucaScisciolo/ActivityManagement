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
  getTextAreaTag, getInputTag, 
  FormNuovoItem, FormRicercaItems 
} from './FormItem';

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 1000); 
};

export function FormNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  let campi = {
    header: "Nuovo professionista", 
    type: [null, null, "text", "text", null], 
    label: ["Nome*", "Professione*", "Contatto", "Email*", "Note"], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome*", "Professione*", "Contatto", "Email", "Note"], 
    errore: [item.errore_nome, item.errore_professione, item.errore_contatto, item.errore_email, item.errore_note], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4];
  
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

export function FormRicercaProfessionisti({item, setItem, eseguiRicerca}) {
  let campi = {
    header: "Ricerca professionisti", 
    label: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    type: [null, null, "text", "text", null], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4];

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









