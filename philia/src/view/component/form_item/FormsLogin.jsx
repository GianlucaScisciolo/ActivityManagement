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

const OperazioniLogin = ({eseguiLogin}) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledListGroupItem>
  );
};

export function FormLogin({item, setItem, eseguiLogin}) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledForm>
        <StyledHeader>Login</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="username">Username*</StyledLabel>
          <StyledTextAreaModifica rows="1" placeholder="Username*" name="username" value={item.username} onChange={(e) => handleInputChange(e, setItem)} /> 
          {(item.errore_username !== "") && (<StyledSpanErrore>{item.errore_username}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="password">Password*</StyledLabel>
          <StyledInputModifica rows="1" placeholder="Password*" type="password" name="password" value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_password !== "") && (<StyledSpanErrore>{item.errore_password}</StyledSpanErrore>)}
          
          <br /> <br />
        </SlideContainer>
        <OperazioniLogin eseguiLogin={eseguiLogin} />
      </StyledForm>
    </>
  );
}









