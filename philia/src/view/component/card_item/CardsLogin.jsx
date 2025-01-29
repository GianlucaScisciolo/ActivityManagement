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

const OperazioniLogin = ({eseguiLogin}) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledListGroupItem>
  );
};

export function CardLogin({item, setItem, eseguiLogin}) {
  return (
    <>
      <StyledCard>
        <StyledCardHeader>Login</StyledCardHeader>
        <StyledTextAreaModifica rows="1" placeholder="Username*" name="username" value={item.username} onChange={(e) => handleInputChange(e, setItem)} /> 
        {(item.errore_username !== "") && (<StyledSpanErrore>{item.errore_username}</StyledSpanErrore>)}
        <StyledInputModifica rows="1" placeholder="Password*" type="password" name="password" value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_password !== "") && (<StyledSpanErrore>{item.errore_password}</StyledSpanErrore>)}
        <br /> <br />
        <OperazioniLogin eseguiLogin={eseguiLogin} />
      </StyledCard>
    </>
  );
}









