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
} from "../../../trasportabile/form_item/StyledFormItem";
import { 
  handleInputChange, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';

import { 
  OperazioniLogin, 
  getTextAreaTag, getInputTag
} from "../../../trasportabile/form_item/FormItem"

export function FormLogin({item, setItem, eseguiLogin}) {
  let maxHeight = "2000px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledForm>
        <StyledHeader>Login</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="username">Username*</StyledLabel>
          <TextAreaTag rows="1" placeholder="Username*" name="username" value={item.username} onChange={(e) => handleInputChange(e, setItem)} /> 
          {(item.errore_username !== "") && (<StyledSpanErrore>{item.errore_username}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="password">Password*</StyledLabel>
          <InputTag rows="1" placeholder="Password*" type="password" name="password" value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_password !== "") && (<StyledSpanErrore>{item.errore_password}</StyledSpanErrore>)}
          
          <br /> <br />
        </SlideContainer>
        <OperazioniLogin eseguiLogin={eseguiLogin} />
      </StyledForm>
    </>
  );
}









