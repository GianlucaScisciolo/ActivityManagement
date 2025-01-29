import React, { useState, useEffect } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColBlack, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelect, StyledOption, StyledSpanErrore, StyledLoginNotSelected
} from "./StyledRowItem";
import { 
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';

const OperazioniLogin = ({eseguiLogin}) => {
  return (
    <StyledColOperazioni>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledColOperazioni>
  );
};

export function RowLogin({item, setItem, eseguiLogin}) {
  return (
    <>
      <StyledRow>
        <OperazioniLogin eseguiLogin={eseguiLogin} />
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledTextAreaModifica rows="1" placeholder="Username*" name="username" value={item.username} onChange={(e) => handleInputChange(e, setItem)} /> 
            {(item.errore_username !== "") && (<StyledSpanErrore>{item.errore_username}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledInputModifica rows="1" placeholder="Password*" type="password" name="password" value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_password !== "") && (<StyledSpanErrore>{item.errore_password}</StyledSpanErrore>)}
          </div>
        </StyledCol>
      </StyledRow>
    </>
  );
}









